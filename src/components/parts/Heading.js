import styles from "@/styles/components/parts/heading.module.scss";
import Breadcrumbs from "@/components/parts/Breadcrumbs";

export default function Heading({
  titleEn = "",
  titleJp = "",
  breadcrumbs = [],
}) {
  return (
    <header
      className={`${styles.heading} mt-[-3.5rem] md:mt-[-4rem] lg:mt-[-4.5rem]`}
    >
      <div
        className={`${styles.headingInner} pt-[3.5rem] md:pt-[4rem] lg:pt-[4.5rem]`}
      >
        <div
          className={`l-container flex flex-col gap-2 py-[3.5rem] md:py-[5.5rem] lg:py-[10rem]`}
        >
          <h2>
            <span
              lang="en"
              className="font-bold leading-none text-fluid-[36,48,350,768] md:text-fluid-[48,80]"
            >
              {titleEn}
            </span>
            <span className="sr-only">{titleJp}</span>
          </h2>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>
    </header>
  );
}
