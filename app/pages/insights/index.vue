<template>
  <div class="min-h-svh bg-ops-navy pt-10 lg:pt-32 pb-[80px] lg:pb-35 selection:bg-accent selection:text-white">
    <div class="max-w-300 mx-auto px-5">
      
      <div class="mb-12 md:mb-16 opacity-0 animate-fade-up" style="animation-delay: 100ms; animation-fill-mode: forwards;">
        <h2 class="text-[13px] font-bold text-accent uppercase tracking-widest mb-6">
          Insights & Updates
        </h2>
        <h1 class="text-[clamp(32px,4vw,52px)] font-bold text-text-primary leading-tight tracking-tight max-w-2xl">
          Pragmatic strategies and engineering deep dives.
        </h1>
        <p class="text-[16px] text-text-secondary mt-4 max-w-2xl leading-relaxed">
          We share our approach to solving complex business problems through orderly systems, custom software, and scalable infrastructure.
        </p>
      </div>

      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 opacity-0 animate-fade-up" style="animation-delay: 200ms; animation-fill-mode: forwards;">
        
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
                : 'text-text-secondary hover:text-text-primary hover:bg-white/6 border border-transparent hover:border-white/5',
            ]"
          >
            {{ category }}
          </button>
        </div>

        <div class="relative w-full md:w-72 shrink-0">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg class="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search insights..."
            class="w-full bg-white/4 border border-white/10 text-text-primary text-[14px] rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all duration-200 placeholder:text-text-tertiary"
          />
        </div>
      </div>

      <div class="opacity-0 animate-fade-up" style="animation-delay: 300ms; animation-fill-mode: forwards;">
        
        <div v-if="status === 'pending'">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div v-for="i in 2" :key="'skel-card-'+i" class="bg-ops-surface border border-white/5 rounded-[20px] overflow-hidden flex flex-col animate-pulse">
              <div class="h-64 w-full bg-white/5" />
              <div class="p-6 md:p-8 flex flex-col flex-1">
                <div class="flex justify-between mb-5">
                  <div class="h-5 w-20 bg-white/10 rounded-full" />
                  <div class="h-4 w-24 bg-white/5 rounded" />
                </div>
                <div class="h-8 w-full bg-white/10 rounded mb-2" />
                <div class="h-8 w-2/3 bg-white/10 rounded mb-6" />
                <div class="h-4 w-full bg-white/5 rounded mb-2" />
                <div class="h-4 w-4/5 bg-white/5 rounded mb-6" />
                <div class="mt-auto h-5 w-24 bg-white/10 rounded" />
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <div v-for="i in 3" :key="'skel-list-'+i" class="flex items-center gap-6 p-4 rounded-[20px] border border-white/5 bg-ops-surface animate-pulse">
              <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-white/5 shrink-0" />
              <div class="flex flex-col flex-1">
                <div class="h-4 w-20 bg-white/10 rounded-full mb-3" />
                <div class="h-6 w-full max-w-md bg-white/10 rounded mb-2" />
                <div class="h-6 w-2/3 max-w-sm bg-white/10 rounded" />
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="!filteredPosts?.length" class="text-center py-24 bg-ops-surface border border-white/5 rounded-[20px] flex flex-col items-center">
          <div class="w-16 h-16 rounded-full bg-white/4 border border-white/10 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-text-primary mb-2">No insights found</h3>
          <p class="text-[14px] text-text-secondary max-w-sm">
            {{ searchQuery ? `We couldn't find anything matching "${searchQuery}".` : "We are currently preparing our first set of insights. Check back soon." }}
          </p>
          <button v-if="searchQuery || selectedCategory !== 'All'" @click="resetFilters" class="mt-6 text-[14px] font-medium text-accent hover:text-white transition-colors">
            Clear filters
          </button>
        </div>

        <div v-else>
          
          <div v-if="featuredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <NuxtLink 
              v-for="post in featuredPosts" 
              :key="post.id" 
              :to="`/insights/${post.slug}`"
              class="group relative bg-ops-surface border border-white/5 rounded-[20px] flex flex-col hover:border-accent/30 hover:bg-ops-elevated transition-all duration-300 overflow-hidden"
            >
              <div class="h-56 sm:h-64 w-full overflow-hidden relative border-b border-white/5 shrink-0">
                <img 
                  v-if="post.coverImage" 
                  :src="post.coverImage" 
                  :alt="post.title" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div v-else class="absolute inset-0 bg-linear-to-br from-white/5 to-transparent flex items-center justify-center">
                  <svg class="w-10 h-10 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div class="absolute inset-0 bg-ops-navy/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              <div class="p-6 md:p-8 flex flex-col flex-1">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-[11px] font-medium text-white/80 bg-white/8 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 uppercase tracking-wide">
                    {{ post.category }}
                  </span>
                  <span class="text-[13px] text-text-tertiary font-medium">
                    {{ formatDate(post.createdAt as string) }}
                  </span>
                </div>
                
                <h2 class="text-[clamp(20px,2vw,24px)] font-bold text-text-primary mb-3 leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-2">
                  {{ post.title }}
                </h2>
                
                <p class="text-[15px] text-text-secondary leading-relaxed line-clamp-3 mb-8 flex-1">
                  {{ post.excerpt }}
                </p>
                
                <div class="flex items-center justify-between mt-auto">
                  <span class="text-[14px] text-accent/70 group-hover:text-accent font-medium transition-colors duration-200 inline-flex items-center gap-1 group-hover:translate-x-0.5">
                    Read {{ post.format }} →
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>

          <div v-if="olderPosts.length > 0" class="flex flex-col">
            <h3 class="text-[13px] font-bold text-text-secondary uppercase tracking-widest mb-6 pl-2">
              Previous Insights
            </h3>
            
            <div class="flex flex-col gap-3">
              <NuxtLink 
                v-for="post in olderPosts" 
                :key="post.id" 
                :to="`/insights/${post.slug}`"
                class="group flex items-center gap-5 sm:gap-8 p-3 sm:p-4 rounded-[20px] bg-transparent hover:bg-ops-surface border border-transparent hover:border-white/5 transition-all duration-300"
              >
                <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden relative shrink-0 border border-white/5">
                  <img 
                    v-if="post.coverImage" 
                    :src="post.coverImage" 
                    :alt="post.title" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  />
                  <div v-else class="absolute inset-0 bg-linear-to-br from-white/5 to-transparent flex items-center justify-center">
                    <svg class="w-6 h-6 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>

                <div class="flex flex-col justify-center flex-1 py-1">
                  <div class="flex items-center gap-3 mb-2">
                    <span class="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">
                      {{ post.category }}
                    </span>
                    <span class="w-1 h-1 rounded-full bg-white/10"></span>
                    <span class="text-[12px] text-text-tertiary">
                      {{ formatDate(post.createdAt as string) }}
                    </span>
                  </div>
                  
                  <h3 class="text-[16px] sm:text-[20px] font-bold text-text-primary leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-2">
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

// 1. Standard HTML SEO Metadata
useSeoMeta({
  title: 'Insights',
  description: 'We share our approach to solving complex business problems through orderly systems, custom software, and scalable infrastructure.'
})

// 2. Visual Open Graph Image Generation
// This is completely static because the index page identity doesn't change based on the posts inside it.
defineOgImageComponent('OpsTemplate', {
  title: 'Pragmatic strategies and engineering deep dives.',
  description: 'Our approach to solving complex business problems through orderly systems and custom software.',
  badge: 'Insights'
})

// 3. Fetch all published posts (No await needed here since we aren't blocking the OG image!)
const { data: posts, status } = useFetch('/api/public/insights')

// State for filtering and searching
const searchQuery = ref('')
const selectedCategory = ref('All')
const categories = ['All', 'Strategy', 'Engineering', 'Data & AI', 'Design', 'Company']

// 1. Filter the posts based on search/category
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

// 2. Split into Featured (Top 2) and Older (The rest)
const featuredPosts = computed(() => {
  return filteredPosts.value.slice(0, 2)
})

const olderPosts = computed(() => {
  return filteredPosts.value.slice(2)
})

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