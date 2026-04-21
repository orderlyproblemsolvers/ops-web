<template>
  <div class="min-h-svh bg-white pt-10 lg:pt-32 pb-[80px] lg:pb-35 selection:bg-accent selection:text-white">
    <div class="max-w-300 mx-auto px-5">

      <div class="mb-10 md:mb-14 opacity-0 animate-fade-up" style="animation-delay: 100ms; animation-fill-mode: forwards;">
        <h2 class="text-[12px] font-bold text-accent uppercase tracking-widest mb-4">
          Insights & Updates
        </h2>
        <h1 class="text-[clamp(24px,2.8vw,38px)] font-bold text-gray-900 leading-tight tracking-tight max-w-xl">
          Thinking out loud.
        </h1>
        <p class="text-[15px] text-gray-500 mt-3 max-w-lg leading-relaxed">
          How we think about software, systems, and the businesses that run on them.
        </p>
      </div>

      <div class="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10 opacity-0 animate-fade-up" style="animation-delay: 200ms; animation-fill-mode: forwards;">

        <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0" role="tablist">
          <button
            v-for="category in categories"
            :key="category"
            role="tab"
            :aria-selected="selectedCategory === category"
            @click="selectedCategory = category"
            :class="[
              'relative shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 outline-none',
              selectedCategory === category
                ? 'bg-accent text-white'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-gray-200',
            ]"
          >
            {{ category }}
          </button>
        </div>

        <div class="relative w-full md:w-64 shrink-0">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search insights..."
            class="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[14px] rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-accent/50 focus:bg-white transition-all duration-200 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div class="opacity-0 animate-fade-up" style="animation-delay: 300ms; animation-fill-mode: forwards;">

        <!-- Skeleton -->
        <div v-if="status === 'pending'">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div v-for="i in 2" :key="'skel-card-'+i" class="bg-gray-50 border border-gray-200 rounded-[16px] overflow-hidden flex flex-col animate-pulse">
              <div class="h-44 w-full bg-gray-200" />
              <div class="p-5 flex flex-col flex-1">
                <div class="flex justify-between mb-4">
                  <div class="h-4 w-16 bg-gray-200 rounded-full" />
                  <div class="h-4 w-20 bg-gray-100 rounded" />
                </div>
                <div class="h-6 w-full bg-gray-200 rounded mb-2" />
                <div class="h-6 w-2/3 bg-gray-200 rounded mb-4" />
                <div class="h-4 w-full bg-gray-100 rounded mb-2" />
                <div class="h-4 w-4/5 bg-gray-100 rounded mb-4" />
                <div class="mt-auto h-4 w-20 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-3">
            <div v-for="i in 3" :key="'skel-list-'+i" class="flex items-center gap-5 p-3 rounded-[14px] border border-gray-200 bg-gray-50 animate-pulse">
              <div class="w-20 h-20 rounded-xl bg-gray-200 shrink-0" />
              <div class="flex flex-col flex-1 gap-2">
                <div class="h-3 w-16 bg-gray-200 rounded-full" />
                <div class="h-5 w-full max-w-sm bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else-if="!filteredPosts?.length" class="text-center py-20 bg-gray-50 border border-gray-200 rounded-[16px] flex flex-col items-center">
          <div class="w-14 h-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-base font-semibold text-gray-900 mb-2">No insights found</h3>
          <p class="text-[14px] text-gray-500 max-w-sm">
            {{ searchQuery ? `Nothing matching "${searchQuery}".` : "We're preparing our first set of insights. Check back soon." }}
          </p>
          <button v-if="searchQuery || selectedCategory !== 'All'" @click="resetFilters" class="mt-5 text-[13px] font-medium text-accent hover:text-gray-900 transition-colors">
            Clear filters
          </button>
        </div>

        <div v-else>

          <!-- Featured cards -->
          <div v-if="featuredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <NuxtLink
              v-for="post in featuredPosts"
              :key="post.id"
              :to="`/insights/${post.slug}`"
              class="group relative bg-white border border-gray-200 rounded-[16px] flex flex-col hover:border-accent/30 transition-colors duration-300 overflow-hidden"
            >
              <div class="h-44 w-full overflow-hidden relative border-b border-gray-100 shrink-0">
                <img
                  v-if="post.coverImage"
                  :src="post.coverImage"
                  :alt="post.title"
                  class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                />
                <div v-else class="absolute inset-0 bg-gray-50 flex items-center justify-center">
                  <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>

              <div class="p-5 md:p-6 flex flex-col flex-1">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-[11px] font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200 uppercase tracking-wide">
                    {{ post.category }}
                  </span>
                  <span class="text-[12px] text-gray-400">
                    {{ formatDate(post.createdAt as string) }}
                  </span>
                </div>

                <h2 class="text-[17px] md:text-[19px] font-bold text-gray-900 mb-2 leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-2">
                  {{ post.title }}
                </h2>

                <p class="text-[14px] text-gray-500 leading-relaxed line-clamp-2 mb-5 flex-1">
                  {{ post.excerpt }}
                </p>

                <div class="mt-auto">
                  <span class="text-[13px] text-accent/70 group-hover:text-accent font-medium transition-colors duration-200 inline-flex items-center gap-1">
                    Read {{ post.format }} →
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Older posts list -->
          <div v-if="olderPosts.length > 0" class="flex flex-col">
            <h3 class="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-5 pl-1">
              Previous Insights
            </h3>

            <div class="flex flex-col gap-2">
              <NuxtLink
                v-for="post in olderPosts"
                :key="post.id"
                :to="`/insights/${post.slug}`"
                class="group flex items-center gap-4 sm:gap-6 p-3 rounded-[14px] hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200"
              >
                <div class="w-18 h-18 sm:w-22 sm:h-22 rounded-xl overflow-hidden relative shrink-0 border border-gray-200 bg-gray-50">
                  <img
                    v-if="post.coverImage"
                    :src="post.coverImage"
                    :alt="post.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div v-else class="absolute inset-0 flex items-center justify-center">
                    <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>

                <div class="flex flex-col justify-center flex-1 py-1">
                  <div class="flex items-center gap-2.5 mb-1.5">
                    <span class="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                      {{ post.category }}
                    </span>
                    <span class="w-1 h-1 rounded-full bg-gray-300" />
                    <span class="text-[11px] text-gray-400">
                      {{ formatDate(post.createdAt as string) }}
                    </span>
                  </div>

                  <h3 class="text-[15px] sm:text-[17px] font-semibold text-gray-900 leading-snug group-hover:text-accent transition-colors duration-200 line-clamp-2">
                    {{ post.title }}
                  </h3>
                </div>
              </NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

useSeoMeta({
  title: 'Insights',
  description: 'How we think about software, systems, and the businesses that run on them.'
})

defineOgImage('OpsTemplate', {
  title: 'Thinking out loud.',
  description: 'How we think about software, systems, and the businesses that run on them.',
  badge: 'Insights'
})

const { data: posts, status } = useFetch('/api/public/insights')

const searchQuery = ref('')
const selectedCategory = ref('All')
const categories = ['All', 'Strategy', 'Engineering', 'Data & AI', 'Design', 'Company']

const filteredPosts = computed(() => {
  if (!posts.value) return []
  let result = posts.value
  if (selectedCategory.value !== 'All') {
    result = result.filter(post => post.category === selectedCategory.value)
  }
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(post =>
      post.title.toLowerCase().includes(query) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(query))
    )
  }
  return result
})

const featuredPosts = computed(() => filteredPosts.value.slice(0, 2))
const olderPosts = computed(() => filteredPosts.value.slice(2))

function resetFilters() {
  searchQuery.value = ''
  selectedCategory.value = 'All'
}

function formatDate(dateString: string) {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(dateString))
}
</script>

<style scoped>
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }

@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  animation: fade-up 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-up {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>