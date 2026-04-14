// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  gtag: {
    id: process.env.NUXT_PUBLIC_GA_ID
  },
  app: {
    head: {
      link: [
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: 'Orderly Problem Solvers Insights',
          href: '/rss.xml'
        }
      ]
    }
  },
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
    'nuxt-seo-utils',
    'nuxt-gtag'
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    optimizeDeps: {
      include: [
        '@nuxt/ui > prosemirror-state',
        '@nuxt/ui > prosemirror-transform',
        '@nuxt/ui > prosemirror-model',
        '@nuxt/ui > prosemirror-view',
        '@nuxt/ui > prosemirror-gapcursor',
        'prosemirror-tables'
      ]
    }
  },
  typescript:{
    strict: false
  },
  runtimeConfig:{
    public: {
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
      cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
      gaId: process.env.NUXT_PUBLIC_GA_ID,
    }
  },
  ogImage: {
    enabled: true,
  },
  site: {
    url: 'https://orderlyproblemsolvers.com',
    name: 'Orderly Problem Solvers'
  },
   nitro: {
    preset: 'netlify',
    compressPublicAssets: true,
    minify: true
  },
  sitemap: {
    sources: [
      '/api/__sitemap__/urls' // This tells the module to call your handler
    ],
    exclude: [
      '/admin/**'
    ]
  },
  routeRules: {
    // This covers /admin and every sub-page like /admin/dashboard
    '/admin/**': { 
      // Optional: If you want to be extra safe, prevent these from being cached by CDNs
      cache: false 
    },
  }
})