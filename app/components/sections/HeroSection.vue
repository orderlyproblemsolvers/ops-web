<template>
  <section class="hero-section relative min-h-svh lg:min-h-0 lg:h-[90svh] flex flex-col justify-center overflow-hidden bg-ops-navy pt-32 lg:pt-36 pb-16 lg:pb-0">

    <div class="grain" aria-hidden="true" />
    <div class="dot-grid dot-grid--left" aria-hidden="true" />
    <div class="dot-grid dot-grid--right" aria-hidden="true" />
    
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-150 pointer-events-none z-0 animate-pulse-slow"
      style="background: radial-gradient(ellipse at 50% 40%, rgba(17,138,178,0.12) 0%, transparent 65%);"
    />

    <div class="relative z-20 w-full max-w-300 mx-auto px-5 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">

      <div class="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start opacity-0 animate-fade-up" style="animation-delay: 100ms; animation-fill-mode: forwards;">
        
        <h1 
          class="text-[clamp(40px,5vw,56px)] leading-[1.05] font-bold tracking-tight text-text-primary mb-5"
        >
          Run your business with precision.
        </h1>

        <p 
          class="text-[15px] lg:text-body text-text-secondary max-w-lg lg:max-w-none mb-6 leading-relaxed font-medium"
        >
          We architect custom software systems and integrate intelligent automation to accelerate critical workflows and eliminate operational friction.
        </p>

        <div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <AppButton 
            to="/contact" 
            variant="primary" 
            size="md" 
            class="w-full sm:w-auto"
            @click="emit('cta-click', { label: 'Start Project', destination: '/contact' })"
          >
            Schedule Consultation →
          </AppButton>
          <AppButton 
            to="/services" 
            variant="ghost" 
            size="md" 
            class="w-full sm:w-auto"
            @click="emit('cta-click', { label: 'Explore Services', destination: '/services' })"
          >
            Explore Capabilities
          </AppButton>
        </div>
      </div>

      <div class="lg:col-span-6 w-full max-w-lg mx-auto lg:max-w-none lg:pl-8 opacity-0 animate-fade-up" style="animation-delay: 300ms; animation-fill-mode: forwards;">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <NuxtLink to="/services/software" class="group relative flex items-center justify-between p-5 rounded-[16px] bg-white/2 border border-white/5 hover:bg-white/6 hover:border-accent/40 transition-all duration-300">
            <div class="flex-1 pr-4">
              <h3 class="text-[16px] font-bold text-text-primary mb-1.5">Custom Software</h3>
              <p class="text-[13px] text-text-secondary leading-snug">Enterprise apps & internal tools.</p>
            </div>
            <svg class="w-4 h-4 text-accent/50 group-hover:text-accent transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10"></path>
            </svg>
          </NuxtLink>

          <NuxtLink to="/services/ai" class="group relative flex items-center justify-between p-5 rounded-[16px] bg-white/2 border border-white/5 hover:bg-white/6 hover:border-accent/40 transition-all duration-300">
            <div class="flex-1 pr-4">
              <h3 class="text-[16px] font-bold text-text-primary mb-1.5">AI & Data</h3>
              <p class="text-[13px] text-text-secondary leading-snug">Automation & LLM integration.</p>
            </div>
            <svg class="w-4 h-4 text-accent/50 group-hover:text-accent transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10"></path>
            </svg>
          </NuxtLink>

          <NuxtLink to="/services/consulting" class="group relative flex items-center justify-between p-5 rounded-[16px] bg-white/2 border border-white/5 hover:bg-white/6 hover:border-accent/40 transition-all duration-300">
            <div class="flex-1 pr-4">
              <h3 class="text-[16px] font-bold text-text-primary mb-1.5">Strategic Consulting</h3>
              <p class="text-[13px] text-text-secondary leading-snug">Technical auditing & design.</p>
            </div>
            <svg class="w-4 h-4 text-accent/50 group-hover:text-accent transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10"></path>
            </svg>
          </NuxtLink>

          <NuxtLink to="/services/digital" class="group relative flex items-center justify-between p-5 rounded-[16px] bg-white/2 border border-white/5 hover:bg-white/6 hover:border-accent/40 transition-all duration-300">
            <div class="flex-1 pr-4">
              <h3 class="text-[16px] font-bold text-text-primary mb-1.5">Digital Presence</h3>
              <p class="text-[13px] text-text-secondary leading-snug">Corporate webs & UI/UX.</p>
            </div>
            <svg class="w-4 h-4 text-accent/50 group-hover:text-accent transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10"></path>
            </svg>
          </NuxtLink>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import AppButton from '../ui/AppButton.vue'

const emit = defineEmits<{
  'cta-click': [payload: { label: string; destination: string }]
}>()
</script>

<style scoped>
/* ─── Background Effects ─────────────────────────────── */
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
  mask-image: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%);
  -webkit-mask-composite: source-in;
}

.dot-grid--right {
  right: 0;
  mask-image: linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%);
  -webkit-mask-composite: source-in;
}

/* ─── Animations ─────────────────────────────────────────────────────────── */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-up {
  animation: fade-up 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

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
  }
}
</style>