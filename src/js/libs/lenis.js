import Lenis from "@studio-freight/lenis";

let lenis;

export async function initLenis() {
  if (!lenis) {
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    const gsap = (await import("gsap")).default;

    gsap.registerPlugin(ScrollTrigger);

    lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
    });

    // ✅ rafループ
    function raf(time) {
      if (lenis) {
        lenis.raf(time);
      }
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ✅ ScrollTrigger の更新を scroll イベントに連動
    lenis.on("scroll", ScrollTrigger.update);

    // ✅ scroll.instance.scroll.y が有効になるまで待ってから scrollerProxy を登録
    waitForLenisReady(() => {
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          return arguments.length
            ? lenis.scrollTo(value, { immediate: true })
            : lenis.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: document.body.style.transform ? "transform" : "fixed",
      });

      ScrollTrigger.refresh();
    });
  }

  return lenis;
}

// ✅ scroll.instance.scroll.y が準備できるまで待つ関数（最大10回リトライ）
function waitForLenisReady(callback, retries = 10) {
  const ready = lenis?.scroll?.instance?.scroll?.y !== undefined;
  if (ready) {
    callback();
  } else if (retries > 0) {
    setTimeout(() => waitForLenisReady(callback, retries - 1), 50);
  } else {
    // console.error("Lenis.scroll.instance.scroll.y が初期化されませんでした");
  }
}

export function destroyLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

export function bindAnchorEvents(lenisInstance) {
  const anchors = document.querySelectorAll('a[href*="#"]');
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#" || href.startsWith("http")) return;

      const hash = href.split("#")[1];
      if (!hash) return;

      const target = document.getElementById(hash);
      if (!target) return;

      e.preventDefault();

      const offset = getOffsetByScreen(target);

      lenisInstance.scrollTo(target, {
        offset,
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });

      setTimeout(() => {
        const { ScrollTrigger } = require("gsap/ScrollTrigger");
        ScrollTrigger.refresh();
        ScrollTrigger.update();
      }, 1200);
    });
  });
}

function getOffsetByScreen(target) {
  const width = window.innerWidth;
  let offsetAttr = "0";

  if (width < 768) {
    offsetAttr = target.dataset.offsetSp;
  } else if (width < 1024) {
    offsetAttr = target.dataset.offsetMd;
  } else {
    offsetAttr = target.dataset.offsetLg;
  }

  return parseInt(offsetAttr, 10) || 0;
}
