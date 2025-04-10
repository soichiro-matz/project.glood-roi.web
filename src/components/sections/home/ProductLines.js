import { nanoid } from "nanoid";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import styles from "@/styles/components/sections/home/productLines.module.scss";
import SectionTitle from "@/components/parts/SectionTitle";
import { zeroPad } from "@utils/utils";

const Items = [
  { categories: ["ダイエット", "健康"] },
  { categories: ["美容", "コスメ"] },
  { categories: ["医薬品・介護", "コンタクトレンズ"] },
  { categories: ["日用品雑貨", "文房具"] },
  { categories: ["キッチン用品", "食器・調理器具"] },
  { categories: ["食品", "ドリンク"] },
  { categories: ["キッズ・ベビー", "マタニティ"] },
  { categories: ["ペットフード", "ペット用品"] },
];

export default function ProductLines() {
  useLayoutEffect(() => {
    const load = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray(".js-transition").forEach((section) => {
        const items = section.querySelectorAll(".js-transition-item");

        gsap.fromTo(
          items,
          {
            y: 500,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              toggleActions: "play none none reverse",
              // markers: true,
            },
          },
        );
      });

      setTimeout(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".js-productCategory",
            start: "top 130%",
            // markers: true,
          },
        });

        tl.to(".js-productCategory", {
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
        }).to(
          ".js-productCategory",
          {
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
          },
          "<0.2",
        );

        ScrollTrigger.refresh();
      }, 500);
    };

    load();
  }, []);

  return (
    <div
      id="product-lines"
      className={`${styles.productLines} js-transition relative z-50`}
    >
      <div
        className={`${styles.transition01} js-transition-item absolute h-[500px] w-full`}
      ></div>
      <div
        className={`${styles.transition02} js-transition-item absolute h-[500px] w-full`}
      ></div>

      <section
        className={`js-transition-item js-main-section bg-white text-center pb-fluid-[80,156,350,768] pt-fluid-[80,136,350,768] md:pb-fluid-[96,160] md:pt-fluid-[120,160]`}
      >
        <SectionTitle
          tag="h2"
          titleEn="product lines"
          titleJp="取扱商品カテゴリー"
          start="110%"
        />
        <ul
          className={`${styles.items} l-container flex flex-wrap pt-fluid-[88,120] md:pt-fluid-[120,160]`}
        >
          {Items.map((item, index) => (
            <li
              key={nanoid()}
              className={`${styles.item} js-productCategory w-1/2 md:w-1/4 md:h-fluid-[196,240]`}
            >
              <div
                className={`relative py-fluid-[32,40,350,768] md:py-fluid-[32,32]`}
              >
                <section
                  className={`flex flex-col items-center gap-fluid-[16,20]`}
                >
                  <h3 className={`${styles.name} flex flex-col items-center`}>
                    {item.categories.map((category) => (
                      <span
                        key={nanoid()}
                        className={`${styles.category} leading-nonr font-medium text-fluid-[14,16]`}
                      >
                        {category}
                      </span>
                    ))}
                  </h3>
                  <div
                    className={`${styles.icon} ${styles[`-i${zeroPad(index + 1, 2)}`]} order-first rounded-full leading-none wh-fluid-[80,104,350,768] md:wh-fluid-[72,104]`}
                  ></div>
                  <span
                    className={`${styles.number} absolute left-0 top-0 text-left font-bold pl-fluid-[5,8,350,768] pt-fluid-[0,4,350,768] text-fluid-[14,16] wh-fluid-[48,64,350,768] md:pl-fluid-[8,8] md:pt-fluid-[4,4] md:wh-fluid-[56,64]`}
                  >
                    {zeroPad(index + 1, 2)}
                  </span>
                </section>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
