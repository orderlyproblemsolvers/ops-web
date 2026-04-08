<template>
  <section
    ref="sectionRef"
    class="relative bg-ops-navy overflow-hidden"
  >
    <div class="max-w-360 mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-140 md:min-h-160">

      <!-- Left — statement content -->
      <div
        class="flex flex-col justify-center px-8 md:px-16 py-20 md:py-28 relative z-10"
        :class="{ 'is-visible': isVisible }"
      >
        <span class="stmt-label text-label text-accent block mb-8 opacity-0">
          Our mission
        </span>

        <blockquote class="stmt-quote opacity-0">
          <p class="text-[clamp(28px,3.8vw,52px)] font-bold text-text-primary tracking-tight leading-[1.08] mb-0">
            Order is not the<br />absence of ambition.
          </p>
          <p class="text-[clamp(28px,3.8vw,52px)] font-bold tracking-tight leading-[1.08] mt-3" style="color: #118ab2;">
            It's the foundation of it.
          </p>
        </blockquote>

        <div class="stmt-body opacity-0 mt-8 md:mt-10 max-w-110">
          <p class="text-[16px] text-text-secondary leading-relaxed">
            We solve real business problems with purpose-built software and expert strategy. No bloat. No guesswork. Just solutions that work.
          </p>

          <div class="mt-10 flex items-center gap-4">
            <div class="w-8 h-px bg-accent/60" />
            <span class="text-[12px] text-text-tertiary tracking-[0.12em] uppercase font-medium">
              Orderly Problem Solvers
            </span>
          </div>
        </div>
      </div>

      <!-- Right — image -->
      <div
        class="relative overflow-hidden min-h-80 lg:min-h-0"
        :class="{ 'is-visible': isVisible }"
      >
        <!-- Image -->
        <img
          src="/img/consulting.jpg"
          alt="OPS consultant at work"
          class="stmt-img absolute inset-0 w-full h-full object-cover object-center opacity-0"
        />

        <!-- Left-edge fade — blends image into navy on the left seam -->
        <div
          class="absolute inset-y-0 left-0 w-45 pointer-events-none z-10"
          style="background: linear-gradient(to right, #051c2c 0%, transparent 100%);"
          aria-hidden="true"
        />

        <!-- Dark overlay to keep the image at the right weight on dark bg -->
        <div
          class="absolute inset-0 pointer-events-none z-10"
          style="background: rgba(5,28,44,0.35);"
          aria-hidden="true"
        />

        <!-- Accent tint at bottom edge -->
        <div
          class="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none z-10"
          style="background: linear-gradient(to top, rgba(17,138,178,0.12) 0%, transparent 100%);"
          aria-hidden="true"
        />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible  = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.2 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
/* ── Label ───────────────────────────────────────────────────────────────── */
.stmt-label {
  transition: opacity 500ms ease 100ms;
}
.is-visible .stmt-label { opacity: 1; }

/* ── Quote — slides up from below ────────────────────────────────────────── */
.stmt-quote {
  transform: translateY(24px);
  transition:
    opacity  700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 200ms,
    transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 200ms;
}
.is-visible .stmt-quote {
  opacity: 1;
  transform: translateY(0);
}

/* ── Body + rule — fade in after quote ───────────────────────────────────── */
.stmt-body {
  transition: opacity 600ms ease 500ms;
}
.is-visible .stmt-body { opacity: 1; }

/* ── Image — fades in with a subtle scale from 1.04 → 1.00 ─────────────── */
.stmt-img {
  transform: scale(1.04);
  transition:
    opacity  900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 150ms,
    transform 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 150ms;
}
.is-visible .stmt-img {
  opacity: 1;
  transform: scale(1);
}

/* ── Reduced motion ──────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .stmt-label,
  .stmt-quote,
  .stmt-body,
  .stmt-img {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>