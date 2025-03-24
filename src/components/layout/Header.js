import { useState, useEffect } from "react";
import Link from "next/link";
import navLinks from "@/data/navLinks";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsLg(window.innerWidth >= 1024);  // 1024px以上なら lg と判定
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = (key) => {
    if (isLg) setActiveMenu(key);
  };

  const handleMouseLeave = () => {
    if (isLg) setActiveMenu(null);
  };

  const handleFocus = (key) => {
    if (isLg) setActiveMenu(key);
  };

  const handleBlur = (e) => {
    if (isLg) {
      const relatedTarget = e.relatedTarget;
      if (!relatedTarget || !relatedTarget.closest(".nav-childMenu__wrapper")) {
        setActiveMenu(null);
      }
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
          className={`nav-menus bg-yellow-100 lg:h-full ${isOpen ? "open" : ""}`}
          role="navigation"
          aria-label="メインナビゲーション"
        >
          <ul className="flex flex-col space-y-6 text-center lg:flex-row lg:gap-x-8 lg:space-y-0  lg:h-full">
            {Object.entries(navLinks).map(([key, link]) => {
              const pcHiddenMenus = ["home", "privacyPolicy"];
              const isPcHidden = pcHiddenMenus.includes(key);
              const hasChildren = link.children && link.children.length > 0;

              return (
                <li
                  key={link.href}
                  className={`nav-menu relative flex items-center ${isPcHidden ? "lg:hidden" : ""}`}
                  tabIndex={isLg && hasChildren ? 0 : -1}
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={handleMouseLeave}
                  onFocus={() => handleFocus(key)}
                  onBlur={handleBlur}
                >
                  <Link
                    href={link.href}
                    className={`nav-link items-center lg:flex ${hasChildren ? "has-children" : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.text}
                  </Link>

                  {hasChildren && (
                    <div
                      className={`nav-childMenu__wrapper transition-opacity duration-400 ${activeMenu === key ? "opacity-1 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                    >
                      <ul className="nav-childMenu flex flex-col gap-y-2">
                        {link.children.map((child, index) => (
                          <li key={index} tabIndex={activeMenu === key ? 0 : -1}>
                            <Link
                              href={child.href}
                              className="nav-childMenu__link hover:text-yellow-400 focus:text-yellow-400 text-left block"
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
