<template>
  <footer class="relative bg-ops-black overflow-hidden">
    <div class="grain" aria-hidden="true" />
    <div class="dot-grid dot-grid--left"  aria-hidden="true" />
    <div class="dot-grid dot-grid--right" aria-hidden="true" />

    <div class="relative overflow-hidden bg-ops-navy border-t border-divider">
      <div
        class="absolute inset-0 pointer-events-none z-0 animate-pulse-slow"
        style="background: radial-gradient(ellipse at 60% 50%, rgba(17,138,178,0.12) 0%, transparent 65%);"
        aria-hidden="true"
      />

      <div class="relative z-10 max-w-300 mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div class="max-w-130">
          <p class="text-label text-accent mb-3">Ready to transform how you operate?</p>
          <h2 class="text-[clamp(26px,3.5vw,44px)] font-bold text-text-primary tracking-tight leading-tight">
            Tell us what you're building.<br class="hidden md:block" />
            We'll show you how to get there.
          </h2>
        </div>

        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-[15px] font-medium px-6 py-3 rounded-full transition-colors duration-200"
          >
            Start the conversation
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
          <NuxtLink
            to="/case-studies"
            class="inline-flex items-center gap-2 text-[14px] font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 px-2"
          >
            View case studies
            <span class="text-accent">→</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="relative z-10 max-w-300 mx-auto px-6 pt-14 pb-8">
      <div class="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-x-8 gap-y-12 mb-12">
        
        <div class="col-span-2 md:col-span-1">
          <NuxtLink to="/" class="inline-block mb-5" aria-label="OPS — Home">
            <NuxtImg
              src="/img/logo.svg"
              alt="OPS Logo"
              class="h-28 w-auto object-contain invert"
              loading="lazy"
            />
          </NuxtLink>
          <p class="text-[13px] text-text-tertiary leading-relaxed mb-6 max-w-60">
            The complete operating system for your business.
          </p>
          
          <div class="flex items-center gap-3">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Follow us on X">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.004 4.076H5.036z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Follow us on Instagram">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 class="footer-heading">Services</h4>
          <ul class="footer-list">
            <li v-for="category in serviceCategories" :key="category.id">
              <NuxtLink :to="`/services/${category.id}`" class="footer-link">{{ category.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="footer-heading">Company</h4>
          <ul class="footer-list">
            <li><NuxtLink to="/about" class="footer-link">About</NuxtLink></li>
            <li><NuxtLink to="/careers" class="footer-link">Careers</NuxtLink></li>
            <li><NuxtLink to="/partners" class="footer-link">Partners</NuxtLink></li>
            <li><NuxtLink to="/pricing-policy" class="footer-link">Pricing Policy</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-heading">Resources</h4>
          <ul class="footer-list">
            <li><NuxtLink to="/case-studies" class="footer-link">Case Studies</NuxtLink></li>
            <li><NuxtLink to="/insights" class="footer-link">Insights</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-heading">Contact</h4>
          <ul class="footer-list">
            <li><a href="mailto:orderlyproblemsolvers@gmail.com" class="footer-link break-all">orderlyproblemsolvers@gmail.com</a></li>
            <li><a href="tel:+2349018099785" class="footer-link">+234 901-8099-785</a></li>
            <li class="pt-1">
              <NuxtLink to="/contact" class="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent hover:text-accent-hover transition-colors group">
                Start a project <span class="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span class="text-[12px] text-text-tertiary order-2 sm:order-1">
          &copy; {{ currentYear }} Orderly Problem Solvers.
        </span>
        <div class="flex items-center gap-6 order-1 sm:order-2">
          <NuxtLink to="/privacy" class="text-[12px] text-text-tertiary hover:text-white transition-colors">Privacy</NuxtLink>
          <NuxtLink to="/terms" class="text-[12px] text-text-tertiary hover:text-white transition-colors">Terms</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { serviceCategories } from '~/utils/servicesData'
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer-heading { font-size: 11px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: var(--color-text-primary); margin-bottom: 16px; }
.footer-list { display: flex; flex-direction: column; gap: 11px; list-style: none; padding: 0; margin: 0; }
.footer-link { font-size: 13px; color: var(--color-text-tertiary); transition: color 200ms ease; line-height: 1.4; text-decoration: none; }
.footer-link:hover { color: #ffffff; }

.social-icon { width: 32px; height: 32px; border-radius: 99px; border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; color: var(--color-text-tertiary); transition: all 200ms ease; }
.social-icon:hover { color: white; border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); transform: translateY(-2px); }

/* Background Patterns */
.grain { position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: 0.035; mix-blend-mode: overlay; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E"); }
.dot-grid { position: absolute; bottom: 0; height: 300px; width: clamp(160px, 18vw, 280px); z-index: 1; opacity: 0.08; filter: blur(0.5px); background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='10' cy='10' r='1.1' fill='%23ffffff'/%3E%3C/svg%3E"); }
.dot-grid--left { left: 0; mask-image: linear-gradient(to top, black, transparent), linear-gradient(to right, black, transparent); mask-composite: intersect; }
.dot-grid--right { right: 0; mask-image: linear-gradient(to top, black, transparent), linear-gradient(to left, black, transparent); mask-composite: intersect; }

.animate-pulse-slow { animation: glow-pulse 8s ease-in-out infinite alternate; }
@keyframes glow-pulse { from { opacity: 0.5; } to { opacity: 1; } }
</style>