import { useEffect } from "react";
import styles from "@/styles/components/parts/heading.module.scss";
import Breadcrumbs from "@/components/parts/Breadcrumbs";
import { gsap, registerScrollTrigger } from "@libs/gsap";
import Lettering from "@/js/libs/Lettering";

export default function Heading({
  titleEn = "",
  titleJp = "",
  breadcrumbs = [],
  space = 0,
}) {
  useEffect(() => {
    const lettering = new Lettering(".js-headingTtitle");
    lettering.letters();

    const ctx = gsap.context(() => {
      const init = async () => {
        const ScrollTrigger = await registerScrollTrigger();
        if (!ScrollTrigger) return;

        const title = document.querySelector(".js-headingTtitle");

        if (title) {
          const chars = title.querySelectorAll("span");

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

          gsap.fromTo(
            chars,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,

              stagger: 0.04,
              // delay: index * 0.04,
              duration: 1.2,
              ease: "expo",
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
    <header
      className={`${styles.heading} mt-[-3.5rem] md:mt-[-4rem] lg:mt-[-4.5rem]`}
    >
      <div
        className={`${styles.headingInner} pt-[3.5rem] md:pt-[4rem] lg:pt-[4.5rem]`}
      >
        <div
          className={`l-container flex flex-col gap-2 py-[3.5rem] md:py-[5.5rem] lg:py-[10rem]`}
        >
          <h2>
            <span
              lang="en"
              className={`${styles.title} js-headingTtitle font-bold leading-none text-fluid-[36,48,350,768] md:text-fluid-[48,80]`}
            >
              {titleEn}
            </span>
            <span className="sr-only">{titleJp}</span>
          </h2>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>
    </header>
  );
}
