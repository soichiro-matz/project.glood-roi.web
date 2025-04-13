import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Confirm() {
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
      <div>
        <h2>ご確認ください</h2>

        <p>
          <strong>① お問い合わせ内容：</strong>
        </p>
        <ul>
          {formData.contactType?.map((item, index) => (
            <li key={index}>・{item}</li>
          ))}
        </ul>

        <p>
          <strong>② 貴社名：</strong>
          {formData.company}
        </p>
        <p>
          <strong>③ お名前：</strong>
          {formData.name}
        </p>
        <p>
          <strong>④ メールアドレス：</strong>
          {formData.email}
        </p>
        <p>
          <strong>⑤ お電話番号：</strong>
          {formData.tel}
        </p>
        <p>
          <strong>⑥ URL：</strong>
          {formData.url || "（未入力）"}
        </p>
        <p>
          <strong>⑦ メッセージ内容：</strong>
        </p>
        <pre style={{ whiteSpace: "pre-wrap" }}>{formData.message}</pre>
        <p>
          <strong>⑧ プライバシーポリシー同意：</strong>
          {formData.privacy ? "✔ 同意済み" : "未チェック"}
        </p>

        <button onClick={handleBack}>戻る</button>
        <button onClick={handleSend}>送信</button>
      </div>
    </>
  );
}
