import { useEffect, useState } from "react";
import { API_URL } from "@/config/config";
import styles from "@/styles/pages/index.module.scss";
import Layout from "@/components/layout/Layout";
import Hero from "@/pages/home/Hero";
import AboutUs from "@/pages/home/AboutUs";
import Services from "@/pages/home/Services";
import ProductLines from "@/pages/home/ProductLines";
import News from "@/pages/home/News";
import Recruit from "@/pages/home/Recruit";

// export async function getStaticProps() {
//お知らせ記事取得件数
const newsCount = 3;

//   const res = await fetch(
//     `${API_URL.news}&per_page=${newsCount}&orderby=date&order=desc`,
//   );
//   const posts = await res.json();

//   return {
//     props: {
//       posts,
//     },
//     revalidate: 60, // ISR: 60秒ごとに再生成
//   };
// }

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        `${API_URL.news}&per_page=${newsCount}&orderby=date&order=desc`,
      );
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <Layout>
      <div className={styles.home}>
        <Hero />
        <AboutUs />
        <Services />
        <ProductLines />
        <News posts={posts} />
        <Recruit />
      </div>
    </Layout>
  );
}
