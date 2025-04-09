import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { nanoid } from "nanoid";
import useRola from "@hooks/useRola";
import styles from "@/styles/components/sections/home/services.module.scss";

export default function Service({ service, index }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useRola("[data-rola-trigger01]", {
    once: true,
    rootMargin: "0px 0px -30%",
  });

  useLayoutEffect(() => {
    const load = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (index !== 0) {
        const sectionAnim = gsap.fromTo(
          sectionRef.current,
          {
            y: 0,
          },
          {
            y: -300,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "top 30%",
              scrub: true,
              // markers: true,
            },
          },
        );
      }

      const slows = sectionRef.current.querySelectorAll(".js-move-Slow");

      gsap.to(slows, {
        y: 300,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          // markers: true,
          id: `scroll-${index}`,
        },
      });

      const moreSlows =
        sectionRef.current.querySelectorAll(".js-move-moreSlow");

      gsap.to(moreSlows, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          // markers: true,
          id: `scroll-${index}-moreSlow`, // 👈 IDを固有に！
        },
      });

      const serviceTitle = sectionRef.current.querySelector(".js-serviceTitle");
      const text = sectionRef.current.querySelector("span");
      const image = sectionRef.current.querySelector(".js-ServiseImage");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: serviceTitle,
          start: "top 80%",
          end: "bottom top",
          // markers: true,
        },
      });

      tl.to(serviceTitle, {
        "--before-width": "100%",
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          text,
          {
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "<0.1",
        )
        .from(
          image,
          {
            y: 50,
            opacity: 0,
            // stagger: 0.05,
            duration: 1.5,
            ease: "power3.out",
          },
          "<",
        );

      return () => {
        sectionAnim.scrollTrigger?.kill();
        scrollTriggerInstance?.kill();
      };
    };

    load();
  }, []);

  const bg = styles[`bg-${index % 2 === 0 ? "gray" : "white"}`];
  const bgReverce = styles[`bg-${index % 2 !== 0 ? "gray" : "white"}`];

  function getIcon(
    index = 0,
    count = 0,
    width = 0,
    height = 0,
    addClass = "",
    imageClass = "",
    // currentRef = undefined,
  ) {
    const imagePath = "/assets/img/home/icon-service-0";
    const num = index + 1;
    const indexClass = styles[`_0${num}__0${count}`];

    return (
      <div
        // {...(currentRef ? { ref: currentRef } : {})}
        className={`${styles.imageWrapper} ${indexClass} ${addClass} absolute`}
      >
        <Image
          src={imagePath + num + "-0" + count + ".svg"}
          width={width}
          height={height}
          alt=""
          className={`${styles.iconImage} ${imageClass}`}
        />
      </div>
    );
  }

  return (
    <li ref={sectionRef} className={`${bgReverce} ${styles.service} relative`}>
      <section>
        <div
          className={`${styles.serviceContainer} l-container l-grid__12 pt-fluid-[56,104,350,1024] lg:gap-x-8 lg:pt-fluid-[270,320,1024,1480]`}
        >
          <h3 className={`${styles.heading}`}>
            <span
              ref={titleRef}
              className={`${styles.title} lg:pb2 js-serviceTitle relative inline-block pb-1.5 pt-1 font-medium text-white px-fluid-[10,16] text-fluid-[18,24,350,1024] lg:pt-1 lg:text-fluid-[24,24]`}
            >
              <span className="inline-block">{service.name}</span>
            </span>
          </h3>
          <div
            className={`${styles.description} relative pb-fluid-[64,80,350.1024] pt-fluid-[24,40,350.1024] text-fluid-[15,17] lg:pb-fluid-[80,120,1024.1480] lg:pt-fluid-[10,16,1024.1480]`}
            data-rola-trigger01
            data-rola-transition="slide"
          >
            {service.description.map((text) => (
              <p key={nanoid()} className="leading-loose">
                {text}
              </p>
            ))}
            {index === 0 &&
              getIcon(
                index,
                4,
                114,
                111,
                "left-[10%] bottom-[2%] w-fluid-[80,114,350,1024] h-fluid-[78,111,350,1024]  lg:hidden js-move-moreSlow",
              )}
            {index === 1 &&
              getIcon(
                index,
                2,
                103,
                132,
                "left-[6%] lg:left-[2.5%] bottom-0 w-fluid-[60,80,350,1024] h-fluid-[77,104,350,1024] lg:hidden js-move-moreSlow",
              )}
            {index === 2 &&
              getIcon(
                index,
                2,
                124,
                176,
                "left-1/2 bottom-[-7%]  md:bottom-[-15%] w-fluid-[88,124,350,1024] h-fluid-[125,176,350,1024] lg:hidden js-move-moreSlow",
              )}
          </div>
          <p
            lang="en"
            className={`${styles.enTitle} pb-fluid-[0,16,350,1024] lg:pb-0`}
          >
            <span className="hidden font-medium text-fluid-[40,64] lg:block">
              service-0{index + 1}
            </span>
            <span
              className={`font-black italic text-fluid-[56,80,350,1024] lg:hidden`}
            >
              0{index + 1}
            </span>
          </p>
          <div
            className={`${styles.imageContainer} js-ServiseImage relative pb-fluid-[32,48,350.1024] lg:pb-fluid-[80,120,1024.1480]`}
          >
            <Image
              src={service.image}
              width={1203}
              height={1607}
              alt="Slider Image"
              sizes="(max-width: 768px) 350px, (max-width: 1024px) 500px, 1000px"
              className={styles.image}
            />
            {index === 0 &&
              getIcon(
                index,
                2,
                156,
                132,
                "left-0 bottom-[55%] w-fluid-[100,156,350,1024] h-fluid-[84,132,350,1024]  lg:hidden js-move-moreSlow",
              )}
            {index === 0 &&
              getIcon(
                index,
                3,
                59,
                53,
                "right-0 bottom-[70%] w-fluid-[44,78,350,1024] h-fluid-[49,60,350,1024] lg:hidden js-move-moreSlow",
              )}
            {index === 2 &&
              getIcon(
                index,
                2,
                143,
                203,
                "-left-[2%] lg:-left-[15%] bottom-[7%] w-fluid-[124,143,1024,1480] h-fluid-[176,203,1024,1480] hidden lg:block js-move-moreSlow",
              )}
          </div>
          <div
            className={`${bg} ${styles.backGround} relative lg:rounded-l-3xl`}
          >
            {index === 0 &&
              getIcon(
                index,
                4,
                114,
                111,
                "left-[10%] bottom-[2%] w-fluid-[114,114,1024,1280] h-fluid-[111,111,1024,1280] hidden lg:block  js-move-moreSlow",
              )}
            {index === 1 &&
              getIcon(
                index,
                2,
                103,
                132,
                "left-[3%] bottom-[10%] w-fluid-[60,90,1024,1280] h-fluid-[77,115,1024,1280] hidden lg:block js-move-Slow",
              )}
          </div>
          <div
            // className={`${bgReverce} ${styles.bgBottom} h-fluid-[325,370,350.1024] lg:h-fluid-[320,370,1024.1480]`}
            className={`${bgReverce} ${styles.bgBottom} h-[880px]`}
          ></div>
        </div>
        {index === 0 &&
          getIcon(
            index,
            1,
            172,
            216,
            "left-[53%] top-0 w-fluid-[132,142,1280,1480] h-fluid-[165,177,1280,1480] hidden lg:block js-move-moreSlow",
          )}

        {index === 1 &&
          getIcon(
            index,
            1,
            124,
            122,
            "right-[17%] 2xl:right-[20%] 3xl:right-[23%] top-0 w-fluid-[80,124,350,1024] h-fluid-[104,122,350,1024] ",
          )}
        {index === 2 &&
          getIcon(
            index,
            1,
            165,
            80,
            "right-[17%] 2xl:right-[20%] 3xl:right-[23%] top-[-2%] lg:top-[-4%] w-fluid-[105,165,350,1024] h-fluid-[51,80,350,1024]  js-move-moreSlow",
          )}
      </section>
    </li>
  );
}
