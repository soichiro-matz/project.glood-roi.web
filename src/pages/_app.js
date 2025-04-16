import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { initLenis, destroyLenis } from "@libs/lenis";
import "@/styles/globals.scss";
import "@/styles/components/layout/_header.scss";
import "@/styles/components/layout/_footer.scss";
import "@/styles/components/ui/ui.scss";
import "@scss/libs/Rola.scss";
import Meta from "@components/layout/Meta";
import GoogleAnalytics from "@/components/utils/GoogleAnalytics";
import Header from "@/components/layout/Header";
import Layout from "@components/layout/Layout";

export default function App({ Component, pageProps }) {
  const meta = Component.meta || pageProps.meta || {};
  const router = useRouter();
  const lenisRef = useRef(null); // ✅ Lenis インスタンス保持用

  const bindAnchorEvents = (lenisInstance) => {
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
  };

  useEffect(() => {
    const handleRouteChangeStart = () => {
      destroyLenis(); // ✅ ページ遷移前にリセット
    };

    const handleRouteChangeComplete = async () => {
      const lenis = await initLenis();
      lenis.start();
      lenisRef.current = lenis;

      bindAnchorEvents(lenis);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
            ScrollTrigger.refresh(true);
          });
        });
      });

      // ✅ ページにハッシュがあれば遅延スクロール
      if (window.location.hash) {
        const id = window.location.hash.replace("#", "");

        const waitForTarget = (retries = 10) =>
          new Promise((resolve) => {
            const check = () => {
              const el = document.getElementById(id);
              if (el || retries <= 0) return resolve(el);
              setTimeout(() => resolve(waitForTarget(retries - 1)), 100);
            };
            check();
          });

        const target = await waitForTarget();
        if (target) {
          const offset = getOffsetByScreen(target);
          lenis.scrollTo(target, {
            offset,
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            onComplete: () => {
              const { ScrollTrigger } = require("gsap/ScrollTrigger");
              ScrollTrigger.refresh(true);
            },
          });
        }
      }
    };

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    handleRouteChangeComplete(); // 初回描画にも対応

    let resizeTimeoutId;
    window.addEventListener("resize", () => {
      document.documentElement.classList.add("is-resize");
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(() => {
        document.documentElement.classList.remove("is-resize");
      }, 500);
    });

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  return (
    <>
      <Meta {...meta} />
      <GoogleAnalytics />
      <Header />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

// スクリーン幅による offset 判定
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
