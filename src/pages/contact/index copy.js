import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
    formState: { errors },
  } = useForm();

  const router = useRouter();

  // sessionStorage から復元
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

  const onSubmit = (data) => {
    sessionStorage.setItem("formData", JSON.stringify(data));
    router.push("/contact/confirm");
  };

  return (
    <Layout title={title} description={description}>
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
            onSubmit={handleSubmit(onSubmit)}
            className={`${formStyles.form}`}
          >
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
              <label htmlFor="company" className={`${formStyles.label}`}>
                <span className={`${formStyles.title}`}>貴社名</span>
                <span className={`${formStyles.required} ${formStyles._true}`}>
                  必須
                </span>
              </label>
              <input
                id="company"
                type="text"
                {...register("company", {
                  required: "貴社名を入力してください",
                  maxLength: {
                    value: 20,
                    message: "20文字以内で入力してください",
                  },
                })}
              />
              {errors.company && (
                <p role="alert" className={`${formStyles.alert}`}>
                  {errors.company.message}
                </p>
              )}
            </div>

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
            <div
              className={`text-center pb-fluid-[72,80,350,768] pt-fluid-[16,24,350,768] md:pb-fluid-[80,104] md:pt-fluid-[16,24]`}
            >
              <Button
                tag="button"
                type="submit"
                className="c-button p-button -primary"
              >
                確認画面へ
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
