import { useEffect } from "react";
import gsap from "gsap";
import styles from "@/styles/pages/about/message.module.scss";
import SectionTitle from "@/components/parts/SectionTitle";
import Marquee from "@components/parts/marquee";
export default function Message() {
  useEffect(() => {
    const load = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".js-bg",
          start: "top 80%",
          // end: "bottom top",
          // scrub: true,
          // markers: true,
        },
      });

      tl.to(".js-bg", {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }).to(
        ".js-greeting",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "<0.8",
      );
    };

    load();
  }, []);
  return (
    <div className={`${styles.messageContainer}`}>
      <section className={`${styles.message} js-bg`} id="message">
        <div className="l-container l-grid__12">
          <div className={`${styles.messageInner}`}>
            <div className="text-center">
              <SectionTitle
                tag="h2"
                titleEn="message"
                titleJp="代表挨拶"
                // start="110%"
              />
            </div>
            <div
              className={`${styles.greeting} js-greeting pb-fluid-[48,64,350,768] pt-fluid-[64,88,350,768] md:pb-fluid-[64,120] md:pt-fluid-[88,112]`}
            >
              <div
                className={`${styles.detail} flex flex-col font-medium leading-loose gap-fluid-[24,32] text-fluid-[15,16]`}
              >
                <p className={`${styles.text}`}>
                  私たちの社名 「Glood roi」 には、「Good +
                  Flood（良いモノが溢れる）」、そして 「Good +
                  Glue（良いモノをつなぐ）」 という想いを込めています。
                  <br aria-hidden="true" />
                  日本には、まだ多くの人に知られていない素晴らしい商品や価値が数多く存在します。
                  <br aria-hidden="true" />
                  それらを全国から発掘し、必要としている人々へと届けることで、日常に新たな彩りと豊かさをもたらしたいと考えています。
                  <br aria-hidden="true" />
                  また、「roi」 は 「Return on Investment（投資利益率）」
                  に由来し、単なる経済指標ではなく、「未来への投資」
                  という意味を持たせています。
                  <br aria-hidden="true" />
                  私たちは事業の成長だけでなく、信頼・価値・社会貢献という形で、投資以上のリターンを生み出し続ける企業でありたいと考えています。
                </p>
                <p className={`${styles.text}`}>
                  近年、私たちの生活は急速に変化し、オンラインショッピングの役割はこれまで以上に重要なものとなりました。
                  <br aria-hidden="true" />
                  その中で私たちが大切にしているのは、ただの「買い物の場」ではなく、お客様の生活を豊かに彩る「価値ある体験」を提供すること。
                  <br aria-hidden="true" />
                  信頼できる商品と真心を込めたサービスで、すべてのくらしに小さな幸せをお届けできる企業でありたい。
                  <br aria-hidden="true" />
                  それが、株式会社Glood roiの願いであり、私たちの原動力です。
                </p>
                <p className={`${styles.text}`}>
                  私たちは「EC業界を牽引するリーダー」となるべく、挑戦を続けます。
                  <br aria-hidden="true" />
                  国内外のさまざまなマーケットで、日本ならではの高品質な商品を通じ、新たな価値を創造し続けてまいります。
                </p>
                <p className={`${styles.text}`}>
                  これらの挑戦は、お客様、取引先、そして社会を含むすべてのステークホルダーの皆様のご支援と信頼によって成り立っています。
                  <br aria-hidden="true" />
                  今後も、全てのステークホルダーの皆様とともに成長を共有し、新たな価値を生み出し続ける企業でありたいと願っています。
                  <br aria-hidden="true" />
                  変わらぬご支援とご期待を賜りますよう、心よりお願い申し上げます。
                </p>
              </div>
              <div
                className={`text-right pt-fluid-[16,32,350,768] md:pt-fluid-[32,40]`}
              >
                <p className="font-medium text-fluid-[15,16]">代表取締役</p>
                <p className={`${styles.sign} text-fluid-[20,24]`}>
                  増田&nbsp;恭介
                </p>
              </div>
            </div>
          </div>
        </div>
        <Marquee color="gray" />
      </section>
    </div>
  );
}
