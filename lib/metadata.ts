import type { Metadata } from "next";
import seo from "@/config/seo.json";

export const siteMetadata: Metadata = {
  metadataBase: new URL(seo.site.url),

  title: {
    default: seo.site.name,
    template: `%s | ${seo.site.name}`,
  },

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
