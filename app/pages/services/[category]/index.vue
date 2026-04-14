<template>
  <div class="min-h-svh bg-ops-navy selection:bg-accent selection:text-white pb-[80px] lg:pb-10">
    
    <div class="relative pt-35 lg:pt-50 pb-[80px] lg:pb-25 overflow-hidden border-b border-white/5">
      <div class="absolute inset-0 z-0 pointer-events-none">
        <img :src="categoryData.heroBg" :alt="categoryData.label" class="w-full h-full object-cover object-center opacity-20" />
        <div class="absolute inset-0 bg-linear-to-b from-ops-navy/95 via-ops-navy/80 to-ops-navy" />
        <div class="absolute top-0 right-0 w-150 h-150 bg-accent/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
      </div>

      <div class="relative z-10 max-w-300 mx-auto px-5">
        <div class="max-w-200">

          <!-- ✅ Replaced hand-rolled breadcrumb with useBreadcrumbItems + UBreadcrumb -->
          <div class="mb-6 opacity-0 animate-fade-up" style="animation-delay: 100ms; animation-fill-mode: forwards;">
            <UBreadcrumb :items="breadcrumbs">
              <template #separator>
                <span class="mx-1 text-white/30 text-[10px]">/</span>
              </template>
            </UBreadcrumb>
          </div>
          
          <h1 class="text-[clamp(40px,5vw,64px)] font-bold text-text-primary leading-[1.1] tracking-tight mb-8 opacity-0 animate-fade-up" style="animation-delay: 200ms; animation-fill-mode: forwards;">
            {{ categoryData.label }} Solutions.
          </h1>
          
          <p class="text-[clamp(18px,2vw,22px)] text-text-secondary leading-relaxed font-medium opacity-0 animate-fade-up" style="animation-delay: 300ms; animation-fill-mode: forwards;">
            Explore our specialized offerings within {{ categoryData.label }}. We build robust systems designed to scale with your operations.
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-300 mx-auto px-5 pt-15 lg:pt-25">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 opacity-0 animate-fade-up" style="animation-delay: 400ms; animation-fill-mode: forwards;">
        
        <NuxtLink
          v-for="service in categoryData.services"
          :key="service.slug"
          :to="service.link"
          class="group relative bg-ops-surface border border-white/5 rounded-card p-8 flex flex-col justify-between hover:border-accent/30 hover:bg-ops-elevated transition-all duration-300 min-h-80"
        >
          <div>
            <div class="w-12 h-12 rounded-input bg-white/4 border border-white/[0.07] flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-accent/70 group-hover:text-accent transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="service.iconPath" />
            </div>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in service.tags.slice(0, 2)"
                :key="tag"
                class="text-[11px] font-medium text-text-tertiary bg-white/4 px-2.5 py-1 rounded-full border border-white/5"
              >
                {{ tag }}
              </span>
              <span v-if="service.tags.length > 2" class="text-[11px] font-medium text-text-tertiary px-1 py-1">
                +{{ service.tags.length - 2 }}
              </span>
            </div>

            <h3 class="text-[20px] font-bold text-text-primary mb-3 leading-snug">
              {{ service.headline }}
            </h3>
            <p class="text-[14px] text-text-secondary leading-relaxed line-clamp-3">
              {{ service.body }}
            </p>
          </div>

          <div class="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
            <span class="text-[14px] text-accent/70 group-hover:text-accent font-medium transition-colors duration-200 inline-flex items-center gap-1 group-hover:translate-x-0.5">
              Explore service →
            </span>
            <div class="w-8 h-8 rounded-full border border-white/10 group-hover:border-accent/30 flex items-center justify-center transition-colors duration-200 bg-white/5 group-hover:bg-accent/10">
              <svg class="w-3.5 h-3.5 text-text-tertiary group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </NuxtLink>

      </div>
    </div>

    <div class="max-w-300 mx-auto px-5 mt-25 lg:mt-35 opacity-0 animate-fade-up" style="animation-delay: 500ms; animation-fill-mode: forwards;">
      <div class="border-t border-white/5 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <p class="text-[16px] text-text-secondary max-w-125">
          Don't see exactly what you're looking for? We build custom solutions tailored to your specific operational needs.
        </p>
        <NuxtLink
          to="/contact"
          class="shrink-0 inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-accent text-white font-medium hover:bg-accent-hover transition-colors"
        >
          Talk to an engineer
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, createError } from '#imports'
import { getCategoryById } from '~/utils/servicesData'

const route = useRoute()

const categoryData = computed(() => getCategoryById(route.params.category as string))

if (!categoryData.value) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found', fatal: true })
}

// ✅ This route only has one dynamic segment (/services/[category]),
// so we only need one override to label it properly.
const breadcrumbs = useBreadcrumbItems({
  overrides: [
    undefined, // "Services" root — auto-generated, leave as-is
    {
      label: categoryData.value.label,
      current: true,
    },
  ],
})

function truncateText(text: string | undefined, maxWords: number = 15) {
  if (!text) return ''
  const words = text.split(' ')
  if (words.length <= maxWords) return text
  return words.slice(0, maxWords).join(' ') + '...'
}

const pageDescription = `Explore our specialized offerings within ${categoryData.value.label}. We build robust systems designed to scale with your operations.`

useSeoMeta({
  title: `${categoryData.value.label} Services`,
  description: pageDescription,
})

defineOgImage('OpsTemplate', {
  title: `${categoryData.value.label} Solutions.`,
  description: truncateText(pageDescription, 15),
  badge: 'Services'
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