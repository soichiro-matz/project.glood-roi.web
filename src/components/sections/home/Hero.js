import Image from "next/image";
import { useEffect } from "react";
import styles from "@/styles/components/sections/home/hero.module.scss";
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
    const swiper = document.querySelector(".swiper");

    if (swiper) {
      swiper.style.height = "100%";
    }
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
                className={`${styles.copyText} rounded-lg bg-white font-bold leading-none pb-fluid-[14,18,350,768] pt-fluid-[10,18,350,768] px-fluid-[16,24,350,768] text-fluid-[28,48,350,768] md:pb-fluid-[20,24,768,1480] md:pt-fluid-[12,16,768,1480] md:px-fluid-[24,32,768,1480] md:text-fluid-[48,64,1024,1480]`}
              >
                良いモノを<span>、</span>
              </span>
              <span
                className={`${styles.copyText} rounded-lg bg-white font-bold leading-none pb-fluid-[14,18,350,768] pt-fluid-[10,18,350,768] px-fluid-[16,24,350,768] text-fluid-[28,48,350,768] md:pb-fluid-[20,24,768,1480] md:pt-fluid-[12,16,768,1480] md:px-fluid-[24,32,768,1480] md:text-fluid-[48,64,1024,1480]`}
              >
                必要な人へ<span>。</span>
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
