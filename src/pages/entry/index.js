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

export default function EntryForm() {
  const title = "採用エントリー";
  const title_en = "entry";
  const description =
    SITE.description + "採用エントリーはこちらのページより承っております。";

  const breadcrumbs = [
    { title: "ホーム", url: SITE.base },
    { title: title, url: "" },
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
    const saved = sessionStorage.getItem("entryFormData");
    if (saved) {
      const data = JSON.parse(saved);
      setValue("jobType", data.jobType || "");
      setValue("company", data.company || "");
      setValue("name", data.name || "");
      setValue("kana", data.kana || "");
      setValue("email", data.email || "");
      setValue("tel", data.tel || "");
      setResumeName(data.resumeName || null);
      setValue("message", data.message || "");
      setValue("privacy", data.privacy || false);
    }
  }, [setValue]);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open"); // クリーンアップ
    };
  }, [showModal]);

  const handleResumeClear = () => {
    resetField("resume");
    setResumeName(null);
  };

  const handleConfirm = (data) => {
    const file = data.resume?.[0];
    const name = file?.name || null;
    setResumeName(name);
    setShowModal(true);
  };

  const handleSend = async () => {
    try {
      setSending(true);
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "submit" },
      );

      const formData = new FormData();
      formData.append("jobType", formValues.jobType || "");
      formData.append("company", formValues.company || "");
      formData.append("name", formValues.name || "");
      formData.append("kana", formValues.kana || "");
      formData.append("email", formValues.email || "");
      formData.append("tel", formValues.tel || "");

      formData.append("message", formValues.message || "");
      formData.append("privacy", formValues.privacy ? "1" : "0");
      formData.append("token", token);

      const resumeFile = formValues.resume?.[0];
      if (resumeFile) {
        formData.append("resume", resumeFile);
        formData.append("resumeName", resumeFile.name); // ファイル名だけ別途送信
      }

      const res = await fetch("/api/entry", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        sessionStorage.removeItem("entryFormData");
        router.push("/entry/thanks");
      } else {
        alert("送信に失敗しました");
        setShowModal(false);
      }
    } catch (err) {
      alert("送信中にエラーが発生しました");
      console.error(err);
    } finally {
      setSending(false);
    }
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
            ご応募いただきありがとうございます。
            <br aria-hidden="true" />
            必須事項を入力の上、送信してください。
          </p>
          <form
            onSubmit={handleSubmit(handleConfirm)}
            className={formStyles.form}
          >
            <fieldset className={`${formStyles.inputWrapper}`}>
              <legend className={`${formStyles.label}`}>
                <span className={`${formStyles.title}`}>機能職種</span>
                <span className={`${formStyles.required} ${formStyles._true}`}>
                  必須
                </span>
              </legend>
              <div className="flex gap-4">
                <div className={`${formStyles.chkboxWrapper}`}>
                  <input
                    type="radio"
                    id="jobFull"
                    value="正社員（総合職）"
                    {...register("jobType", {
                      required: "機能職種を選択してください",
                    })}
                  />
                  <label htmlFor="jobFull">正社員（総合職）</label>
                </div>
                <div className={`${formStyles.chkboxWrapper}`}>
                  <input
                    type="radio"
                    id="jobPart"
                    value="アルバイト"
                    {...register("jobType")}
                  />
                  <label htmlFor="jobPart">アルバイト</label>
                </div>
              </div>
              {errors.jobType && (
                <p role="alert" className={`${formStyles.alert}`}>
                  {errors.jobType.message}
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
              <label htmlFor="kana" className={`${formStyles.label}`}>
                <span className={`${formStyles.title}`}>
                  お名前（フリガナ）
                </span>
                <span className={`${formStyles.required} ${formStyles._true}`}>
                  必須
                </span>
              </label>
              <input
                id="kana"
                type="text"
                {...register("kana", {
                  required: "お名前（フリガナ）を入力してください",
                  maxLength: {
                    value: 20,
                    message: "20文字以内で入力してください",
                  },
                  pattern: {
                    value: /^[ァ-ヶー　]+$/, // 全角カタカナと全角スペース・長音符（ー）のみ
                    message: "全角カタカナで入力してください",
                  },
                })}
              />
              {errors.kana && (
                <p role="alert" className={`${formStyles.alert}`}>
                  {errors.kana.message}
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
            <div
              className={`${formStyles.inputWrapper} ${formStyles._typeFile}`}
            >
              <label htmlFor="resume" className={`${formStyles.label}`}>
                <span className={`${formStyles.title}`}>履歴書添付</span>
                <span className={`${formStyles.required} ${formStyles._false}`}>
                  任意
                </span>
              </label>
              <input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.png"
                {...register("resume", {
                  validate: (fileList) => {
                    const file = fileList?.[0];
                    if (!file) return true;

                    const maxSizeMB = 5;
                    if (file.size > maxSizeMB * 1024 * 1024) {
                      return `ファイルサイズは${maxSizeMB}MB以内にしてください`;
                    }

                    const allowedTypes = [
                      "application/pdf",
                      "application/msword",
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                      "image/jpeg",
                      "image/png",
                    ];
                    if (!allowedTypes.includes(file.type)) {
                      return "PDF、Word、JPEG、PNGファイルのみ添付できます";
                    }

                    return true;
                  },
                })}
                // ref={resumeRef}
              />

              <button
                type="button"
                onClick={handleResumeClear}
                className={`${formStyles.fileClearButton} flex text-sm text-blue-600 underline`}
              >
                選択ファイルをクリア
              </button>
              {errors.resume && (
                <p role="alert" className={`${formStyles.alert}`}>
                  {errors.resume.message}
                </p>
              )}
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
                          value || "「個人情報の取り扱い」に同意してください",
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
          </form>

          {showModal && (
            <div
              className={`${styles.confirmContainer} fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60 lg:top-[5rem]`}
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
                        {formValues.jobType || "（未選択）"}
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
                        お名前（フリガナ）
                      </dt>
                      <dd className={`c-dl__dd ${styles.dlDd}`}>
                        {formValues.kana}
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
                      <dt className={`c-dl__dt ${styles.dlDt}`}>お電話番号</dt>
                      <dd className={`c-dl__dd ${styles.dlDd}`}>
                        {formValues.tel}
                      </dd>
                    </div>

                    <div className={`c-dl__items ${styles.item}`}>
                      <dt className={`c-dl__dt ${styles.dlDt}`}>履歴書添付</dt>
                      <dd className={`c-dl__dd ${styles.dlDd}`}>
                        {resumeName || "（添付なし）"}
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
    </Layout>
  );
}
