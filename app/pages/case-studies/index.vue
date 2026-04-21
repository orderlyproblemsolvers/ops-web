<template>
  <div class="min-h-svh bg-ops-navy pt-24 lg:pt-32 pb-[80px] selection:bg-accent selection:text-white">
    <div class="max-w-300 mx-auto px-5">
      
      <div class="mb-16 lg:mb-24 opacity-0 animate-fade-up" style="animation-delay: 100ms; animation-fill-mode: forwards;">
        <span class="text-[13px] font-bold text-accent uppercase tracking-widest block mb-4">Our Work</span>
        <h1 class="text-[clamp(32px,4vw,48px)] font-bold text-text-primary leading-[1.1] tracking-tight max-w-3xl">
          Systems engineered for measurable impact.
        </h1>
        <p class="text-[18px] text-text-secondary mt-6 max-w-2xl leading-relaxed">
          We don't just build software; we solve complex operational bottlenecks. Explore how we've brought order and scalability to our clients.
        </p>
      </div>

      <div class="space-y-12 lg:space-y-24 mb-24">
        <NuxtLink 
          v-for="(study, index) in caseStudies" 
          :key="study.id"
          :to="`/case-studies/${study.slug}`"
          class="group flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center opacity-0 animate-fade-up"
          :style="{ animationDelay: `${200 + (index * 100)}ms`, animationFillMode: 'forwards' }"
        >
          <div class="w-full lg:col-span-7 h-64 sm:h-80 lg:h-112.5 rounded-[24px] overflow-hidden relative border border-white/5 bg-ops-surface" :class="index % 2 !== 0 ? 'lg:order-2' : ''">
            <img :src="study.coverImage" :alt="study.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            <div class="absolute inset-0 bg-ops-navy/20 group-hover:bg-transparent transition-colors duration-500"></div>
            <div class="absolute top-6 left-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-[12px] font-medium text-white tracking-wide uppercase">
              {{ study.industry }}
            </div>
          </div>

          <div class="w-full lg:col-span-5 flex flex-col justify-center" :class="index % 2 !== 0 ? 'lg:order-1' : ''">
            <h3 class="text-[14px] font-semibold text-text-tertiary mb-3">{{ study.client }}</h3>
            <h2 class="text-[28px] lg:text-[36px] font-bold text-text-primary leading-tight mb-5 group-hover:text-accent transition-colors duration-300">
              {{ study.title }}
            </h2>
            <p class="text-[16px] text-text-secondary leading-relaxed mb-8">
              {{ study.excerpt }}
            </p>
            
            <div class="grid grid-cols-3 gap-4 py-6 border-y border-white/5 mb-8">
              <div v-for="metric in study.metrics" :key="metric.label">
                <div class="text-[20px] font-bold text-white mb-1">{{ metric.value }}</div>
                <div class="text-[11px] text-text-tertiary uppercase tracking-wider">{{ metric.label }}</div>
              </div>
            </div>

            <span class="inline-flex items-center gap-2 text-[15px] font-medium text-accent group-hover:text-white transition-colors duration-300">
              Read Case Study <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </span>
          </div>
        </NuxtLink>
      </div>

<div class="bg-ops-surface border border-divider rounded-[24px] px-5 py-12 sm:p-10 md:p-16 text-center relative overflow-hidden opacity-0 animate-fade-up" style="animation-delay: 400ms; animation-fill-mode: forwards;">
  
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(17,138,178,0.15)_0%,transparent_70%)] pointer-events-none"></div>
  
  <div class="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
    
    <h2 class="text-[clamp(28px,7vw,40px)] leading-[1.15] font-bold text-text-primary tracking-tight mb-4">
      Ready to be our next success story?
    </h2>
    
    <p class="text-[15px] sm:text-[16px] text-text-secondary mb-8 md:mb-10 max-w-lg">
      Stop letting fragmented systems slow down your business. Let's discuss how custom software and strategic infrastructure can scale your operations.
    </p>
    
    <NuxtLink to="/contact" class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 rounded-button bg-accent text-white font-semibold hover:bg-accent-hover transition-colors">
      Start Your Project
    </NuxtLink>

  </div>
</div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { caseStudies } from '../../utils/caseStudiesData'

useSeoMeta({
  title: 'Case Studies | Orderly Problem Solvers',
  description: 'Explore our track record of solving complex operational bottlenecks through custom software and strategic infrastructure.'
})
</script>

<style scoped>
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up { animation: fade-up 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }
</style>