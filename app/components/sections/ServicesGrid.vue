<template>
  <section ref="sectionRef" class="bg-mint py-[64px] md:py-10 px-5">
    <div class="max-w-300 mx-auto">

      <!-- Section header -->
      <div class="text-center mb-16 max-w-170 mx-auto">
        <span class="text-label text-accent block mb-4">What We Build</span>
        <h2 class="text-heading text-gray-900 mb-4">Systems you can see working.</h2>
        <p class="text-body text-gray-500 leading-relaxed">
          Three core capabilities. Real interfaces, not just descriptions of them.
        </p>
      </div>

      <!-- Service rows -->
      <div class="flex flex-col gap-20 md:gap-28">
        <NuxtLink
          v-for="(service, i) in services"
          :key="service.id"
          :to="service.link"
          class="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center service-reveal"
          :style="{ '--d': `${i * 100}ms` }"
          @click="handleCardClick(service)"
        >
          <!-- Visual side — no background, no border, art sits directly on the section -->
          <div
            class="h-72 md:h-96 flex items-center justify-center"
            :class="i % 2 === 1 ? 'lg:order-2' : 'lg:order-1'"
          >
            <img
              :src="service.heroMedia"
              :alt="service.heroAlt"
              class="w-full h-full object-contain"
            />
          </div>

          <!-- Copy side -->
          <div
            class="flex flex-col"
            :class="i % 2 === 1 ? 'lg:order-1' : 'lg:order-2'"
          >
            <div class="icon-well mb-5">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="service.iconPath" />
            </div>

            <span class="text-[13px] font-medium text-accent mb-2">{{ service.eyebrow }}</span>

            <h3 class="text-[26px] md:text-[32px] font-semibold text-gray-900 mb-4 leading-snug tracking-tight">
              {{ service.headline }}
            </h3>
            <p class="text-[15px] md:text-[16px] text-gray-500 leading-relaxed mb-6 max-w-110">
              {{ service.body }}
            </p>

            <div class="flex flex-wrap gap-2 mb-7">
              <span
                v-for="tag in service.tags"
                :key="tag"
                class="text-[11px] font-medium text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20"
              >
                {{ tag }}
              </span>
            </div>

            <div class="text-[14px] text-accent font-medium inline-flex items-center gap-1">
              Explore <span class="cta-arrow">&rarr;</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-20">
        <NuxtLink
          to="/services"
          class="inline-flex items-center gap-2 text-[14px] font-medium text-gray-400 hover:text-gray-900 transition-colors duration-200 group"
          @click="track('view_all_services_click', { page: 'home' })"
        >
          View all services
          <span class="cta-arrow text-accent">→</span>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

// ─── Analytics ────────────────────────────────────────────────────────────────

const track = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', eventName, params)
}

const handleCardClick = (service: { headline: string; link: string; id: string }) => {
  track('service_card_click', {
    page: 'home',
    service: service.headline,
    destination: service.link,
    card_id: service.id,
  })
}

// ─── Icons (Heroicons outline) ────────────────────────────────────────────────
const icons = {
  stack: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />',
  globe: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />',
  bolt: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />',
}

// ─── Services — heroMedia is a downloaded SVG animation file ───────────────

const services = [
  {
    id: 'systems',
    eyebrow: '01 — Systems',
    headline: 'ERP, LMS and MIS software',
    body: 'Unified systems for running the business — enterprise resource planning, learning management, and management information systems built around how your team actually works.',
    tags: ['ERP', 'LMS', 'MIS', 'Dashboards'],
    link: '/services/software',
    iconPath: icons.stack,
    heroMedia: '/img/systems.svg',
    heroAlt: 'Isometric illustration of connected data modules representing ERP, LMS and MIS systems',
  },
  {
    id: 'webapp',
    eyebrow: '02 — Web & App',
    headline: 'Web and app development',
    body: 'Websites and applications designed and engineered end to end — fast, accessible, and built to move visitors toward a decision, on any device.',
    tags: ['Web Design', 'iOS & Android', 'Performance', 'CMS'],
    link: '/services/digital/web-design-development',
    iconPath: icons.globe,
    heroMedia: '/img/webapp.svg',
    heroAlt: 'Isometric illustration of a browser window and mobile app floating above a design blueprint',
  },
  {
    id: 'automation',
    eyebrow: '03 — Automation',
    headline: 'Workflow automation',
    body: 'Turn repeatable, judgment-based tasks — approvals, routing, data entry — into automated processes that run without a person watching every step.',
    tags: ['RPA', 'Approvals', 'Integrations', 'Alerts'],
    link: '/services/ai/intelligent-automation',
    iconPath: icons.bolt,
    heroMedia: '/img/automation.svg',
    heroAlt: 'Isometric illustration of task blocks moving through a connected automation pipeline',
  },
]

onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer?.unobserve(entry.target)
      })
    },
    { threshold: 0.15 }
  )

  sectionRef.value
    ?.querySelectorAll<HTMLElement>('.service-reveal')
    .forEach(service => observer?.observe(service))
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.icon-well {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.625rem;
  background-color: rgba(17, 138, 178, 0.1);
  border: 1px solid rgba(17, 138, 178, 0.2);
}

.service-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) var(--d, 0ms),
    transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) var(--d, 0ms);
}

.service-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .service-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>