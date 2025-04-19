import { useLayoutEffect } from "react";
// import gsap from "gsap";
import { gsap, registerScrollTrigger } from "@libs/gsap";
import SectionTitle from "@/components/parts/SectionTitle";
import styles from "@/styles/pages/home/recruit.module.scss";
import { zeroPad } from "@utils/utils";
import Button from "@/components/ui/Button";

const images = ["", "", "", ""];

export default function Recruit() {
  useLayoutEffect(() => {
    // const load = async () => {
    //   const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    //   gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const init = async () => {
        const ScrollTrigger = await registerScrollTrigger();
        if (!ScrollTrigger) return;

        requestAnimationFrame(() => {
          setTimeout(() => {
            const elems = document.querySelectorAll(".js-employee");

            if (!elems.length) return;

            gsap.to(".js-employee", {
              opacity: 1,
              x: 0,
              ease: "power3.out",
              stagger: 0.2,
              duration: 1.5,
              scrollTrigger: {
                trigger: ".js-employee",
                start: "top 85%",
                // scrub: true,
                // markers: true,
              },
            });
          }, 5000);
        });
      };

      // load();
      init();
    });
    return () => ctx.revert();
  }, []);
  return (
    <section className={`${styles.recruit} relative`}>
      <div className="-translate-y-1/2 transform text-center">
        <SectionTitle tag="h2" titleEn="recruit" titleJp="採用情報" />
      </div>
      <p
        className={`${styles.messge} flex items-center justify-center leading-none py-fluid-[40,56,350,768] text-fluid-[20,36] md:py-fluid-[56,88]`}
      >
        わたしたちと一緒に働きませんか？
      </p>
      <div
        className={`l-container md:items-["normal"] flex flex-col items-center gap-x-fluid-[24,88] gap-y-fluid-[24,32,350,768] md:flex-row md:justify-center`}
      >
        <div className={`flex flex-col gap-fluid-[16,36] pb-fluid-[16,24]`}>
          <Button
            tag="a"
            linkProps={{ href: "/recruit#full-time" }}
            className="c-button p-button -secondary"
          >
            正社員(総合職)募集
          </Button>
          <Button
            tag="a"
            linkProps={{ href: "/recruit#part-time" }}
            className="c-button p-button -secondary"
          >
            アルバイト募集
          </Button>
        </div>
        <div
          className={`z-10 flex items-end pb-1 gap-x-fluid-[0,16] md:pb-2 lg:pb-2.5`}
        >
          {images.map((img, index) => {
            return (
              <img
                src={
                  "/assets/img/home/img-recruit-" +
                  zeroPad(index + 1, 2) +
                  ".svg"
                }
                alt=""
                className={`${styles.iconImage} js-employee w-fluid-[56,88,350,768] md:w-fluid-[96,120]`}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
