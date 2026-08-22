<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
      isScrolled || isLightBg
        ? 'bg-ops-navy/85 backdrop-blur-xl border-b border-white/6 shadow-[0_1px_0_rgba(255,255,255,0.04)]'
        : 'bg-transparent border-b border-transparent',
    ]"
  >
    <!-- Skip link — visually hidden until focused, first focusable element on the page -->
    <a
      href="#main-content"
      class="skip-link"
    >
      Skip to content
    </a>

    <div
      :class="[
        'w-full max-w-300 mx-auto px-6 flex items-center justify-between gap-8 transition-all duration-300 ease-out',
        isScrolled || isLightBg ? 'h-18' : 'h-24',
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
            isScrolled || isLightBg ? 'h-14' : 'h-20',
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
          class="relative px-3 py-2 text-[13px] font-medium rounded-md transition-colors duration-150"
          :class="isActive(link.to)
            ? 'text-text-primary'
            : 'text-text-secondary hover:text-text-primary'"
        >
          {{ link.label }}
          <span
            class="nav-underline"
            :class="isActive(link.to) ? 'nav-underline--active' : ''"
          />
        </NuxtLink>
      </nav>

      <!-- Desktop CTA -->
      <div class="hidden md:flex items-center shrink-0">
        <AppButton to="/contact" variant="primary" size="sm">
          Start a conversation
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
            class="py-3.5 text-[16px] font-medium border-b border-white/6 last:border-0 transition-colors duration-150"
            :class="isActive(link.to) ? 'text-text-primary' : 'text-text-secondary'"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </NuxtLink>

          <div class="pt-5 pb-1">
            <AppButton
              to="/contact"
              variant="primary"
              size="md"
              class="w-full"
              @click="mobileOpen = false"
            >
              Start a conversation
            </AppButton>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import AppButton from '../ui/AppButton.vue'

const route      = useRoute()
const isScrolled = ref(false)
const mobileOpen = ref(false)

// Light-background pages declare this themselves via:
//   definePageMeta({ headerTheme: 'light' })
// instead of maintaining a hardcoded route list here that goes stale.
const isLightBg = computed(() => route.meta?.headerTheme === 'light')

const navLinks = [
  { label: 'Services', to: '/services'     },
  { label: 'Work',      to: '/case-studies' },
  { label: 'About',     to: '/about'        },
  { label: 'Insights',  to: '/insights'     },
]

const isActive = (to: string) =>
  to === '/' ? route.path === '/' : route.path.startsWith(to)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Lock body scroll while the mobile menu is open
import { watch } from 'vue'
watch(mobileOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})
watch(() => route.path, () => {
  mobileOpen.value = false
})
</script>

<style scoped>
/* ─── Skip link ───────────────────────────────────────────────────────────── */
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 100;
  background: var(--color-accent);
  color: white;
  padding: 10px 16px;
  border-radius: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
}
.skip-link:focus {
  left: 0;
}

/* ─── Active nav underline ───────────────────────────────────────────────── */
.nav-underline {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 0;
  height: 2px;
  border-radius: 2px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 220ms var(--ease-out);
}
.nav-underline--active {
  transform: scaleX(1);
}

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
  .mobile-menu-leave-active,
  .nav-underline {
    transition: none;
  }
}
</style>