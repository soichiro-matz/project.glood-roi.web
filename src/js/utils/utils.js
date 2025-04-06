import { SITE } from "@/config/config";

export const getFullUrl = (path) => {
  let rootFullPath = SITE.url;
  if (rootFullPath.endsWith("/")) {
    rootFullPath = rootFullPath.slice(0, -1);
  }

  return rootFullPath + path;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

//0埋処理
//@param num:0埋めする数値
//@param digits:桁数
export const zeroPad = (num, digits) => {
  let zero = "";
  for (let index = 0; index < digits - 1; index++) {
    zero += "0";
  }
  return (zero + num).slice(-1 * digits);
};
