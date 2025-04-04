import React from "react";
import { SITE } from "@/config/config";
import { useRouter } from "next/router";
import { getFullUrl } from "@/js/utils/utils";
import { generateSchema } from "@/js/utils/schema";
import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/utils/GoogleAnalytics";

export default function Layout({ children, title = "Default Title", description = "", ogpImage = "" }) {
  const topDescription = description ? description : SITE.description;
  const topOgpImage = ogpImage ? ogpImage : "/ogp.png";

  const router = useRouter();
  const fullUrl = getFullUrl(router.pathname);

  const jsonLd = generateSchema();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={topDescription} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={topDescription} />
        <meta property="og:image" content={`${SITE.url}${topOgpImage}`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:site_name" content={SITE.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="format-detection" content="telephone=no, email=no, address=no" />
        <link rel="canonical" href={fullUrl} />
        <link rel="icon" type="image/svg+xml" href={`${SITE.base}favicon.svg`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${SITE.base}apple-touch-icon.png`} />
        <title>{title}</title>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </Head>
      <GoogleAnalytics />
      <div className="layout">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
