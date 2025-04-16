import Image from "next/image";
import { useEffect } from "react";
// import gsap from "gsap";
import { gsap, registerScrollTrigger } from "@libs/gsap";
import Lettering from "@/js/libs/Lettering";
import styles from "@/styles/pages/home/hero.module.scss";
import useSetRealHeight from "@hooks/useSetRealHeight";

// swiper
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";

import Marquee from "@components/parts/marquee";

// swiper画像
const images = [
  "/assets/img/home/img-hero-01",
  "/assets/img/home/img-hero-02",
  "/assets/img/home/img-hero-03",
];

export default function Hero() {
  useSetRealHeight(".js-hero");

  useEffect(() => {
    const lettering = new Lettering(".js-copy");
    lettering.letters();

    const swiper = document.querySelector(".swiper");

    if (swiper) {
      swiper.style.height = "100%";
    }

    const ctx = gsap.context(() => {
      const init = async () => {
        const ScrollTrigger = await registerScrollTrigger();
        if (!ScrollTrigger) return;
        // const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        // gsap.registerPlugin(ScrollTrigger);

        const jsCopy = document.querySelectorAll(".js-copy");

        jsCopy.forEach((copy, index) => {
          const chars = copy.querySelectorAll("span");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: copy,
              start: "top 80%",
              end: "bottom top",
              toggleActions: "play none none none",
              // markers: true,
            },
          });

          const beforeDulation = 1;
          const charsDulation = 1.5;
          const baseDelay = 0.5;
          const delayOffset = index * 0.3;

          tl.to(copy, {
            "--before-opacity": 1,
            "--before-scale": 1,
            duration: beforeDulation,
            delay: baseDelay + delayOffset,
            ease: "power3.out",
          })
            .set(copy, {
              backgroundColor: "rgb(255 255 255 / 90%)",
              color: "var(--main-color)",
              "--before-transform-origin": "right",
              "--before-origin": "right",
            })
            .to(copy, {
              "--before-scale": 0,
              duration: beforeDulation,
              ease: "power3.out",
            })
            .fromTo(
              chars,
              { y: 100, opacity: 0 },
              {
                y: 0,
                stagger: 0.04,
                duration: 1,
                ease: "power4.out",
              },
              "<-=0.1",
            )
            .fromTo(
              chars,
              { opacity: 0 },
              {
                opacity: 1,
                stagger: 0.04,
                duration: charsDulation,
                ease: "power4.out",
              },
              "<0.2",
            )
            .to(
              copy,
              {
                borderRadius: "0.5rem",
                duration: beforeDulation,
                ease: "power3.out",
              },
              "<",
            )
            .to(
              copy,
              {
                boxShadow: "0 4px 30px 0 rgb(35 43 101 / 15%)",
                duration: 0.2,
                ease: "power3.out",
              },
              "<",
            );
        });
      };

      // load();
      init();
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className={`${styles.hero} js-hero`}>
        <div className={styles.heroBody}>
          <div className={styles.heroBodyInner}>
            <p
              className={`z-10 flex flex-col gap-fluid-[8,12,350,768] pt-fluid-[130,160,350,768] md:gap-fluid-[10,12,1024,1480] ${styles.heroCopy}`}
            >
              <span
                className={`${styles.copyText} js-copy relative font-bold leading-none pb-fluid-[14,18,350,768] pt-fluid-[10,18,350,768] px-fluid-[16,24,350,768] text-fluid-[28,48,350,768] md:pb-fluid-[20,24,768,1480] md:pt-fluid-[14,18,768,1480] md:px-fluid-[24,32,768,1480] md:text-fluid-[48,64,1024,1480]`}
              >
                良いモノを、
              </span>
              <span
                className={`${styles.copyText} js-copy relative font-bold leading-none pb-fluid-[14,18,350,768] pt-fluid-[10,18,350,768] px-fluid-[16,24,350,768] text-fluid-[28,48,350,768] md:pb-fluid-[20,24,768,1480] md:pt-fluid-[14,18,768,1480] md:px-fluid-[24,32,768,1480] md:text-fluid-[48,64,1024,1480]`}
              >
                必要な人へ。
              </span>
            </p>
            <div className={`${styles.mySwiperWrapper}`}>
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect={"fade"}
                breakpoints={1} // slidesPerViewを指定
                slidesPerView={"auto"} // ハイドレーションエラー対策
                centeredSlides={true} // スライドを中央に配置
                loop={true} // スライドをループさせる
                speed={1500} // スライドが切り替わる時の速度
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }} // スライド表示時間
                pagination={{
                  el: `.${styles.customPagination}`,
                  clickable: true,
                }} // ページネーション, クリックで対象のスライドに切り替わる
                className={styles.slideWrapper}
                observer={true} //リサイズ時の画像のガク付き対策
                observeParents={true} //リサイズ時の画像のガク付き対策
                observeSlideChildren={true} //リサイズ時の画像のガク付き対策
                watchSlidesProgress={true} //リサイズ時の画像のガク付き対策
              >
                {images.map((src, index) => (
                  <SwiperSlide key={index} className={styles.customSlide}>
                    <picture>
                      <source
                        srcSet={`${src}_sp.jpg 1x, ${src}_sp@2x.jpeg 2x"`}
                        media="(max-width: 768px)"
                      />
                      <source
                        srcSet={`${src}_tab.jpg 1x, ${src}_tab@2x.jpeg 2x"`}
                        media="(max-width: 1024px)"
                      />
                      <source
                        srcSet={`${src}_lg.jpg 1x, ${src}_lg@2x.jpeg 2x"`}
                        media="(max-width: 1400px)"
                      />
                      <Image
                        src={`${src}_pc.jpg`}
                        width={5000}
                        height={3334}
                        alt="Slider Image"
                        className={styles.slideImage}
                      />
                    </picture>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={styles.customPagination}></div>
          </div>
        </div>
        <Marquee />
      </div>
    </>
  );
}
