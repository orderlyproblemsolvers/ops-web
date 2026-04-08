import { defineEventHandler } from 'h3'
// Safe relative import or use alias like '~/utils/servicesData'
import { serviceCategories } from '../../../app/utils/servicesData'

export default defineEventHandler(async () => {
  const urls: any[] = []

  // 1. Map Service & Category Routes
  serviceCategories.forEach(category => {
    urls.push({
      loc: `/services/${category.id}`,
      changefreq: 'monthly',
      priority: 0.9
    })
    
    category.services.forEach(service => {
      urls.push({
        loc: `/services/${category.id}/${service.slug}`,
        changefreq: 'monthly',
        priority: 0.8
      })
    })
  })

  // 2. Fetch Dynamic Insights
  try {
    // Note: Internal $fetch works great at runtime. 
    const posts: any = await $fetch('/api/public/insights')
    
    if (posts && Array.isArray(posts)) {
      urls.push(...posts.map((post: any) => ({
        loc: `/insights/${post.slug}`,
        // Ensure lastmod is a valid ISO string
        lastmod: new Date(post.updatedAt || post.createdAt).toISOString(), 
        changefreq: 'monthly',
        priority: 0.7
      })))
    }
  } catch (error) {
    // Log error but don't crash the whole sitemap generation
    console.error('Sitemap fetch error:', error)
  }

  return urls
})