import styles from "@/styles/components/parts/heading.module.scss";
import Breadcrumbs from "@/components/parts/Breadcrumbs";

export default function Heading({
  titleEn = "",
  titleJp = "",
  breadcrumbs = [],
}) {
  return (
    <header className={`${styles.heading} mt-[-56] md:mt-[-64] lg:mt-[-72]`}>
      <div className={`${styles.headingInner} pt-[56] md:pt-[64] lg:pt-[72]`}>
        <div
          className={`l-container flex flex-col gap-2 py-[56] md:py-[88] lg:py-[160]`}
        >
          <h2>
            <span
              lang="en"
              className="font-bold leading-none text-fluid-[36,48,350,768] md:text-fluid-[48,80]"
            >
              {titleEn}
            </span>
            <span className="sr-only" aria-hidden="true">
              {titleJp}
            </span>
          </h2>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>
    </header>
  );
}
