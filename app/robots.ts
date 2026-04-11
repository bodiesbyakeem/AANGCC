import { MetadataRoute } from "next";

const SITE_URL = "https://www.allassnogascyclingclub.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/portal",
          "/portal/",
          "/admin/",
          "/api/",
          "/auth/",
          "/checkin/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

