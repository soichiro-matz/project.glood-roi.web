import nodemailer from "nodemailer";
import { SITE } from "@/config/config";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const {
    contactType = [],
    company,
    name,
    email,
    tel,
    url,
    message,
    privacy,
    token,
  } = req.body;

  // reCAPTCHA v3 検証
  const verify = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    },
  );
  const json = await verify.json();

  if (!json.success || json.score < 0.5) {
    return res.status(400).json({ message: "Botと判定されました。" });
  }

  // nodemailer設定
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000, // 10秒でタイムアウトさせる（デフォルトは長すぎる）
  });

  // メール本文の共通部（整形済み）
  const contactTypeText =
    Array.isArray(contactType) && contactType.length
      ? contactType.map((item) => `・${item}`).join("\n")
      : "（未選択）";

  const bodyText = `
【お問い合わせ内容】
${contactTypeText}

【貴社名】
${company || "（未入力）"}

【お名前】
${name || "（未入力）"}

【メールアドレス】
${email || "（未入力）"}

【お電話番号】
${tel || "（未入力）"}

【URL】
${url || "（未入力）"}

【メッセージ内容】
${message || "（未入力）"}

【プライバシーポリシー同意】
${privacy ? "✔ 同意あり" : "✘ 未同意"}
`.trim();

  try {
    // 管理者宛メール
    await transporter.sendMail({
      from: `"お問い合わせフォーム" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "【HPお問い合わせ】新しいお問い合わせがありました",
      text: `以下の内容で問い合わせを受信しました。

──────────────
${bodyText}`,
    });

    // ユーザー自動返信メール
    await transporter.sendMail({
      from: `"${SITE.name}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `【お問い合わせありがとうございます】${SITE.name}`,
      text: `${name} 様

この度はお問い合わせいただき、誠にありがとうございます。
以下の内容にて承りました。

──────────────
${bodyText}
──────────────

内容を確認のうえ、担当者よりご連絡いたします。
今しばらくお待ちくださいませ。

──────────────────
${SITE.name}
${SITE.url}
`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("メール送信エラー:", err);
    res.status(500).json({ message: "メール送信に失敗しました。" });
  }
}
