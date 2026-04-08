<template>
  <div ref="pageRef" class="bg-ops-navy min-h-screen">

    <HeroSection
      headline="Clear the path to scale."
      subline="We replace operational chaos with elegant, purpose-built software—giving your team the clarity to accelerate growth without the friction."
      :primary-cta="{ text: 'Get Started →', to: '/contact' }"
      :secondary-cta="{ text: 'Explore Services', to: '/services' }"
      @cta-click="handleCtaClick"
    />

    <div ref="statsRef"><StatsRow /></div>
    <div ref="valueRef"><ValueStrip /></div>
    <div ref="servicesRef"><ServicesGrid @service-click="handleServiceClick" /></div>
    <div ref="caseStudyRef"><FeaturedCaseStudy /></div>
    <div ref="testimonialsRef"><TestimonialsBlock /></div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import StatsRow from '~/components/sections/StatsRow.vue'
import ValueStrip from '~/components/sections/ValueStrip.vue'
import ServicesGrid from '~/components/sections/ServicesGrid.vue'
import FeaturedCaseStudy from '~/components/sections/FeaturedCaseStudy.vue'
import TestimonialsBlock from '~/components/sections/TestimonialsBlock.vue'

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Orderly Problem Solvers",
        "url": "https://www.orderlyproblemsolvers.com",
        "logo": "https://www.orderlyproblemsolvers.com/logo.png",
        "description": "We replace operational chaos with elegant, purpose-built software—giving your team the clarity to accelerate growth without the friction.",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+234-901-8099-785",
          "contactType": "customer service",
          "email": "orderlyproblemsolvers@gmail.com",
          "availableLanguage": "English"
        }
      })
    }
  ]
})

useSeoMeta({
  title: 'Digital Solutions & Consulting',
  description: 'OPS delivers the software systems, business tools, and strategic insight your business needs to operate with precision.',
})

defineOgImage('OpsTemplate', {
  title: 'Clear the path to scale.',
  description: 'Custom software, hardware infrastructure, and strategic consulting for growing teams.',
})

// ─── Analytics ────────────────────────────────────────────────────────────────

const track = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', eventName, params)
}

// ─── CTA Click Tracking ───────────────────────────────────────────────────────
// Wire these up by emitting 'cta-click' from HeroSection when buttons are clicked.
// Example in HeroSection: emit('cta-click', { label: 'Get Started', destination: '/contact' })

const handleCtaClick = (payload: { label: string; destination: string }) => {
  track('cta_click', {
    page: 'home',
    label: payload.label,
    destination: payload.destination,
  })
}

// If ServicesGrid emits a click when a service card is clicked:
// emit('service-click', { service: 'Enterprise Software' })
const handleServiceClick = (payload: { service: string }) => {
  track('service_card_click', {
    page: 'home',
    service: payload.service,
  })
}

// ─── Scroll Depth Tracking ────────────────────────────────────────────────────
// Tracks when each section enters the viewport for the first time.

const pageRef = ref<HTMLElement | null>(null)
const statsRef = ref<HTMLElement | null>(null)
const valueRef = ref<HTMLElement | null>(null)
const servicesRef = ref<HTMLElement | null>(null)
const caseStudyRef = ref<HTMLElement | null>(null)
const testimonialsRef = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

const sections = [
  { ref: statsRef,       name: 'stats_row' },
  { ref: valueRef,       name: 'value_strip' },
  { ref: servicesRef,    name: 'services_grid' },
  { ref: caseStudyRef,   name: 'case_study' },
  { ref: testimonialsRef,name: 'testimonials' },
]

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        const section = sections.find(s => s.ref.value === entry.target)
        if (!section) return

        track('section_view', {
          page: 'home',
          section: section.name,
        })

        // Stop observing once seen — we only want to fire once per section
        observer?.unobserve(entry.target)
      })
    },
    { threshold: 0.3 } // fires when 30% of the section is visible
  )

  sections.forEach(({ ref }) => {
    if (ref.value) observer?.observe(ref.value)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>