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
        <span class="text-[13px] font-bold text-accent uppercase tracking-widest block mb-4">Ecosystem</span>
        <h1 class="text-[clamp(40px,6vw,64px)] font-bold text-text-primary leading-[1.05] tracking-tight max-w-4xl">
          Architecting a more inclusive, orderly future. Together.
        </h1>
      </div>

      <div class="mb-24 opacity-0 animate-fade-up" style="animation-delay: 200ms; animation-fill-mode: forwards;">
        
        <div class="flex items-end justify-between pb-4 border-b border-white/10 mb-2">
          <h2 class="text-[14px] font-bold text-text-tertiary uppercase tracking-widest">Partnership Pillars</h2>
        </div>

        <div class="flex flex-col">
          
          <div class="group flex flex-col md:flex-row md:items-start justify-between py-10 border-b border-white/5 transition-colors duration-300">
            <div class="flex gap-6 mb-6 md:mb-0 md:w-1/3">
              <div class="w-10 h-10 shrink-0 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mt-1">
                <UIcon name="i-lucide-book-open" class="w-5 h-5 text-accent" />
              </div>
              <h3 class="text-[20px] md:text-[24px] font-bold text-white mt-1.5">Digital Literacy</h3>
            </div>
            <div class="md:w-2/3 md:pl-12">
              <p class="text-[15px] text-text-secondary leading-relaxed mb-4 max-w-xl">
                Help us empower underserved communities. We are seeking partners to co-develop training programs and curriculum that turn complex technology into accessible life skills.
              </p>
              <p class="text-[13px] text-text-tertiary">
                <span class="font-semibold text-accent uppercase tracking-wider mr-2">Ideal for:</span> NGOs, Educators, & Community Foundations
              </p>
            </div>
          </div>

          <div class="group flex flex-col md:flex-row md:items-start justify-between py-10 border-b border-white/5 transition-colors duration-300">
            <div class="flex gap-6 mb-6 md:mb-0 md:w-1/3">
              <div class="w-10 h-10 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mt-1">
                <UIcon name="i-lucide-server" class="w-5 h-5 text-text-tertiary" />
              </div>
              <h3 class="text-[20px] md:text-[24px] font-bold text-white mt-1.5">Infrastructure</h3>
            </div>
            <div class="md:w-2/3 md:pl-12">
              <p class="text-[15px] text-text-secondary leading-relaxed mb-4 max-w-xl">
                Systems require stability. We invite hardware and cloud providers to partner with us in deploying resilient networks and server architectures in regions that need them most.
              </p>
              <p class="text-[13px] text-text-tertiary">
                <span class="font-semibold text-text-tertiary uppercase tracking-wider mr-2">Ideal for:</span> Cloud Providers, Hardware OEMs, & Telcos
              </p>
            </div>
          </div>

          <div class="group flex flex-col md:flex-row md:items-start justify-between py-10 border-b border-white/5 transition-colors duration-300">
            <div class="flex gap-6 mb-6 md:mb-0 md:w-1/3">
              <div class="w-10 h-10 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mt-1">
                <UIcon name="i-lucide-layout-dashboard" class="w-5 h-5 text-text-tertiary" />
              </div>
              <h3 class="text-[20px] md:text-[24px] font-bold text-white mt-1.5">Educational MIS</h3>
            </div>
            <div class="md:w-2/3 md:pl-12">
              <p class="text-[15px] text-text-secondary leading-relaxed mb-4 max-w-xl">
                We are looking for early-adopter institutions to pilot our custom Management Information Systems, helping us refine how schools manage data and administration.
              </p>
              <p class="text-[13px] text-text-tertiary">
                <span class="font-semibold text-text-tertiary uppercase tracking-wider mr-2">Ideal for:</span> Schools, Academies, & Private Institutions
              </p>
            </div>
          </div>

        </div>
      </div>

      <div class="bg-ops-surface border border-divider rounded-[24px] px-5 py-12 sm:p-16 text-center relative overflow-hidden opacity-0 animate-fade-up" style="animation-delay: 300ms; animation-fill-mode: forwards;">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(17,138,178,0.15)_0%,transparent_70%)] pointer-events-none"></div>
        
        <div class="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h2 class="text-[clamp(28px,7vw,42px)] font-bold text-text-primary tracking-tight mb-4">Let's solve the divide.</h2>
          <p class="text-[15px] sm:text-body text-text-secondary mb-10 leading-relaxed">
            Every project we build is an opportunity to bring someone else into the digital world. If your organization shares this vision, we want to hear from you.
          </p>
          
          <UiAppButton to="/contact" size="lg" variant="primary" class="w-full sm:w-auto min-w-65">
            Inquire About Partnership
          </UiAppButton>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// Using standard AppButton assumption based on your previous components
useSeoMeta({
  title: 'Partnerships & Digital Literacy | OPS',
  description: 'Join Orderly Problem Solvers in our mission to bridge the digital divide through software engineering, hardware infrastructure, and digital literacy.',
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