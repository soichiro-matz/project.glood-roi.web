import { useEffect } from "react";
// import gsap from "gsap";
import { gsap, registerScrollTrigger } from "@libs/gsap";
import Link from "next/link";

import styles from "@/styles/pages/about/outline.module.scss";
import SectionTitle from "@/components/parts/SectionTitle";
import { SITE, COMPANY } from "@/config/config";

export default function Outline() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const init = async () => {
        const ScrollTrigger = await registerScrollTrigger();
        if (!ScrollTrigger) return;
        // const load = async () => {
        //   const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        //   gsap.registerPlugin(ScrollTrigger);

        gsap.to(".js-outline__bg", {
          opacity: 1,
          scrollTrigger: {
            trigger: ".js-outline__bg",
            start: "top 80%",
            end: "top 20%",
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
    <div className={`${styles.outlineContainer} `}>
      <section
        className={`${styles.outline} js-outline__bg z-10 pb-fluid-[24,56,350,768] pt-fluid-[80,136] md:pb-fluid-[64,72]`}
        id="outline"
      >
        <div className="text-center">
          <SectionTitle
            tag="h2"
            titleEn="outline"
            titleJp="会社概要"
            start="75%"
          />
        </div>
        <div
          className={`l-container flex justify-center pt-fluid-[40,88,350,768] md:pt-fluid-[88,128]`}
        >
          <div className="w-[95%] md:w-[85%] lg:w-[65%]">
            <dl className={`${styles.outlineItems} c-dl`}>
              <div className={`c-dl__items`}>
                <dt className={`c-dl__dt ${styles.dlDt}`}>会社名</dt>
                <dd className={`c-dl__dd ${styles.dlDd}`}>{COMPANY.name}</dd>
              </div>
              <div className={`c-dl__items`}>
                <dt className={`c-dl__dt ${styles.dlDt}`}>本社所在地</dt>
                <dd className={`c-dl__dd ${styles.dlDd}`}>
                  <address className="pb-3">
                    <p>〒330-0834</p>
                    <p>埼玉県さいたま市大宮区天沼町2-18 T. M大宮ビル1階・2階</p>
                  </address>
                  <div className={`${styles.googleMap}`}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3231.7647436685315!2d139.63350801289403!3d35.90377707240162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018c114c773927d%3A0x6e1b68a5e6bc96d6!2z5qCq5byP5Lya56S-IEdsb29kIHJvaQ!5e0!3m2!1sja!2sjp!4v1744438693134!5m2!1sja!2sjp"
                      width="600"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </dd>
              </div>
              <div className={`c-dl__items`}>
                <dt className={`c-dl__dt ${styles.dlDt}`}>
                  <span lang="en">tel</span>
                </dt>
                <dd className={`c-dl__dd ${styles.dlDd}`}>
                  <Link href={`tel:${SITE.tel}`}>{SITE.tel}</Link>
                </dd>
              </div>
              <div className={`c-dl__items`}>
                <dt className={`c-dl__dt ${styles.dlDt}`}>
                  <span lang="en">fax</span>
                </dt>
                <dd className={`c-dl__dd ${styles.dlDd}`}>050-3588-7746</dd>
              </div>
              <div className={`c-dl__items`}>
                <dt className={`c-dl__dt ${styles.dlDt}`}>代表者</dt>
                <dd className={`c-dl__dd ${styles.dlDd}`}>{COMPANY.founder}</dd>
              </div>
              <div className={`c-dl__items`}>
                <dt className={`c-dl__dt ${styles.dlDt}`}>役員</dt>
                <dd className={`c-dl__dd ${styles.dlDd}`}>
                  <dl className="flex flex-col gap-[2] md:gap-1 lg:gap-2">
                    <div className="flex gap-[1em]">
                      <dt>取締役 副社長</dt>
                      <dd>片山 渉</dd>
                    </div>
                    <div className="flex gap-[1em]">
                      <dt>取締役 副社長</dt>
                      <dd>中西 純</dd>
                    </div>
                  </dl>
                </dd>
              </div>
              <div className={`c-dl__items`}>
                <dt className={`c-dl__dt ${styles.dlDt}`}>営業所</dt>
                <dd className={`c-dl__dd ${styles.dlDd}`}>
                  <dl
                    className={`${styles.office} ml-[-0.25em] flex flex-col gap-1 md:gap-2`}
                  >
                    <div className="flex flex-col gap-1">
                      <dt>越谷営業所</dt>
                      <dd className="pl-[1em]">
                        <address className="flex flex-col gap-[0.2em] pb-3">
                          <p>〒343-0851</p>
                          <p>埼玉県越谷市七左町5-106-2</p>
                          <p>
                            TEL:
                            <Link href={`tel:048-940-9009`}>048-940-9009</Link>
                          </p>
                          <p>FAX:050-3588-7746</p>
                        </address>
                      </dd>
                    </div>
                    <div className="gap- flex flex-col">
                      <dt>大阪営業所</dt>
                      <dd className="pl-[1em]">
                        <address className="pb-3">
                          <p>〒552-0007</p>
                          <p>大阪府大阪市港区弁天1-2-1</p>
                        </address>
                      </dd>
                    </div>
                  </dl>
                </dd>
              </div>
              <div className={`c-dl__items`}>
                <dt className={`c-dl__dt ${styles.dlDt}`}>設立</dt>
                <dd className={`c-dl__dd ${styles.dlDd}`}>
                  <time dateTime="2020-10-15">{COMPANY.foundingDate}</time>
                </dd>
              </div>
              <div className={`c-dl__items`}>
                <dt className={`c-dl__dt ${styles.dlDt}`}>資本金</dt>
                <dd className={`c-dl__dd ${styles.dlDd}`}>30,000千円</dd>
              </div>
              <div className={`c-dl__items`}>
                <dt className={`c-dl__dt ${styles.dlDt}`}>売上高</dt>
                <dd className={`c-dl__dd ${styles.dlDd}`}>
                  14億9000万円
                  <time
                    dateTime="2020-10-15"
                    className={`${styles.parentheses}`}
                  >
                    2024年9月
                  </time>
                </dd>
              </div>
              <div className={`c-dl__items`}>
                <dt className={`c-dl__dt ${styles.dlDt}`}>従業員</dt>
                <dd className={`c-dl__dd ${styles.dlDd}`}>
                  38名
                  <time
                    dateTime="2020-10-15"
                    className={`${styles.parentheses}`}
                  >
                    2024年9月
                  </time>
                </dd>
              </div>
              <div className={`c-dl__items`}>
                <dt className={`c-dl__dt ${styles.dlDt}`}>事業内容</dt>
                <dd className={`c-dl__dd ${styles.dlDd}`}>
                  <ul className="flex flex-col gap-[2px] md:gap-1 lg:gap-2">
                    <li>国内EC物販事業</li>
                    <li>越境EC物販事業</li>
                    <li>卸売事業</li>
                  </ul>
                </dd>
              </div>
              <div className={`c-dl__items`}>
                <dt className={`c-dl__dt ${styles.dlDt}`}>取引銀行</dt>
                <dd className={`c-dl__dd ${styles.dlDd}`}>
                  <ul className="flex flex-col gap-[2px] md:gap-1 lg:gap-2">
                    <li>武蔵野銀行 大宮支店</li>
                    <li>埼玉りそな銀行 大宮支店</li>
                    <li>群馬銀行 大宮支店</li>
                    <li>埼玉縣信用金庫 大宮支店</li>
                    <li>日本政策金融公庫 大宮支店</li>
                    <li>商工中金 大宮支店</li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
