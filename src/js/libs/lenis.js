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

    // ✅ Lenis が存在する場合だけ raf 実行
    function raf(time) {
      if (lenis) {
        lenis.raf(time);
      }
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    // ✅ ScrollTrigger連携（なければ追加）
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
  }

  return lenis;
}

export function destroyLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}
