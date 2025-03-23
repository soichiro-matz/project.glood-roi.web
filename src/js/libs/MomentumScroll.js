import Lenis from "@studio-freight/lenis";

const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

export default class MomentumScroll {
  constructor(options) {
    this.lenis = new Lenis(options);
    this.linkEls = document.querySelectorAll('a[href^="#"]');
    this.animationFrameId = 0;
    this.options = options;

    mediaQuery.addEventListener("change", this._changeReducedMotion.bind(this));

    this.linkEls?.forEach((el) => {
      el.addEventListener("click", this._pageLink.bind(this));
    });

    if (!mediaQuery.matches) {
      this._run();
    }
  }

  _raf(time) {
    this.lenis?.raf(time);
    this.animationFrameId = requestAnimationFrame(this._raf.bind(this));
  }

  _run() {
    this.animationFrameId = requestAnimationFrame(this._raf.bind(this));
  }

  _changeReducedMotion() {
    if (mediaQuery.matches) {
      cancelAnimationFrame(this.animationFrameId);
      this.lenis.destroy();
    } else {
      this.lenis = new Lenis(this.options);
      this._run();
    }
  }

  _pageLink(e) {
    if (!(e.currentTarget instanceof HTMLElement)) {
      console.error(`${e.currentTarget}がHTMLElementではありません`);
      return;
    }

    const anchor = e.currentTarget?.getAttribute("href");
    this.lenis?.scrollTo(anchor);
  }

  stop() {
    this.lenis?.stop();
  }

  start() {
    this.lenis?.start();
  }

  scrollTo(anchor) {
    this.lenis?.scrollTo(anchor);
  }
}
