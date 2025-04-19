export default function Home() {
  function initializeAnimations() {
    gsap.to(".link a", {
      y: 0,

      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      delay: 1,
    });

    if (document.querySelector(".hero h1")) {
      const heroText = new SplitType(".hero h1", { types: "chars" });
      gsap.set(heroText.chars, { y: 400 });
      gsap.to(heroText.chars, {
        y: 0,
        duration: 1,
        stagger: 0.075,
        ease: "power4.out",
        delay: 1,
      });
    }

    if (document.querySelector(".info p")) {
      const splits = document.querySelectorAll(".info p .line");
      splits.forEach((split) => {
        const text = split.textContent;
        split.parentNode.replaceChild(document.createTextNode(text), split);
      });

      const text = new SplitType(".info p", {
        types: "lines",
        tagName: "div",
        lineClass: "line",
      });

      text.lines.forEach((line) => {
        const content = line.innerHTML;
        line.innerHTML = `<span>${content}</span>`;
      });

      gsap.set(".info p .line span", {
        y: 400,
        display: "block",
      });

      gsap.to(".info p .line span", {
        y: 0,
        duration: 2,
        stagger: 0.075,
        ease: "power4.out",
        delay: 0.25,
      });
    }
  }
  return (
    <div className="parent">
      <div className="slyder">
        <img src="test.jpg" alt="" />
      </div>
      <p class="text">
        enriching everyone&#39;s life with the finest products from japan
      </p>
      <div className="js-main-section">
        <section className="card"></section>
        <section className="card"></section>
        <section className="card"></section>
      </div>
      <div className="flex max-h-[70vh] flex-col">
        <div className="aaa"></div>
        <div className="bbb"></div>
        <div className="ccc"></div>
      </div>

      <div className="l-container l-grid__12">
        <div className="backGround"></div>
      </div>
    </div>
    <picture>
      <source srcset="/assets/img/home/img-hero-01_sp.webp 1x, /assets/img/home/img-hero-01_sp@2x.webp 2x" media="(max-width: 768px)">
      <source srcset="/assets/img/home/img-hero-01_sp.jpg 1x, /assets/img/home/img-hero-01_sp@2x.jpg 2x" media="(max-width: 768px)">
      <source srcset="/assets/img/home/img-hero-01_tab.webp 1x, /assets/img/home/img-hero-01_tab@2x.webp 2x" media="(max-width: 1024px)">
      <source srcset="/assets/img/home/img-hero-01_tab.jpg 1x, /assets/img/home/img-hero-01_tab@2x.jpg 2x" media="(max-width: 1024px)">
      <source srcset="/assets/img/home/img-hero-01_lg.webp 1x, /assets/img/home/img-hero-01_lg@2x.webp 2x" media="(max-width: 1400px)">
      <source srcset="/assets/img/home/img-hero-01_lg.jpg 1x, /assets/img/home/img-hero-01_lg@2x.jpg 2x" media="(max-width: 1400px)">
      <img width="768" height="768" alt="Slider Image" class="hero_slideImage__XqI5Z" src="/assets/img/home/img-hero-01_sp.webp"></picture>
  );
}
