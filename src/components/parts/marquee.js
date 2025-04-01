import styles from "@scss/components/parts/marquee.module.scss";

export default function Marquee() {
  return (
    <div className={`${styles.marquee}`}>
      <div className={`${styles.loop_wrap} leading-none text-white`}>
        <p
          className={`font-bold text-fluid-[72,136,350,768] md:text-fluid-[136,144,768,1800] ${styles.marqueeText}`}
          lang="en"
        >
          enriching everyone's life with the finest products from japan
        </p>
        <p
          className={`font-bold text-fluid-[72,120,350,768] md:text-fluid-[120,144,768,1800] ${styles.marqueeText}`}
          lang="en"
        >
          enriching everyone's life with the finest products from japan
        </p>
      </div>
    </div>
  );
}
