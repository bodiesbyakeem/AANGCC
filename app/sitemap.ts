import { MetadataRoute } from "next";
import { BLOG_POSTS } from "./blog/data";

const SITE_URL = "https://www.allassnogascyclingclub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about/we-support`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/rides`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/rides/levels`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/rides/ms150`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/rides/alz`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/rides/rosedale`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/rides/photos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/membership/join`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/membership/why-join`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/donate`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/more/sponsorship`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/more/club-rules`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/more/code-of-conduct`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/more/waiver`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/waiver`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/sponsors/contract`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  // Blog posts — dynamic from data
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date).toISOString() : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}

