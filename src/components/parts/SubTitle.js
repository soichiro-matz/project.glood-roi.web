import styles from "@scss/components/parts/subTitle.module.scss";
export default function SubTitle({
  children,
  title = "",
  lang = "ja",
  addClass = [],
}) {
  return (
    <span lang={lang} className={`${styles.subTitle} ${addClass.join(" ")}`}>
      {children}
    </span>
  );
}
