import { useEffect, useState } from "react";
import { SITE, API_URL } from "@/config/config";
import Heading from "@/components/parts/Heading";
import NewsList from "@/components/section/common/NewsList";
import styles from "@/styles/pages/news/index.module.scss";

const title = "お知らせ一覧";
const title_en = "news";
const description =
  SITE.description + "このページは「お知らせ」を紹介しております。";

export default function NewsIndex({}) {
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

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${API_URL.news}?_embed&orderby=date&order=desc`);
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Heading titleEn={title_en} titleJp={title} breadcrumbs={breadcrumbs} />
      <div className="l-container l-grid__12 py-fluid-[40,80,350,768] md:py-fluid-[80,104]">
        <div className={`${styles.newsContainer}`}>
          <NewsList posts={posts} />
        </div>
      </div>
    </>
  );
}

NewsIndex.meta = {
  title: title,
  description: description,
  ogImage: "",
};
