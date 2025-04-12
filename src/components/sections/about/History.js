import { useEffect, Fragment } from "react";
import gsap from "gsap";
import { nanoid } from "nanoid";
import styles from "@/styles/components/sections/about/history.module.scss";
import SectionTitle from "@/components/parts/SectionTitle";

const histories = [
  {
    year: 2019,
    detail: ["千葉県我孫子市にて国内EC物販事業を開始"],
  },
  {
    year: 2020,
    detail: ["株式会社Glood roiを設立"],
  },
  {
    year: 2021,
    detail: ["事業拡大に伴い本社を現本社（埼玉県さいたま市）に移転"],
  },
  {
    year: 2023,
    detail: ["卸売事業を開始, 事業拡大に伴い越谷営業所を開設"],
  },
  {
    year: 2024,
    detail: ["越境EC物販事業を開始, 事業拡大に伴い大阪営業所を開設"],
  },
];

export default function Outline() {
  useEffect(() => {
    const load = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const width = window.innerWidth;
      let lineHeight = "0";

      if (width < 768) {
        //sp
        lineHeight = "calc(100% + 2.5rem)";
      } else if (width < 1024) {
        //md
        lineHeight = "calc(100% + 3rem)";
        //lg
      } else {
        lineHeight = "calc(100% + 4rem)";
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".js-histories",
          start: "top 80%",
          // markers: true,
        },
      });

      tl.to(".js-year", {
        opacity: 1,
        duration: 0.8,
        stagger: 0.5,
        // ease: "power3.out",
      })
        .to(
          ".js-detail",
          {
            opacity: 1,
            duration: 0.8,
            stagger: 0.5,
            // ease: "power3.out",
          },
          "<",
        )
        .to(
          ".js-line",
          {
            "--after-line-height": lineHeight,
            duration: 0.5,
            stagger: 0.5,
            // ease: "power3.out",
          },
          "<",
        );
    };

    load();
  }, []);

  return (
    <section className={`pb-fluid-[120,216] pt-fluid-[80,136]`} id="outline">
      <div className="text-center">
        <SectionTitle tag="h2" titleEn="history" titleJp="沿革" start="75%" />
      </div>
      <div
        className={`${styles.historiesContainer} l-container flex justify-center pt-fluid-[80,88,350,768] md:pt-fluid-[88,144]`}
      >
        <dl
          className={`${styles.histories} js-histories grid justify-center gap-y-[2.5rem] md:gap-y-[3rem] lg:gap-y-[4rem]`}
        >
          {histories.map((history, index) => {
            const dtName = styles[`dt_${index}`];
            const ddName = styles[`dd_${index}`];
            const lastLine =
              index == histories.length - 1 ? styles[`-last`] : "";

            return (
              <Fragment key={nanoid()}>
                <dt
                  className={`${dtName} ${styles.year} js-year relative pr-[3rem] md:pr-[3.5rem]`}
                >
                  <time dateTime={history.year}>{history.year}</time>年
                  <span className={`${styles.lineWrapper} absolute`}>
                    <span
                      className={`${styles.line} w-hull ${lastLine} js-line relative block h-full`}
                    ></span>
                  </span>
                </dt>
                <dd className={`${ddName} ${styles.detail} js-detail`}>
                  {history.detail.map((item) => (
                    <p key={nanoid()}>{item}</p>
                  ))}
                </dd>
              </Fragment>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
