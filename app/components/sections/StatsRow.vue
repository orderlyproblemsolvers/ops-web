<template>
  <section class="bg-ops-surface py-14 overflow-hidden">

    <p class="text-label text-text-secondary tracking-widest text-center mb-2">
      Trusted by forward-thinking organisations
    </p>

    <UMarquee
      pause-on-hover
      :repeat="6"
      :overlay="false"
      :ui="{
        root: '[--duration:35s] [--gap:--spacing(16)]',
        content: 'w-auto items-center',
      }"
      aria-label="Partner logos"
    >
      <div
        v-for="partner in partners"
        :key="partner.name"
        class="partner-item flex items-center justify-center px-2 shrink-0 relative"
        @mouseenter="showTooltip(partner, $event)"
        @mouseleave="hideTooltip"
        @mousemove="moveTooltip($event)"
      >
        <a
          :href="partner.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Visit ${partner.name} website`"
          class="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ops-surface rounded"
          @click.stop
        >
          <img
            :src="partner.src"
            :alt="`${partner.name} logo`"
            class="h-28 w-auto object-contain partner-logo"
            loading="lazy"
            draggable="false"
          />
        </a>
      </div>
    </UMarquee>

    <!-- Global tooltip — follows cursor, teleported to body so it's never clipped -->
    <Teleport to="body">
      <div
        ref="tooltipEl"
        class="partner-tooltip"
        :class="{ 'is-visible': tooltip.visible }"
        :style="{
          left: `${tooltip.x}px`,
          top:  `${tooltip.y}px`,
        }"
        role="tooltip"
        aria-live="polite"
      >
        <span class="tooltip-arrow" aria-hidden="true" />
        <span class="tooltip-label">{{ tooltip.name }}</span>
        <span class="tooltip-url">{{ tooltip.displayUrl }}</span>
      </div>
    </Teleport>

  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface Partner {
  name:       string
  src:        string
  url:        string
  displayUrl: string
}

const partners: Partner[] = [
  {
    name:       'The Covenant Academy',
    src:        '/img/partners/partners-01.svg',
    url:        'https://thecovenantacademy.org',
    displayUrl: 'thecovenantacademy.org',
  },
  {
    name:       'A Million Of Us',
    src:        '/img/partners/partners-02.svg',
    url:        'https://amufoundation.org',
    displayUrl: 'amufoundation.org',
  },
  {
    name:       'Shanadel Eye Clinic',
    src:        '/img/partners/partners-03.svg',
    url:        'https://shanadeleyeclinicltd.com.ng',
    displayUrl: 'shanadeleyeclinic.com.ng',
  },
  {
    name:       'Crafts Design',
    src:        '/img/partners/partners-04.svg',
    url:        'https://craftsdesign.com.ng',
    displayUrl: 'craftsdesign.com',
  },
  {
    name:       'B&S Educational Services',
    src:        '/img/partners/partners-05.svg',
    url:        'https://studylifeabroad.com',
    displayUrl: 'studylifeabroad.com',
  },
]

const tooltipEl = ref<HTMLElement | null>(null)

const tooltip = reactive({
  visible:    false,
  name:       '',
  displayUrl: '',
  x:          0,
  y:          0,
})

// Offset from cursor so the tooltip doesn't sit under the pointer
const OFFSET_X = 14
const OFFSET_Y = -52

const showTooltip = (partner: Partner, e: MouseEvent) => {
  tooltip.name       = partner.name
  tooltip.displayUrl = partner.displayUrl
  tooltip.x          = e.clientX + OFFSET_X
  tooltip.y          = e.clientY + OFFSET_Y
  tooltip.visible    = true
}

const moveTooltip = (e: MouseEvent) => {
  if (!tooltip.visible) return
  tooltip.x = e.clientX + OFFSET_X
  tooltip.y = e.clientY + OFFSET_Y
}

const hideTooltip = () => {
  tooltip.visible = false
}
</script>

<style scoped>
/* ─── Logo ───────────────────────────────────────────────────────────────── */
.partner-logo {
  user-select: none;
}

.partner-item:hover .partner-logo {
  opacity: 0.85;
  transform: scale(1.06);
}

/* ─── Tooltip ────────────────────────────────────────────────────────────── */
/*
  Fixed position so it follows the cursor via JS-set left/top.
  Teleported to <body> so it's never clipped by overflow:hidden ancestors.
  Two-line layout: partner name (bold) above display URL (muted).
*/
.partner-tooltip {
  position: fixed;
  z-index: 9999;
  pointer-events: none;

  display: flex;
  flex-direction: column;
  gap: 2px;

  background: #0A2840;
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.4),
    0 1px 0 rgba(255, 255, 255, 0.04) inset;

  /* Hidden state */
  opacity: 0;
  transform: translateY(6px) scale(0.96);
  transition:
    opacity   180ms ease,
    transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1.0);
  transform-origin: bottom left;
}

.partner-tooltip.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Small upward-pointing arrow */
.tooltip-arrow {
  position: absolute;
  bottom: -5px;
  left: 14px;
  width: 8px;
  height: 8px;
  background: #0A2840;
  border-right: 1px solid rgba(255, 255, 255, 0.10);
  border-bottom: 1px solid rgba(255, 255, 255, 0.10);
  transform: rotate(45deg);
}

.tooltip-label {
  font-size: 12px;
  font-weight: 600;
  color: #F5F5F7;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.tooltip-url {
  font-size: 11px;
  color: #118ab2;
  white-space: nowrap;
}

/* ─── Reduced motion ─────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .partner-logo,
  .partner-tooltip {
    transition: opacity 150ms ease;
    transform: none !important;
  }
}
</style>