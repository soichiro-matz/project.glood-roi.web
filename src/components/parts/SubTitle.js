import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
import { gsap, registerScrollTrigger } from "@libs/gsap";
import Lettering from "@/js/libs/Lettering";
import styles from "@scss/components/parts/subTitle.module.scss";
export default function SubTitle({
  children,
  title = "",
  lang = "ja",
  addClass = [],
  start = "90%",
  ariaHidden = false,
  space = 0
}) {
  const subTitleRef = useRef(null);

  useLayoutEffect(() => {
    const lettering = new Lettering(".js-subTitle");
    lettering.letters();

    const ctx = gsap.context(() => {
      const init = async () => {
        const ScrollTrigger = await registerScrollTrigger();
        if (!ScrollTrigger) return;
        // const load = async () => {
        //   const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        //   gsap.registerPlugin(ScrollTrigger);

        const subTitle = subTitleRef.current;

        if (subTitle) {
          const chars = subTitle.querySelectorAll("span");

          //文字間にスペースを設ける（inline-blockでスペースが詰まるため）
          if (space != 0) {
            if(chars.length>0){
              chars.forEach((char,index) => {
                if (space === index + 1) {
                  console.log(space);
                  char.style.letterSpacing = "0.25em";
                }

              })
            }
          }

          // gsap.set(chars, { clearProps: "transform" });
          // 2. GSAPで各文字をビューポート下から順にスライドイン
          gsap.fromTo(
            chars,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.04,
              // delay: index * 0.04,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: subTitle,
                start: `top ${start}`,
                end: "bottom top",
                // markers: true,
              },
            },
          );
        }
      };

      // load();
      init();
    });
    return () => ctx.revert();
  }, []);
  return (
    <span
      ref={subTitleRef}
      lang={lang === "en" ? "en" : ""}
      className={`${styles.subTitle} ${addClass.join(" ")} js-subTitle`}
      {...(ariaHidden ? { "aria-hidden": true } : {})}
    >
      {children}
    </span>
  );
}
