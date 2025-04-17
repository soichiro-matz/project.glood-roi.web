// navLinks オブジェクトの定義
export const navLinks = {
  home: {
    href: "/",
    text: "ホーム",
    text_en: "home",
  },
  about: {
    href: "/about",
    text: "私たちについて",
    text_en: "about us",
    children: [
      {
        href: "/about#mvv",
        text: "ミッション／ビジョン／バリュー",
        anchor: "mvv",
      },
      { href: "/about#message", text: "代表挨拶", anchor: "message" },
      { href: "/about#data", text: "データでみるGlood roi", anchor: "data" },
      { href: "/about#outline", text: "会社概要", anchor: "outline" },
      { href: "/about#history", text: "沿革", anchor: "history" },
    ],
  },
  service: {
    href: "/#service",
    text: "サービス",
    text_en: "service",
    // children: [
    //   { href: "/#domestic", text: "国内EC事業", anchor: "domestic" },
    //   { href: "/#cross-border", text: "越境EC事業", anchor: "cross-border" },
    //   { href: "/#wholesale", text: "卸売事業", anchor: "wholesale" },
    // ],
  },
  productLines: {
    href: "/#product-lines",
    text: "取扱商品カテゴリー",
    text_en: "product lines",
  },
  news: {
    href: "/news",
    text: "お知らせ",
    text_en: "news",
  },
  recruit: {
    href: "/recruit",
    text: "採用情報",
    text_en: "recruit",
    children: [
      {
        href: "/recruit#full-time",
        text: "正社員(総合職)",
        anchor: "full-time",
      },
      { href: "/recruit#part-time", text: "アルバイト", anchor: "part-time" },
      { href: "/entry", text: "エントリー", anchor: "" },
    ],
  },
  contact: {
    href: "/contact",
    text: "お問い合わせ",
    text_en: "contact",
  },
  privacyPolicy: {
    href: "/privacy-policy",
    text: "プライバシーポリシー",
    text_en: "privacy policy",
  },
};

/**
 * 🔍 関数形式で getChildren を定義
 * @param {string} key - 'about', 'service', 'recruite' など
 * @returns {Array|undefined} - children が存在する場合は配列、存在しない場合は undefined
 * React コンポーネント関数で呼び出す
 * ex) import { getChildren } from "@/data/navLinks";
 * ex)  const aboutChildren = getChildren("about");
 */
export function getChildren(key) {
  if (navLinks[key] && navLinks[key].children) {
    return navLinks[key].children;
  }
  return undefined;
}

export default navLinks; // ← デフォルトエクスポートを追加！
