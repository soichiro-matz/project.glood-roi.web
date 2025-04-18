import { useLayoutEffect } from "react";
import Image from "next/image";
// import gsap from "gsap";
import { gsap, registerScrollTrigger } from "@libs/gsap";
import styles from "@/styles/pages/home/news.module.scss";
import SectionTitle from "@/components/parts/SectionTitle";
import Button from "@/components/ui/Button";
import useRola from "@hooks/useRola";
import NewsList from "@/components/section/common/NewsList";

export default function News({ posts }) {
  useRola("[data-rola-trigger01]", {
    once: true,
    rootMargin: "0px 0px -30%",
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const init = async () => {
        const ScrollTrigger = await registerScrollTrigger();
        if (!ScrollTrigger) return;
        // const load = async () => {
        //   const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        //   gsap.registerPlugin(ScrollTrigger);

        gsap.to(".js-newsSection", {
          clipPath: "inset(0% round 0rem)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".js-newsSection",
            start: "top bottom",
            end: "top 10%",
            scrub: true,
            // markers: true,
          },
        });

        gsap.to(".js-paper-airplane", {
          y: -100,
          x: 50,
          ease: "none",
          scrollTrigger: {
            trigger: ".js-newsSection",
            start: "top bottom",
            end: "bottom top",
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
    <section
      className={`${styles.news} js-newsSection pb-fluid-[120,216] pt-fluid-[80,136]`}
    >
      <div
        className={`l-container flex flex-col gap-y-fluid-[56,80,350,768] md:flex-row`}
      >
        <div className={`${styles.heading} relative pr-fluid-[104,192]`}>
          <SectionTitle
            tag="h2"
            titleEn="news"
            titleJp="お知らせ"
            align="left"
          />
          <div
            className={`${styles.imageWrapper} absolute left-[40%] top-[70%] h-fluid-[60,80,350,768] w-fluid-[120,160,350,768] md:left-0 md:top-[40%] md:h-fluid-[80,118] md:w-fluid-[160,235] lg:top-[50%]`}
          >
            <Image
              src="/assets/img/home/icon-news-01.svg"
              fill
              alt=""
              className={`${styles.iconImage} js-paper-airplane`}
            />
          </div>
        </div>
        <div className={`${styles.newsBody}`}>
          <NewsList posts={posts} />
          <div
            className={`${styles.buttonContainer} text-center pt-fluid-[56,72] md:text-right`}
          >
            <Button
              tag="a"
              linkProps={{ href: "/news" }}
              className="c-button p-button -primary"
            >
              お知らせ一覧へ
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
