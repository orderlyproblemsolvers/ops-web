<template>
  <section class="bg-primary py-14 overflow-hidden">

    <p class="text-label text-text-secondary tracking-widest text-center mb-4">
      Trusted by forward-thinking organisations
    </p>

    <div class="max-w-240 mx-auto">
      <!--
        Mobile/tablet (below md): single horizontally scrollable row, native touch swipe,
        snap-to-item, logos only — no labels.
        Desktop (md+): static centered grid with hover tooltip, unchanged.
      -->
      <div
        class="flex md:grid md:grid-cols-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-x-6 md:gap-x-6 gap-y-10 place-items-center px-6 md:px-6 no-scrollbar"
      >
        <a
          v-for="partner in partners"
          :key="partner.name"
          :href="partner.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Visit ${partner.name} website`"
          class="group partner-item relative flex flex-col items-center justify-center shrink-0 snap-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded"
        >
          <!-- Floating tooltip — desktop only, positioned above the logo, no layout shift -->
          <div
            class="hidden md:flex partner-tooltip absolute bottom-full mb-3 left-1/2 -translate-x-1/2 flex-col items-center text-center whitespace-nowrap pointer-events-none"
          >
            <span class="text-[12px] font-medium text-text-primary leading-tight">{{ partner.name }}</span>
            <span class="text-[11px] text-accent leading-tight">{{ partner.displayUrl }}</span>
            <span class="tooltip-arrow" aria-hidden="true" />
          </div>

          <img
            :src="partner.src"
            :alt="`${partner.name} logo`"
            class="h-16 md:h-20 w-auto object-contain partner-logo grayscale opacity-70 transition-all duration-200 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:opacity-100"
            loading="lazy"
            draggable="false"
          />
        </a>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
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
</script>

<style scoped>
.partner-logo {
  user-select: none;
}

/* Hide scrollbar on the mobile swipe row, keep touch scroll functional */
.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.partner-item:hover .partner-logo,
.partner-item:focus-visible .partner-logo {
  transform: scale(1.06);
}

/* Floating tooltip — hidden state */
.partner-tooltip {
  background: #0A2840;
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.4),
    0 1px 0 rgba(255, 255, 255, 0.04) inset;
  z-index: 20;

  opacity: 0;
  transform: translate(-50%, 6px) scale(0.96);
  transition:
    opacity   200ms ease-out,
    transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1.0);
  transform-origin: bottom center;
}

.partner-item:hover .partner-tooltip,
.partner-item:focus-visible .partner-tooltip {
  opacity: 1;
  transform: translate(-50%, 0) scale(1);
}

.tooltip-arrow {
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 8px;
  height: 8px;
  background: #0A2840;
  border-right: 1px solid rgba(255, 255, 255, 0.10);
  border-bottom: 1px solid rgba(255, 255, 255, 0.10);
  transform: translateX(-50%) rotate(45deg);
}

@media (prefers-reduced-motion: reduce) {
  .partner-logo,
  .partner-tooltip {
    transition: opacity 150ms ease;
    transform: none !important;
  }
}
</style>