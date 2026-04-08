<template>
  <div class="min-h-svh bg-ops-navy pt-10 lg:pt-32 pb-[80px] lg:pb-35 selection:bg-accent selection:text-white">
    
    <div v-if="status === 'pending'" class="flex justify-center py-32">
      <UIcon name="i-lucide-loader-circle" class="w-10 h-10 animate-spin text-white/20" />
    </div>

    <div v-else-if="error || !post" class="text-center py-32 max-w-xl mx-auto px-5">
      <div class="w-16 h-16 rounded-full bg-white/4 border border-white/10 flex items-center justify-center mb-6 mx-auto">
        <svg class="w-7 h-7 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-text-primary mb-3">Insight not found</h1>
      <p class="text-[15px] text-text-secondary mb-8">This post may have been removed, unpublished, or the URL is incorrect.</p>
      <NuxtLink to="/insights" class="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/5 border border-white/10 text-text-primary text-[14px] font-medium hover:bg-white/10 transition-colors duration-200">
        Back to Insights
      </NuxtLink>
    </div>

    <article v-else ref="articleRef" class="max-w-190 mx-auto px-5 opacity-0 animate-fade-up" style="animation-delay: 100ms; animation-fill-mode: forwards;">
      
      <NuxtLink to="/insights" class="text-[14px] font-medium text-text-tertiary hover:text-white mb-10 inline-flex items-center gap-1.5 transition-colors duration-200 group">
        <svg class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        All Insights
      </NuxtLink>

      <header class="mb-12">
        <div class="flex flex-wrap items-center gap-3 mb-6">
          <span class="text-[11px] font-medium text-white/80 bg-white/8 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-wide">
            {{ post.category }}
          </span>
          <span class="w-1 h-1 rounded-full bg-white/20"></span>
          <span class="text-[13px] font-medium text-text-tertiary">{{ post.format }}</span>
          <span class="w-1 h-1 rounded-full bg-white/20"></span>
          <span class="text-[13px] text-text-tertiary">{{ formatDate(post.createdAt as string) }}</span>
        </div>
        
        <h1 class="text-[clamp(32px,5vw,56px)] font-bold text-text-primary tracking-tight leading-[1.1] mb-6">
          {{ post.title }}
        </h1>
        
        <p v-if="post.excerpt" class="text-[clamp(18px,2.5vw,22px)] text-text-secondary leading-relaxed">
          {{ post.excerpt }}
        </p>
      </header>

      <!-- Share bar -->
      <div class="flex items-center gap-3 py-6 border-y border-white/5 mb-12">
        <span class="text-[13px] font-medium text-text-tertiary mr-2">Share:</span>
        <button
          @click="shareToTwitter"
          class="w-9 h-9 rounded-full bg-white/4 border border-white/5 hover:bg-white/10 hover:border-white/20 flex items-center justify-center text-text-secondary hover:text-white transition-all duration-200"
          aria-label="Share on X (Twitter)"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.004 4.076H5.036z"/></svg>
        </button>
        <button
          @click="shareToLinkedIn"
          class="w-9 h-9 rounded-full bg-white/4 border border-white/5 hover:bg-white/10 hover:border-white/20 flex items-center justify-center text-text-secondary hover:text-white transition-all duration-200"
          aria-label="Share on LinkedIn"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </button>
        <button
          @click="copyLink"
          class="w-9 h-9 rounded-full bg-white/4 border border-white/5 hover:bg-white/10 hover:border-white/20 flex items-center justify-center text-text-secondary hover:text-white transition-all duration-200"
          aria-label="Copy link"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
        </button>
      </div>

      <div v-if="post.coverImage" class="w-full h-auto rounded-[20px] overflow-hidden mb-16 border border-white/5 bg-white/5">
        <img :src="post.coverImage" :alt="post.title" class="w-full h-full object-cover" />
      </div>

      <!-- Article body — ref used for read depth + outbound link tracking -->
      <div ref="contentRef" class="tiptap-content" v-html="post.content"></div>
      
    </article>

    <!-- Related posts -->
    <div v-if="relatedPosts?.length" class="max-w-190 mx-auto px-5 mt-24 pt-16 border-t border-white/5">
      <h3 class="text-[24px] font-bold text-text-primary mb-8">Keep Reading</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <NuxtLink 
          v-for="related in relatedPosts" 
          :key="related.id" 
          :to="`/insights/${related.slug}`"
          class="group relative bg-ops-surface border border-white/5 rounded-[20px] flex flex-col hover:border-accent/30 hover:bg-ops-elevated transition-all duration-300 overflow-hidden"
          @click="handleRelatedClick(related)"
        >
          <div class="h-48 w-full overflow-hidden relative border-b border-white/5 shrink-0">
            <img v-if="related.coverImage" :src="related.coverImage" :alt="related.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            <div v-else class="absolute inset-0 bg-linear-to-br from-white/5 to-transparent flex items-center justify-center">
              <svg class="w-8 h-8 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
          </div>
          <div class="p-6 flex flex-col flex-1">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">{{ related.category }}</span>
              <span class="w-1 h-1 rounded-full bg-white/10"></span>
              <span class="text-[12px] text-text-tertiary">{{ formatDate(related.createdAt as string) }}</span>
            </div>
            <h4 class="text-[18px] font-bold text-text-primary leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-2">
              {{ related.title }}
            </h4>
          </div>
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useToast } from '#imports'

const route = useRoute()
const toast = useToast()

// ─── Data fetching ─────────────────────────────────────────────────────────────

const { data: post, status, error } = await useFetch(`/api/public/insights/${route.params.slug}`)

const { data: relatedPosts } = await useFetch('/api/public/insights', {
  transform: (posts) => posts.filter((p: any) => p.slug !== route.params.slug).slice(0, 2)
})

// ─── Analytics ────────────────────────────────────────────────────────────────

const track = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', eventName, params)
}

// ─── Read depth tracking ───────────────────────────────────────────────────────
// Fires once each time the reader crosses the 25 / 50 / 75 / 100% mark.

const articleRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const readDepthReached = ref(new Set<number>())
let readDepthObserver: IntersectionObserver | null = null

const READ_MILESTONES = [25, 50, 75, 100]

// ─── Time on page tracking ────────────────────────────────────────────────────
// Records how many seconds the user spent on the page when they leave.

let pageEntryTime = 0

const handleVisibilityChange = () => {
  if (document.visibilityState === 'hidden' && pageEntryTime) {
    const seconds = Math.round((Date.now() - pageEntryTime) / 1000)
    track('article_time_on_page', {
      article_title: post.value?.title,
      article_slug: route.params.slug,
      category: post.value?.category,
      seconds_spent: seconds,
    })
  }
}

// ─── Outbound link tracking ────────────────────────────────────────────────────
// Listens for clicks on any <a> inside the TipTap content that goes to an external domain.

const handleContentClick = (e: MouseEvent) => {
  const target = (e.target as HTMLElement).closest('a')
  if (!target) return

  const href = target.getAttribute('href') || ''
  const isExternal = href.startsWith('http') && !href.includes('orderlyproblemsolvers.com')

  if (isExternal) {
    track('outbound_link_click', {
      article_title: post.value?.title,
      article_slug: route.params.slug,
      destination_url: href,
    })
  }
}

onMounted(() => {
  pageEntryTime = Date.now()
  document.addEventListener('visibilitychange', handleVisibilityChange)

  // Outbound link listener on the TipTap content div
  if (contentRef.value) {
    contentRef.value.addEventListener('click', handleContentClick)
  }

  // Read depth — create one sentinel div per milestone, absolutely positioned
  // at the corresponding % of the article height, then observe each one.
  if (articleRef.value) {
    const article = articleRef.value

    READ_MILESTONES.forEach((milestone) => {
      const sentinel = document.createElement('div')
      sentinel.dataset.milestone = String(milestone)
      sentinel.style.cssText = `position:absolute;left:0;width:1px;height:1px;top:${milestone}%;pointer-events:none;`
      article.style.position = 'relative'
      article.appendChild(sentinel)

      readDepthObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const pct = Number((entry.target as HTMLElement).dataset.milestone)
            if (readDepthReached.value.has(pct)) return

            readDepthReached.value.add(pct)
            track('article_read_depth', {
              article_title: post.value?.title,
              article_slug: route.params.slug,
              category: post.value?.category,
              percent_read: pct,
            })

            readDepthObserver?.unobserve(entry.target)
          })
        },
        { threshold: 0 }
      )

      readDepthObserver.observe(sentinel)
    })
  }
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  contentRef.value?.removeEventListener('click', handleContentClick)
  readDepthObserver?.disconnect()
})

// ─── Share functions ───────────────────────────────────────────────────────────

const pageUrl = computed(() => {
  if (import.meta.client) return window.location.href
  return ''
})

function shareToTwitter() {
  if (!post.value) return
  track('article_share', {
    article_title: post.value.title,
    article_slug: route.params.slug,
    platform: 'twitter',
  })
  const text = encodeURIComponent(`Check out this insight from Orderly Problem Solvers: ${post.value.title}`)
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl.value)}&text=${text}`, '_blank', 'width=550,height=400')
}

function shareToLinkedIn() {
  if (!post.value) return
  track('article_share', {
    article_title: post.value.title,
    article_slug: route.params.slug,
    platform: 'linkedin',
  })
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl.value)}`, '_blank', 'width=550,height=400')
}

function copyLink() {
  if (!post.value) return
  track('article_share', {
    article_title: post.value.title,
    article_slug: route.params.slug,
    platform: 'copy_link',
  })
  navigator.clipboard.writeText(pageUrl.value)
  toast.add({ title: 'Link copied to clipboard', color: 'primary' })
}

// ─── Related post clicks ───────────────────────────────────────────────────────

function handleRelatedClick(related: { title: string; slug: string; category: string }) {
  track('related_post_click', {
    from_article: post.value?.title,
    from_slug: route.params.slug,
    to_article: related.title,
    to_slug: related.slug,
    to_category: related.category,
  })
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function truncateText(text: string | undefined, maxWords: number = 18) {
  if (!text) return 'Clear the path to scale with our latest strategies.'
  const words = text.split(' ')
  if (words.length <= maxWords) return text
  return words.slice(0, maxWords).join(' ') + '...'
}

function formatDate(dateString: string) {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(dateString))
}

// ─── SEO ──────────────────────────────────────────────────────────────────────

if (post.value) {
  useSeoMeta({
    title: `${post.value.title}`,
    ogTitle: `${post.value.title}`,
    description: post.value.excerpt || 'Read our latest insights on software and scaling.',
  })

  defineOgImageComponent('OpsTemplate', {
    title: post.value.title,
    description: truncateText(post.value.excerpt as string, 18),
    badge: post.value.category || 'Article'
  })
} else {
  useSeoMeta({
    title: 'Insight Not Found | OPS Insights',
  })
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => {
        if (!post.value) return null
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.orderlyproblemsolvers.com/insights/${route.params.slug}`
          },
          "headline": post.value.title,
          "description": post.value.excerpt,
          "image": post.value.coverImage,
          "datePublished": post.value.createdAt,
          "dateModified": post.value.updatedAt || post.value.createdAt,
          "author": {
            "@type": "Organization",
            "name": "Orderly Problem Solvers"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Orderly Problem Solvers",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.orderlyproblemsolvers.com/logo.png"
            }
          }
        })
      })
    }
  ]
})
</script>

<style scoped>
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  animation: fade-up 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-up { animation: none; opacity: 1; transform: none; }
}

/* ── TipTap OPS Navy Styling ─────────────────────────────────────────────── */
.tiptap-content {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #a1a1aa;
}

:deep(.tiptap-content h2) { font-size: 1.85rem; font-weight: 700; color: #ffffff; margin-top: 3rem; margin-bottom: 1.25rem; line-height: 1.3;}
:deep(.tiptap-content h3) { font-size: 1.4rem; font-weight: 600; color: #ffffff; margin-top: 2.25rem; margin-bottom: 1rem; line-height: 1.3; }

:deep(.tiptap-content p) { margin-bottom: 1.5rem; }

:deep(.tiptap-content a) { color: #118ab2; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(17, 138, 178, 0.4); transition: all 0.2s; }
:deep(.tiptap-content a:hover) { color: #ffffff; text-decoration-color: #ffffff; }

:deep(.tiptap-content ul) { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
:deep(.tiptap-content ol) { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; }
:deep(.tiptap-content li) { margin-bottom: 0.5rem; }
:deep(.tiptap-content li p) { margin: 0; }

:deep(.tiptap-content img) { width: 100%; height: auto; border-radius: 1rem; margin: 2.5rem 0; border: 1px solid rgba(255, 255, 255, 0.05); }

:deep(.tiptap-content pre) { background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.05); color: #e4e4e7; font-family: 'JetBrainsMono', ui-monospace, monospace; font-size: 0.9rem; padding: 1.25rem; border-radius: 1rem; margin: 2rem 0; overflow-x: auto; }
:deep(.tiptap-content code) { font-family: 'JetBrainsMono', ui-monospace, monospace; font-size: 0.85em; background: rgba(255, 255, 255, 0.05); color: #118ab2; padding: 0.2rem 0.4rem; border-radius: 0.375rem; }
:deep(.tiptap-content pre code) { background: transparent; color: inherit; padding: 0; }

:deep(.tiptap-content blockquote) { border-left: 4px solid #118ab2; padding-left: 1.5rem; margin-left: 0; margin-right: 0; margin-bottom: 2rem; font-style: italic; font-size: 1.25rem; color: #e4e4e7; background: linear-gradient(to right, rgba(17, 138, 178, 0.05), transparent); padding-top: 0.5rem; padding-bottom: 0.5rem; border-radius: 0 0.5rem 0.5rem 0; }

:deep(.tiptap-content table) { border-collapse: collapse; width: 100%; margin: 2rem 0; border-radius: 0.75rem; border-style: hidden; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05); display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; white-space: nowrap; }
:deep(.tiptap-content td), :deep(.tiptap-content th) { border: 1px solid rgba(255, 255, 255, 0.05); padding: 1rem 1.25rem; vertical-align: top; }
:deep(.tiptap-content th) { background-color: rgba(255, 255, 255, 0.03); font-weight: 600; text-align: left; color: #ffffff; }

:deep(.tiptap-content .iframe-wrapper) { position: relative; width: 100%; padding-top: 56.25%; border-radius: 1rem; overflow: hidden; margin: 2.5rem 0; background: #000; border: 1px solid rgba(255, 255, 255, 0.05); }
:deep(.tiptap-content .iframe-wrapper iframe) { position: absolute; inset: 0; width: 100% !important; height: 100% !important; border: none; }
</style>