import Link from "next/link";
import styles from "@/styles/pages/news/index.module.scss";

export default function NewsList({ posts }) {
  return (
    <ul>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
          <li key={post.id} className={`${styles.newsItem} relative`}>
            <Link
              href={`/news/${post.id}`}
              className={`${styles.link}`}
              data-rola-trigger01
              data-rola-transition="slide"
            >
              <article
                className={`${styles.articleWrapper} relative flex items-center pb-fluid-[32,40] pt-fluid-[28,36] px-fluid-[10,16]`}
              >
                <div
                  className={`${styles.article} flex flex-col gap-fluid-[16,18]`}
                >
                  <h3 className={`font-medium leading-none text-fluid-[14,16]`}>
                    {post.title.rendered}
                  </h3>
                  <div
                    className={`order-first flex items-center leading-none gap-fluid-[16,24]`}
                  >
                    <time
                      className={`font-bold`}
                      lang="en"
                      dateTime={post.date}
                    >
                      {new Date(post.date).toLocaleDateString()}
                    </time>
                    <span
                      className={`${styles.category} rounded-full bg-white px-fluid-[8,12] py-fluid-[4,6] text-fluid-[12,14]`}
                    >
                      お知らせ
                    </span>
                  </div>
                </div>
                <span
                  className={`${styles.icon} inline-block flex items-center justify-center rounded-[50%] font-medium wh-fluid-[32,40]`}
                >
                  →
                </span>
              </article>
            </Link>
          </li>
        ))
      ) : (
        <li>お知らせはありません</li>
      )}
    </ul>
  );
}
