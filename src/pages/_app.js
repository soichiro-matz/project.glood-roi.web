import { useEffect } from "react";
import "@/styles/globals.scss";
import "@/styles/components/layout/_header.scss";
import "@/styles/components/layout/_footer.scss";
import "@/styles/components/ui/ui.scss";
import "@scss/libs/Rola.scss";
import useRola from "@hooks/useRola";

export default function App({ Component, pageProps }) {
  // コールバック関数の定義
  const callback = (element, isInView, options) => {
    if (isInView) {
      console.log(`トリガー要素がビューポートに入った`);
    } else {
      console.log(`トリガー要素がビューポートから出た`);
    }
  };

  useRola(
    "[data-rola-trigger1]",
    {
      once: true,
      scrub: true,
      rootMargin: "0px 0px -30%",
    },
    callback,
  );

  useRola("[data-rola-trigger2]", {
    once: false,
    scrub: true,
    rootMargin: "0px 0px 0px",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@/js/libs/MomentumScroll").then(({ default: MomentumScroll }) => {
        const momentumScroll = new MomentumScroll({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
        });
      });
      return () => {
        momentumScroll.stop(); // アンマウント時に停止
      };
    }
  }, []);

  useEffect(() => {
    let resizeTimeoutId;

    const handleResize = () => {
      document.documentElement.classList.add("is-resize");
      clearTimeout(resizeTimeoutId);

      resizeTimeoutId = setTimeout(() => {
        document.documentElement.classList.remove("is-resize");
      }, 500);
    };

    window.addEventListener("resize", handleResize);

    // クリーンアップ（イベントリスナーの削除）
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeoutId);
    };
  }, []);

  return <Component {...pageProps} />;
}
