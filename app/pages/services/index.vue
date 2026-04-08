<template>
  <div class="min-h-svh bg-ops-navy selection:bg-accent selection:text-white">

    <div 
      class="sticky z-40 bg-ops-navy/90 backdrop-blur-xl border-b border-white/5 transition-[top] duration-300 ease-in-out"
      :class="isScrollingUp ? 'top-18' : 'top-0'"
    >
      <div class="max-w-300 mx-auto px-5">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-5 md:py-0 md:h-18">

          <div class="flex items-center gap-4 shrink-0">
            <span class="text-label text-accent">Our Services</span>
            <span class="hidden md:block w-px h-3 bg-white/20" />
            <h1 class="hidden md:block text-[14px] font-medium text-text-secondary">
              {{ activeCategory.label }}
            </h1>
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

                <div class="flex items-center justify-between">
                  <span class="text-[15px] font-semibold text-white">{{ activeCategory.services[0].headline }}</span>
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
              Talk to us
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