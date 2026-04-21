<template>
  <section class="bg-gray-50 py-[64px] md:py-10 px-5">
    <div class="max-w-300 mx-auto">

      <!-- Section header -->
      <div class="text-center mb-12 max-w-170 mx-auto">
        <span class="text-label text-accent block mb-4">What We Do</span>
        <h2 class="text-heading text-gray-900 mb-4">Every solution your business needs.</h2>
        <p class="text-body text-gray-500 leading-relaxed">
          From enterprise software to AI strategy — OPS covers the full spectrum of digital operations.
        </p>
      </div>

      <!-- Category tabs -->
      <div
        class="flex items-center gap-2 mb-12 overflow-x-auto pb-2 md:pb-0 md:flex-wrap md:justify-center scrollbar-hide"
        role="tablist"
        aria-label="Service categories"
      >
        <button
          v-for="(category, i) in categories"
          :key="category.id"
          role="tab"
          :aria-selected="activeIndex === i"
          :aria-controls="`panel-${category.id}`"
          :id="`tab-${category.id}`"
          @click="setActive(i, category)"
          :class="[
            'relative shrink-0 px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white',
            activeIndex === i
              ? 'bg-accent text-white shadow-[0_0_20px_rgba(17,138,178,0.25)]'
              : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200 border border-gray-200',
          ]"
        >
          {{ category.label }}
        </button>
      </div>

      <!-- Panels -->
      <div class="relative">
        <Transition name="panel-fade" mode="out-in">
          <div
            :key="activeIndex"
            :id="`panel-${categories[activeIndex].id}`"
            role="tabpanel"
            :aria-labelledby="`tab-${categories[activeIndex].id}`"
          >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

              <!-- Hero card -->
              <NuxtLink
                :to="activeCategory.services[0].link"
                class="group relative bg-ops-navy rounded-card flex flex-col justify-between overflow-hidden transition-opacity duration-200 hover:opacity-90 min-h-56 md:min-h-64"
                @click="handleCardClick(activeCategory.services[0], activeCategory.label, 'hero')"
              >
                <div
                  class="absolute inset-0 pointer-events-none z-0"
                  aria-hidden="true"
                >
                  <img
                    :src="activeCategory.heroBg"
                    :key="activeCategory.id"
                    alt=""
                    class="w-full h-full object-cover object-top opacity-40"
                  />
                  <div class="absolute inset-0 bg-linear-to-b from-ops-navy/90 via-ops-navy/60 to-ops-navy/30" />
                  <div class="absolute inset-0 bg-linear-to-r from-ops-navy/85 to-transparent" />
                </div>

                <div
                  class="absolute top-0 right-0 w-70 h-70 pointer-events-none z-0"
                  style="background: radial-gradient(ellipse at 80% 20%, rgba(17,138,178,0.12) 0%, transparent 65%);"
                  aria-hidden="true"
                />

                <div class="relative z-10 p-5 md:p-7">
                  <div class="icon-well mb-4 md:mb-5">
                    <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="activeCategory.services[0].iconPath" />
                  </div>

                  <h3 class="text-[20px] md:text-[23px] font-semibold text-text-primary mb-2 leading-snug tracking-tight">
                    {{ activeCategory.services[0].headline }}
                  </h3>
                  <p class="text-[13px] md:text-[14px] text-text-secondary leading-relaxed max-w-95">
                    {{ activeCategory.services[0].body }}
                  </p>
                </div>

                <div class="relative z-10 flex flex-wrap items-center justify-between gap-3 px-5 pb-5 md:px-7 md:pb-7">
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in activeCategory.services[0].tags"
                      :key="tag"
                      class="text-[11px] font-medium text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20"
                    >
                      {{ tag }}
                    </span>
                  </div>

                  <div class="text-[14px] text-accent font-medium inline-flex items-center gap-1 shrink-0 ml-4">
                    Explore <span class="cta-arrow">&rarr;</span>
                  </div>
                </div>
              </NuxtLink>

              <!-- Supporting cards -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 content-start">
                <NuxtLink
                  v-for="service in activeCategory.services.slice(1)"
                  :key="service.headline"
                  :to="service.link"
                  class="group bg-white border border-accent/25 hover:border-accent/50 rounded-[14px] p-4 md:p-5 flex flex-col justify-between transition-colors duration-200"
                  @click="handleCardClick(service, activeCategory.label, 'supporting')"
                >
                  <div>
                    <div class="icon-well-light mb-3 w-9! h-9! rounded-input!">
                      <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="service.iconPath" />
                    </div>
                    <h3 class="text-[15px] font-semibold text-gray-900 mb-1.5 leading-snug">
                      {{ service.headline }}
                    </h3>
                    <p class="text-[12px] text-gray-500 leading-relaxed">
                      {{ service.body }}
                    </p>
                  </div>

                  <div class="text-[12px] text-accent font-medium inline-flex items-center gap-1 mt-4">
                    Explore <span class="cta-arrow">&rarr;</span>
                  </div>
                </NuxtLink>
              </div>

            </div>
          </div>
        </Transition>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-14">
        <NuxtLink
          to="/services"
          class="inline-flex items-center gap-2 text-[14px] font-medium text-gray-400 hover:text-gray-900 transition-colors duration-200 group"
          @click="track('view_all_services_click', { page: 'home' })"
        >
          View all services
          <span class="cta-arrow text-accent">→</span>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// ─── Analytics ────────────────────────────────────────────────────────────────

const track = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', eventName, params)
}

// ─── Tab switching ─────────────────────────────────────────────────────────────

const activeIndex = ref(0)

const setActive = (i: number, category: typeof categories[number]) => {
  if (activeIndex.value === i) return
  activeIndex.value = i
  track('service_category_view', {
    page: 'home',
    category: category.label,
    category_id: category.id,
  })
}

const activeCategory = computed(() => categories[activeIndex.value])

// ─── Card clicks ──────────────────────────────────────────────────────────────

const handleCardClick = (
  service: { headline: string; link: string },
  category: string,
  cardType: 'hero' | 'supporting',
) => {
  track('service_card_click', {
    page: 'home',
    category,
    service: service.headline,
    destination: service.link,
    card_type: cardType,
  })
}

// ─── Icons (Heroicons outline) ────────────────────────────────────────────────
const icons = {
  stack:   '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />',
  chart:   '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />',
  bulb:    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.82 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.496 1.509 1.333 1.509 2.316V18" />',
  globe:   '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />',
  cpu:     '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />',
  cap:     '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />',
  receipt: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />',
  search:  '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803zM13.5 10.5h-6" />',
  users:   '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />',
  cog:     '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />',
  doc:     '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />',
  spark:   '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />',
}

// ─── Categories & services ────────────────────────────────────────────────────
const categories = [
  {
    id: 'software',
    label: 'Software',
    heroBg: '/img/software.jpg',
    services: [
      {
        headline: 'Enterprise Software',
        body: 'CRM, ERP, HR & payroll, accounting, and inventory — fully integrated systems built to scale with your business without the bloat.',
        link: '/services/software',
        iconPath: icons.stack,
        tags: ['CRM', 'ERP', 'HR & Payroll', 'Accounting'],
      },
      {
        headline: 'Inventory Management',
        body: 'Real-time stock tracking, supplier management, and automated reorder systems.',
        link: '/services/software/inventory',
        iconPath: icons.receipt,
      },
      {
        headline: 'HR & Payroll',
        body: 'End-to-end workforce management — from onboarding to payslip, automated and compliant.',
        link: '/services/software/hr',
        iconPath: icons.users,
      },
      {
        headline: 'Proposal & Quoting',
        body: 'Close faster with professional proposals, dynamic pricing, and e-signature built in.',
        link: '/services/software/proposal-quoting',
        iconPath: icons.doc,
      },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    heroBg: '/img/bi.png',
    services: [
      {
        headline: 'Business Intelligence',
        body: 'BI platforms, customer data platforms, and reporting tools that transform raw data into decisions that actually move the business forward.',
        link: '/services/bi',
        iconPath: icons.chart,
        tags: ['BI Platforms', 'CDP', 'Dashboards', 'Reporting'],
      },
      {
        headline: 'Customer Data Platform',
        body: 'Unify customer data from every touchpoint into a single actionable profile.',
        link: '/services/bi/cdp',
        iconPath: icons.users,
      },
      {
        headline: 'Survey & Feedback',
        body: 'Capture, analyse, and act on customer and employee feedback at scale.',
        link: '/services/bi/surveys',
        iconPath: icons.search,
      },
    ],
  },
  {
    id: 'consulting',
    label: 'Consulting',
    heroBg: '/img/consulting.jpg',
    services: [
      {
        headline: 'Strategic Consulting',
        body: 'Business strategy, digital transformation, IT consulting, and operations optimisation — delivered by practitioners who have built and run real businesses.',
        link: '/services/consulting',
        iconPath: icons.bulb,
        tags: ['Strategy', 'Digital Transformation', 'IT Consulting', 'Operations'],
      },
      {
        headline: 'Digital Transformation',
        body: 'Move legacy processes to modern systems without disrupting day-to-day operations.',
        link: '/services/consulting/digital',
        iconPath: icons.cog,
      },
      {
        headline: 'Operations Optimisation',
        body: 'Identify bottlenecks, automate repeatable tasks, and build SOPs that scale.',
        link: '/services/consulting/ops',
        iconPath: icons.chart,
      },
    ],
  },
  {
    id: 'digital',
    label: 'Digital',
    heroBg: '/img/digital.jpg',
    services: [
      {
        headline: 'Digital Presence',
        body: 'Web design & development, SEO, domain services, infographics, and data visualisation — everything your brand needs to show up and stand out online.',
        link: '/services/digital',
        iconPath: icons.globe,
        tags: ['Web Design', 'SEO', 'Data Viz', 'Domain Services'],
      },
      {
        headline: 'SEO & Audits',
        body: 'Technical SEO, keyword strategy, and performance audits that improve visibility.',
        link: '/services/digital/seo',
        iconPath: icons.search,
      },
      {
        headline: 'Infographic Design',
        body: 'Turn complex data and processes into clear, shareable visual communication.',
        link: '/services/digital/design',
        iconPath: icons.chart,
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Data',
    heroBg: '/img/ai.jpg',
    services: [
      {
        headline: 'AI for Enterprise',
        body: 'Generative AI tools, data & AI strategy consulting, and intelligent automation — deployed responsibly and built for your specific operational context.',
        link: '/services/ai',
        iconPath: icons.spark,
        tags: ['Generative AI', 'AI Strategy', 'Automation', 'Data Science'],
      },
      {
        headline: 'Data Strategy',
        body: 'Build a data infrastructure that powers decisions rather than just reports.',
        link: '/services/ai/data',
        iconPath: icons.chart,
      },
      {
        headline: 'Intelligent Automation',
        body: 'Automate repetitive decisions and workflows with AI models trained on your data.',
        link: '/services/ai/automation',
        iconPath: icons.cpu,
      },
    ],
  },
  {
    id: 'education',
    label: 'Training',
    heroBg: '/img/learning.jpg',
    services: [
      {
        headline: 'Learning Platforms',
        body: 'LMS, corporate e-learning, ATS, and technical certification programs that develop your people and reduce knowledge gaps across the organisation.',
        link: '/services/education',
        iconPath: icons.cap,
        tags: ['LMS', 'E-Learning', 'ATS', 'Certifications'],
      },
      {
        headline: 'Corporate E-Learning',
        body: 'Custom-built training content and delivery platforms for distributed teams.',
        link: '/services/education/elearning',
        iconPath: icons.doc,
      },
      {
        headline: 'Applicant Tracking',
        body: 'Streamline hiring from job post to offer letter with an ATS built for speed.',
        link: '/services/education/ats',
        iconPath: icons.users,
      },
    ],
  },
]
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Light-mode icon well — replaces the dark .icon-well global utility */
.icon-well-light {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.625rem;
  background-color: rgba(17, 138, 178, 0.08);
  border: 1px solid rgba(17, 138, 178, 0.15);
}

@keyframes hero-img-fade {
  from { opacity: 0; }
  to   { opacity: 0.40; }
}

.group .absolute img {
  animation: hero-img-fade 400ms ease forwards;
}

.panel-fade-enter-active {
  transition: opacity 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.panel-fade-leave-active {
  transition: opacity 180ms ease,
              transform 180ms ease;
}
.panel-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.panel-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (prefers-reduced-motion: reduce) {
  .panel-fade-enter-active,
  .panel-fade-leave-active {
    transition: opacity 150ms ease;
  }
  .panel-fade-enter-from,
  .panel-fade-leave-to {
    transform: none;
  }
}
</style>