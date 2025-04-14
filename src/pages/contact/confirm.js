import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SITE } from "@/config/config";
import styles from "@/styles/pages/contact/index.module.scss";
import formStyles from "@/styles/components/ui/form.module.scss";
import Layout from "@/components/layout/Layout";
import Heading from "@/components/parts/Heading";
import Button from "@/components/ui/Button";

export default function Confirm() {
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

  const router = useRouter();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem("formData");
    if (!data) {
      router.push("/contact");
    } else {
      setFormData(JSON.parse(data));
    }
  }, []);

  const handleBack = () => router.push("/contact");

  const handleSend = async () => {
    if (!window.grecaptcha) {
      alert("reCAPTCHAの読み込みに失敗しました。再読み込みしてください。");
      return;
    }

    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          { action: "submit" },
        );

        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, token }),
        });

        sessionStorage.removeItem("formData");

        if (res.ok) {
          router.push("/contact/thanks");
        } else {
          alert("送信失敗しました");
          router.push("/contact");
        }
      } catch (err) {
        alert("reCAPTCHAの実行中にエラーが発生しました。");
        console.error("reCAPTCHA error:", err);
      }
    });
  };

  if (!formData) return null;

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      <Layout title={title} description={description}>
        <Heading titleEn={title_en} titleJp={title} breadcrumbs={breadcrumbs} />

        <section
          aria-labelledby="contact-review-heading"
          className={`${styles.confirmContainer}`}
        >
          <h3 id="contact-review-heading" className="sr-only">
            ご確認ください
          </h3>
          <div className="l-container l-grid__12">
            <div
              className={`${styles.formContainer} pb-fluid-[32,32,350,768] pt-fluid-[40,48,350,768] md:pb-fluid-[32,40] md:pt-fluid-[40,56]`}
            >
              <p className="lg-pr-0 pr-4 leading-[1.8] pb-fluid-[40,48,350,768] text-fluid-[15,16] md:pb-fluid-[48,80]">
                以下の内容で送信します。
                <br aria-hidden="true" />
                内容にお間違いがなければ「送信する」ボタンをクリックしてください。
              </p>
              <dl className={`${styles.inputData} c-dl md:text-fluid-[15,16]`}>
                <div className={`c-dl__items ${styles.item}`}>
                  <dt className={`c-dl__dt ${styles.dlDt}`}>
                    お問い合わせ内容
                  </dt>
                  <dd className={`c-dl__dd ${styles.dlDd}`}>
                    <ul>
                      {formData.contactType?.map((item, index) => (
                        <li key={index}>・{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className={`c-dl__items ${styles.item}`}>
                  <dt className={`c-dl__dt ${styles.dlDt}`}>貴社名</dt>
                  <dd className={`c-dl__dd ${styles.dlDd}`}>
                    {formData.company}
                  </dd>
                </div>

                <div className={`c-dl__items ${styles.item}`}>
                  <dt className={`c-dl__dt ${styles.dlDt}`}>お名前</dt>
                  <dd className={`c-dl__dd ${styles.dlDd}`}>{formData.name}</dd>
                </div>

                <div className={`c-dl__items ${styles.item}`}>
                  <dt className={`c-dl__dt ${styles.dlDt}`}>メールアドレス</dt>
                  <dd className={`c-dl__dd ${styles.dlDd}`}>
                    {formData.email}
                  </dd>
                </div>

                <div className={`c-dl__items ${styles.item}`}>
                  <dt className={`c-dl__dt ${styles.dlDt}`}>お電話番号</dt>
                  <dd className={`c-dl__dd ${styles.dlDd}`}>{formData.tel}</dd>
                </div>

                <div className={`c-dl__items ${styles.item}`}>
                  <dt className={`c-dl__dt ${styles.dlDt}`}>URL</dt>
                  <dd className={`c-dl__dd ${styles.dlDd}`}>
                    {formData.url || "（未入力）"}
                  </dd>
                </div>

                <div className={`c-dl__items ${styles.item}`}>
                  <dt className={`c-dl__dt ${styles.dlDt}`}>メッセージ内容</dt>
                  <dd className={`c-dl__dd ${styles.dlDd}`}>
                    <div style={{ whiteSpace: "pre-wrap" }}>
                      {formData.message}
                    </div>
                  </dd>
                </div>

                <div className={`c-dl__items ${styles.item}`}>
                  <dt className={`c-dl__dt ${styles.dlDt}`}>
                    「個人情報の取り扱い」同意
                  </dt>
                  <dd className={`c-dl__dd ${styles.dlDd}`}>
                    {formData.privacy ? "✔ 同意済み" : "未チェック"}
                  </dd>
                </div>
              </dl>

              <div
                className={`flex flex-col items-center gap-x-fluid-[32,40] gap-y-fluid-[20,32,350,768] pb-fluid-[56,80,350,768] pt-fluid-[56,64,350,768] md:flex-row md:justify-center md:pb-fluid-[80,104] md:pt-fluid-[80,96]`}
              >
                <Button
                  tag="button"
                  type="button"
                  onClick={handleBack}
                  className="c-button p-button -secondary -reverse"
                  aria-label="入力画面に戻る"
                >
                  入力内容を修正する
                </Button>
                <Button
                  tag="button"
                  type="button"
                  onClick={handleSend}
                  className="c-button p-button -primary"
                >
                  送信する
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
