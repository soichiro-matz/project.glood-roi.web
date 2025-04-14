import { SITE } from "@/config/config";
import styles from "@/styles/pages/contact/index.module.scss";
import Layout from "@/components/layout/Layout";
import Heading from "@/components/parts/Heading";
import Button from "@/components/ui/Button";

export default function Thanks() {
  const title = "お問い合わせ";
  const title_en = "contact";
  const description = "Contact";

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
      <div className="l-container l-grid__12">
        <div
          className={`${styles.formContainer} space-y-1 pt-fluid-[40,48,350,768] md:pt-fluid-[40,56]`}
        >
          <h3>お問い合わせいただき、誠にありがとうございます。</h3>
          <p>
            内容を確認次第、折り返しご連絡いたしますので、少々お待ちください。
          </p>
          <p>お問い合わせ内容によってはご返答が出来ない場合もございます。</p>
          <p>予めご了承くださいませ。</p>
        </div>
      </div>
      <div
        className={`pb-[20vh] text-center pt-fluid-[56,72,350,768] md:pb-[20vh] md:pt-fluid-[72,88]`}
      >
        <Button
          tag="a"
          linkProps={{ href: SITE.base }}
          className="c-button p-button -primary"
        >
          ホームへ
        </Button>
      </div>
    </Layout>
  );
}
