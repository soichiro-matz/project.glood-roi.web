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
    console.error("Lenis.scroll.instance.scroll.y が初期化されませんでした");
  }
}

export function destroyLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}
