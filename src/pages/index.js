import styles from "@/styles/pages/index.module.scss";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/home/Hero";

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
    <Layout>
      <div className={styles.home}>
        <Hero />
      </div>
    </Layout>
  );
}
