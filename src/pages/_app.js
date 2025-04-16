import { useEffect } from "react";
import { useRouter } from "next/router";
import { initLenis } from "@libs/lenis";
import "@/styles/globals.scss";
import "@/styles/components/layout/_header.scss";
import "@/styles/components/layout/_footer.scss";
import "@/styles/components/ui/ui.scss";
import "@scss/libs/Rola.scss";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const bindAnchorEvents = async () => {
    let lenis;

    (async () => {
      lenis = await initLenis();

      const anchors = document.querySelectorAll('a[href*="#"]');

      //lenis +anchorlink対応
      anchors.forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          // alert("なし");

          const href = anchor.getAttribute("href");
          if (!href || href === "#" || href.startsWith("http")) return;

          // hashだけ抽出（例: href="/#contact" → "contact"）
          const hash = href.split("#")[1];
          if (!hash) return;

          const target = document.getElementById(hash);
          if (!target) return;

          e.preventDefault();

          const offset = getOffsetByScreen(target);

          lenis.scrollTo(target, {
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
    })();

    return () => {
      if (lenis) lenis.destroy();
    };
    // }, []);
  };

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 初回ページ描画時
    bindAnchorEvents();

    // ページ遷移のたびにアンカーイベント再設定
    router.events.on("routeChangeComplete", bindAnchorEvents);

    let resizeTimeoutId;
    window.addEventListener("resize", () => {
      document.documentElement.classList.add("is-resize");

      clearTimeout(resizeTimeoutId);

      resizeTimeoutId = setTimeout(() => {
        document.documentElement.classList.remove("is-resize");
      }, 500);
    });

    // クリーンアップ
    return () => {
      router.events.off("routeChangeComplete", bindAnchorEvents);
    };
  }, []);

  // 別ページ → アンカー付きページへの遷移時にスクロール実行
  useEffect(() => {
    // alert("あり");

    const hash = window.location.hash;
    if (!hash) return;
    // ハッシュのジャンプ挙動を防止
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    const scrollToHash = async () => {
      const lenis = await initLenis();
      const id = hash.replace("#", "");
      const target = document.getElementById(id);
      if (!target) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const offset = getOffsetByScreen(target);
          // スクロールが完了するのを待ってから ScrollTrigger.refresh()
          lenis.scrollTo(target, {
            offset,
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            onComplete: () => {
              // scrollTo完了後にrefreshすることで、invalidateOnRefreshも機能
              const { ScrollTrigger } = require("gsap/ScrollTrigger");
              ScrollTrigger.refresh(true);
            },
          });
        });
      });
    };
    scrollToHash();
    //
  }, [router.asPath]);

  return <Component {...pageProps} />;
}

// offsetを取得（セクション側に data-offset-* をつけておく）
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
