<template>
  <div class="relative min-h-svh bg-ops-navy overflow-hidden selection:bg-accent selection:text-white pb-[80px]">
    
    <div class="grain" aria-hidden="true" />
    <div class="dot-grid dot-grid--left"  aria-hidden="true" />
    <div class="dot-grid dot-grid--right" aria-hidden="true" />
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-150 pointer-events-none z-0 animate-pulse-slow"
      style="background: radial-gradient(ellipse at 50% 40%, rgba(17,138,178,0.14) 0%, transparent 65%);"
    />

    <div v-if="!study" class="relative z-10 flex flex-col items-center justify-center pt-32">
      <h1 class="text-2xl font-bold text-white mb-4">Case Study Not Found</h1>
      <NuxtLink to="/case-studies" class="text-accent hover:underline">Return to all case studies</NuxtLink>
    </div>

    <div v-else class="relative z-10 max-w-300 mx-auto px-5 pt-24 lg:pt-32">
      
      <NuxtLink to="/case-studies" class="text-[13px] font-medium text-text-tertiary hover:text-white mb-10 inline-flex items-center gap-1.5 transition-colors duration-200 group opacity-0 animate-fade-up" style="animation-delay: 50ms; animation-fill-mode: forwards;">
        <svg class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        All Case Studies
      </NuxtLink>

      <div class="mb-16 opacity-0 animate-fade-up" style="animation-delay: 100ms; animation-fill-mode: forwards;">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-[12px] font-semibold text-text-secondary uppercase tracking-widest">{{ study.client }}</span>
          <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
          <span class="text-[12px] font-semibold text-text-secondary uppercase tracking-widest">{{ study.industry }}</span>
        </div>
        <h1 class="text-display font-bold text-text-primary leading-[1.1] tracking-tight max-w-4xl mb-6">
          {{ study.title }}
        </h1>
        <p class="text-[20px] text-text-secondary max-w-3xl leading-relaxed">
          {{ study.excerpt }}
        </p>
      </div>

      <div class="w-full h-64 sm:h-96 lg:h-125 rounded-[24px] overflow-hidden border border-white/5 bg-ops-surface mb-16 lg:mb-24 opacity-0 animate-fade-up" style="animation-delay: 200ms; animation-fill-mode: forwards;">
        <img :src="study.coverImage" :alt="study.title" class="w-full h-full object-cover" />
      </div>

      <div class="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 opacity-0 animate-fade-up" style="animation-delay: 300ms; animation-fill-mode: forwards;">
        
        <div class="lg:col-span-4 order-2 lg:order-1">
          <div class="sticky top-32 space-y-10">
            
            <div class="bg-ops-surface border border-white/5 rounded-[20px] p-8">
              <h3 class="text-[13px] font-bold text-accent uppercase tracking-widest mb-6">The Impact</h3>
              <div class="space-y-6">
                <div v-for="metric in study.metrics" :key="metric.label" class="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                  <div class="text-[32px] font-bold text-white mb-1 leading-none">{{ metric.value }}</div>
                  <div class="text-[13px] text-text-secondary">{{ metric.label }}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-[13px] font-bold text-text-tertiary uppercase tracking-widest mb-4">Services Applied</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in study.tags" :key="tag" class="text-[12px] font-medium text-text-secondary bg-white/4 border border-white/10 rounded-full px-3 py-1.5">
                  {{ tag }}
                </span>
              </div>
            </div>

          </div>
        </div>

        <div class="lg:col-span-8 order-1 lg:order-2 space-y-16">
          
          <section>
            <h2 class="text-[28px] font-bold text-text-primary mb-6 flex items-center gap-3">
              <span class="w-8 h-px bg-accent"></span> The Challenge
            </h2>
            <p class="text-[18px] text-text-secondary leading-[1.8]">
              {{ study.challenge }}
            </p>
          </section>

          <section>
            <h2 class="text-[28px] font-bold text-text-primary mb-6 flex items-center gap-3">
              <span class="w-8 h-px bg-accent"></span> The Solution
            </h2>
            <p class="text-[18px] text-text-secondary leading-[1.8]">
              {{ study.solution }}
            </p>
          </section>

          <section>
            <h2 class="text-[28px] font-bold text-text-primary mb-6 flex items-center gap-3">
              <span class="w-8 h-px bg-accent"></span> The Impact
            </h2>
            <p class="text-[18px] text-text-secondary leading-[1.8]">
              {{ study.impact }}
            </p>
          </section>

        </div>
      </div>

      <div class="mt-20 p-8 sm:p-12 bg-linear-to-br from-ops-surface to-ops-navy border border-white/10 rounded-[24px] opacity-0 animate-fade-up" style="animation-delay: 400ms; animation-fill-mode: forwards;">
        <h3 class="text-[24px] font-bold text-white mb-3">Facing a similar challenge?</h3>
        <p class="text-[16px] text-text-secondary mb-8 max-w-lg">Let's map out a strategy to bring order and efficiency to your operations. Consultations are completely free.</p>
        <NuxtLink to="/contact" class="inline-flex items-center justify-center px-7 py-3.5 rounded-button bg-white text-ops-navy font-bold hover:bg-gray-200 transition-colors">
          Talk to an Expert
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { caseStudies } from '~/utils/caseStudiesData'

const route = useRoute()

// Find the specific case study based on the URL slug
const study = computed(() => {
  return caseStudies.find(s => s.slug === route.params.slug)
})

// Dynamically set SEO metadata
useSeoMeta({
  title: () => study.value ? `${study.value.client} Case Study | OPS` : 'Case Study',
  description: () => study.value?.excerpt || 'Read our latest case study.',
  ogImage: () => study.value?.coverImage || '',
})
</script>

<style scoped>
/* ─── Grain noise ──────────────────────────────────────────────────────────── */
.grain {
  position: absolute;
  inset: 0;
  z-index: 30;
  pointer-events: none;
  opacity: 0.035;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 300px 300px;
}

/* ─── Dot grid panels ──────────────────────────────────────────────────────── */
.dot-grid {
  position: absolute;
  top: 0;
  bottom: 0;
  width: clamp(160px, 18vw, 280px);
  z-index: 1;
  pointer-events: none;
  opacity: 0.09;
  filter: blur(0.6px);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='10' cy='10' r='1.1' fill='%23ffffff'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 20px 20px;
}

.dot-grid--left {
  left: 0;
  mask-image: linear-gradient(
    to right,
    rgba(0,0,0,0.7) 0%,
    rgba(0,0,0,0.0) 100%
  ),
  linear-gradient(
    to bottom,
    transparent 0%,
    black 12%,
    black 78%,
    transparent 100%
  );
  mask-composite: intersect;
  -webkit-mask-image: linear-gradient(
    to right,
    rgba(0,0,0,0.7) 0%,
    rgba(0,0,0,0.0) 100%
  ),
  linear-gradient(
    to bottom,
    transparent 0%,
    black 12%,
    black 78%,
    transparent 100%
  );
  -webkit-mask-composite: source-in;
}

.dot-grid--right {
  right: 0;
  mask-image: linear-gradient(
    to left,
    rgba(0,0,0,0.7) 0%,
    rgba(0,0,0,0.0) 100%
  ),
  linear-gradient(
    to bottom,
    transparent 0%,
    black 12%,
    black 78%,
    transparent 100%
  );
  mask-composite: intersect;
  -webkit-mask-image: linear-gradient(
    to left,
    rgba(0,0,0,0.7) 0%,
    rgba(0,0,0,0.0) 100%
  ),
  linear-gradient(
    to bottom,
    transparent 0%,
    black 12%,
    black 78%,
    transparent 100%
  );
  -webkit-mask-composite: source-in;
}

/* ─── Animations ─────────────────────────────────────────────────────────── */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-up { animation: fade-up 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }

.animate-pulse-slow {
  animation: glow-pulse 8s ease-in-out infinite alternate;
}

@keyframes glow-pulse {
  from { opacity: 0.6; }
  to   { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-up,
  .animate-pulse-slow {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>