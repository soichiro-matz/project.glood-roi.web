import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";
import { SITE, API_URL } from "@/config/config";
import Heading from "@/components/parts/Heading";
import styles from "@/styles/pages/news/index.module.scss";

// const title = "";

export async function getStaticPaths() {
  const res = await fetch(`${API_URL.news}?_embed&orderby=date&order=desc`);

  // ✅ 1. ステータス確認
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }

  // ✅ 2. 応答が JSON であるかをチェック（必要なら content-type 確認も）
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text(); // HTMLが返っている場合は確認しやすいようログ
    console.error("Unexpected response (not JSON):", text.slice(0, 300));
    throw new Error("Expected JSON but got HTML");
  }

  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${API_URL.news}/${params.id}?_embed`);

  // ✅ 1. ステータス確認
  if (!res.ok) {
    throw new Error(`Failed to fetch post ${params.id}: ${res.status}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Unexpected response (not JSON):", text.slice(0, 300));
    throw new Error("Expected JSON but got HTML");
  }

  const post = await res.json();

  const title = post.title.rendered;
  const rawExcerpt = post.excerpt?.rendered || "";
  const description = rawExcerpt.replace(/<[^>]+>/g, "").trim(); // HTMLタグ除去;
  const ogImage = "";

  return {
    props: {
      post,
      meta: {
        title,
        description,
        ogImage,
      },
    },
    revalidate: 60,
  };
}

export default function NewsDetail({ post, meta }) {
  // const router = useRouter();
  // const { id } = router.query;

  // const [post, setPost] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!id) return; // idがまだ取得できていない場合はスキップ

  //   const fetchPost = async () => {
  //     try {
  //       const res = await fetch(`${API_URL.news}/${id}?_embed`);
  //       const data = await res.json();
  //       setPost(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("データ取得エラー:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchPost();
  // }, [id]);

  // if (loading) return <p>読み込み中...</p>;
  // if (!post) return <p>記事が見つかりません</p>;

  const title = post.title.rendered;
  const title_en = "news";

  const breadcrumbs = [
    {
      title: "ホーム",
      url: SITE.base,
    },
    {
      title: "お知らせ一覧",
      url: "/news",
    },
    {
      title: title,
      url: "",
    },
  ];

  return (
    <>
      <Heading titleEn={title_en} titleJp={title} breadcrumbs={breadcrumbs} />
      <article
        className={`l-container l-grid__12 md:py-fluid-[80,104]" py-fluid-[40,80,350,768]`}
      >
        <div className={`${styles.detail}`}>
          <h3
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            className={`font-bold text-fluid-[18,28,350,768] md:text-fluid-[28,32]`}
          />
          <div className="flex justify-between pt-2 md:pt-fluid-[0,8]">
            <p className="">
              <span
                className={`${styles.category} inline-block rounded-full bg-white leading-none px-fluid-[8,12] py-fluid-[4,5] text-fluid-[12,15]`}
              >
                お知らせ
              </span>
            </p>
            <time
              className={`${styles.date} font-bold`}
              lang="en"
              dateTime={post.date}
            >
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
    </>
  );
}

// NewsDetail.meta = {
//   title: title,
//   description: description,
//   ogImage: "",
// };
