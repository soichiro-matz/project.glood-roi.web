import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { gsap, registerScrollTrigger } from "@libs/gsap";
import Link from "next/link";
import styles from "@/styles/components/parts/indexmenu.module.scss";
export default function IndexMenu({ menu }) {
  const router = useRouter();
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const indexMenuRef = useRef(null);

  useEffect(() => {
    let timer;

    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        toggleMenu(); // ← 実際の処理
      }, 300); // ← 必要なら時間調整（ms）
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const indexMenu = indexMenuRef.current;

    if (indexMenu) {
      // トランジション効果を一時的に無効化
      indexMenu.style.transition = "none";
      // ページ初期表示時は目次を非表示
      setIsIndexOpen(false);
      requestAnimationFrame(() => {
        indexMenu.style.transition = "";
        toggleMenu();
      });
    }
  }, [router.asPath]);

  useEffect(() => {
    toggleMenu();
  }, [isIndexOpen]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const init = async () => {
        const ScrollTrigger = await registerScrollTrigger();
        if (!ScrollTrigger) return;

        const indexMenu = document.querySelector(".js-indexMenu");

        if (indexMenu) {
          gsap.to(indexMenu, {
            opacity: 1,
            duration: 0.9,
            delay: 0.3,
            ease: "power3.out",
          });
        }
      };
      init();
    });

    toggleMenu();
    return () => ctx.revert();
  }, [menu]);

  function toggleMenu() {
    if (!indexMenuRef.current) return;
    const indexMenuRight =
      indexMenuRef.current.querySelector(".js-indexMenuRight");

    if (indexMenuRight) {
      const length = indexMenuRight.offsetWidth;

      if (isIndexOpen) {
        indexMenuRef.current.style.transform = `translateX(0)`;
      } else {
        indexMenuRef.current.style.transform = `translateX(${length}px)`;
      }
    }
  }

  const closeIndexMenu = () => {
    setIsIndexOpen(false);
  };

  return (
    <aside
      className={`${styles.indexMenu} js-indexMenu fixed right-0 top-[6rem] z-10 flex md:top-[10rem]`}
      ref={indexMenuRef}
    >
      <h2 className="sr-only">目次</h2>
      <button
        className={`${isIndexOpen ? styles["open"] : ""} ${styles.indexMenuLeft} flex flex-col items-center justify-center gap-5 rounded-l-xl px-1.5 py-5 md:rounded-l-2xl md:px-3 md:py-5`}
        aria-expanded={isIndexOpen}
        aria-label={`目次を${isIndexOpen ? "閉じる" : "開く"}`}
        aria-controls="index-menu"
        onClick={() => {
          if (isIndexOpen) {
            closeIndexMenu(); // 目次を閉じるアニメーション実行
          } else {
            setIsIndexOpen(true); // 目次を開く
          }
        }}
      >
        <span
          className={`${styles.title} inline-block text-center font-medium leading-[1.2] md:leading-[1.3] lg:leading-[1.3]`}
          lang="en"
          aria-hidden="true"
        >
          <span className="">i</span>ndex
        </span>
        <span className={`${styles.indexToggleButton} wh-fluid-[24,32]`}></span>
      </button>
      <nav
        id="index-menu"
        className={`${styles.indexMenuRight} js-indexMenuRight bg-white px-6 py-5 md:px-6 md:py-4 lg:px-8`}
      >
        <ul className="flex flex-col">
          {menu.map((item) => {
            return (
              <li key={item.href} className="font-medium">
                <Link
                  href={item.anchor ? `#${item.anchor}` : item.href}
                  className={`${styles.textLink} block flex items-center justify-between gap-4 py-1.5 text-lg md:gap-7 lg:py-2`}
                  onClick={() => setIsIndexOpen(false)}
                >
                  <span className="text-sm leading-none md:text-fluid-[15,16]">
                    {item.text}
                  </span>
                  <span className={`${styles.icon}`}>→</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
