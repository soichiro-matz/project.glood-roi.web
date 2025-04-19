// components/Meta.js
import Head from "next/head";
import { useRouter } from "next/router";
import { SITE } from "@/config/config";
import { generateSchema } from "@/js/utils/schema";
import { getFullUrl } from "@/js/utils/utils";

export default function Meta({
  title = "",
  description = SITE.description,
  ogImage = "/ogp.jpg",
}) {
  const router = useRouter();
  const pageTitle = title ? `${title} | ${SITE.name}` : SITE.name;
  const fullUrl = getFullUrl(router.asPath);
  const jsonLd = generateSchema();

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${SITE.url}${ogImage}`} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:site_name" content={SITE.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="format-detection"
        content="telephone=no, email=no, address=no"
      />
      <link rel="canonical" href={fullUrl} />
      <link rel="icon" href={`${SITE.base}icon.png`} />
      <link rel="apple-touch-icon" href={`${SITE.base}icon.png`} />
      <title>{pageTitle}</title>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
