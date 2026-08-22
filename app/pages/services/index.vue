<template>
  <div class="min-h-svh bg-ops-navy selection:bg-accent selection:text-white">

    <!-- ─── Core Services — the 3 services featured everywhere else on the site ── -->
    <div class="max-w-300 mx-auto px-5 pt-24 lg:pt-32 pb-16 lg:pb-20">
      <div class="mb-10 max-w-160">
        <span class="text-label text-accent block mb-4">Core Services</span>
        <h1 class="text-[clamp(32px,4vw,48px)] font-bold text-text-primary leading-tight tracking-tight mb-4">
          What we build, in three parts.
        </h1>
        <p class="text-[16px] text-text-secondary leading-relaxed">
          Everything we do rolls up into these three capabilities. The full catalog below breaks each one down further.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NuxtLink
          v-for="service in coreServices"
          :key="service.headline"
          :to="service.link"
          class="group relative flex flex-col p-7 rounded-[20px] bg-white/2 border border-white/5 hover:bg-white/6 hover:border-accent/40 transition-all duration-300"
        >
          <div class="icon-well mb-6">
            <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="service.iconPath" />
          </div>
          <h3 class="text-[18px] font-bold text-text-primary mb-2">{{ service.headline }}</h3>
          <p class="text-[14px] text-text-secondary leading-relaxed mb-6 flex-1">{{ service.body }}</p>
          <span class="text-[14px] text-accent font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
            Explore →
          </span>
        </NuxtLink>
      </div>
    </div>

    <!-- ─── Full Service Catalog — everything, including the 3 core services ──── -->
    <div class="max-w-300 mx-auto px-5 pb-6">
      <div class="pt-8 pb-2 border-t border-white/5">
        <span class="text-label text-accent block mb-2">Full Service Catalog</span>
        <p class="text-[14px] text-text-secondary">Every capability, broken down by category.</p>
      </div>
    </div>

    <div
      class="sticky z-40 bg-ops-navy/90 backdrop-blur-xl border-b border-white/5 transition-[top] duration-300 ease-in-out"
      :class="isScrollingUp ? 'top-18' : 'top-0'"
    >
      <div class="max-w-300 mx-auto px-5">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-5 md:py-0 md:h-18">

          <div class="flex items-center gap-4 shrink-0">
            <span class="text-label text-accent">Category</span>
            <span class="hidden md:block w-px h-3 bg-white/20" />
            <h2 class="hidden md:block text-[14px] font-medium text-text-secondary">
              {{ activeCategory.label }}
            </h2>
          </div>

          <div
            class="flex items-center gap-1.5 overflow-x-auto scrollbar-hide md:justify-end"
            role="tablist"
            aria-label="Service categories"
          >
            <button
              v-for="(category, i) in serviceCategories"
              :key="category.id"
              role="tab"
              :aria-selected="activeIndex === i"
              :aria-controls="`panel-${category.id}`"
              :id="`tab-${category.id}`"
              @click="setActive(i)"
              :class="[
                'relative shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ops-navy',
                activeIndex === i
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/6',
              ]"
            >
              {{ category.label }}
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="max-w-300 mx-auto px-5 pt-10 pb-10">
      <Transition name="panel-fade" mode="out-in">
        <div
          :key="activeIndex"
          :id="`panel-${activeCategory.id}`"
          role="tabpanel"
          :aria-labelledby="`tab-${activeCategory.id}`"
        >

          <div class="mb-8">
            <h2 class="text-[clamp(32px,4vw,52px)] font-bold text-text-primary leading-tight tracking-tight">
              {{ activeCategory.services[0].headline }}
            </h2>
            <p class="text-[16px] text-text-secondary mt-3 max-w-150 leading-relaxed">
              {{ activeCategory.services[0].body }}
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">

            <NuxtLink
              :to="activeCategory.services[0].link"
              class="group relative rounded-[20px] overflow-hidden flex flex-col justify-between min-h-100 md:min-h-130 border border-white/6 hover:border-accent/40 transition-all duration-300"
            >
              <div class="absolute inset-0 z-0" aria-hidden="true">
                <img
                  :src="activeCategory.heroBg"
                  :key="activeCategory.id"
                  alt=""
                  class="hero-img w-full h-full object-cover object-center"
                />
                <div class="absolute inset-0 bg-linear-to-t from-ops-navy via-ops-navy/70 to-ops-navy/20" />
              </div>

              <div class="relative z-10 flex flex-col justify-end h-full p-8 md:p-10">
                <div class="w-11 h-11 rounded-[11px] bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-6">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="activeCategory.services[0].iconPath" />
                </div>

                <div class="flex flex-wrap gap-2 mb-4">
                  <span
                    v-for="tag in activeCategory.services[0].tags"
                    :key="tag"
                    class="text-[11px] font-medium text-white/70 bg-white/8 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10"
                  >
                    {{ tag }}
                  </span>
                </div>

                <div class="flex items-center justify-end">
                  <span class="text-accent text-[15px] font-medium group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                    Explore →
                  </span>
                </div>
              </div>
            </NuxtLink>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
              <NuxtLink
                v-for="service in activeCategory.services.slice(1)"
                :key="service.headline"
                :to="service.link"
                class="group relative bg-ops-surface border border-white/5 rounded-card p-7 flex flex-col justify-between hover:border-accent/30 hover:bg-ops-elevated transition-all duration-250"
              >
                <div>
                  <div class="w-10 h-10 rounded-input bg-white/4 border border-white/[0.07] flex items-center justify-center mb-5">
                    <svg class="w-5 h-5 text-accent/70 group-hover:text-accent transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="service.iconPath" />
                  </div>
                  <h3 class="text-body font-semibold text-text-primary mb-2.5 leading-snug">
                    {{ service.headline }}
                  </h3>
                  <p class="text-[13px] text-text-secondary leading-relaxed">
                    {{ service.body }}
                  </p>
                </div>

                <div class="flex items-center justify-between mt-7">
                  <span class="text-[13px] text-accent/70 group-hover:text-accent font-medium transition-colors duration-200 inline-flex items-center gap-1 group-hover:translate-x-0.5">
                    Explore →
                  </span>
                  <div class="w-7 h-7 rounded-full border border-white/[0.07] group-hover:border-accent/30 flex items-center justify-center transition-colors duration-200">
                    <svg class="w-3 h-3 text-text-tertiary group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </NuxtLink>
            </div>

          </div>

          <div class="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p class="text-[14px] text-text-secondary">
              Need something tailored? We build custom solutions for complex problems.
            </p>
            <NuxtLink
              to="/contact"
              class="shrink-0 inline-flex items-center gap-2 text-[14px] font-medium text-accent hover:text-white transition-colors duration-200 group"
            >
              Start a conversation
              <span class="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
            </NuxtLink>
          </div>

        </div>
      </Transition>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { serviceCategories } from '~/utils/servicesData' // Imported explicitly for safety, though Nuxt auto-imports it

useSeoMeta({
  title: 'Services',
  description: 'Explore our full spectrum of digital operations including enterprise software, AI strategy, IT consulting, and digital presence.',
})

defineOgImage('OpsTemplate',{
  title: 'Services',
  description: 'Explore our full spectrum of digital operations including enterprise software, AI strategy, IT consulting, and digital presence.',
  badge: 'Services'
})

// ─── Core Services — the 3 services featured on the homepage/hero ────────────
const icons = {
  stack: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />',
  globe: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />',
  bolt: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />',
}

const coreServices = [
  {
    headline: 'ERP, LMS & MIS',
    body: 'Unified systems for running the business — enterprise resource planning, learning management, and management information systems.',
    link: '/services/software',
    iconPath: icons.stack,
  },
  {
    headline: 'Web & App Development',
    body: 'Websites and applications designed and engineered end to end — fast, accessible, and built to convert.',
    link: '/services/digital/web-design-development',
    iconPath: icons.globe,
  },
  {
    headline: 'Workflow Automation',
    body: 'Repeatable, judgment-based tasks turned into automated processes that run without a person watching.',
    link: '/services/ai/intelligent-automation',
    iconPath: icons.bolt,
  },
]

// --- Tab Logic ---
const activeIndex = ref(0)
const setActive = (i: number) => { activeIndex.value = i }

// Target the imported serviceCategories directly
const activeCategory = computed(() => serviceCategories[activeIndex.value])

// --- Scroll Sync Logic for Sticky Tabs ---
const isScrollingUp = ref(true)
let lastScrollPosition = 0

const handleScroll = () => {
  const currentScroll = window.scrollY

  if (currentScroll <= 72) {
    isScrollingUp.value = true
  } else {
    isScrollingUp.value = currentScroll < lastScrollPosition
  }

  lastScrollPosition = currentScroll
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }

/* Hero image — fades in with a subtle scale on tab switch */
@keyframes hero-img-in {
  from { opacity: 0; transform: scale(1.03); }
  to   { opacity: 0.60; transform: scale(1); }
}
.hero-img {
  animation: hero-img-in 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

/* Panel transition */
.panel-fade-enter-active {
  transition: opacity 260ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 260ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.panel-fade-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}
.panel-fade-enter-from { opacity: 0; transform: translateY(10px); }
.panel-fade-leave-to   { opacity: 0; transform: translateY(-4px); }

@media (prefers-reduced-motion: reduce) {
  .hero-img { animation: none; opacity: 0.60; }
  .panel-fade-enter-active,
  .panel-fade-leave-active { transition: opacity 120ms ease; }
  .panel-fade-enter-from,
  .panel-fade-leave-to { transform: none; }
}
</style>