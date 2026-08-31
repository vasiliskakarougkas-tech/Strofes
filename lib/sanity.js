import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'nbsi8x6y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

export async function getAllPosts() {
  try {
    return await client.fetch(
      `*[_type == "article"] | order(publishedAt desc){
        _id, title, "slug": slug.current, section, mainImage, tag, category, excerpt, score, readTime, publishedAt
      }`
    )
  } catch (err) {
    console.error("Sanity getAllPosts failed:", err.message)
    return []
  }
}

export async function getArticleBySlug(slug) {
  try {
    return await client.fetch(
      `*[_type == "article" && slug.current == $slug][0]{
        _id, title, section, mainImage, tag, category, excerpt, body, score, readTime, publishedAt
      }`,
      { slug }
    )
  } catch (err) {
    console.error("Sanity getArticleBySlug failed:", err.message)
    return null
  }
}
