import styles from "@scss/components/parts/marquee.module.scss";

export default function Marquee() {
  return (
    <div className={`${styles.marquee}`}>
      <div className={`${styles.loop_wrap} leading-none text-white`}>
        <p
          className={`font-bold text-fluid-[56,144,350,768] md:text-fluid-[112,144,768,1800] ${styles.marqueeText}`}
          lang="en"
        >
          enriching everyone's life with the finest products from japan&nbsp;
        </p>
        <p
          className={`font-bold text-fluid-[56,144,350,768] md:text-fluid-[88,144,768,1800] ${styles.marqueeText}`}
          lang="en"
        >
          enriching everyone's life with the finest products from japan&nbsp;
        </p>
      </div>
    </div>
  );
}
