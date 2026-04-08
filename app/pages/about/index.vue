<template>
  <div class="relative min-h-svh bg-ops-navy overflow-hidden selection:bg-accent selection:text-white">
    
    <div class="grain" aria-hidden="true" />
    <div class="dot-grid dot-grid--left"  aria-hidden="true" />
    <div class="dot-grid dot-grid--right" aria-hidden="true" />
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-150 pointer-events-none z-0 animate-pulse-slow"
      style="background: radial-gradient(ellipse at 50% 40%, rgba(17,138,178,0.14) 0%, transparent 65%);"
    />

    <div class="relative z-10 max-w-225 mx-auto px-5 pt-10 lg:pt-45 pb-[80px] lg:pb-35">

      <div class="mb-20 md:mb-32 opacity-0 animate-fade-up" style="animation-delay: 100ms; animation-fill-mode: forwards;">
        
        <h2 class="text-[13px] font-bold text-accent uppercase tracking-widest mb-8">
          About
        </h2>

        <div class="space-y-6 text-subheading text-text-secondary leading-relaxed font-medium tracking-tight">
          <p class="text-text-primary">
            Orderly Problem Solvers is a technology-driven organization founded in 2025 by <a href="https://www.instagram.com/inikoriefe/" target="_blank" rel="noopener noreferrer" class="text-accent hover:text-white underline decoration-accent/40 hover:decoration-white underline-offset-4 transition-colors duration-300">Inikori Efe</a>. We are focused on bringing structure to complexity through the design and deployment of intelligent digital solutions, supported by the hardware and infrastructure required for real-world impact.
          </p>
          <p>
            We operate at the intersection of business efficiency and digital inclusion. Our work enables organizations to move from fragmented processes to streamlined, scalable systems, while also expanding access to technology and digital skills in underserved communities.
          </p>
          <p>
            We build custom software solutions that support core business operations, including enterprise systems, data platforms, and process automation tools. Alongside this, we develop and support the infrastructure that powers these systems, ensuring reliability, scalability, and long-term sustainability.
          </p>
          <p>
            Our approach is both practical and forward-looking. We prioritize solutions that are not only functional, but adaptable to the environments in which they are deployed. This allows us to serve both established businesses and emerging communities with equal effectiveness.
          </p>
        </div>

      </div>

      <div class="w-full h-px bg-white/8 mb-20 md:mb-32 opacity-0 animate-fade-up" style="animation-delay: 200ms; animation-fill-mode: forwards;"></div>

      <div class="opacity-0 animate-fade-up" style="animation-delay: 300ms; animation-fill-mode: forwards;">
        
        <h2 class="text-[13px] font-bold text-accent uppercase tracking-widest mb-8">
          Mission
        </h2>

        <div class="space-y-6 text-subheading text-text-secondary leading-relaxed font-medium tracking-tight mb-16 md:mb-24">
          <p class="text-text-primary">
            To design and deploy intelligent digital solutions while building the hardware and infrastructure that support them, bringing structure to complexity, empowering businesses to operate efficiently, and expanding access to technology and digital skills for underserved communities.
          </p>
        </div>

        <h3 class="text-[clamp(28px,4vw,48px)] font-bold text-text-primary leading-[1.1] tracking-tight">
          We are committed to building systems that work,<br class="hidden md:block" />
          <span class="text-text-secondary">infrastructure that lasts,</span><br class="hidden md:block" />
          and opportunities that scale.
        </h3>

      </div>

      <div class="mt-24 md:mt-32 pt-8 border-t border-white/5 opacity-0 animate-fade-up flex flex-wrap items-center gap-x-8 gap-y-4" style="animation-delay: 400ms; animation-fill-mode: forwards;">
        <NuxtLink to="/careers" class="text-[13px] font-medium text-text-tertiary hover:text-accent transition-colors duration-200">Careers</NuxtLink>
        <NuxtLink to="/partners" class="text-[13px] font-medium text-text-tertiary hover:text-accent transition-colors duration-200">Partners</NuxtLink>
        <NuxtLink to="/pricing-policy" class="text-[13px] font-medium text-text-tertiary hover:text-accent transition-colors duration-200">Pricing Policy</NuxtLink>
        <NuxtLink to="/privacy" class="text-[13px] font-medium text-text-tertiary hover:text-accent transition-colors duration-200">Privacy Policy</NuxtLink>
        <NuxtLink to="/terms" class="text-[13px] font-medium text-text-tertiary hover:text-accent transition-colors duration-200">Terms of Service</NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'About',
   ogTitle: 'About ',
  description: 'Learn about our mission to bring order to complexity through custom software, hardware infrastructure, and community digital literacy.',
})

defineOgImage('OpsTemplate', {
  title: 'Bringing structure to complexity.',
  description: 'Learn about our mission to architect a more inclusive, orderly future.',
  badge: 'About Us'
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

.animate-fade-up {
  animation: fade-up 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
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
    transform: none;
  }
}
</style>