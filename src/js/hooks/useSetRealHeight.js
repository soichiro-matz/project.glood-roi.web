import { useEffect, useRef } from "react";

export default function useSetRealHeight(selector) {
  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;

    const prevHeight = { current: 0 };
    const initial = { current: true };
    let timeoutId = null;

    const getHeaderHeight = () => {
      const width = window.innerWidth;
      if (width >= 1024) return 72;
      if (width >= 768) return 64;
      return 56;
    };

    const applyHeight = () => {
      const currentHeight = window.innerHeight;
      const headerHeight = getHeaderHeight();
      el.style.height = `${currentHeight - headerHeight}px`;
      prevHeight.current = currentHeight;
    };

    const onResize = () => {
      const newHeight = window.innerHeight;

      if (initial.current) {
        applyHeight();
        initial.current = false;
        return;
      }

      // ディレイを入れて、「高さの変化が安定してから」処理する
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // 差分が小さければ無視（スクロール由来の resize を除外）
        const delta = Math.abs(prevHeight.current - window.innerHeight);
        if (delta > 80) {
          applyHeight();
        }
      }, 200); // iOS Safari は200〜300msくらいで安定します
    };

    applyHeight();
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", onResize);
    };
  }, [selector]);
}
