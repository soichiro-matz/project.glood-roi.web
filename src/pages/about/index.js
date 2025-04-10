import styles from "@/styles/pages/about/index.module.scss";
import { SITE } from "@/config/config";
import Layout from "@/components/layout/Layout";
import Heading from "@/components/sections/Heading";
import Mvv from "@/components/sections/about/Mvv";
import Message from "@/components/sections/about/Message";

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

  return (
    <Layout title={title} description={description}>
      <Heading titleEn={title_en} titleJp={title} breadcrumbs={breadcrumbs} />
      <Mvv />
      <Message />
    </Layout>
  );
}
