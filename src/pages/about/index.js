import { SITE } from "@/config/config";
import Heading from "@/components/parts/Heading";
import Mvv from "@/components/section/about/Mvv";
import Message from "@/components/section/about/Message";
import Data from "@/components/section/about/Data";
import Outline from "@/components/section/about/Outline";
import History from "@/components/section/about/History";

const title = "私たちについて";
const title_en = "about us";
const description = SITE.description;

export default function About() {
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
    <>
      <Heading titleEn={title_en} titleJp={title} breadcrumbs={breadcrumbs} space={5} />
      <Mvv />
      <Message />
      <Data />
      <Outline />
      <History />
    </>
  );
}

About.meta = {
  title: title,
  description: description,
  ogImage: "",
};
