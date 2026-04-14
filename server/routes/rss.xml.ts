import { Feed } from 'feed'
import { desc, eq } from 'drizzle-orm'
import { db } from '../utils/db' // Note: Adjust this relative path if needed!
import { insights } from '../database/schema' // Note: Adjust this relative path if needed!

export default defineEventHandler(async (event) => {
  // 1. Set the content type so browsers know it's XML
  appendHeader(event, 'Content-Type', 'application/xml')

  // 2. Initialize the Feed object
  const feed = new Feed({
    title: "Orderly Problem Solvers Insights",
    description: "Read our latest insights on software, operations, and scaling.",
    id: "https://www.orderlyproblemsolvers.com/",
    link: "https://www.orderlyproblemsolvers.com/",
    language: "en",
    image: "https://www.orderlyproblemsolvers.com/logo.png",
    favicon: "https://www.orderlyproblemsolvers.com/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, Orderly Problem Solvers`,
    generator: "Nuxt 3 RSS Feed",
  })

  try {
    // 3. Query the database directly using Drizzle
    const posts = await db.select({
      title: insights.title,
      slug: insights.slug,
      excerpt: insights.excerpt,
      content: insights.content, // <-- Uncomment if you ever want full articles in your RSS feed
      coverImage: insights.coverImage,
      createdAt: insights.createdAt,
    })
    .from(insights)
    .where(eq(insights.isPublished, true))
    .orderBy(desc(insights.createdAt))
    .limit(20); // It's best practice to limit an RSS feed to the 20-50 most recent posts

    // 4. Map the DB results directly into the RSS feed
    posts.forEach((post) => {
      feed.addItem({
        title: post.title,
        id: `https://www.orderlyproblemsolvers.com/insights/${post.slug}`,
        link: `https://www.orderlyproblemsolvers.com/insights/${post.slug}`,
        description: post.excerpt, // Excerpt-only feed based on your query
        // content: post.content, // <-- Uncomment if you fetched content above
        author: [
          {
            name: "Orderly Problem Solvers",
            email: "orderlyproblemsolvers@gmail.com",
            link: "https://www.orderlyproblemsolvers.com"
          }
        ],
        // Drizzle might return a Date object or string depending on your schema.
        // Wrapping it in new Date() ensures the feed package formats it correctly.
        date: new Date(post.createdAt), 
        image: post.coverImage ? post.coverImage : undefined 
      })
    })

  } catch (error) {
    console.error('Error generating RSS feed:', error)
  }

  // 5. Return the feed as an RSS 2.0 string
  return feed.rss2()
})