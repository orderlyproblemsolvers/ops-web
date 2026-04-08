<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-9000 transition-all duration-300 ease-out',
      isScrolled
        ? 'bg-ops-navy/85 backdrop-blur-xl border-b border-white/6 shadow-[0_1px_0_rgba(255,255,255,0.04)]'
        : 'bg-transparent border-b border-transparent',
      hideHeader && !mobileOpen ? '-translate-y-full' : 'translate-y-0',
    ]"
  >
    <div
      :class="[
        'w-full max-w-300 mx-auto px-6 flex items-center justify-between gap-8 transition-all duration-300 ease-out',
        isScrolled ? 'h-18' : 'h-24',
      ]"
    >

      <!-- Logo -->
      <NuxtLink
        to="/"
        class="flex items-center shrink-0 opacity-100 hover:opacity-75 transition-opacity duration-200"
        aria-label="OPS — Home"
      >
        <NuxtImg
          src="/img/logo.svg"
          alt="OPS Logo"
          :class="[
            'w-auto object-contain invert transition-all duration-300 ease-out',
            isScrolled ? 'h-12' : 'h-22',
          ]"
          preload
          fetchpriority="high"
        />
      </NuxtLink>

      <!-- Desktop nav — absolutely centered -->
      <nav
        class="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
        aria-label="Main navigation"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="relative px-3 py-1.5 text-[13px] font-medium rounded-md transition-colors duration-150"
          :class="isActive(link.to)
            ? 'text-text-primary'
            : 'text-text-secondary hover:text-text-primary'"
        >
          {{ link.label }}
          <span
            v-if="isActive(link.to)"
            class="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0.75 h-0.75 rounded-full bg-accent"
          />
        </NuxtLink>
      </nav>

      <!-- Desktop CTA -->
      <div class="hidden md:flex items-center shrink-0">
        <AppButton to="/contact" variant="primary" size="sm">
          Get Started
        </AppButton>
      </div>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/6 transition-all duration-150 ml-auto"
        :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="mobileOpen"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="hamburger-icon" :class="{ 'is-open': mobileOpen }">
          <span />
          <span />
          <span />
        </span>
      </button>

    </div>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div
        v-if="mobileOpen"
        class="md:hidden bg-ops-navy/95 backdrop-blur-xl border-t border-white/6"
      >
        <nav
          class="max-w-300 mx-auto px-6 py-4 flex flex-col"
          aria-label="Mobile navigation"
        >
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center justify-between py-3.5 text-[16px] font-medium border-b border-white/6 last:border-0 transition-colors duration-150"
            :class="isActive(link.to) ? 'text-text-primary' : 'text-text-secondary'"
            @click="mobileOpen = false"
          >
            {{ link.label }}
            <svg class="w-4 h-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 18l6-6-6-6" />
            </svg>
          </NuxtLink>

          <div class="pt-5 pb-1">
            <AppButton
              to="/contact"
              variant="primary"
              size="md"
              class="w-full"
              @click="mobileOpen = false"
            >
              Get Started
            </AppButton>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppButton from '../ui/AppButton.vue'

const route      = useRoute()
const isScrolled = ref(false)
const mobileOpen = ref(false)
const hideHeader = ref(false)

// Track breakpoint reactively so resize events don't cause stale isMobile reads
const isMobile = ref(false)

let lastScrollY   = 0
let ticking       = false        // rAF gate — prevents handler firing faster than paint
const HIDE_THRESHOLD = 60        // must scroll this far from top before hide can engage
const DELTA          = 8         // minimum px difference to register as intentional direction

const navLinks = [
  { label: 'Services',  to: '/services'     },
  { label: 'Solutions', to: '/case-studies' },
  { label: 'About',     to: '/about'        },
  { label: 'Insights',  to: '/insights'     },
]

const isActive = (to: string) =>
  to === '/' ? route.path === '/' : route.path.startsWith(to)

const updateScrollState = () => {
  const currentY = window.scrollY

  isScrolled.value = currentY > 20

  if (isMobile.value && !mobileOpen.value) {
    if (currentY < HIDE_THRESHOLD) {
      // Always show near the top regardless of direction
      hideHeader.value = false
    } else if (currentY - lastScrollY > DELTA) {
      // Scrolling DOWN by more than delta → hide
      hideHeader.value = true
    } else if (lastScrollY - currentY > DELTA) {
      // Scrolling UP by more than delta → reveal
      hideHeader.value = false
    }
    // Within delta — do nothing, avoids flickering on tiny jitter
  } else {
    hideHeader.value = false
  }

  lastScrollY = currentY
  ticking = false
}

const handleScroll = () => {
  // rAF gate: only schedule one update per animation frame
  if (!ticking) {
    requestAnimationFrame(updateScrollState)
    ticking = true
  }
}

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
  // If resized to desktop while header was hidden, reveal it immediately
  if (!isMobile.value) hideHeader.value = false
}

watch(() => route.path, () => {
  mobileOpen.value = false
  hideHeader.value = false
})

watch(mobileOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
  if (val) hideHeader.value = false
})

onMounted(() => {
  lastScrollY  = window.scrollY
  isMobile.value = window.innerWidth < 768
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
  updateScrollState()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ─── Hamburger → X morph ─────────────────────────────────────────────────── */
.hamburger-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 14px;
  position: relative;
}

.hamburger-icon span {
  display: block;
  width: 18px;
  height: 1.5px;
  background: currentColor;
  border-radius: 2px;
  position: absolute;
  transition:
    transform 250ms var(--ease-out),
    opacity   200ms ease,
    top       250ms var(--ease-out);
}

.hamburger-icon span:nth-child(1) { top: 0; }
.hamburger-icon span:nth-child(2) { top: 50%; transform: translateY(-50%); }
.hamburger-icon span:nth-child(3) { top: 100%; transform: translateY(-100%); }

.hamburger-icon.is-open span:nth-child(1) {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}
.hamburger-icon.is-open span:nth-child(2) {
  opacity: 0;
  transform: translateY(-50%) scaleX(0);
}
.hamburger-icon.is-open span:nth-child(3) {
  top: 50%;
  transform: translateY(-50%) rotate(-45deg);
}

/* ─── Mobile menu slide-in ────────────────────────────────────────────────── */
.mobile-menu-enter-active {
  transition: opacity 220ms ease, transform 250ms var(--ease-out);
}
.mobile-menu-leave-active {
  transition: opacity 180ms ease, transform 200ms ease-in;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ─── Reduced motion ─────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .hamburger-icon span,
  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition: none;
  }
}
</style>