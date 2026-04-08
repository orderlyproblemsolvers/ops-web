<template>
  <section class="hero-section relative min-h-svh flex flex-col items-center justify-start overflow-hidden bg-ops-navy pt-[20vh]">

    <div class="grain" aria-hidden="true" />

    <div class="dot-grid dot-grid--left"  aria-hidden="true" />
    <div class="dot-grid dot-grid--right" aria-hidden="true" />

    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-150 pointer-events-none z-0 animate-pulse-slow"
      style="background: radial-gradient(ellipse at 50% 40%, rgba(17,138,178,0.14) 0%, transparent 65%);"
    />

    <div class="relative z-20 w-full max-w-195 mx-auto text-center px-5 mb-8">

      <h1
        class="text-[clamp(40px,5vw,68px)] leading-[1.05] font-bold tracking-tight text-text-primary mb-4 opacity-0 animate-fade-up"
        style="animation-delay: 100ms; animation-fill-mode: forwards;"
      >
        {{ headline }}
      </h1>

      <p
        v-if="subline"
        class="text-[clamp(16px,2vw,20px)] text-text-secondary max-w-145 mx-auto mb-8 leading-relaxed opacity-0 animate-fade-up"
        style="animation-delay: 200ms; animation-fill-mode: forwards;"
      >
        {{ subline }}
      </p>

      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up"
        style="animation-delay: 350ms; animation-fill-mode: forwards;"
      >
        <AppButton
          v-if="primaryCta"
          :to="primaryCta.to"
          variant="primary"
          size="lg"
          @click="emit('cta-click', { label: primaryCta.text, destination: primaryCta.to })"
        >
          {{ primaryCta.text }}
        </AppButton>
        <AppButton
          v-if="secondaryCta"
          :to="secondaryCta.to"
          variant="ghost"
          size="lg"
          @click="emit('cta-click', { label: secondaryCta.text, destination: secondaryCta.to })"
        >
          {{ secondaryCta.text }}
        </AppButton>
      </div>

    </div>

    <div
      class="relative z-10 w-full max-w-275 mx-auto px-5 grow flex items-end opacity-0 animate-fade-up"
      style="animation-delay: 500ms; animation-fill-mode: forwards;"
    >
      <div class="relative w-full rounded-t-[16px] border border-b-0 border-white/10 overflow-hidden shadow-[0_-8px_48px_rgba(0,0,0,0.4)]">

        <div class="flex items-center gap-3 px-4 py-3 bg-white/6 border-b border-white/10 backdrop-blur-sm">
          <div class="flex items-center gap-1.5">
            <span class="w-2.75 h-2.75 rounded-full bg-white/20" />
            <span class="w-2.75 h-2.75 rounded-full bg-white/20" />
            <span class="w-2.75 h-2.75 rounded-full bg-white/20" />
          </div>
          <div class="flex-1 h-5.5 rounded-md bg-white/8 flex items-center px-3 gap-2">
            <svg class="w-3 h-3 opacity-40" viewBox="0 0 12 14" fill="none">
              <rect x="1" y="6" width="10" height="7" rx="1.5" stroke="white" stroke-width="1.2"/>
              <path d="M4 6V4a2 2 0 014 0v2" stroke="white" stroke-width="1.2"/>
            </svg>
            <span class="text-[11px] text-white/40 font-medium tracking-wide">ops.solutions/dashboard</span>
          </div>
        </div>

        <NuxtImg
          src="/img/hero-mockup.png"
          alt="OPS Enterprise Dashboard"
          class="w-full block object-cover object-top aspect-video md:aspect-auto md:h-[50vh] md:min-h-75"
          fetchpriority="high"
        />

        <div class="absolute inset-x-0 bottom-0 h-[60%] pointer-events-none bg-linear-to-b from-transparent to-ops-navy" />
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import AppButton from '../ui/AppButton.vue'

defineProps({
  headline:     { type: String, required: true },
  subline:      { type: String, default: '' },
  primaryCta:   { type: Object, default: () => null },
  secondaryCta: { type: Object, default: () => null },
})

const emit = defineEmits<{
  'cta-click': [payload: { label: string; destination: string }]
}>()
</script>

<style scoped>
/* ─── Grain noise ────────────────────────────────────────────────────────────
   A pseudo-element covers the full section with an SVG feTurbulence noise
   filter. Opacity is kept at 0.035 so it reads as premium matte texture,
   not visible grit. mix-blend-mode: overlay lets it interact with the
   background colour rather than just sitting on top.
   pointer-events: none so it never blocks clicks.
──────────────────────────────────────────────────────────────────────────── */
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

/* ─── Dot grid panels ────────────────────────────────────────────────────────
   Two absolutely-positioned panels, pinned to the left and right edges.
   Width is capped at 280px so they never overlap the center content column.

   The dot pattern is a tiny inline SVG circle repeated — one dot per 20×20px
   cell. Opacity is 0.09 (very ghost-like on dark navy).

   filter: blur(0.6px) softens the crisp SVG dots just enough to feel
   atmospheric rather than geometric/technical.

   mask-image fades each panel:
   - Horizontally: solid on the outer edge, fades to transparent toward center
   - Vertically: fades in from the top and out toward the bottom
   This keeps the effect ambient — it never competes with text or the mockup.
──────────────────────────────────────────────────────────────────────────── */
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
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-up {
  animation: fade-up 600ms var(--ease-out);
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
  }
}
</style>