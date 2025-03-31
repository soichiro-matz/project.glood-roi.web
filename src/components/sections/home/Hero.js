import Image from "next/image";
import { useEffect } from "react";
import styles from "@/styles/components/sections/hero.module.scss";

// オプションをインポートする
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import useRola from "@hooks/useRola";

// publicフォルダの画像
const images = [
  "/assets/img/home/img-hero-01.jpeg",
  "/assets/img/home/img-hero-02.jpeg",
  "/assets/img/home/img-hero-03.jpeg",
];

export default function Hero() {
  useEffect(() => {
    const swiper = document.querySelector(".swiper");

    if (swiper) {
      swiper.style.height = "100%";
    }
  }, []);

  // コールバック関数の定義
  const callback = (element, isInView, options, progress) => {
    if (isInView) {
      console.log(
        `ヒーロースクラブ中: ${element.tagName}, ヒーロー: ${progress}`,
      );
    } else {
      console.log(`ヒーロースクラブ終了: ${element.tagName}`);
    }
  };

  useRola(
    "[data-rola-trigger3]",
    { once: true, scrub: true, rootMargin: "0px 0px 0px" },
    callback,
  );

  return (
    <div className={styles.hero}>
      <div className={styles.mySwiperWrapper}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect={"fade"}
          fadeEffect={{ crossFade: true }}
          breakpoints={1} // slidesPerViewを指定
          slidesPerView={"auto"} // ハイドレーションエラー対策
          centeredSlides={true} // スライドを中央に配置
          loop={true} // スライドをループさせる
          speed={1500} // スライドが切り替わる時の速度
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }} // スライド表示時間
          navigation // ナビゲーション（左右の矢印）
          pagination={{
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
              <Image
                src={src}
                width={5000}
                height={3334}
                alt="Slider Image"
                sizes="(max-width: 768px) 110vw, (max-width: 1024px) 110vw, 1600px"
                className={styles.slideImage}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <p className="" lang="en">
        enriching everyone's life with the finest products from japan
      </p>
      {/* <div className={styles.section}>
        <span
          data-rola-trigger1
          data-rola-effect="text-clip"
          // data-rola-target="#target"
          data-rola-scrub-start="bottom"
          data-rola-scrub-end="top center"
        >
          Rola
        </span>
      </div> */}
      {/* <div className={styles.section}>
        <span data-rola-trigger2 data-rola-effect="text-clip">
          First
        </span>
      </div>
      <div className={styles.section}>
        <span data-rola-trigger2 data-rola-effect="text-clip">
          Second
        </span>
      </div> */}
    </div>
  );
}
