// EntryForm with Modal Confirmation and Full Input Fields
import Link from "next/link";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SITE } from "@/config/config";
import styles from "@/styles/pages/contact/index.module.scss";
import formStyles from "@/styles/components/ui/form.module.scss";
import Layout from "@/components/layout/Layout";
import Heading from "@/components/parts/Heading";
import Button from "@/components/ui/Button";

export default function ContactForm() {
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

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [resumeName, setResumeName] = useState(null);
  const [sending, setSending] = useState(false);
  const formValues = watch();

  useEffect(() => {
    const saved = sessionStorage.getItem("formData");
    if (saved) {
      const data = JSON.parse(saved);
      setValue("contactType", data.contactType || []);
      setValue("company", data.company || "");
      setValue("name", data.name || "");
      setValue("email", data.email || "");
      setValue("tel", data.tel || "");
      setValue("url", data.url || "");
      setValue("message", data.message || "");
      setValue("privacy", data.privacy || false);
    }
  }, [setValue]);

  const handleConfirm = (data) => {
    // const file = data.resume?.[0];
    // const name = file?.name || null;
    // setResumeName(name);
    setShowModal(true);
  };

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
          body: JSON.stringify({ ...formValues, token }),
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

  return (
    <Layout title={title} description={description}>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      <Heading titleEn={title_en} titleJp={title} breadcrumbs={breadcrumbs} />
      <div className="l-container l-grid__12">
        <div
          className={`${styles.formContainer} pb-fluid-[32,32,350,768] pt-fluid-[40,48,350,768] md:pb-fluid-[32,40] md:pt-fluid-[40,56]`}
        >
          <p className="lg-pr-0 pr-4 leading-[1.8] pb-fluid-[40,48,350,768] text-fluid-[15,16] md:pb-fluid-[48,80]">
            お問合せありがとうございます。
            <br aria-hidden="true" />
            必要事項の入力をお願いいたします。
            担当より２営業日以内に追ってご連絡させて頂きます。
          </p>
          <form
            onSubmit={handleSubmit(handleConfirm)}
            className={formStyles.form}
          >
            {/* 全項目省略なし（jobType, name, email, tel, resume, message, privacy） */}
            <fieldset className={`${formStyles.inputWrapper}`}>
              <legend className={`${formStyles.label}`}>
                <span className={`${formStyles.title}`}>お問い合わせ内容</span>
                <span className={`${formStyles.required} ${formStyles._true}`}>
                  必須
                </span>
              </legend>
              <div className="flex gap-4">
                <div className={`${formStyles.chkboxWrapper}`}>
                  <input
                    id="request"
                    type="checkbox"
                    value="依頼したい"
                    {...register("contactType", {
                      validate: (value) =>
                        (value && value.length > 0) ||
                        "1つ以上選択してください",
                    })}
                  />
                  <label htmlFor="request">依頼したい</label>
                </div>
                <div className={`${formStyles.chkboxWrapper}`}>
                  <input
                    id="consult"
                    type="checkbox"
                    value="相談したい"
                    {...register("contactType")}
                  />
                  <label htmlFor="consult">相談したい</label>
                </div>
                <div className={`${formStyles.chkboxWrapper}`}>
                  <input
                    id="other"
                    type="checkbox"
                    value="その他"
                    {...register("contactType")}
                  />
                  <label htmlFor="other">その他</label>
                </div>
              </div>
              {errors.contactType && (
                <p role="alert" className={`${formStyles.alert}`}>
                  {errors.contactType.message}
                </p>
              )}
            </fieldset>

            <div className={`${formStyles.inputWrapper}`}>
              <label htmlFor="name" className={`${formStyles.label}`}>
                <span className={`${formStyles.title}`}>お名前</span>
                <span className={`${formStyles.required} ${formStyles._true}`}>
                  必須
                </span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name", {
                  required: "お名前を入力してください",
                  maxLength: {
                    value: 20,
                    message: "20文字以内で入力してください",
                  },
                })}
              />
              {errors.name && (
                <p role="alert" className={`${formStyles.alert}`}>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className={`${formStyles.inputWrapper}`}>
              <label htmlFor="email" className={`${formStyles.label}`}>
                <span className={`${formStyles.title}`}>メールアドレス</span>
                <span className={`${formStyles.required} ${formStyles._true}`}>
                  必須
                </span>
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "メールアドレスを入力してください",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "正しいメール形式で入力してください",
                  },
                })}
              />
              {errors.email && (
                <p role="alert" className={`${formStyles.alert}`}>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className={`${formStyles.inputWrapper}`}>
              <label htmlFor="tel" className={`${formStyles.label}`}>
                <span className={`${formStyles.title}`}>お電話番号</span>
                <span className={`${formStyles.required} ${formStyles._true}`}>
                  必須
                </span>
              </label>
              <input
                id="tel"
                type="tel"
                {...register("tel", {
                  required: "お電話番号を入力してください",
                })}
              />
              {errors.tel && (
                <p role="alert" className={`${formStyles.alert}`}>
                  {errors.tel.message}
                </p>
              )}
            </div>

            <div className={`${formStyles.inputWrapper}`}>
              <label htmlFor="url" className={`${formStyles.label}`}>
                <span className={`${formStyles.title}`}>URL</span>
                <span className={`${formStyles.required} ${formStyles._false}`}>
                  任意
                </span>
              </label>
              <input id="url" type="url" {...register("url")} />
            </div>

            <div className={`${formStyles.inputWrapper}`}>
              <label htmlFor="message" className={`${formStyles.label}`}>
                <span className={`${formStyles.title}`}>メッセージ内容</span>
                <span className={`${formStyles.required} ${formStyles._true}`}>
                  必須
                </span>
              </label>
              <textarea
                id="message"
                rows="5"
                {...register("message", {
                  required: "メッセージを入力してください",
                  maxLength: {
                    value: 1000,
                    message: "1000文字以内で入力してください",
                  },
                })}
              />
              {errors.message && (
                <p role="alert" className={`${formStyles.alert}`}>
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className={`${formStyles.privacyPolicy}`}>
              <p>
                お問合せフォームのご入力内容を送信いただく前に
                <Link href="/privacy-policy" target="_blank">
                  「個人情報の取り扱い」
                </Link>
                をお読みいただき、内容にご同意いただく必要があります。
              </p>
              <div className="flex justify-center pt-fluid-[32,40]">
                <div className={`${formStyles.inputWrapper}`}>
                  <div className={`${formStyles.chkboxWrapper}`}>
                    <input
                      id="privacy"
                      type="checkbox"
                      {...register("privacy", {
                        validate: (value) =>
                          value || "「個人情報の取り扱い」に同意してください",
                      })}
                    />
                    <label htmlFor="privacy" className={`${formStyles.label}`}>
                      <span className={``}>
                        「個人情報の取り扱い」に同意します
                      </span>
                      <span
                        className={`${formStyles.required} ${formStyles._true}`}
                      >
                        必須
                      </span>
                    </label>
                  </div>
                  {errors.privacy && (
                    <p role="alert" className={`${formStyles.alert}`}>
                      {errors.privacy.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* フォームフィールドここに記述されている前提です（省略） */}
            <div
              className={`text-center pb-fluid-[72,80,350,768] pt-fluid-[16,24,350,768] md:pb-fluid-[80,104] md:pt-fluid-[16,24]`}
            >
              <Button
                tag="button"
                type="submit"
                className="c-button p-button -primary"
              >
                確認画面を表示
              </Button>
            </div>

            {/* <div className="text-center">
              <Button
                tag="button"
                type="submit"
                className="c-button p-button -primary"
              >
                確認画面を表示
              </Button>
            </div> */}
          </form>

          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-full max-w-md rounded bg-white p-6 shadow-md">
                <h3 className="mb-4 text-lg font-bold">
                  以下の内容で送信しますか？
                </h3>
                <ul className="mb-4 text-sm">
                  <li>
                    <strong>機能職種:</strong>
                    <ul>
                      {formValues.contactType?.map((item, index) => (
                        <li key={index}>・{item}</li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <strong>貴社名:</strong> {formValues.company}
                  </li>
                  <li>
                    <strong>お名前:</strong> {formValues.name}
                  </li>
                  <li>
                    <strong>メールアドレス:</strong> {formValues.email}
                  </li>
                  <li>
                    <strong>電話番号:</strong> {formValues.tel}
                  </li>
                  <li>
                    <strong>電話番号:</strong> {formValues.url}
                  </li>
                  <li>
                    <strong>メッセージ:</strong> {formValues.message}
                  </li>
                  <li>
                    <strong>同意状況:</strong>{" "}
                    {formValues.privacy ? "✔ 同意あり" : "✘ 未同意"}
                  </li>
                </ul>
                <div className="flex justify-between">
                  <Button
                    tag="button"
                    type="button"
                    onClick={handleSend}
                    className="c-button p-button -primary"
                    disabled={sending}
                  >
                    送信する
                  </Button>
                  <Button
                    tag="button"
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="c-button p-button -secondary -reverse"
                  >
                    修正する
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
