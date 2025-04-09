import { useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import styles from "@/styles/components/sections/home/news.module.scss";
import SectionTitle from "@/components/parts/SectionTitle";
import Button from "@/components/ui/Button";
import useRola from "@hooks/useRola";

export default function News({ posts }) {
  useRola("[data-rola-trigger01]", {
    once: true,
    rootMargin: "0px 0px -30%",
  });

  useLayoutEffect(() => {
    const load = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

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
    };

    load();
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
            className={`${styles.imageWrapper} absolute left-[55%] top-[-25%] w-fluid-[120,160,350,768] md:left-[10%] md:top-[35%] md:w-fluid-[160,235] lg:top-[40%]`}
          >
            <Image
              src="/assets/img/home/icon-news-01.svg"
              width={235}
              height={130}
              alt=""
              className={`${styles.iconImage} `}
            />
          </div>
        </div>
        <div className={`${styles.newsBody}`}>
          <ul>
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                <li key={post.id} className={`${styles.newsItem} relative`}>
                  <Link
                    href={`/news/detail/${post.id}`}
                    className={`${styles.link}`}
                    data-rola-trigger01
                    data-rola-transition="slide"
                  >
                    <article
                      className={`${styles.articleWrapper} relative flex items-center pb-fluid-[32,40] pt-fluid-[28,36] px-fluid-[10,16]`}
                    >
                      <div
                        className={`${styles.article} flex flex-col gap-fluid-[16,18]`}
                      >
                        <h3
                          className={`font-medium leading-none text-fluid-[14,16]`}
                        >
                          {post.title.rendered}
                        </h3>
                        <div
                          className={`order-first flex items-center leading-none gap-fluid-[16,24]`}
                        >
                          <time
                            className={`font-bold`}
                            lang="en"
                            dateTime={post.date}
                          >
                            {new Date(post.date).toLocaleDateString()}
                          </time>
                          <span
                            className={`rounded-full bg-white px-fluid-[8,12] py-fluid-[4,6] text-fluid-[12,14]`}
                          >
                            お知らせ
                          </span>
                        </div>
                      </div>
                      <span
                        className={`${styles.icon} inline-block flex items-center justify-center rounded-[50%] font-medium wh-fluid-[32,40]`}
                      >
                        →
                      </span>
                    </article>
                  </Link>
                </li>
              ))
            ) : (
              <li>お知らせはありません</li>
            )}
          </ul>
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
