import Link from "next/link";
import { nanoid } from "nanoid";
import styles from "@/styles/components/sections/breadcrumbs.module.scss";
export default function Breadcrumbs({ breadcrumbs = [] }) {
  return breadcrumbs.length == 0 ? (
    ""
  ) : (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-6">
        {breadcrumbs.map((item, index) => {
          // 最初の行
          if (index === 0) {
            return (
              <li className={`${styles.breadcrumbItem}`} key={nanoid()}>
                <a href={item.url}>
                  <img
                    src="/assets/img/common/icon-home.svg"
                    alt="ホーム"
                    width={20}
                  />
                </a>
              </li>
            );
          }
          // 最終行
          else if (index === breadcrumbs.length - 1) {
            return (
              <li className={`${styles.breadcrumbItem}`} key={nanoid()}>
                <span>{item.title}</span>
              </li>
            );
          }
          // それ以外
          else {
            return (
              <li className={`${styles.breadcrumbItem}`} key={nanoid()}>
                <Link rel="stylesheet" href="">
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          }
        })}
      </ol>
    </nav>
  );
}
