import styles from "@/styles/pages/about/index.module.scss";
import { SITE } from "@/config/config";
import Layout from "@/components/layout/Layout";
import Heading from "@/components/sections/Heading";

export default function About() {
  const title = "私たちについて";
  const title_en = "about us";
  const description = "About Us";

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

  console.log(breadcrumbs);

  return (
    <Layout title={title} description={description}>
      <Heading titleEn={title_en} titleJp={title} breadcrumbs={breadcrumbs} />
      <div className={styles.about}>
        <section>
          <h2>About Our Company</h2>
          <p>We are a company that values...</p>
        </section>
      </div>
    </Layout>
  );
}
