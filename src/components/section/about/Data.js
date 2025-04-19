import { useEffect } from "react";
// import gsap from "gsap";
import { gsap, registerScrollTrigger } from "@libs/gsap";
import { nanoid } from "nanoid";

import styles from "@/styles/pages/about/data.module.scss";
import SectionTitle from "@/components/parts/SectionTitle";

const datas = [
  { title: "売上高成長率", num: 199, unit: "％" },
  { title: "お取引会社数", num: 300, unit: "社以上" },
  { title: "従業員の平均年齢", num: 37.2, unit: "歳" },
  { title: "創業来連続増収", num: 5, unit: "年" },
  { title: "有給消化率", num: 100, unit: "％" },
  { title: "管理職の平均年齢", num: 32, unit: "歳" },
  { title: "平均残業時間", num: 8, unit: "分/週" },
  { title: "女性従業員比率", num: 71, unit: "％" },
];
export default function Data() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const init = async () => {
        const ScrollTrigger = await registerScrollTrigger();
        if (!ScrollTrigger) return;

        // const load = async () => {
        //   const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        //   const { CustomEase } = await import("gsap/CustomEase");
        // gsap.registerPlugin(ScrollTrigger, CustomEase);
        gsap.to(".js-dataSection", {
          clipPath: "inset(0% round 0rem)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".js-dataSection",
            start: "top bottom",
            end: "top 10%",
            scrub: true,
            // markers: true,
          },
        });

        gsap.to(".js-datas", {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".js-datas",
            start: "top 60%",
            once: true,
            onEnter: () => {
              const countElms = document.querySelectorAll(".js-num");

              countElms.forEach((elm) => {
                const countMax = parseInt(elm.getAttribute("data-to"), 10);
                const countFrom =
                  parseInt(elm.getAttribute("data-from"), 10) || 0;

                const obj = { val: countFrom };

                gsap.fromTo(
                  obj,
                  { val: countFrom },
                  {
                    val: countMax,
                    duration: 1.2,
                    ease: "none",
                    onUpdate: () => {
                      elm.textContent = Math.floor(obj.val);
                    },
                  },
                );
              });
            },
          },
        });

        gsap.to(".js-people", {
          y: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".js-people",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            // markers: true,
          },
        });
      };
      // load();
      init();
    });
    return () => ctx.revert();
  }, []);
  return (
    <section
      className={`${styles.data} js-dataSection relative pb-fluid-[120,216] pt-fluid-[80,136]`}
      id="data"
    >
      <div className="text-center">
        <SectionTitle
          tag="h2"
          titleEn="data"
          titleJp="データでみるGlood roi"
          start="75%"
        />
      </div>
      <dl className="js-datas l-container l-grid__12 md:translate-y-22 translate-y-18 gap-3 font-bold opacity-0 pt-fluid-[64,88,350,768] md:gap-fluid-[14,16] md:pt-fluid-[88,112] lg:translate-y-24">
        {datas.map((data) => {
          return (
            <div
              className={`${styles.itemWrapper} js-data flex flex-col items-center justify-center gap-1 rounded-xl bg-white py-fluid-[32,40] md:rounded-2xl lg:gap-0 lg:rounded-3xl`}
              key={nanoid()}
            >
              <dt>
                <span className={`${styles.title} text-fluid-[14,18]`}>
                  {data.title}
                </span>
              </dt>
              <dd>
                <span className="relative">
                  <span
                    className={`${styles.num} js-num relative inline-block font-[800] leading-none text-fluid-[72,80]`}
                    data-from="0"
                    data-to={data.num}
                  >
                    {data.num}
                  </span>
                  <span
                    className={`${styles.unit} absolute pb-[0.5em] text-fluid-[13,17] md:pb-[0.4em] lg:pb-[0.4em]`}
                  >
                    {data.unit}
                  </span>
                </span>
                <span className="sr-only">{data.unit}</span>
              </dd>
            </div>
          );
        })}
      </dl>
      <div
        className={`${styles.imageWrapper} absolute bottom-[-5px] left-[50%] w-fluid-[160,230,350,768] md:w-fluid-[230,240]`}
      >
        <img
          src="/assets/img/about/img-data-01.svg"
          width={226}
          height={120}
          alt=""
          className={`${styles.iconImage} js-people w-full`}
        />
      </div>
    </section>
  );
}
