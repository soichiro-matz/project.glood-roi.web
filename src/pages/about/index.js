import styles from "@/styles/pages/about/index.module.scss";
import { SITE } from "@/config/config";
import Layout from "@/components/layout/Layout";
import Heading from "@/components/sections/Heading";
import Mvv from "@/components/sections/about/Mvv";
import Message from "@/components/sections/about/Message";
import Data from "@/components/sections/about/Data";
import Outline from "@/components/sections/about/Outline";
import History from "@/components/sections/about/History";
import IndexMenu from "@/components/sections/IndexMenu";
import { getChildren } from "@/data/navLinks";

const aboutChildren = getChildren("about");

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
      <IndexMenu menu={aboutChildren} />
      <Mvv />
      <Message />
      <Data />
      <Outline />
      <History />
    </Layout>
  );
}
