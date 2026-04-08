<template>
  <section
    ref="sectionRef"
    class="bg-ops-navy py-[80px] md:py-10 px-5 overflow-hidden"
  >
    <div class="max-w-300 mx-auto">

      <div
        class="flex items-center gap-4 mb-12 opacity-0 work-reveal"
        style="--d: 0ms"
      >
        <div class="w-8 h-px bg-accent/60" />
        <span class="text-label text-accent uppercase tracking-widest">Featured Work</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <div class="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">

          <div
            class="flex flex-wrap items-center gap-3 mb-7 work-reveal opacity-0"
            style="--d: 100ms"
          >
            <span class="text-[12px] font-medium text-text-tertiary bg-white/5 border border-white/8 px-3 py-1 rounded-full">
              Education
            </span>
            <span class="text-[12px] font-medium text-text-tertiary bg-white/5 border border-white/8 px-3 py-1 rounded-full">
              Digital Transformation
            </span>
            <span class="text-[12px] font-medium text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
              MIS Platform
            </span>
          </div>

          <h2
            class="text-[clamp(28px,3.5vw,40px)] font-bold text-text-primary leading-[1.15] tracking-tight mb-5 work-reveal opacity-0"
            style="--d: 180ms"
          >
            From manual delays to absolute operational clarity.
          </h2>

          <p
            class="text-[16px] text-text-secondary leading-relaxed mb-8 max-w-120 work-reveal opacity-0"
            style="--d: 260ms"
          >
            Running a growing community school relies heavily on data. But with manual student records and archaic result processing, the administration faced mounting costs, heavy delays, and a total lack of insight into academic performance. We engineered a unified platform to centralize their operations—drastically accelerating workflows, unlocking deep classroom insights, and driving parent satisfaction to an all-time high.
          </p>

          <ul
            class="flex flex-col gap-3.5 mb-10 work-reveal opacity-0"
            style="--d: 340ms"
          >
            <li
              v-for="feature in features"
              :key="feature"
              class="flex items-start gap-3 text-[14px] text-text-primary leading-snug"
            >
              <span class="mt-0.5 w-4.5 h-4.5 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                <svg class="w-2.5 h-2.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {{ feature }}
            </li>
          </ul>

          <div
            class="flex flex-wrap items-center gap-5 work-reveal opacity-0"
            style="--d: 420ms"
          >
            <AppButton to="/case-studies/the-covenant-academy-mis" variant="primary" size="md">
              Read Case Study
            </AppButton>
            <NuxtLink
              to="/case-studies"
              class="inline-flex items-center gap-1.5 text-[14px] font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 group"
            >
              View all work
              <span class="text-accent group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
            </NuxtLink>
          </div>

        </div>

        <div class="lg:col-span-7 relative work-reveal opacity-0 order-1 lg:order-2" style="--d: 300ms">

          <div class="rounded-[16px] border border-white/8 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.4)] bg-ops-surface relative">
            
            <div class="absolute top-4 left-4 flex gap-1.5 z-10">
              <span class="w-2.75 h-2.75 rounded-full bg-white/20" />
              <span class="w-2.75 h-2.75 rounded-full bg-white/20" />
              <span class="w-2.75 h-2.75 rounded-full bg-white/20" />
            </div>

            <div class="relative">
              <img
                src="/img/tcad-work.png"
                alt="The Covenant Academy Unified Platform"
                class="w-full block object-cover object-top h-100 md:h-125"
                loading="lazy"
              />
              <div
                class="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none"
                style="background: linear-gradient(to bottom, transparent 0%, #051c2c 100%);"
              />
            </div>
          </div>

          <div class="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-8 bg-ops-surface border border-white/10 rounded-[14px] px-6 py-5 shadow-[0_16px_48px_rgba(0,0,0,0.5)] z-20">
            <div class="text-[11px] text-text-secondary font-medium uppercase tracking-widest mb-1.5">Processing Time</div>
            <div class="text-[40px] font-bold text-accent leading-none tabular-nums">-85<span class="text-[22px]">%</span></div>
            <div class="text-[12px] text-text-secondary mt-1">Faster result generation</div>
          </div>

          <div class="absolute -top-5 -right-3 md:-top-6 md:-right-6 bg-ops-surface border border-white/10 rounded-icon px-3 py-2.5 shadow-xl z-20 flex items-center gap-2">
            <img
              src="/img/partners/partners-01.svg"
              alt="The Covenant Academy"
              class="h-7 w-auto object-contain opacity-90"
            />
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppButton from '../ui/AppButton.vue'

const sectionRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

// Updated features to match the new business-value story
const features = [
  'Automated result processing replacing manual data entry',
  'Real-time analytical insights into class and student performance',
  'Unified central database eliminating siloed record-keeping',
  'Dedicated portals to boost parent engagement and transparency'
]

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      sectionRef.value
        ?.querySelectorAll<HTMLElement>('.work-reveal')
        .forEach(el => el.classList.add('is-visible'))
      observer?.disconnect()
    },
    { threshold: 0.12 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.work-reveal {
  transform: translateY(20px);
  transition:
    opacity  600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) var(--d, 0ms),
    transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) var(--d, 0ms);
}

.work-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .work-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>