import { SITE, API_URL } from "@/config/config";
import Layout from "@/components/layout/Layout";
import Heading from "@/components/parts/Heading";
import styles from "@/styles/pages/news/index.module.scss";

export default function PrivacyPolicyIndex() {
  const title = "お知らせ一覧";
  const title_en = "news";
  const description = "News";

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
}
