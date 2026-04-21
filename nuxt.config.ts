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
      meta: [
        { 
          name: 'keywords', 
          content: 'orderly problem solvers, custom software development, bespoke software solutions, tailored tech solutions, custom web applications, enterprise software architecture, software modernization, system integration, custom app development, software engineering consulting, automated software solutions, custom SaaS development, legacy system upgrades, bespoke business software, API development, scalable software systems, digital transformation, full stack development, tech debt resolution, custom internal tools, structured problem solving, logical solutions, systematic approach, business consultants, strategic consulting, organizational strategies, business transformation, change management, solution architecture, business optimization, process improvement, workflow optimization, business efficiency, operational excellence, process engineering, workflow automation, efficiency consulting, root cause analysis, data-driven decisions, analytical problem solving, gap analysis, process mapping, crisis management, agile methodologies, risk mitigation, effective troubleshooting, problem resolution, task management, orderly workflow, innovative solutions' 
        }
      ],
      link: [
        // Standard Favicon
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Modern PNG favicons (optional but recommended)
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icon-16x16.png' },
        // Apple Touch Icon for iOS homescreens (optional but recommended)
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        // Your existing RSS feed
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