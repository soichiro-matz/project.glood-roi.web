import { SITE } from "@/config/config";
import styles from "@/styles/pages/contact/index.module.scss";
import Heading from "@/components/parts/Heading";
import Button from "@/components/ui/Button";

const title = "404 Not Found";
const title_en = "404 not nound";
const description = "404 Not Found";
export default function NotFound() {
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
      <Heading titleEn={title_en} titleJp={title} breadcrumbs={breadcrumbs} />
      <div className="l-container l-grid__12">
        <div
          className={`${styles.formContainer} space-y-1 pt-fluid-[40,48,350,768] text-fluid-[15,16] md:pt-fluid-[40,56]`}
        >
          <p>お探しのページが見つかりませんでした。</p>
          <p>
            URLに誤りがあるか、ページが移動もしくは削除された可能性がございます
          </p>
        </div>
      </div>
      <div
        className={`pb-[20vh] text-center pt-fluid-[56,72,350,768] md:pb-[20vh] md:pt-fluid-[104,120]`}
      >
        <Button
          tag="a"
          linkProps={{ href: SITE.base }}
          className="c-button p-button -primary"
        >
          ホームへ
        </Button>
      </div>
    </>
  );
}

NotFound.meta = {
  title: title,
  description: description,
  ogImage: "",
};
