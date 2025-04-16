// EntryForm with Modal Confirmation and Full Input Fields
import Link from "next/link";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SITE } from "@/config/config";
import styles from "@/styles/pages/contact/index.module.scss";
import formStyles from "@/styles/components/ui/form.module.scss";
import Heading from "@/components/parts/Heading";
import Button from "@/components/ui/Button";

const title = "お問い合わせ";
const title_en = "contact";

const description =
  SITE.description + "お問い合わせはこちらのページより承っております。";
export default function ContactForm() {
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

  const [modalTop, setModalTop] = useState(0);

  useEffect(() => {
    if (showModal) {
      const scrollY = window.scrollY;

      // Lenis 停止＋body固定
      window.lenis?.stop();
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      setModalTop(scrollY);
    } else {
      const y = parseInt(document.body.style.top || "0", 10) * -1;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, y);

      window.lenis?.start();
    }
  }, [showModal]);

  const handleConfirm = (data) => {
    setShowModal(true);
  };

  const handleSend = async () => {
    try {
      setSending(true);

      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "submit" },
      );

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formValues, token }),
      });

      if (res.ok) {
        sessionStorage.removeItem("formData");
        router.push("/contact/thanks"); // ← この行が動かない原因
      } else {
        alert("送信失敗しました");
        router.push("/contact");
      }
    } catch (err) {
      alert("送信中にエラーが発生しました");
      console.error("送信エラー:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
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
                  「個人情報保護方針」
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
                          value || "「個人情報保護方針」に同意してください",
                      })}
                    />
                    <label htmlFor="privacy" className={`${formStyles.label}`}>
                      <span className={``}>
                        「個人情報保護方針」に同意します
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
                確認画面を表示
              </Button>
            </div>
          </form>

          {showModal && (
            <div
              className={`${styles.confirmContainer} fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60 lg:top-[5rem]`}
              style={{ top: `${modalTop}px`, height: "100vh" }}
            >
              <div
                className={`${styles.confirmModal} flex max-h-[75vh] w-full flex-col rounded bg-white p-4 shadow-md md:max-h-[75vh] md:p-6`}
              >
                <h3 className="mb-4 shrink-0 text-lg font-bold">
                  以下の内容で送信しますか？
                </h3>
                <div className="min-h-0 flex-auto touch-auto overflow-y-auto overscroll-contain">
                  <dl
                    className={`${styles.inputData} c-dl text-fluid-[14,14,350,768] md:text-fluid-[15,16]`}
                  >
                    <div className={`c-dl__items ${styles.item}`}>
                      <dt className={`c-dl__dt ${styles.dlDt}`}>希望職種</dt>
                      <dd className={`c-dl__dd ${styles.dlDd}`}>
                        <ul>
                          {formValues.contactType?.map((item, index) => (
                            <li key={index}>・{item}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>

                    <div className={`c-dl__items ${styles.item}`}>
                      <dt className={`c-dl__dt ${styles.dlDt}`}>貴社名</dt>
                      <dd className={`c-dl__dd ${styles.dlDd}`}>
                        {formValues.company}
                      </dd>
                    </div>
                    <div className={`c-dl__items ${styles.item}`}>
                      <dt className={`c-dl__dt ${styles.dlDt}`}>お名前</dt>
                      <dd className={`c-dl__dd ${styles.dlDd}`}>
                        {formValues.name}
                      </dd>
                    </div>

                    <div className={`c-dl__items ${styles.item}`}>
                      <dt className={`c-dl__dt ${styles.dlDt}`}>
                        メールアドレス
                      </dt>
                      <dd className={`c-dl__dd ${styles.dlDd}`}>
                        {formValues.email}
                      </dd>
                    </div>

                    <div className={`c-dl__items ${styles.item}`}>
                      <dt className={`c-dl__dt ${styles.dlDt}`}>URL</dt>
                      <dd className={`c-dl__dd ${styles.dlDd}`}>
                        {formValues.url}
                      </dd>
                    </div>

                    <div className={`c-dl__items ${styles.item}`}>
                      <dt className={`c-dl__dt ${styles.dlDt}`}>お電話番号</dt>
                      <dd className={`c-dl__dd ${styles.dlDd}`}>
                        {formValues.tel}
                      </dd>
                    </div>

                    <div className={`c-dl__items ${styles.item}`}>
                      <dt className={`c-dl__dt ${styles.dlDt}`}>
                        メッセージ内容
                      </dt>
                      <dd className={`c-dl__dd ${styles.dlDd}`}>
                        <div style={{ whiteSpace: "pre-wrap" }}>
                          {formValues.message}
                        </div>
                      </dd>
                    </div>

                    <div className={`c-dl__items ${styles.item}`}>
                      <dt className={`c-dl__dt ${styles.dlDt}`}>
                        「個人情報の取り扱い」同意
                      </dt>
                      <dd className={`c-dl__dd ${styles.dlDd}`}>
                        {formValues.privacy ? "✔ 同意済み" : "未チェック"}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <div className="pt-1 text-gray-400 text-fluid-[11,12]">
                    このサイトは reCAPTCHA によって保護されており、Google の
                    <Link
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      className="text-blue-500"
                    >
                      プライバシー ポリシー
                    </Link>
                    と
                    <Link
                      href="https://policies.google.com/terms"
                      target="_blank"
                      className="text-blue-500"
                    >
                      利用規約
                    </Link>{" "}
                    が適用されます。
                  </div>
                  <div className="flex shrink-0 justify-center gap-4 pt-4 md:gap-8 md:pt-6 lg:gap-10">
                    <Button
                      tag="button"
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="c-button p-button -secondary -reverse"
                    >
                      修正する
                    </Button>

                    <Button
                      tag="button"
                      type="button"
                      onClick={handleSend}
                      className="c-button p-button -primary"
                      disabled={sending}
                    >
                      送信する
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

ContactForm.meta = {
  title: title,
  description: description,
  ogImage: "",
};
