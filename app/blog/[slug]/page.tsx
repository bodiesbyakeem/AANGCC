import { Metadata } from "next";
import { BLOG_POSTS } from "../data";
import BlogPostClient from "./BlogPostClient";

const SITE_URL = "https://www.allassnogascyclingclub.com";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found | AANGCC Blog",
      description: "The article you are looking for could not be found.",
    };
  }

  const canonical = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} | AANGCC Blog — Austin Cycling`,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      siteName: "All Ass No Gas Cycling Club",
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
      type: "article",
      publishedTime: post.date,
      authors: ["All Ass No Gas Cycling Club"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  const articleSchema = post ? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date || "2025-01-01",
    dateModified: post.date || "2025-01-01",
    author: {
      "@type": "Organization",
      name: "All Ass No Gas Cycling Club",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "All Ass No Gas Cycling Club",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/club-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  } : null;

  const breadcrumbSchema = post ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.category, item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 4, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  } : null;

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <BlogPostClient slug={params.slug} />
    </>
  );
}
