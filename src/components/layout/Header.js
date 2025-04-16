import { useState, useEffect } from "react";
import Link from "next/link";
import navLinks from "@/data/navLinks";
import Button from "@/components/ui/Button";
import Image from "next/image";
import gsap from "gsap";
import Lettering from "@/js/libs/Lettering";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const [activeMenus, setActiveMenus] = useState([]); // 複数のトグルを保存する配列
  const [focusedMenu, setFocusedMenu] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      setIsLg(isLargeScreen);

      const childElements = document.querySelectorAll(".js-childMenu__wrapper");
      if (childElements.length > 0) {
        const opacity = isLargeScreen ? 0 : 1;

        childElements.forEach((child) => {
          child.style.transition = "none"; // トランジション効果を一時的に無効化
          child.style.opacity = opacity;
          // トランジションを再度有効化 (一瞬後に設定)
          if (isLargeScreen) {
            setFocusedMenu(null);
            child.style.opacity = "";
          }
          requestAnimationFrame(() => {
            child.style.transition = "";
          });
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const lettering = new Lettering(".js-title-en,.js-title");
    lettering.letters();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const childElements = document.querySelectorAll(".js-childMenu__wrapper");

    if (childElements.length > 0) {
      childElements.forEach((child) => {
        if (focusedMenu === child.key && isLg) {
          child.style.opacity = 1;
        }
      });
    }
  }, [focusedMenu]);

  // ドロワーメニューの状態が変わった時に `body` のスクロールを制御する
  useEffect(() => {
    if (isOpen) {
      // 1. `.title_en` を1文字ずつ分解
      const titleEnElements = document.querySelectorAll(
        ".js-title-en,.js-title",
      );

      titleEnElements.forEach((title, index) => {
        const chars = title.querySelectorAll("span");

        gsap.set(chars, { clearProps: "transform" });
        // 2. GSAPで各文字をビューポート下から順にスライドイン
        gsap.fromTo(
          chars,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            delay: index * 0.04,
            duration: 0.3,
            ease: "power4.out",
          },
        );

        // 3. `child` が存在する場合、そのフェードインを少し遅れて実行
        const parent = title.closest(".js-nav-menu");
        const toggleButton = parent.querySelector(".js-toggle-button");
        const child = parent.querySelector(".js-childMenu__wrapper");

        if (toggleButton) {
          gsap.fromTo(
            toggleButton,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1,
              delay: index * 0.04 + 0.6,
              ease: "power4.out",
            },
          );
        }

        if (child) {
          gsap.fromTo(
            child,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1,
              delay: index * 0.04 + 0.3,
              ease: "power4.out",
            },
          );
        }
      });

      const contactButton = document.querySelector(".js-contact-button");

      if (contactButton) {
        const delay = (titleEnElements.length + 2) * 0.04;
        gsap.fromTo(
          contactButton,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            delay: delay,
            duration: 1,
            ease: "power4.out",
          },
        );
      }

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.classList.add("no-scroll");

      // スクロールバー幅の分だけpadding-rightを追加する
      if (scrollbarWidth > 0) {
        document.body.style.setProperty(
          "--scrollbar-width",
          `${scrollbarWidth}px`,
        );
        document.body.classList.add("no-scroll-fix");
      }
    } else {
      document.body.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll-fix");

      const child = document.querySelectorAll(".js-childMenu__wrapper");

      // ドロワーメニュー展開時にちらついてしまうのでopacityをリセット;
      const isLargeScreen = window.innerWidth >= 1024;
      if (child.length > 0 && !isLargeScreen) {
        gsap.to(child, {
          opacity: 0,
          duration: 0.5,
          delay: 0,
          ease: "ease-in-out",
        });
      }
    }

    // クリーンアップ処理 (Next.js の SSR 対応)
    return () => {
      document.body.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll-fix");
    };
  }, [isOpen]);

  // メニューにフォーカスが当たった時の処理
  const handleFocus = (key) => {
    // フォーカスを設定
    setFocusedMenu(key);
  };

  // メニューからフォーカスが外れた時の処理
  const handleBlur = (e, key) => {
    if (isLg) {
      const relatedTarget = e.relatedTarget;

      if (!relatedTarget || !relatedTarget.closest(".js-childMenu__wrapper")) {
        // フォーカスが外れた時にリセット
        setFocusedMenu(null);
      }
    }
  };

  const toggleAccordion = (key) => {
    if (!isLg) {
      // `isLg` の場合はメニュー状態を更新しない
      setActiveMenus((prev) =>
        prev.includes(key)
          ? prev.filter((menu) => menu !== key)
          : [...prev, key],
      );
    }
  };

  const closeDrawerMenu = () => {
    const navMenus = document.querySelectorAll(
      ".js-nav-menu,.js-contact-button",
    );

    setIsOpen(false);

    if (navMenus) {
      gsap.to(navMenus, {
        y: 10,
        duration: 0.5,
      });
      gsap.to(navMenus, {
        y: 0,
        duration: 0,
        delay: 1.5,
      });
    }
  };

  return (
    <header className="fixed left-0 top-0 z-[100] w-full">
      <div className="l-header__wrapper">
        <div className="p-header mx-auto flex items-center justify-between">
          <h1 className="z-[100] text-xl font-bold">
            <Link href="/">
              <Image
                src="/assets/img/common/logo.png"
                alt="株式会社Glood roi"
                height={113}
                width={554}
                className="h-fluid-[24,28,365,767] w-fluid-[117,136,365,767] md:h-fluid-[28,32,768,1024] md:w-fluid-[136,161,768,1024]"
              />
            </Link>
          </h1>
          <nav
            id="main-navigation"
            className={`nav-menus js-nav-menus z-30 overflow-y-scroll pt-fluid-[64,72,350,1024] lg:h-full lg:overflow-y-visible lg:pt-0 ${isOpen ? "open" : ""}`}
            role="navigation"
            aria-label="メインナビゲーション"
          >
            <ul className="flex h-fit w-full flex-col space-y-6 rounded-2xl bg-white px-7 py-10 text-center lg:h-full lg:flex-row lg:space-y-0 lg:bg-transparent lg:p-0 lg:gap-x-fluid-[24,32,1024,1280]">
              {Object.entries(navLinks).map(([key, link]) => {
                const pcHiddenMenus = ["home"]; //PC版で非表示（複数指定可）
                const isPcHidden = pcHiddenMenus.includes(key);
                const hasChildren = link.children && link.children.length > 0;
                const isActive = activeMenus.includes(key);
                const isHiddenMenus = ["privacyPolicy"]; //ヘッダーメニューで非表示（複数指定可）
                const isHidden = isHiddenMenus.includes(key);
                const isContact = key === "contact";
                const isFocused = focusedMenu === key && isLg;
                return isHidden ? (
                  ""
                ) : (
                  <li
                    key={link.href}
                    className={`nav-menu js-nav-menu relative flex-col justify-center ${isPcHidden ? "lg:hidden" : ""} ${isContact ? "hidden lg:flex" : "flex"}`}
                    tabIndex={isLg && hasChildren ? 0 : -1}
                    onFocus={() => handleFocus(key)}
                    onBlur={(e) => handleBlur(e, key)}
                    data-key={`${key}`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <Link
                        href={link.href}
                        className={`nav-link block items-center text-left lg:flex ${hasChildren ? "has-children" : ""} ${key === "contact" ? "isContact" : ""}`}
                        onClick={() => {
                          setIsOpen(false);
                          setFocusedMenu(null);
                        }}
                        // scroll={false}
                      >
                        <p
                          className={`title-en js-title-en u-clip__full font-bold leading-none pb-fluid-[6,6,350,768] text-fluid-[24,26,350,768] lg:hidden`}
                        >
                          {link.text_en}
                        </p>
                        <p className="title js-title u-clip__full leading-none text-fluid-[10,12,350,768] lg:text-base lg:text-fluid-[15,16,1024,1280]">
                          {link.text}
                        </p>
                      </Link>
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => toggleAccordion(key)}
                          className="toggle-button js-toggle-button ml-2 h-[40px] w-[40px] self-start mr-fluid-[-13,-6,350,768] mt-fluid-[-13,-6,350,768] p-fluid-[13,6,350,768] focus:outline-none"
                          aria-expanded={isActive}
                          aria-label="Toggle submenu"
                        >
                          <span className="toggle-mark relative block h-full w-full" />
                        </button>
                      )}
                    </div>
                    {hasChildren && (
                      <div
                        className={`nav-childMenu__wrapper js-childMenu__wrapper ${activeMenus.includes(key) ? "open" : ""}`}
                        style={{ opacity: isFocused ? 1 : undefined }}
                        onClick={() => toggleAccordion(key)}
                      >
                        <ul className="nav-childMenu flex flex-col gap-y-4">
                          {link.children.map((child, index) => (
                            <li key={child.href} tabIndex={-1}>
                              <Link
                                href={child.href}
                                className="nav-childMenu__link block text-left"
                                onClick={() => {
                                  setIsOpen(false);
                                  setFocusedMenu(null);
                                }}
                                // scroll={false}
                              >
                                <span className="p-textLink">{child.text}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
              <li className="lg:hidden">
                <div key="contact" className="js-contact-button pt-5 lg:hidden">
                  <Button
                    tag="a"
                    linkProps={{ href: "/contact" }}
                    className="c-button p-button -primary"
                  >
                    お問い合わせ
                  </Button>
                </div>
              </li>
            </ul>
          </nav>
          <button
            className={`hamburger z-40 ${isOpen ? "open" : ""}`}
            onClick={() => {
              if (isOpen) {
                closeDrawerMenu(); // ドロワーメニューを閉じるアニメーション実行
              } else {
                setIsOpen(true); // ドロワーメニューを開く
              }
            }}
            aria-expanded={isOpen}
            aria-label="メニューを開く"
            aria-controls="main-navigation"
          >
            <span className="humbergerButton__line"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
