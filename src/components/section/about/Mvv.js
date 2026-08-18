import { useEffect } from "react";
// import gsap from "gsap";
import { gsap, registerScrollTrigger } from "@libs/gsap";
import styles from "@/styles/pages/about/mvv.module.scss";
export default function Mvv() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const init = async () => {
        const ScrollTrigger = await registerScrollTrigger();
        if (!ScrollTrigger) return;
        // const load = async () => {
        //   const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        //   gsap.registerPlugin(ScrollTrigger);

        const width = window.innerWidth;
        let isLg = width >= 768;

        gsap.to(".js-employee01", {
          y: isLg ? 50 : 30,
          ease: "none",
          scrollTrigger: {
            trigger: ".js-description",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            // markers: true,
          },
        });
        gsap.to(".js-employee02", {
          y: isLg ? 80 : 50,
          ease: "none",
          scrollTrigger: {
            trigger: ".js-description",
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
    <div
      className={`${styles.mvv} relative pb-fluid-[120,176,768,1280]`}
      id="mvv"
    >
      <ul className={`${styles.card} l-container rounded-3xl bg-white`}>
        <li>
          <section className={`${styles.cardBody} l-grid__12`}>
            <h3 className={`${styles.heading} `}>
              <span
                className={`${styles.titleEn}`}
                lang="en"
                aria-hidden="true"
              >
                mission
              </span>
              <span className={`${styles.title}`}>ミッション</span>
            </h3>
            <p className={`${styles.description}`}>
              日本中の良いモノで、すべての人のくらしを豊かに
            </p>
            <span className={`${styles.border}`}></span>
          </section>
        </li>
        <li>
          <section className={`${styles.cardBody} l-grid__12`}>
            <h3 className={`${styles.heading} `}>
              <span
                className={`${styles.titleEn}`}
                lang="en"
                aria-hidden="true"
              >
                vision
              </span>
              <span className={`${styles.title}`}>ビジョン</span>
            </h3>
            <p className={`${styles.description}`}>
              ECの力で日本中のより良いモノを世界中のあらゆる人に届け、買い物の喜びと感動を与える
            </p>
            <span className={`${styles.border}`}></span>
          </section>
        </li>
        <li>
          <section className={`${styles.cardBody} l-grid__12`}>
            <h3 className={`${styles.heading} `}>
              <span
                className={`${styles.titleEn}`}
                lang="en"
                aria-hidden="true"
              >
                value
              </span>
              <span className={`${styles.title}`}>バリュー</span>
            </h3>
            <div className={`${styles.description} js-description relative`}>
              <ul className={`${styles.descriptionList}`}>
                <li>
                  <dl>
                    <dt>すぐやる</dt>
                    <dd>失敗を恐れずにスピード感を持って行動し続ける。</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt >やりきる</dt>
                    <dd >主体性を持って責任を果たす。</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>かわれる</dt>
                    <dd>素直に受け入れて柔軟に変化する。</dd>
                  </dl>
                </li>
              </ul>
              <div
                className={`${styles.imageWrapper} absolute left-[30%] top-[87%] w-fluid-[38,53,350,768] md:left-[-65%] md:top-[28%] md:w-fluid-[53,78] lg:left-[-60%] lg:top-[33%]`}
              >
                <img
                  src="/assets/img/about/img-mvv-01.svg"
                  width={180}
                  height={305}
                  alt=""
                  className={`${styles.iconImage} js-employee01`}
                />
              </div>
              <div
                className={`${styles.imageWrapper} absolute left-[50%] top-[87%] w-fluid-[32,44,350,768] md:left-[-42%] md:top-[35%] md:w-fluid-[44,65] lg:left-[-40%] lg:top-[40%]`}
              >
                <img
                  src="/assets/img/about/img-mvv-02.svg"
                  width={180}
                  height={305}
                  alt=""
                  className={`${styles.iconImage} js-employee02`}
                />
              </div>
            </div>
          </section>
        </li>
      </ul>
    </div>
  );
}
