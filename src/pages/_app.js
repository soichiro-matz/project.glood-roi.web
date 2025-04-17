import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { initLenis, destroyLenis } from "@libs/lenis";
import { ErrorBoundary } from "react-error-boundary";
import gsap from "gsap";
import "@/styles/globals.scss";
import "@/styles/components/layout/_header.scss";
import "@/styles/components/layout/_footer.scss";
import "@/styles/components/ui/ui.scss";
import "@scss/libs/Rola.scss";
import Meta from "@components/layout/Meta";
import GoogleAnalytics from "@components/utils/GoogleAnalytics";
import Header from "@components/layout/Header";
import Layout from "@components/layout/Layout";
import { getChildren } from "@/data/navLinks";
import IndexMenu from "@/components/parts/IndexMenu";

export default function App({ Component, pageProps }) {
  const meta = Component.meta || pageProps.meta || {};
  const router = useRouter();
  const lenisRef = useRef(null);
  const pageRef = useRef(null);
  const [menuItems, setMenuItems] = useState(undefined);

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

  const scrollToHash = async (lenis) => {
    if (!window.location.hash) return;

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
  };

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handleRouteChangeStart = async () => {
      destroyLenis();
      await gsap.to(pageRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        onStart: () => {
          const indexMenu = pageRef.current.querySelector(".js-indexMenu");
          if (indexMenu) {
            gsap.to(indexMenu, {
              opacity: 0,
              duration: 1.2,
              ease: "power2.out",
            });
          }
        },
      });
    };

    const handleRouteChangeComplete = async () => {
      destroyLenis();
      const lenis = await initLenis();
      lenisRef.current = lenis;
      lenis.start?.();

      bindAnchorEvents(lenis);
      await scrollToHash(lenis);

      await gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        },
      );

      bindAnchorEvents(lenis);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    handleRouteChangeComplete(); // 初回表示時

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  useEffect(() => {
    // ルートに応じてIndexMenuに渡す内容を切り替える
    if (router.pathname.startsWith("/about")) {
      setMenuItems(getChildren("about"));
    } else if (router.pathname.startsWith("/recruit")) {
      setMenuItems(getChildren("recruit"));
    } else {
      setMenuItems(undefined);
    }
  }, [router.pathname]);

  return (
    <ErrorBoundary fallback={<div>エラーが発生しました</div>}>
      <Meta {...meta} />
      <GoogleAnalytics />
      <Header />
      {menuItems && menuItems.length > 0 ? (
        <IndexMenu key={router.asPath} menu={menuItems} />
      ) : null}
      <div ref={pageRef}>
        <Layout key={router.route}>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ErrorBoundary>
  );
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
