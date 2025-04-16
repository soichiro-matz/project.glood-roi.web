// libs/gsap.ts
import { gsap } from "gsap";

// 最初は ScrollTrigger を import しない
export { gsap };

// クライアント側だけで ScrollTrigger を登録する関数
export async function registerScrollTrigger() {
  if (typeof window === "undefined") return;

  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);

  return ScrollTrigger;
}
