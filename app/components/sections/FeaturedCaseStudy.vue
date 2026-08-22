<template>
  <section
    ref="sectionRef"
    class="bg-primary py-12 md:py-14 px-5 overflow-hidden"
  >
    <div class="max-w-300 mx-auto min-h-[32vh] md:min-h-[38vh] flex items-center">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">

        <!-- Summary side -->
        <div class="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">

          <div
            class="flex items-center gap-4 mb-5 opacity-0 work-reveal"
            style="--d: 0ms"
          >
            <div class="w-8 h-px bg-accent/50" />
            <span class="text-label text-accent uppercase tracking-widest">Featured Work</span>
          </div>

          <h2
            class="text-[clamp(24px,2.8vw,32px)] font-bold text-text-primary leading-[1.2] tracking-tight mb-4 work-reveal opacity-0"
            style="--d: 100ms"
          >
            See how we turned manual delays into instant clarity.
          </h2>

          <p
            class="text-[15px] text-text-secondary leading-relaxed mb-8 max-w-105 work-reveal opacity-0"
            style="--d: 180ms"
          >
            A growing community school was buried in manual records and slow result processing. We built a unified platform that cut processing time by 85% and gave staff, students, and parents real-time visibility.
          </p>

          <div
            class="flex flex-wrap items-center gap-5 work-reveal opacity-0"
            style="--d: 260ms"
          >
            <NuxtLink
              to="/case-studies/the-covenant-academy-mis"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-button bg-accent text-white text-[14px] font-medium hover:bg-accent-hover transition-colors duration-200"
            >
              Watch the Case Study
            </NuxtLink>
            <NuxtLink
              to="/case-studies"
              class="inline-flex items-center gap-1.5 text-[14px] font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 group"
            >
              View all work
              <span class="text-accent group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
            </NuxtLink>
          </div>

        </div>

        <!-- Video side -->
        <div class="lg:col-span-7 order-1 lg:order-2 work-reveal opacity-0" style="--d: 220ms">
          <div class="relative rounded-card border border-divider overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] bg-ops-surface aspect-video">
            <video
              ref="videoRef"
              src="/vid/TCAD Case Study Intro.mp4"
              loop
              playsinline
              preload="metadata"
              class="w-full h-full object-cover"
              @click="togglePlayback"
              @play="handlePlay"
              @pause="handlePause"
            />

            <button
              v-if="!isPlaying"
              type="button"
              class="absolute inset-0 flex items-center justify-center bg-ops-black/30 hover:bg-ops-black/45 transition-colors duration-200"
              @click="togglePlayback"
              aria-label="Play featured video"
            >
              <span class="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm">
                <svg v-if="!isPlaying" class="ml-1 h-7 w-7 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <svg v-else class="h-7 w-7 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
let observer: IntersectionObserver | null = null

const togglePlayback = async () => {
  if (!videoRef.value) return

  if (videoRef.value.paused) {
    await videoRef.value.play()
  } else {
    videoRef.value.pause()
  }
}

const handlePlay = () => {
  isPlaying.value = true
}

const handlePause = () => {
  isPlaying.value = false
}

const handleVideoEnded = () => {
  isPlaying.value = false
}

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

  videoRef.value?.addEventListener('ended', handleVideoEnded)
  if (videoRef.value?.paused) {
    isPlaying.value = false
  }
})

onUnmounted(() => {
  videoRef.value?.removeEventListener('ended', handleVideoEnded)
  observer?.disconnect()
})
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