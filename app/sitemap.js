import { getAllPosts } from "../lib/sanity";

export default async function sitemap() {
  const base = "https://strofes.gr";
  const posts = await getAllPosts();

  const postUrls = posts
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${base}/arthro/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...postUrls,
  ];
}
