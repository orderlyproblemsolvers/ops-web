<template>
  <div class="relative min-h-svh bg-ops-navy overflow-hidden selection:bg-accent selection:text-white pb-25">
    
    <div class="grain" aria-hidden="true" />
    <div class="dot-grid dot-grid--left"  aria-hidden="true" />
    <div class="dot-grid dot-grid--right" aria-hidden="true" />
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-150 pointer-events-none z-0 animate-pulse-slow"
      style="background: radial-gradient(ellipse at 50% 40%, rgba(17,138,178,0.14) 0%, transparent 65%);"
    />

    <div class="relative z-10 max-w-300 mx-auto px-5 pt-24 lg:pt-32">
      
      <div class="mb-20 lg:mb-28 opacity-0 animate-fade-up" style="animation-delay: 100ms; animation-fill-mode: forwards;">
        <h1 class="text-[clamp(40px,6vw,64px)] font-bold text-text-primary leading-[1.05] tracking-tight max-w-4xl mb-6">
          Build systems that matter.
        </h1>
        <p class="text-[18px] sm:text-[20px] text-text-secondary max-w-2xl leading-relaxed">
          Join a remote-first collective of engineers, designers, and educators bringing structure to complexity.
        </p>
      </div>

      <div class="mb-24 opacity-0 animate-fade-up" style="animation-delay: 200ms; animation-fill-mode: forwards;">
        
        <div class="flex items-end justify-between pb-4 border-b border-white/10 mb-2">
          <h2 class="text-[14px] font-bold text-text-tertiary uppercase tracking-widest">Open Roles</h2>
          <p class="text-[13px] text-text-tertiary hidden sm:block">100% Remote</p>
        </div>

        <div class="flex flex-col">
          
          <NuxtLink to="/contact" class="group flex flex-col sm:flex-row sm:items-center justify-between py-8 border-b border-white/5 hover:border-accent/50 transition-colors duration-300">
            <div class="mb-4 sm:mb-0">
              <h3 class="text-[20px] md:text-[24px] font-bold text-white mb-2 group-hover:text-accent transition-colors">Senior Software Engineer</h3>
              <p class="text-[14px] text-text-secondary">Engineering <span class="mx-3 text-white/10">|</span> Full-time</p>
            </div>
            <div class="flex items-center gap-2 text-[14px] font-medium text-text-tertiary group-hover:text-white transition-colors">
              Apply <UIcon name="i-lucide-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </NuxtLink>

          <NuxtLink to="/contact" class="group flex flex-col sm:flex-row sm:items-center justify-between py-8 border-b border-white/5 hover:border-accent/50 transition-colors duration-300">
            <div class="mb-4 sm:mb-0">
              <h3 class="text-[20px] md:text-[24px] font-bold text-white mb-2 group-hover:text-accent transition-colors">UI/UX Product Designer</h3>
              <p class="text-[14px] text-text-secondary">Design <span class="mx-3 text-white/10">|</span> Contract</p>
            </div>
            <div class="flex items-center gap-2 text-[14px] font-medium text-text-tertiary group-hover:text-white transition-colors">
              Apply <UIcon name="i-lucide-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </NuxtLink>

          <NuxtLink to="/contact" class="group flex flex-col sm:flex-row sm:items-center justify-between py-8 border-b border-white/5 hover:border-accent/50 transition-colors duration-300">
            <div class="mb-4 sm:mb-0">
              <h3 class="text-[20px] md:text-[24px] font-bold text-white mb-2 group-hover:text-accent transition-colors">Community Education Lead</h3>
              <p class="text-[14px] text-text-secondary">Inclusion <span class="mx-3 text-white/10">|</span> Part-time</p>
            </div>
            <div class="flex items-center gap-2 text-[14px] font-medium text-text-tertiary group-hover:text-white transition-colors">
              Apply <UIcon name="i-lucide-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </NuxtLink>

        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 opacity-0 animate-fade-up" style="animation-delay: 300ms; animation-fill-mode: forwards;">
        
        <div class="bg-ops-surface border border-white/5 rounded-[24px] p-8 md:p-12">
          <h3 class="text-[18px] font-bold text-white mb-6">Our Stack</h3>
          <div class="flex flex-wrap gap-2.5">
            <span v-for="tool in ['Nuxt.js', 'Vue 3', 'TypeScript', 'TiDB', 'Drizzle', 'Tailwind', 'AI Agents', 'AWS']" :key="tool" class="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[13px] font-medium text-text-secondary">
              {{ tool }}
            </span>
          </div>
        </div>

        <div class="bg-linear-to-br from-ops-surface to-ops-navy border border-white/10 rounded-[24px] p-8 md:p-12 flex flex-col justify-center">
          <h3 class="text-[24px] font-bold text-white mb-3">Don't see your role?</h3>
          <p class="text-[15px] text-text-secondary mb-8 leading-relaxed max-w-sm">
            We are always looking for exceptional problem solvers. If your work can add structure to our mission, we want to see it.
          </p>
          <div>
            <UiAppButton to="/contact" size="md" variant="primary">
              Send a General Inquiry
            </UiAppButton>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Careers | Orderly Problem Solvers',
  description: 'Join Orderly Problem Solvers and help us build systems that matter.',
})
</script>

<style scoped>
/* ─── Background Elements ────────────────────────────────────────────────── */
.grain { position: absolute; inset: 0; z-index: 30; pointer-events: none; opacity: 0.035; mix-blend-mode: overlay; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E"); background-repeat: repeat; background-size: 300px 300px; }
.dot-grid { position: absolute; top: 0; bottom: 0; width: clamp(160px, 18vw, 280px); z-index: 1; pointer-events: none; opacity: 0.09; filter: blur(0.6px); background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='10' cy='10' r='1.1' fill='%23ffffff'/%3E%3C/svg%3E"); background-repeat: repeat; background-size: 20px 20px; }
.dot-grid--left { left: 0; mask-image: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%); mask-composite: intersect; -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%); -webkit-mask-composite: source-in; }
.dot-grid--right { right: 0; mask-image: linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%); mask-composite: intersect; -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%); -webkit-mask-composite: source-in; }

/* ─── Animations ─────────────────────────────────────────────────────────── */
@keyframes fade-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-up { animation: fade-up 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.animate-pulse-slow { animation: glow-pulse 8s ease-in-out infinite alternate; }
@keyframes glow-pulse { from { opacity: 0.6; } to { opacity: 1; } }

@media (prefers-reduced-motion: reduce) {
  .animate-fade-up, .animate-pulse-slow { animation: none; opacity: 1; transform: none; }
}
</style>