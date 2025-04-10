// utils/lenis.js
import Lenis from "@studio-freight/lenis";

let lenis;

export async function initLenis() {
  if (!lenis) {
    // ✅ ScrollTriggerを動的にimport（クライアント限定）
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    const gsap = (await import("gsap")).default;

    gsap.registerPlugin(ScrollTrigger);

    lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
    });

    // raf loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ✅ ScrollTriggerと連携
    lenis.on("scroll", ScrollTrigger.update);
  }

  return lenis;
}
