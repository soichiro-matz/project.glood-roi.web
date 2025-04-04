import useRola from "@hooks/useRola";
import Image from "next/image";

import styles from "@/styles/components/sections/home/aboutUs.module.scss";
import SubTitle from "@components/parts/SubTitle";
import Button from "@/components/ui/Button";
const image01 = "/assets/img/home/img-aoutUs.svg";

export default function AboutUs() {
  return (
    <section
      className={`${styles.aboutUs} pb-fluid-[120,272,768,1280] pt-fluid-[80,120,350,768] md:pt-fluid-[64,184,768,1280]`}
    >
      <div className={`l-container`}>
        <div
          className={`${styles.card} l-grid__12 relative rounded-3xl pb-fluid-[64,120,350,768] pt-fluid-[104,120,350,768] px-fluid-[28,64,350,768] md:gap-x-8 md:px-fluid-[40,104] md:py-fluid-[96,144,768,1280]`}
        >
          <h2
            className={`${styles.subTitle} pb-fluid-[32,40,350,768] md:pb-fluid-[40,72]`}
          >
            <SubTitle
              lang="en"
              addClass={["text-fluid-[32,48,350,768]", "md:text-fluid-[48,64]"]}
            >
              about us
            </SubTitle>
          </h2>
          <div className={`${styles.cardBody} flex flex-col`}>
            <p
              className={`${styles.lead} font-bold pb-fluid-[24,32] text-fluid-[22,24] md:text-fluid-[24,26]`}
            >
              「買い物」ではなく<span className="u-promise">、</span>
              「価値ある体験」を<span className="u-promise">。</span>
            </p>
            <p className="leading-loose pb-fluid-[40,48,350,768] text-fluid-[15,17] md:pb-fluid-[48,56]">
              私たち Glood roi
              は、ただ商品を届けるのではなく、手に取る人のくらしや仕事を豊かに彩る“価値”を届けることを大切にしています。
              <br aria-hidden="true" />
              使うたびに広がる心地よさや、新しい可能性を感じる瞬間を生み出す。そんな“小さな幸せ”が、日々のくらしやビジネスを少しずつ豊かにしていくと信じています。
              <br aria-hidden="true" />
              Glood roi
              は、価値ある商品と真心を込めたサービスで、あらゆる人の未来を支えます。
            </p>
            <div className={styles.buttonContainer}>
              <Button
                tag="a"
                linkProps={{ href: "/conact" }}
                className="c-button p-button -primary"
              >
                詳しく見る
              </Button>
            </div>
          </div>
          <div
            className={`${styles.videoWrapper} pr-fluid-[8,40] pt-fluid-[40,56,768,350] md:pt-0`}
          >
            <Image
              src="/assets/img/home/video.jpg"
              width={449}
              height={382}
              alt=""
            />
          </div>
          <div
            className={`${styles.imageContainer} top-fluid-[-32,-120,768,1280]`}
          >
            <Image
              src={image01}
              width={163}
              height={212}
              alt=""
              className={`${styles.image01} h-fluid-[120,212] w-fluid-[92,163]`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
