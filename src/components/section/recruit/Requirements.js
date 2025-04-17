import Link from "next/link";
import { useLayoutEffect } from "react";
import useRola from "@hooks/useRola";
// import gsap from "gsap";
import { gsap, registerScrollTrigger } from "@libs/gsap";
import { nanoid } from "nanoid";
import styles from "@/styles/pages/recruit/index.module.scss";
import { SITE } from "@/config/config";
import Button from "@/components/ui/Button";
const requirements = [
  {
    occupation: "正社員（総合職）",
    office: [
      {
        name: "本社",
        address: "埼玉県さいたま市大宮区天沼町2-18 T.M大宮ビル1階・2階  ",
      },
      {
        name: "越谷支店",
        address: "埼玉県越谷市七左町5-106-2",
      },
    ],

    workingHours: [
      "<time datetime='09:00'>9:00</time>〜<time datetime='18:00'>18:00</time>",
      "（<time datetime='12:00'>12:00</time>〜<time datetime='13:00'>13:00</time>の1時間休憩）",
    ],
    salary: "月給：250,000円",
    vacation: {
      description: "週休2日制",
      type: ["夏季休暇", "年末年始休暇", "有給休暇", "慶弔休暇"],
    },
    allowance: ["通勤交通費", "時間外手当", "インセンティブ（職種による）"],

    trialPeriod: "あり（原則3ヶ月）",
    anchorlinkId: "full-time",
  },
  {
    occupation: "アルバイト",
    office: [
      {
        name: "本社",
        address: "埼玉県さいたま市大宮区天沼町2-18 T.M大宮ビル1階・2階  ",
      },
      {
        name: "越谷支店",
        address: "埼玉県越谷市七左町5-106-2",
      },
    ],
    workingHours: [
      "<time datetime='09:00'>9:00</time>〜<time datetime='18:00'>18:00</time>",
      "（シフト勤務）",
    ],
    salary: "時給：1,100円〜",
    vacation: {
      description: "週休2日制",
      type: ["夏季休暇", "年末年始休暇", "有給休暇", "慶弔休暇"],
    },
    allowance: ["通勤交通費", "時間外手当"],

    trialPeriod: "なし",
    anchorlinkId: "part-time",
  },
];

export default function Requirements() {
  useRola("[data-rola-trigger01]", {
    once: true,
    rootMargin: "0px 0px -40%",
  });
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const init = async () => {
        const ScrollTrigger = await registerScrollTrigger();
        if (!ScrollTrigger) return;
        // const load = async () => {
        //   const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        //   gsap.registerPlugin(ScrollTrigger);

        // gsap.utils.toArray(".js-requirement").forEach((el, i) => {
        //   if (!el) return;

        //   gsap.to(el, {
        //     y: 0,
        //     opacity: 1,
        //     duration: 1,
        //     ease: "power3.out",
        //     scrollTrigger: {
        //       trigger: el,
        //       start: "top 80%",
        //       // markers: true,
        //     },
        //   });
        // });
      };

      // load();
      init();
    });
    return () => ctx.revert();
  }, []);

  return (
    <ul
      className={`${styles.requirements} flex flex-col gap-[3.5rem] py-fluid-[56,80,350,768] md:gap-[6rem] md:py-fluid-[80,120] lg:gap-[7.5rem]`}
    >
      {requirements.map((info) => {
        return (
          <li
            className="l-container l-grid__12 text-fluid-[15,16]"
            key={nanoid()}
            data-rola-trigger01
            data-rola-transition="slide"
          >
            <section
              className={`${styles.card} js-requirement c-dl rounded-xl bg-white px-fluid-[16,64,350,768] py-fluid-[56,64,350,768] md:px-fluid-[64,112] md:py-fluid-[64,112]`}
              id={info.anchorlinkId}
              data-offset-sp="-40"
              data-offset-lg="-100"
            >
              <h3
                className={`${styles.heading} text-center font-bold pb-fluid-[16,24,350,768] text-fluid-[22,28,350,768] md:pb-fluid-[32,56] md:text-fluid-[28,36]`}
              >
                <span className={`${styles.title} relative leading-none`}>
                  {info.occupation}
                </span>
              </h3>

              <dl
                className={`${styles.information} c-dl md:text-fluid-[15,16]`}
              >
                <div className={`c-dl__items`}>
                  <dt className={`c-dl__dt ${styles.dlDt}`}>募集職種</dt>
                  <dd className={`c-dl__dd ${styles.dlDd}`}>
                    {info.occupation}
                  </dd>
                </div>
                <div className={`c-dl__items`}>
                  <dt className={`c-dl__dt ${styles.dlDt}`}>勤務地</dt>
                  <dd className={`c-dl__dd ${styles.dlDd}`}>
                    <dl
                      className={`${styles.office} ml-[-0.25em] flex flex-col gap-1 md:gap-2`}
                    >
                      {info.office.map((office) => {
                        return (
                          <div className="flex flex-col gap-1" key={nanoid()}>
                            <dt>{office.name}</dt>
                            <dd className="pl-[1em]">
                              <address className="flex flex-col gap-[0.2em] pb-3">
                                <p>{office.address}</p>
                              </address>
                            </dd>
                          </div>
                        );
                      })}
                    </dl>
                  </dd>
                </div>
                <div className={`c-dl__items`}>
                  <dt className={`c-dl__dt ${styles.dlDt}`}>勤務時間</dt>
                  <dd className={`c-dl__dd ${styles.dlDd}`}>
                    {info.workingHours.map((time) => {
                      return (
                        <p
                          dangerouslySetInnerHTML={{ __html: time }}
                          key={nanoid()}
                        />
                      );
                    })}
                  </dd>
                </div>
                <div className={`c-dl__items`}>
                  <dt className={`c-dl__dt ${styles.dlDt}`}>賃金</dt>
                  <dd className={`c-dl__dd ${styles.dlDd}`}>{info.salary}</dd>
                </div>
                <div className={`c-dl__items`}>
                  <dt className={`c-dl__dt ${styles.dlDt}`}>休日</dt>
                  <dd className={`c-dl__dd ${styles.dlDd}`}>
                    <p className="pb-2">{info.vacation.description}</p>
                    <p>休暇：</p>
                    <ul className="pl-[1em]">
                      {info.vacation.type.map((item) => {
                        return <li key={nanoid()}>{item}</li>;
                      })}
                    </ul>
                  </dd>
                </div>
                <div className={`c-dl__items`}>
                  <dt className={`c-dl__dt ${styles.dlDt}`}>諸手当</dt>
                  <dd
                    className={`c-dl__dd ${styles.dlDd} flex flex-wrap gap-x-[1em]`}
                  >
                    <ul className="flex flex-wrap">
                      {info.allowance.map((item, index) => {
                        const text = `${item}${index != info.allowance.length - 1 ? "、" : ""}`;
                        return <li key={nanoid()}>{text}</li>;
                      })}
                    </ul>
                    <span>など</span>
                  </dd>
                </div>
                <div className={`c-dl__items`}>
                  <dt className={`c-dl__dt ${styles.dlDt}`}>試用期間</dt>
                  <dd className={`c-dl__dd ${styles.dlDd}`}>
                    {info.trialPeriod}
                  </dd>
                </div>
              </dl>
              <div
                className={`text-center pb-fluid-[48,64,350,768] pt-fluid-[56,72,350,768] md:pb-fluid-[56,64] md:pt-fluid-[72,88]`}
              >
                <Button
                  tag="a"
                  linkProps={{ href: "/entry" }}
                  className="c-button p-button -primary"
                >
                  エントリーする
                </Button>
              </div>
              <div className="flex flex-col items-center gap-2.5 md:gap-3">
                <p className="inline-block leading-normal text-fluid-[14,15,350,768] md:text-fluid-[15,16]">
                  または下記電話番号より直接ご連絡ください
                </p>
                <p className="pt-1">
                  <Link
                    href={`tel:${SITE.tel}`}
                    className="block flex items-center gap-1.5"
                  >
                    <span
                      className={`${styles.iconTel} inline-block wh-fluid-[24,28,350,768] md:wh-fluid-[28,28]`}
                    ></span>
                    <span className="inline-block font-bold leading-none text-fluid-[24,28,350,768] md:text-fluid-[28,32]">
                      {SITE.tel}
                    </span>
                  </Link>
                </p>
                <p className="leading-none text-fluid-[14,15,350,768] md:text-fluid-[15,16]">
                  (営業時間 <time dateTime="09:00">9:00</time>〜
                  <time dateTime="18:00">18:00</time>)
                </p>
              </div>
            </section>
          </li>
        );
      })}
    </ul>
  );
}
