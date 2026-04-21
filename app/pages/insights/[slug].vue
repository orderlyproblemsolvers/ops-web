<template>
  <div>

    <!-- ─── Scroll progress bar ────────────────────────────────────────────── -->
    <div class="fixed top-0 left-0 right-0 z-[9001] h-[2px] pointer-events-none">
      <div
        class="h-full bg-accent origin-left"
        :style="{ transform: `scaleX(${scrollProgress / 100})` }"
      />
    </div>

    <div class="min-h-svh bg-white pt-10 lg:pt-32 pb-[80px] lg:pb-35 selection:bg-accent/15 selection:text-accent">

      <div v-if="status === 'pending'" class="flex justify-center py-32">
        <UIcon name="i-lucide-loader-circle" class="w-10 h-10 animate-spin text-gray-300" />
      </div>

      <div v-else-if="error || !post" class="text-center py-32 max-w-xl mx-auto px-5">
        <div class="w-16 h-16 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mb-6 mx-auto">
          <svg class="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-3">Insight not found</h1>
        <p class="text-[15px] text-gray-500 mb-8">This post may have been removed, unpublished, or the URL is incorrect.</p>
        <NuxtLink to="/insights" class="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gray-50 border border-gray-200 text-gray-700 text-[14px] font-medium hover:bg-gray-100 transition-colors duration-200">
          Back to Insights
        </NuxtLink>
      </div>

      <article v-else ref="articleRef" class="max-w-190 mx-auto px-5 opacity-0 animate-fade-up" style="animation-delay: 100ms; animation-fill-mode: forwards;">

        <NuxtLink to="/insights" class="text-[14px] font-medium text-gray-400 hover:text-gray-900 mb-6 inline-flex items-center gap-1.5 transition-colors duration-200 group">
          <svg class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          All Insights
        </NuxtLink>

        <header class="mb-2">
          <div class="flex flex-wrap items-center gap-3 mb-5">
            <span class="text-[11px] font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200 uppercase tracking-wide">
              {{ post.category }}
            </span>
            <span class="w-1 h-1 rounded-full bg-gray-300" />
            <span class="text-[13px] font-medium text-gray-400">{{ post.format }}</span>
            <span class="w-1 h-1 rounded-full bg-gray-300" />
            <span class="text-[13px] text-gray-400">{{ formatDate(post.createdAt as string) }}</span>
          </div>

          <h1 class="text-[clamp(28px,4vw,48px)] font-bold text-gray-900 tracking-tight leading-[1.1] mb-5">
            {{ post.title }}
          </h1>

          <p v-if="post.excerpt" class="text-[clamp(16px,2vw,20px)] text-gray-500 leading-relaxed">
            {{ post.excerpt }}
          </p>
        </header>

        <!-- Share bar -->
        <div class="flex items-center gap-3 py-2 border-y border-gray-100 mb-4">
          <span class="text-[13px] font-medium text-gray-400 mr-2">Share:</span>
          <button
            @click="shareToTwitter"
            class="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all duration-200"
            aria-label="Share on X (Twitter)"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.004 4.076H5.036z"/></svg>
          </button>
          <button
            @click="shareToLinkedIn"
            class="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all duration-200"
            aria-label="Share on LinkedIn"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </button>
          <button
            @click="copyLink"
            class="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all duration-200"
            aria-label="Copy link"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
          </button>
        </div>

        <div v-if="post.coverImage" class="w-full rounded-[16px] overflow-hidden mb-12 border border-gray-100 aspect-video">
          <img :src="post.coverImage" :alt="post.title" class="w-full h-full object-cover" />
        </div>

        <div ref="contentRef" class="tiptap-content" v-html="post.content" />

      </article>

      <!-- Related posts -->
      <div v-if="relatedPosts?.length" class="max-w-190 mx-auto px-5 mt-20 pt-12 border-t border-gray-100">
        <h3 class="text-[20px] font-bold text-gray-900 mb-6">Keep Reading</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <NuxtLink
            v-for="related in relatedPosts"
            :key="related.id"
            :to="`/insights/${related.slug}`"
            class="group bg-white border border-gray-200 rounded-[16px] flex flex-col hover:border-accent/30 transition-colors duration-300 overflow-hidden"
            @click="handleRelatedClick(related)"
          >
            <div class="aspect-video w-full overflow-hidden relative border-b border-gray-100 shrink-0">
              <img v-if="related.coverImage" :src="related.coverImage" :alt="related.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div v-else class="absolute inset-0 bg-gray-50 flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
            </div>
            <div class="p-5 flex flex-col flex-1">
              <div class="flex items-center gap-2.5 mb-2.5">
                <span class="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{{ related.category }}</span>
                <span class="w-1 h-1 rounded-full bg-gray-300" />
                <span class="text-[12px] text-gray-400">{{ formatDate(related.createdAt as string) }}</span>
              </div>
              <h4 class="text-[16px] font-bold text-gray-900 leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-2">
                {{ related.title }}
              </h4>
            </div>
          </NuxtLink>
        </div>
      </div>

    </div>

    <!-- ─── Copy-to-quote popover ──────────────────────────────────────────── -->
    <Transition name="popover">
      <div
        v-if="quotePopover.visible"
        class="fixed z-[9002] pointer-events-none"
        :style="{ left: `${quotePopover.x}px`, top: `${quotePopover.y}px` }"
      >
        <div class="-translate-x-1/2 -translate-y-full -mt-2 pointer-events-auto">
          <button
            @mousedown.prevent="copyQuote"
            class="flex items-center gap-1.5 bg-gray-900 text-white text-[12px] font-medium px-3 py-2 rounded-lg shadow-xl hover:bg-gray-800 transition-colors duration-150 whitespace-nowrap"
          >
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            Copy quote
          </button>
          <div class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-gray-900" />
        </div>
      </div>
    </Transition>

    <!-- ─── Sticky share CTA ───────────────────────────────────────────────── -->
    <Transition name="sticky-share">
      <div
        v-if="showStickyShare"
        class="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-[9000]"
      >
        <div class="flex items-center justify-center gap-2 bg-gray-900/95 backdrop-blur-sm rounded-full pl-4 pr-2 py-2 shadow-2xl border border-white/10 w-full sm:w-auto">
          <span class="text-[12px] font-medium text-white/60 hidden sm:block">Share this insight</span>
          <div class="w-px h-4 bg-white/15 mx-1 hidden sm:block" />
          <button
            @click="shareToTwitter"
            class="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-150"
            aria-label="Share on X (Twitter)"
          >
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.004 4.076H5.036z"/></svg>
          </button>
          <button
            @click="shareToLinkedIn"
            class="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-150"
            aria-label="Share on LinkedIn"
          >
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </button>
          <button
            @click="copyLink"
            class="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-150"
            aria-label="Copy link"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
          </button>
        </div>
      </div>
    </Transition>

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

// ─── Scroll progress ───────────────────────────────────────────────────────────

const scrollProgress = ref(0)
const showStickyShare = ref(false)
let progressTicking = false

const updateProgress = () => {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const pct = docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0
  scrollProgress.value = pct
  if (pct >= 40) showStickyShare.value = true
  else if (pct < 35) showStickyShare.value = false
  progressTicking = false
}

const handleProgressScroll = () => {
  if (!progressTicking) {
    requestAnimationFrame(updateProgress)
    progressTicking = true
  }
}

// ─── Copy-to-quote ─────────────────────────────────────────────────────────────

const quotePopover = ref({ visible: false, x: 0, y: 0, text: '' })
const MIN_QUOTE_LENGTH = 20

const handleSelectionEnd = () => {
  const selection = window.getSelection()

  if (!selection || selection.isCollapsed) {
    quotePopover.value.visible = false
    return
  }

  const text = selection.toString().trim()
  if (text.length < MIN_QUOTE_LENGTH) {
    quotePopover.value.visible = false
    return
  }

  const range = selection.getRangeAt(0)
  if (!articleRef.value?.contains(range.commonAncestorContainer)) {
    quotePopover.value.visible = false
    return
  }

  const rect = range.getBoundingClientRect()
  quotePopover.value = {
    visible: true,
    x: rect.left + rect.width / 2 + window.scrollX,
    y: rect.top + window.scrollY,
    text,
  }
}

const handleDocMouseDown = (e: MouseEvent) => {
  const popoverEl = document.querySelector('[data-quote-popover]')
  if (popoverEl && popoverEl.contains(e.target as Node)) return
  quotePopover.value.visible = false
}

async function copyQuote() {
  const slug = route.params.slug
  const url = `https://www.orderlyproblemsolvers.com/insights/${slug}`
  const formatted = `"${quotePopover.value.text}"\n\n— ${post.value?.title}\n${url}`
  await navigator.clipboard.writeText(formatted)
  toast.add({ title: 'Quote copied to clipboard', color: 'primary' })
  quotePopover.value.visible = false
  window.getSelection()?.removeAllRanges()
  track('quote_copied', {
    article_title: post.value?.title,
    article_slug: slug,
    quote_length: quotePopover.value.text.length,
  })
}

// ─── Analytics ────────────────────────────────────────────────────────────────

const track = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', eventName, params)
}

// ─── Read depth tracking ───────────────────────────────────────────────────────

const articleRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const readDepthReached = ref(new Set<number>())
let readDepthObserver: IntersectionObserver | null = null
const READ_MILESTONES = [25, 50, 75, 100]

// ─── Time on page tracking ────────────────────────────────────────────────────

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
  window.addEventListener('scroll', handleProgressScroll, { passive: true })
  document.addEventListener('mouseup', handleSelectionEnd)
  document.addEventListener('touchend', handleSelectionEnd)
  document.addEventListener('mousedown', handleDocMouseDown)
  updateProgress()

  if (contentRef.value) {
    contentRef.value.addEventListener('click', handleContentClick)
  }

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
  window.removeEventListener('scroll', handleProgressScroll)
  document.removeEventListener('mouseup', handleSelectionEnd)
  document.removeEventListener('touchend', handleSelectionEnd)
  document.removeEventListener('mousedown', handleDocMouseDown)
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
  track('article_share', { article_title: post.value.title, article_slug: route.params.slug, platform: 'twitter' })
  const text = encodeURIComponent(`Check out this insight from Orderly Problem Solvers: ${post.value.title}`)
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl.value)}&text=${text}`, '_blank', 'width=550,height=400')
}

function shareToLinkedIn() {
  if (!post.value) return
  track('article_share', { article_title: post.value.title, article_slug: route.params.slug, platform: 'linkedin' })
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl.value)}`, '_blank', 'width=550,height=400')
}

function copyLink() {
  if (!post.value) return
  track('article_share', { article_title: post.value.title, article_slug: route.params.slug, platform: 'copy_link' })
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
    robots: 'max-image-preview:large',
  })
  defineOgImage('OpsTemplate', {
    title: post.value.title,
    description: truncateText(post.value.excerpt as string, 18),
    badge: post.value.category || 'Article'
  })
} else {
  useSeoMeta({ title: 'Insight Not Found | OPS Insights' })
}

useHead({
  link: [{ rel: 'alternate', type: 'application/rss+xml', title: 'Orderly Problem Solvers Insights', href: 'https://www.orderlyproblemsolvers.com/rss.xml' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => {
        if (!post.value) return null
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.orderlyproblemsolvers.com/insights/${route.params.slug}` },
          "headline": post.value.title,
          "description": post.value.excerpt,
          "image": post.value.coverImage,
          "datePublished": post.value.createdAt,
          "dateModified": post.value.updatedAt || post.value.createdAt,
          "author": { "@type": "Organization", "name": "Orderly Problem Solvers", "url": "https://www.orderlyproblemsolvers.com" },
          "publisher": { "@type": "Organization", "name": "Orderly Problem Solvers", "logo": { "@type": "ImageObject", "url": "https://www.orderlyproblemsolvers.com/logo.png" } }
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

/* ─── Popover transition ─────────────────────────────────────────────────── */
.popover-enter-active { transition: opacity 120ms ease, transform 120ms ease; }
.popover-leave-active { transition: opacity 80ms ease, transform 80ms ease; }
.popover-enter-from,
.popover-leave-to    { opacity: 0; transform: translateY(4px); }

/* ─── Sticky share transition ────────────────────────────────────────────── */
.sticky-share-enter-active { transition: opacity 200ms ease, transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1); }
.sticky-share-leave-active { transition: opacity 150ms ease, transform 150ms ease-in; }
.sticky-share-enter-from,
.sticky-share-leave-to     { opacity: 0; transform: translateY(16px); }

/* ─── TipTap Light Mode Styling ───────────────────────────────────────────── */
.tiptap-content {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: #374151;
}

:deep(.tiptap-content h2) { font-size: 1.65rem; font-weight: 600; color: #111827; margin-top: 2.5rem; margin-bottom: 1rem; line-height: 1.3; text-decoration: underline; text-decoration-color: #118ab2; text-underline-offset: 4px; }
:deep(.tiptap-content h3) { font-size: 1.25rem; font-weight: 600; color: #111827; margin-top: 2rem; margin-bottom: 0.875rem; line-height: 1.3; }

:deep(.tiptap-content p) { margin-bottom: 1.4rem; }

:deep(.tiptap-content a) { color: #118ab2; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(17,138,178,0.35); transition: all 0.2s; }
:deep(.tiptap-content a:hover) { color: #0d6e8e; text-decoration-color: #0d6e8e; }

:deep(.tiptap-content ul) { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
:deep(.tiptap-content ol) { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; }
:deep(.tiptap-content li) { margin-bottom: 0.5rem; }
:deep(.tiptap-content li p) { margin: 0; }

:deep(.tiptap-content img) { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 0.875rem; margin: 2rem 0; border: 1px solid #f3f4f6; display: block; }

:deep(.tiptap-content pre) { background: #f9fafb; border: 1px solid #e5e7eb; color: #111827; font-family: 'JetBrainsMono', ui-monospace, monospace; font-size: 0.875rem; padding: 1.25rem; border-radius: 0.875rem; margin: 2rem 0; overflow-x: auto; }
:deep(.tiptap-content code) { font-family: 'JetBrainsMono', ui-monospace, monospace; font-size: 0.85em; background: #f3f4f6; color: #118ab2; padding: 0.2rem 0.4rem; border-radius: 0.375rem; }
:deep(.tiptap-content pre code) { background: transparent; color: inherit; padding: 0; }

:deep(.tiptap-content blockquote) { border-left: 3px solid #118ab2; padding-left: 1.25rem; margin-left: 0; margin-right: 0; margin-bottom: 2rem; font-style: italic; font-size: 1.15rem; color: #4b5563; background: linear-gradient(to right, rgba(17,138,178,0.04), transparent); padding-top: 0.5rem; padding-bottom: 0.5rem; border-radius: 0 0.5rem 0.5rem 0; }

:deep(.tiptap-content table) { border-collapse: collapse; width: 100%; margin: 2rem 0; border-radius: 0.75rem; border-style: hidden; box-shadow: 0 0 0 1px #e5e7eb; display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; white-space: nowrap; }
:deep(.tiptap-content td), :deep(.tiptap-content th) { border: 1px solid #e5e7eb; padding: 0.875rem 1.125rem; vertical-align: top; }
:deep(.tiptap-content th) { background-color: #f9fafb; font-weight: 600; text-align: left; color: #111827; }

:deep(.tiptap-content .iframe-wrapper) { position: relative; width: 100%; padding-top: 56.25%; border-radius: 0.875rem; overflow: hidden; margin: 2.5rem 0; background: #000; border: 1px solid #e5e7eb; }
:deep(.tiptap-content .iframe-wrapper iframe) { position: absolute; inset: 0; width: 100% !important; height: 100% !important; border: none; }
</style>