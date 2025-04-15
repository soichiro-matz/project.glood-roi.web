import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/config/config";
import navLinks from "@/data/navLinks";
import { getYear } from "@utils/utils";

export default function Footer() {
  return (
    <footer className={`p-footer`}>
      <Link
        rel="stylesheet"
        href="/contact"
        className="p-contact relative block"
        title="お問い合わせフォームへ"
      >
        <div className="l-container flex flex-col items-center justify-between gap-y-fluid-[24,32,350,1024] pb-fluid-[30,46,350,768] pt-fluid-[40,56,350,768] lg:flex-row lg:py-fluid-[56,80]">
          <h2 className="z-10">
            <span
              lang="en"
              aria-hidden="true"
              className="font-bold leading-none text-fluid-[36,48]"
            >
              contact us
            </span>
            <span className="sr-only">お問い合わせ</span>
          </h2>
          <p className="z-10 text-center text-fluid-[14,16] lg:text-left">
            ご質問・ご相談は無料です
            <span className="hidden md:inline-block lg:hidden">。</span>
            <br aria-hidden="true" className="block md:hidden lg:block" />
            お気軽にお問い合わせください
            <span className="hidden md:inline-block lg:hidden">。</span>
          </p>

          <p className="z-10 flex items-center gap-fluid-[4,8]">
            <span className="p-icon-arrow inline-block flex items-center justify-center rounded-[50%] wh-fluid-[48,56]">
              <span className="font-extralight text-fluid-[24,32]">→</span>
            </span>
            <span className="leading-none text-fluid-[14,16]">
              お問い合わせはこちらから
            </span>
          </p>
        </div>
      </Link>
      <div className="l-container">
        <div className="p-footer__lower relative flex flex-col items-center gap-y-fluid-[32,40] py-fluid-[28,36,350,768] lg:flex-row lg:py-4">
          <Link href="/" className="p-logo">
            <Image
              src="/assets/img/common/logo-white.png"
              alt="株式会社Glood roi"
              height={40}
              width={202}
              className="h-fluid-[36,36,365,767] w-fluid-[182,182,365,767] md:h-fluid-[36,40] md:w-fluid-[182,202]"
            />
          </Link>
          <ul className="flex flex-wrap justify-center gap-fluid-[16,24,350,768] lg:gap-fluid-[2,40]">
            {Object.entries(navLinks).map(([key, link]) => {
              const hiddenMenus = ["home"];
              const isHidden = hiddenMenus.includes(key);
              return isHidden ? (
                ""
              ) : (
                <li key={link.href} className="text-fluid-[12,14]">
                  <Link href={link.href} className="p-footer__link">
                    <span className="p-textLink">{link.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <p
        className="text-center pb-fluid-[20,24,350,768] text-fluid-[16,16] lg:pb-4"
        lang="en"
      >
        <small className="capitalize">
          Copyright © <time dateTime={getYear()}>{getYear()} </time>
          <Link href="/contact">{SITE.nameEn}</Link>
        </small>
      </p>
    </footer>
  );
}
