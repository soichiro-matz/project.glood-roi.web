import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { SITE, API_URL } from "@/config/config";
import Layout from "@/components/layout/Layout";
import Heading from "@/components/parts/Heading";
import styles from "@/styles/pages/news/index.module.scss";

export async function getStaticPaths() {
  const res = await fetch(`${API_URL.news}?_embed&orderby=date&order=desc`);
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${API_URL.news}/${params.id}?_embed`);
  const post = await res.json();

  return {
    props: { post },
    revalidate: 60,
  };
}

export default function NewsDetail({ post }) {
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

  return (
    <Layout title={title} description={description}>
      <Heading titleEn={title_en} titleJp={title} breadcrumbs={breadcrumbs} />
      <article
        className={`l-container l-grid__12 md:py-fluid-[80,104]" py-fluid-[40,80,350,768]`}
      >
        <div className={`${styles.detail}`}>
          <h3
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            className={`font-bold text-fluid-[18,28,350,768] md:text-fluid-[28,32]`}
          />
          <div className="flex justify-between pt-fluid-[0,8]">
            <p className="">
              <span
                className={`${styles.category} inline-block rounded-full bg-white leading-none px-fluid-[8,12] py-fluid-[4,5] text-fluid-[12,15]`}
              >
                お知らせ
              </span>
            </p>
            <time className={`font-bold`} lang="en" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString()}
            </time>
          </div>
          <div
            className={`${styles.contents} pt-fluid-[32,48,350,768] md:pt-fluid-[48,56] md:text-fluid-[15,16]`}
          >
            <div
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              className="flex flex-col gap-[1em]"
            />
          </div>

          <div
            className={`text-center pb-fluid-[48,64,350,768] pt-fluid-[80,96,350,768] md:pb-fluid-[40,56] md:pt-fluid-[120,144]`}
          >
            <Button
              tag="a"
              linkProps={{ href: "/news" }}
              className="c-button p-button -secondary"
            >
              お知らせ一覧へ
            </Button>
          </div>
        </div>
      </article>
    </Layout>
  );
}
