import { useState, useEffect } from "react";
import Link from "next/link";
import navLinks from "@/data/navLinks";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const [activeMenus, setActiveMenus] = useState([]); // 複数のトグルを保存する配列
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsLg(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ドロワーメニューの状態が変わった時に `body` のスクロールを制御する
  useEffect(() => {
    if (isOpen) {
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
    }

    // クリーンアップ処理 (Next.js の SSR 対応)
    return () => {
      document.body.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll-fix");
    };
  }, [isOpen]);

  const handleMouseEnter = (key) => {
    if (isLg) setActiveMenus((prev) => [...new Set([...prev, key])]);
  };

  const handleMouseLeave = (key) => {
    if (isLg) setActiveMenus((prev) => prev.filter((menu) => menu !== key));
  };

  const handleFocus = (key) => {
    if (isLg) setActiveMenus((prev) => [...new Set([...prev, key])]);
  };

  const handleBlur = (e, key) => {
    if (isLg) {
      const relatedTarget = e.relatedTarget;
      if (!relatedTarget || !relatedTarget.closest(".nav-childMenu__wrapper")) {
        setActiveMenus((prev) => prev.filter((menu) => menu !== key));
      }
    }
  };

  const toggleAccordion = (key) => {
    if (!isLg) {
      setActiveMenus((prev) =>
        prev.includes(key)
          ? prev.filter((menu) => menu !== key)
          : [...prev, key],
      );
    }
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white shadow-md">
      <div className="p-header mx-auto flex items-center justify-between">
        <h1 className="z-10 text-xl font-bold">
          <Link href="/">
            <Image
              src="/assets/img/common/logo.png"
              alt="株式会社Glood roi"
              height={113}
              width={554}
              className="h-fluid-[22,28,365,767] w-fluid-[107,136,365,767] md:h-fluid-[28,32,768,1024] md:w-fluid-[136,161,768,1024]"
            />
          </Link>
        </h1>

        <nav
          id="main-navigation"
          className={`nav-menus overflow-y-scroll pt-fluid-[56,72,350,1024] lg:h-full lg:overflow-y-hidden lg:pt-0 ${isOpen ? "open" : ""}`}
          role="navigation"
          aria-label="メインナビゲーション"
        >
          <ul className="flex h-fit w-full flex-col space-y-6 rounded-2xl bg-white px-7 py-10 text-center lg:h-full lg:flex-row lg:gap-x-8 lg:space-y-0 lg:p-0">
            {Object.entries(navLinks).map(([key, link]) => {
              const pcHiddenMenus = ["home"]; //PC版で非表示（複数指定可）
              const isPcHidden = pcHiddenMenus.includes(key);
              const hasChildren = link.children && link.children.length > 0;
              const isActive = activeMenus.includes(key);
              const isHiddenMenus = ["privacyPolicy"]; //ヘッダーメニューで非表示（複数指定可）
              const isHidden = isHiddenMenus.includes(key);
              const isContact = key === "contact";

              return isHidden ? (
                ""
              ) : (
                <li
                  key={link.href}
                  className={`nav-menu relative flex-col justify-center ${isPcHidden ? "lg:hidden" : ""} ${isContact ? "hidden lg:flex" : "flex"}`}
                  tabIndex={isLg && hasChildren ? 0 : -1}
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={handleMouseLeave}
                  onFocus={() => handleFocus(key)}
                  onBlur={handleBlur}
                  // onClick={() => handleItemClick(link.href)}  // ここでページ遷移を実行
                >
                  <div className="flex w-full items-center justify-between">
                    <Link
                      href={link.href}
                      className={`nav-link block items-center text-left lg:flex ${hasChildren ? "has-children" : ""} ${key === "contact" ? "isContact" : ""}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <p
                        className={`title-en font-bold pb-fluid-[6,6,350,768] text-fluid-[24,26,350,768] lg:hidden`}
                      >
                        {link.text_en}
                      </p>
                      <p className="text-fluid-[10,12,350,768] lg:text-base">
                        {link.text}
                      </p>
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        onClick={() => toggleAccordion(key)}
                        className="toggle-button ml-2 h-[40px] w-[40px] self-start mr-fluid-[-13,-6,350,768] mt-fluid-[-13,-6,350,768] p-fluid-[13,6,350,768] focus:outline-none"
                        aria-expanded={isActive}
                        aria-label="Toggle submenu"
                      >
                        <span className="toggle-mark relative block h-full w-full" />
                      </button>
                    )}
                  </div>

                  {hasChildren && (
                    <div
                      className={`nav-childMenu__wrapper ${isActive ? "open" : ""}`}
                      onClick={() => toggleAccordion(key)}
                    >
                      <ul className="nav-childMenu flex flex-col gap-y-3">
                        {link.children.map((child, index) => (
                          <li key={child.href} tabIndex={isActive ? 0 : -1}>
                            <Link
                              href={child.href}
                              className="nav-childMenu__link block text-left"
                              onClick={() => setIsOpen(false)}
                            >
                              {child.text}
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
              <div key="contact" className="pt-5 lg:hidden">
                <Button
                  tag="a"
                  linkProps={{ href: "/conact" }}
                  className="c-button p-button -primary"
                >
                  お問い合わせ
                </Button>
              </div>
            </li>
          </ul>
        </nav>

        <button
          className={`hamburger z-10 h-fluid-[48,56,365,767] w-fluid-[48,56,365,767] md:h-fluid-[56,72,768,1024] md:w-fluid-[56,72,768,1024] ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="メニューを開く"
          aria-controls="main-navigation"
        >
          <span className="humbergerButton__line"></span>
        </button>
      </div>
    </header>
  );
}
