// Rola.js
const Rola = {
  observers: new Map(),
  entries: new Map(),
  scrubEntries: new Map(),
  windowHeight: window.innerHeight,

  observe(selector, options = {}, callback = null) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observerKey = JSON.stringify(options);

    if (!Rola.observers.has(observerKey)) {
      const observer = new IntersectionObserver((entries) => {
        Rola.handleIntersection(entries, observer);
      }, options);

      Rola.observers.set(observerKey, observer);
    }

    const observer = Rola.observers.get(observerKey);

    elements.forEach((el) => {
      const entryOptions = { ...options };

      // 🟢 個別設定を取得 (data-rola-once, data-rola-scrub)
      const dataOnce = el.getAttribute("data-rola-once");
      if (dataOnce !== null) {
        entryOptions.once = dataOnce === "true"; // 個別設定を反映
      }

      const dataScrub = el.getAttribute("data-rola-scrub");
      if (dataScrub !== null) {
        entryOptions.scrub = dataScrub === "true"; // 個別設定を反映
      }

      // ターゲットの指定処理
      const targetSelector = el.getAttribute("data-rola-target");
      if (targetSelector) {
        const targetElement = document.querySelector(targetSelector);
        entryOptions.target = targetElement;
      }

      // 内部用フラグの初期化
      entryOptions._hasBeenInView = false;
      entryOptions._hasReachedProgressOne = false;

      // 要素を登録
      Rola.entries.set(el, { entryOptions, callback });

      if (entryOptions.scrub) {
        // 👈 data-rola-scrub が true の時も追加する
        Rola.scrubEntries.set(el, { entryOptions, callback });
      }

      observer.observe(el);
    });

    if (
      options.scrub ||
      Array.from(elements).some((el) => el.hasAttribute("data-rola-scrub"))
    ) {
      Rola.initScrub(options.rootMargin); // スクラムが一つでもある場合に実行
    }
  },
  handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      const entryData = Rola.entries.get(entry.target);

      if (!entryData) return;

      const { entryOptions, callback } = entryData;
      const isInView = entry.isIntersecting;

      // 【重要】スクロール追従 (`scrub: true`) の時は `updateScrub()` でコールバックを呼ぶためここで実行しない
      if (entryOptions.scrub) return;

      // ✅ once: true の場合、初回のみコールバックを呼ぶ
      if (isInView && entryOptions.once && !entryOptions._hasBeenInView) {
        entryOptions._hasBeenInView = true; // ビュー内に入ったことを記録
        entry.target.setAttribute("data-rola-inview", "true");

        if (callback) callback(entry.target, true, entryOptions, 1);

        // 監視を解除する
        observer.unobserve(entry.target);
      } else if (isInView && !entryOptions.once) {
        // 🔄 once: false の場合は入るたびに実行
        entry.target.setAttribute("data-rola-inview", "true");
        if (callback) callback(entry.target, true, entryOptions, 1);
      } else if (!isInView && !entryOptions.once) {
        // 🔄 once: false の場合は外れるたびに実行
        entry.target.setAttribute("data-rola-inview", "false");
        if (callback) callback(entry.target, false, entryOptions, 0);
      }
    });
  },
  initScrub(rootMargin = "0px 0px -30% 0px") {
    const marginMatch = rootMargin.match(/(-?\d+(\.\d+)?)%/);
    const marginRatio = marginMatch ? parseFloat(marginMatch[1]) / 100 : -0.3;

    const updateScrub = () => {
      Rola.scrubEntries.forEach((value, el) => {
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const startOffset = viewportHeight * (1 + marginRatio);
        const endOffset = 0;

        let progress = 0;
        const isInView = rect.top < viewportHeight && rect.bottom > 0;

        if (rect.bottom <= endOffset) {
          progress = 1;
        } else if (rect.bottom >= startOffset) {
          progress = 0;
        } else {
          progress = 1 - (rect.bottom - endOffset) / (startOffset - endOffset);
          progress = Math.min(Math.max(progress, 0), 1);
        }

        const entryOptions = value.entryOptions;

        // --rola-progress の更新
        el.style.setProperty("--rola-progress", progress.toFixed(4));

        // ビュー内にいる時にスクロールが起こったら必ずコールバックを呼ぶ
        if (isInView && value.callback) {
          value.callback(el, true, entryOptions, progress);
        }

        // data-rola-inview の設定
        el.setAttribute("data-rola-inview", isInView);

        // ターゲット要素の設定
        let target = null;
        if (typeof entryOptions.target === "string") {
          target = document.querySelector(entryOptions.target);
        } else if (entryOptions.target instanceof HTMLElement) {
          target = entryOptions.target;
        } else {
          target = el;
        }

        if (target) {
          target.style.setProperty("--rola-progress", progress.toFixed(4));
          target.setAttribute("data-rola-inview", isInView);
        }
      });

      requestAnimationFrame(updateScrub);
    };

    updateScrub();
  },

  destroy() {
    Rola.observers.forEach((observer) => observer.disconnect());
    Rola.entries.clear();
    Rola.scrubEntries.clear();
    Rola.observers.clear();
  },
};

export default Rola;
