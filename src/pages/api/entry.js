import { IncomingForm } from "formidable";
import fs from "fs";
import nodemailer from "nodemailer";
import { SITE } from "@/config/config";

// Next.js API Routes で bodyParser を無効化
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ message: "フォーム解析エラー" });
    }

    const {
      jobType,
      company,
      name,
      kana,
      email,
      tel,
      resumeName,
      message,
      privacy,
      token,
    } = fields;

    const privacyValue = Array.isArray(privacy) ? privacy[0] : privacy;

    const isPrivacyAgreed =
      privacyValue === "1" || privacyValue === "true" || privacyValue === true;

    const resumeFile = files.resume?.[0];

    // reCAPTCHA 検証
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
    });

    const bodyText = `
【希望職種】
${jobType}

【お名前】
${name || "（未入力）"}

【お名前（フリガナ）】
${kana || "（未入力）"}

【メールアドレス】
${email || "（未入力）"}

【お電話番号】
${tel || "（未入力）"}

【履歴書】
${resumeName || "（添付なし）"}

【メッセージ内容】
${message || "（未入力）"}

【プライバシーポリシー同意】
${isPrivacyAgreed ? "✔ 同意あり" : "✘ 未同意"}
    `.trim();

    const attachments = resumeFile
      ? [
          {
            filename: resumeFile.originalFilename,
            path: resumeFile.filepath,
          },
        ]
      : [];

    try {
      // 管理者宛メール
      await transporter.sendMail({
        from: `"採用エントリーフォーム" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: "【HP採用エントリー】新しいエントリーがありました",
        text: `以下の内容でエントリーを受信しました。

──────────────
${bodyText}`,
        attachments,
      });

      // ユーザー宛自動返信
      await transporter.sendMail({
        from: `"${SITE.name}" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `【ご応募いただきありがとうございます】${SITE.name}`,
        text: `${name} 様

この度はご応募いただき、誠にありがとうございます。
以下の内容にて承りました。

──────────────
${bodyText}
──────────────

内容を確認のうえ、担当者よりご連絡いたします。
今しばらくお待ちくださいませ。

──────────────────
${SITE.name}
${SITE.url}`,
      });

      res.status(200).json({ success: true });
    } catch (err) {
      console.error("メール送信エラー:", err);
      res.status(500).json({ message: "メール送信に失敗しました。" });
    }
  });
}
