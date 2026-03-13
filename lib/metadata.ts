  import type { Metadata } from "next";
  import seo from "@/config/seo.json";

  export const siteMetadata: Metadata = {
    metadataBase: new URL(seo.site.url),

    title: {
      default: seo.site.name,
      template: `%s | ${seo.site.name}`,
    },
    icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", rel: "icon" }, // Ana dizindeki ico
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/favicon/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/favicon/android-chrome-512x512.png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  
    description: seo.site.description,

    keywords: seo.keywords,

    authors: [{ name: "Ali Köksal" }],
    creator: "Ali Köksal",

    openGraph: {
      title: seo.site.name,
      description: seo.site.description,
      url: seo.site.url,
      siteName: seo.site.name,
      locale: seo.site.locale,
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: seo.site.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: seo.site.name,
      description: seo.site.description,
      site: seo.social.twitter,
      creator: seo.social.twitter,
    },

    alternates: {
      canonical: seo.site.url,
    },
  };
