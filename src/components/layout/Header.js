import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", text: "ホーム" },
    { href: "/about", text: "会社概要" },
    { href: "/services", text: "サービス" },
    { href: "/contact", text: "お問い合わせ" },
  ];

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white shadow-md">
      <div className="p-header mx-auto flex items-center justify-between">
        {/* ロゴ */}
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

        {/* ナビゲーション（PC では横並び、SP ではドロワー） */}
        <nav
          id="main-navigation"
          className={`nav-menu bg-yellow-100 ${isOpen ? "open" : ""}`}
          role="navigation"
          aria-label="メインナビゲーション"
        >
          <ul className="flex flex-col space-y-6 text-center text-2xl lg:flex-row lg:space-x-6 lg:space-y-0 lg:text-base lg:text-black">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-yellow-400 focus:text-yellow-400"
                  onClick={() => setIsOpen(false)}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ハンバーガーボタン（md 未満で表示） */}
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
