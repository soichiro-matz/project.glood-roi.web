import { useEffect, useRef, useState } from "react";
import styles from "@scss/components/parts/marquee.module.scss";

export default function Marquee() {
  const baseRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);
  const [animationName, setAnimationName] = useState("");

  useEffect(() => {
    if (!baseRef.current) return;

    const updateWidth = () => {
      const width = baseRef.current.offsetWidth;
      setTextWidth(width);

      const name = `scroll-${Date.now()}`; // 一意な名前
      setAnimationName(name);

      // すでに追加済みの <style id="dynamic-marquee-style"> があれば削除
      const existing = document.getElementById("dynamic-marquee-style");
      if (existing) existing.remove();

      // 新しい <style> を作成して head に追加
      const style = document.createElement("style");
      style.id = "dynamic-marquee-style";
      style.textContent = `
      @keyframes ${name} {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${width}px); }
      }
    `;
      document.head.appendChild(style);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(baseRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const duration = textWidth ? `${textWidth / 30}s` : "0s";

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className={`flex ${styles.marqueeWrapper}`}
        style={{
          animationName: animationName,
          animationDuration: duration,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        <p
          ref={baseRef}
          className={`pr-8 font-bold text-fluid-[72,136,350,768] md:text-fluid-[136,144,768,1800] ${styles.marqueeText} flex-none`}
          lang="en"
        >
          enriching everyone's life with the finest products from japan
        </p>
        <p
          className={`pr-8 font-bold text-fluid-[72,120,350,768] md:text-fluid-[120,144,768,1800] ${styles.marqueeText} flex-none`}
          lang="en"
        >
          enriching everyone's life with the finest products from japan
        </p>
      </div>
    </div>
  );
}
