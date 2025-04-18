import { useEffect, useRef } from "react";
import Image from "next/image";
// import gsap from "gsap";
import { gsap, registerScrollTrigger } from "@libs/gsap";
import { nanoid } from "nanoid";
import useRola from "@hooks/useRola";
import styles from "@/styles/pages/home/services.module.scss";
import { initLenis, destroyLenis, bindAnchorEvents } from "@libs/lenis";

export default function Service({ service, index }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useRola("[data-rola-trigger01]", {
    once: true,
    rootMargin: "0px 0px -30%",
  });

  useEffect(() => {
    let timer;
    const updateBackground = async () => {
      if (!sectionRef.current) return;

      const backGround = sectionRef.current.querySelector(".js-backGround");
      const serviseImage = sectionRef.current.querySelector(".js-serviseImage");

      if (backGround && serviseImage) {
        backGround.style.height = "";
        backGround.style.transform = "";
        backGround.style.marginLeft = "";
        const height = backGround.clientHeight;

        const width = window.innerWidth;
        let offset = "";

        if (width < 1024) {
          offset = "clamp(2rem, 1.481rem + 2.37vw, 3rem)";
          backGround.style.transform = `translateY(${offset})`;
          serviseImage.style.transform = `translateY(0)`;
        } else {
          offset = "96px";
          serviseImage.style.transform = `translateY(-3rem)`;
        }
        backGround.style.height = `calc(${height}px + ${offset})`;
        // console.log(`calc(${height}px + ${offset})`);
      }
    };
    timer = setTimeout(async () => {
      updateBackground();
      await destroyLenis();
      const lenis = await initLenis();
      bindAnchorEvents(lenis);
    }, 500);

    window.addEventListener("resize", updateBackground);
    // window.addEventListener("load", updateBackground);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateBackground);
      // window.removeEventListener("load", updateBackground);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const init = async () => {
        const ScrollTrigger = await registerScrollTrigger();
        if (!ScrollTrigger) return;
        // const load = async () => {
        //   const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        //   gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current) return;

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

        const slows =
          sectionRef.current?.querySelectorAll(".js-move-Slow") ?? [];

        if (slows.length > 0) {
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
        }

        const moreSlows =
          sectionRef.current.querySelectorAll(".js-move-moreSlow") ?? [];

        if (moreSlows.length > 0) {
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
        }

        const serviceTitle = sectionRef.current.querySelector(
          ".js-serviceTitleWrapper",
        );
        const text = sectionRef.current.querySelector(".js-serviceTitle");
        const image = sectionRef.current.querySelector(".js-serviseImage");
        const description = sectionRef.current.querySelector(".js-description");

        const windowWidth = window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            // markers: true,
          },
        });

        tl.to(serviceTitle, {
          "--before-width": "100%",
          duration: 0.8,
          ease: "power3.out",
        })
          .to(
            text,
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
            },
            "<0.1",
          )
          .fromTo(
            image,
            {
              y: windowWidth >= 1024 ? "0" : "3rem",
              opacity: 0,
            },
            {
              y: windowWidth >= 1024 ? "-3rem" : "0",
              opacity: 1,
              // stagger: 0.05,
              duration: 1.5,
              ease: "power3.out",
            },
            "<",
          );

        gsap.to(description, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: description,
            start: `top ${index == 0 ? "80%" : "bottom"}`,
            // markers: true,
          },
        });

        // return () => {
        //   sectionAnim.scrollTrigger?.kill();
        //   scrollTriggerInstance?.kill();
        // };
      };

      // load();
      init();
    });
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
          fill
          alt=""
          className={`${styles.iconImage} ${imageClass}`}
        />
      </div>
    );
  }

  return (
    <li ref={sectionRef} className={`${bgReverce} ${styles.service} relative`}>
      <section className="overflow-x-hidden">
        <div
          className={`${styles.serviceContainer} l-container l-grid__12 pt-fluid-[56,104,350,1024] lg:gap-x-10 lg:pt-fluid-[270,320,1024,1480]`}
        >
          <h3 className={`${styles.heading}`}>
            <span
              ref={titleRef}
              className={`${styles.title} lg:pb2 js-serviceTitleWrapper relative inline-block pb-1.5 pt-1 font-medium text-white px-fluid-[10,16] text-fluid-[18,24,350,1024] lg:pt-1 lg:text-fluid-[24,24]`}
            >
              <span className="js-serviceTitle inline-block">
                {service.name}
              </span>
            </span>
          </h3>
          {/* <div
            className={`${styles.description} js-description relative pb-fluid-[64,80,350.1024] pt-fluid-[24,40,350.1024] text-fluid-[15,17] lg:pb-fluid-[80,120,1024.1480] lg:pt-fluid-[10,16,1024.1480]`}
          > */}
          <div
            className={`${styles.description} js-description relative pb-fluid-[64,80,350.1024] pt-fluid-[56,88,350.1024] text-fluid-[15,17] lg:pb-0 lg:pt-fluid-[10,16,1024.1480]`}
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
            className={`${styles.enTitle} relative pb-fluid-[0,16,350,1024] top-fluid-[25,50%] lg:pb-0`}
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
          <div className={`${styles.imageContainer} js-serviseImage relative`}>
            {/* <div
            className={`${styles.imageContainer} js-serviseImage relative pb-fluid-[32,48,350.1024] lg:pb-[80px]`}
          > */}
            <Image
              src={service.image}
              width={1203}
              height={1607}
              alt="Slider Image"
              sizes="(max-width: 768px) 350px, (max-width: 1024px) 500px, 1000px"
              className={`${styles.image} `}
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
                "lg:-left-[18%] bottom-[7%] w-fluid-[124,143,1024,1480] h-fluid-[176,203,1024,1480] hidden lg:block js-move-moreSlow",
              )}
          </div>
          <div
            className={`${bg} ${styles.backGround} js-backGround relative lg:rounded-l-3xl`}
          >
            {index === 0 &&
              getIcon(
                index,
                4,
                114,
                111,
                "left-[10%] bottom-[2%] w-fluid-[114,124,1024,1280] h-fluid-[111,121,1024,1280] hidden lg:block  js-move-moreSlow",
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
          <div className={`${bgReverce} ${styles.bgBottom} h-[880px]`}></div>
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
