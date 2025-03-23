import Script from "next/script";
import { SITE } from "@/config/config";

export default function GoogleAnalytics() {
  const trackingId = SITE.trackingId;

  if (!trackingId) return null; // trackingId が設定されていない場合は何もしない

  return (
    <>
      {/* Google Analytics のスクリプトを非同期で読み込む */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive" // ユーザー操作後に実行
      />

      {/* GA4 の初期化スクリプト */}
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}', { send_page_view: true });
          `,
        }}
      />
    </>
  );
}
