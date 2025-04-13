import { SITE } from "@/config/config";
import Layout from "@/components/layout/Layout";
import Heading from "@/components/parts/Heading";
import IndexMenu from "@/components/parts/IndexMenu";
import Requirements from "@/pages/recruit/Requirements";
import styles from "@/styles/pages/recruit/index.module.scss";
import { getChildren } from "@/data/navLinks";

const recruitChildren = getChildren("recruit");

export default function Recruit() {
  const title = "採用情報";
  const title_en = "recruit";
  const description = "recruit";

  const breadcrumbs = [
    {
      title: "ホーム",
      url: SITE.base,
    },
    {
      title: title,
      url: "",
    },
  ];

  return (
    <Layout title={title} description={description}>
      <Heading titleEn={title_en} titleJp={title} breadcrumbs={breadcrumbs} />
      <IndexMenu menu={recruitChildren} />

      <div
        className={`${styles.lead} pb-fluid-[32,32,350,768] md:pb-fluid-[32,40]`}
      >
        <p className="l-container lg-pr-0 pr-4 leading-loose text-fluid-[15,16]">
          株式会社Glood
          roiは、「日本中の良いモノで、すべての人のくらしを豊かに」というミッションを掲げ、
          <br aria-hidden="true" className="hidden lg:block" />
          国内外でEC事業、卸売事業を展開しています。今後のさらなる事業拡大を見据え、組織体制を強化しております。
        </p>
      </div>
      <section>
        <div
          className={`${styles.titleWrapper} py-fluid-[40,72,350,768] md:py-fluid-[72,136]`}
        >
          <h2
            className={`l-container pl-5 font-bold tracking-widest text-white text-fluid-[22,32,350,768] md:pl-10 md:text-fluid-[32,40]`}
          >
            募集要項
          </h2>
        </div>
        <Requirements />
      </section>
    </Layout>
  );
}
