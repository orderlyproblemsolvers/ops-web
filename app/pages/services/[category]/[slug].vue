<template>
  <div class="min-h-svh bg-ops-navy selection:bg-accent selection:text-white pb-[80px] lg:pb-10">
    
    <div class="relative pt-35 lg:pt-50 pb-[80px] lg:pb-10 overflow-hidden border-b border-white/5">
      
      <div class="absolute inset-0 z-0 pointer-events-none">
        <img :src="categoryData.heroBg" :alt="serviceData.headline" class="w-full h-full object-cover object-center opacity-20" />
        <div class="absolute inset-0 bg-linear-to-b from-ops-navy/95 via-ops-navy/80 to-ops-navy" />
        <div class="absolute top-0 right-0 w-150 h-150 bg-accent/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
      </div>

      <div class="relative z-10 max-w-300 mx-auto px-5">
        <div class="max-w-200">
          
          <div class="flex items-center gap-3 mb-6 opacity-0 animate-fade-up" style="animation-delay: 100ms; animation-fill-mode: forwards;">
            <NuxtLink to="/services" class="text-[13px] font-medium text-text-tertiary hover:text-white transition-colors">Services</NuxtLink>
            <span class="text-text-tertiary text-[10px]">/</span>
            <span class="text-[13px] font-medium text-text-tertiary capitalize">{{ route.params.category }}</span>
            <span class="text-text-tertiary text-[10px]">/</span>
            <span class="text-[13px] font-medium text-accent capitalize">{{ route.params.slug }}</span>
          </div>
          
          <h1 class="text-[clamp(40px,5vw,64px)] font-bold text-text-primary leading-[1.1] tracking-tight mb-8 opacity-0 animate-fade-up" style="animation-delay: 200ms; animation-fill-mode: forwards;">
            {{ serviceData.headline }}<br />
            <span class="text-text-secondary">{{ serviceData.subheadline }}</span>
          </h1>
          
          <p class="text-[clamp(18px,2vw,22px)] text-text-secondary leading-relaxed font-medium mb-10 opacity-0 animate-fade-up" style="animation-delay: 300ms; animation-fill-mode: forwards;">
            {{ serviceData.body }}
          </p>

          <div class="flex flex-wrap gap-4 opacity-0 animate-fade-up" style="animation-delay: 400ms; animation-fill-mode: forwards;">
            <NuxtLink to="/contact" class="inline-flex items-center justify-center px-7 py-3.5 rounded-icon bg-accent text-white font-medium hover:bg-accent-hover transition-colors">
              Start your project
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-300 mx-auto px-5 pt-[80px] lg:pt-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        <div class="lg:col-span-5 lg:sticky lg:top-10 opacity-0 animate-fade-up" style="animation-delay: 200ms; animation-fill-mode: forwards;">
          <h2 class="text-[12px] font-semibold text-accent uppercase tracking-widest mb-4">Capabilities</h2>
          <h3 class="text-[clamp(28px,3vw,36px)] font-bold text-text-primary leading-tight tracking-tight mb-6">
            Everything you need to execute.
          </h3>
          <p class="text-[16px] text-text-secondary leading-relaxed">
            We don't just provide advice; we build the systems and infrastructure required to turn strategy into measurable operational reality.
          </p>
        </div>

        <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 opacity-0 animate-fade-up" style="animation-delay: 300ms; animation-fill-mode: forwards;">
          <div v-for="feature in serviceData.capabilities" :key="feature.title" class="bg-ops-surface border border-white/5 rounded-[20px] p-8 hover:border-accent/30 transition-colors">
            <div class="w-10 h-10 rounded-input bg-white/3 border border-white/8 flex items-center justify-center mb-6">
              <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="feature.icon" />
            </div>
            <h4 class="text-[18px] font-semibold text-text-primary mb-3">{{ feature.title }}</h4>
            <p class="text-[14px] text-text-secondary leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>

      </div>
    </div>

    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, createError, type ServiceCategory } from '#imports'
// serviceCategories is auto-imported from your utils folder!

const route = useRoute()

// 1. Find the parent category matching the URL (e.g., 'software')
const categoryData: any = computed(() => {
  return serviceCategories.find(c => c.id === route.params.category)
})

// 2. Find the specific service matching the URL (e.g., 'enterprise')
const serviceData = computed(() => {
  if (!categoryData.value) return null
  return categoryData.value.services.find((s: { slug: string | string[] | undefined }) => s.slug === route.params.slug)
})

// 3. 404 Protection: If someone types a bad URL, throw a proper error
if (!categoryData.value || !serviceData.value) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found', fatal: true })
}

// --- Helper: Truncate Text by Word Count ---
function truncateText(text: string | undefined, maxWords: number = 15) {
  if (!text) return ''
  const words = text.split(' ')
  if (words.length <= maxWords) return text
  return words.slice(0, maxWords).join(' ') + '...'
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => {
        if (!serviceData.value) return null

        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": serviceData.value.headline,
          "description": serviceData.value.body,
          "provider": {
            "@type": "Organization",
            "name": "Orderly Problem Solvers"
          },
          // Maps your capabilities list to service features!
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Capabilities",
            "itemListElement": serviceData.value.capabilities.map((feature, index) => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": feature.title,
                "description": feature.description
              }
            }))
          }
        })
      })
    }
  ]
})

// 4. Dynamic SEO Injection
useSeoMeta({
  title: `${serviceData.value.headline}`,
  description: serviceData.value.body,
})

// 5. Visual Open Graph Image Generation
defineOgImage('OpsTemplate', {
  title: serviceData.value.headline,
  description: truncateText(serviceData.value.body, 15),
  // Capitalizes the URL parameter (e.g., 'software' -> 'Software') for a clean badge
  badge: String(route.params.category).charAt(0).toUpperCase() + String(route.params.category).slice(1)
})

</script>

<style scoped>
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  animation: fade-up 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>