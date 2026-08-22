<template>
  <div class="relative min-h-svh bg-ops-navy overflow-hidden selection:bg-accent selection:text-white pb-[80px]">

    <div class="grain" aria-hidden="true" />
    <div class="dot-grid dot-grid--left"  aria-hidden="true" />
    <div class="dot-grid dot-grid--right" aria-hidden="true" />
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-150 pointer-events-none z-0 animate-pulse-slow"
      style="background: radial-gradient(ellipse at 50% 40%, rgba(17,138,178,0.14) 0%, transparent 65%);"
    />

    <div class="relative z-10 max-w-300 mx-auto px-5 pt-24 lg:pt-32">

      <div class="mb-16 lg:mb-20 opacity-0 animate-fade-up" style="animation-delay: 100ms; animation-fill-mode: forwards;">
        <span class="text-[13px] font-bold text-accent uppercase tracking-widest block mb-4">Engagement Terms</span>
        <h1 class="text-[clamp(36px,5vw,56px)] font-bold text-text-primary leading-[1.1] tracking-tight max-w-3xl mb-6">
          Pricing Policy & Project Lifecycle
        </h1>
        <p class="text-[18px] text-text-secondary max-w-2xl leading-relaxed">
          At Orderly Problem Solvers, we build custom infrastructure to solve complex operational bottlenecks. Because no two businesses operate identically, our pricing is strictly bespoke, calculated based on the precise technical requirements of your project. The tiers below are starting points, not fixed packages.
        </p>
      </div>

      <!-- ─── Pricing tiers ────────────────────────────────────────────────── -->
      <div class="mb-16 lg:mb-24 opacity-0 animate-fade-up" style="animation-delay: 150ms; animation-fill-mode: forwards;">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">

          <!-- Tier 1 -->
          <div class="relative flex flex-col p-7 rounded-[20px] bg-ops-surface border border-white/8">
            <div class="icon-well mb-6">
              <UIcon name="i-lucide-layout-template" class="w-5 h-5 text-accent" />
            </div>
            <h3 class="text-[18px] font-bold text-white mb-1.5">Digital Presence</h3>
            <p class="text-[13px] text-text-tertiary leading-relaxed mb-5">
              For businesses establishing or refreshing their footprint online.
            </p>
            <div class="mb-6">
              <span class="text-[12px] text-text-tertiary block mb-1">Starting at</span>
              <span class="text-[32px] font-bold text-text-primary tracking-tight">₦150,000</span>
            </div>
            <ul class="space-y-2.5 mb-6 flex-1">
              <li v-for="item in tierOne" :key="item" class="flex items-start gap-2.5 text-[13px] text-text-secondary leading-snug">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-accent shrink-0 mt-0.5" />
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Tier 2 -->
          <div class="relative flex flex-col p-7 rounded-[20px] bg-ops-surface border border-accent/30 ring-1 ring-accent/15">
            <span class="absolute -top-3 left-7 text-[10px] font-bold text-white bg-accent px-3 py-1 rounded-full uppercase tracking-wide">
              Most Common
            </span>
            <div class="icon-well mb-6">
              <UIcon name="i-lucide-database" class="w-5 h-5 text-accent" />
            </div>
            <h3 class="text-[18px] font-bold text-white mb-1.5">Business Systems</h3>
            <p class="text-[13px] text-text-tertiary leading-relaxed mb-5">
              For businesses replacing manual processes with dedicated software.
            </p>
            <div class="mb-6">
              <span class="text-[12px] text-text-tertiary block mb-1">Starting at</span>
              <span class="text-[32px] font-bold text-text-primary tracking-tight">₦350,000</span>
            </div>
            <ul class="space-y-2.5 mb-6 flex-1">
              <li v-for="item in tierTwo" :key="item" class="flex items-start gap-2.5 text-[13px] text-text-secondary leading-snug">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-accent shrink-0 mt-0.5" />
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Tier 3 -->
          <div class="relative flex flex-col p-7 rounded-[20px] bg-ops-surface border border-white/8">
            <div class="icon-well mb-6">
              <UIcon name="i-lucide-sparkles" class="w-5 h-5 text-accent" />
            </div>
            <h3 class="text-[18px] font-bold text-white mb-1.5">Enterprise & AI Engineering</h3>
            <p class="text-[13px] text-text-tertiary leading-relaxed mb-5">
              For businesses architecting large-scale, intelligent infrastructure.
            </p>
            <div class="mb-6">
              <span class="text-[12px] text-text-tertiary block mb-1">Pricing</span>
              <span class="text-[32px] font-bold text-text-primary tracking-tight">Custom</span>
            </div>
            <ul class="space-y-2.5 mb-6 flex-1">
              <li v-for="item in tierThree" :key="item" class="flex items-start gap-2.5 text-[13px] text-text-secondary leading-snug">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-accent shrink-0 mt-0.5" />
                {{ item }}
              </li>
            </ul>
          </div>

        </div>

        <!-- Payment terms notice -->
        <div class="mt-5 flex items-start gap-3 p-5 rounded-[16px] bg-accent/8 border border-accent/20">
          <UIcon name="i-lucide-wallet" class="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <p class="text-[13px] text-text-secondary leading-relaxed">
            <span class="text-white font-medium">A deposit of 20–50% of the total project cost may be required upfront</span> to commence Phase 1, with the remaining balance structured across agreed project milestones. Exact terms are confirmed in your Statement of Work.
          </p>
        </div>

        <!-- Inline CTA — close to the pricing decision, not buried at the page bottom -->
        <div class="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-[16px] bg-ops-surface border border-white/8">
          <div>
            <h3 class="text-[16px] font-bold text-white mb-1">Ready to start Phase 1?</h3>
            <p class="text-[13px] text-text-secondary">Schedule a discovery consultation to scope your project and get a bespoke quote.</p>
          </div>
          <UiAppButton to="/contact" size="md" variant="primary" class="w-full sm:w-auto shrink-0">
            Schedule Consultation
          </UiAppButton>
        </div>
      </div>

      <div class="flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-24">

        <div class="lg:col-span-7 opacity-0 animate-fade-up" style="animation-delay: 200ms; animation-fill-mode: forwards;">

          <h2 class="text-[24px] font-bold text-white mb-6">Cost Dependencies & Inclusions</h2>
          <p class="text-[15px] text-text-secondary leading-relaxed mb-10">
            A formal Statement of Work (SOW) and commercial proposal will be provided upon the completion of our initial research phase. Total project expenditure is highly variable and may include, but is not limited to, the following cost centers:
          </p>

          <div class="space-y-4">
            <div class="p-6 rounded-[16px] bg-ops-surface border border-white/5 transition-colors hover:border-white/10 hover:bg-white/5">
              <div class="flex items-center gap-3 mb-2">
                <UIcon name="i-lucide-code-2" class="w-5 h-5 text-accent" />
                <h3 class="text-[16px] font-semibold text-text-primary">Core Engineering & Architecture</h3>
              </div>
              <p class="text-[14px] text-text-secondary leading-relaxed pl-8">
                Billable hours for specialized software engineering, database architecture, UI/UX design, and quality assurance dedicated to building your proprietary solution.
              </p>
            </div>

            <div class="p-6 rounded-[16px] bg-ops-surface border border-white/5 transition-colors hover:border-white/10 hover:bg-white/5">
              <div class="flex items-center gap-3 mb-2">
                <UIcon name="i-lucide-cpu" class="w-5 h-5 text-accent" />
                <h3 class="text-[16px] font-semibold text-text-primary">AI Compute & Intelligent Agents</h3>
              </div>
              <p class="text-[14px] text-text-secondary leading-relaxed pl-8">
                Costs associated with the deployment, fine-tuning, and continuous computational usage of Large Language Models (LLMs) and autonomous AI agents tailored to your business logic.
              </p>
            </div>

            <div class="p-6 rounded-[16px] bg-ops-surface border border-white/5 transition-colors hover:border-white/10 hover:bg-white/5">
              <div class="flex items-center gap-3 mb-2">
                <UIcon name="i-lucide-cable" class="w-5 h-5 text-accent" />
                <h3 class="text-[16px] font-semibold text-text-primary">Third-Party APIs & Integrations</h3>
              </div>
              <p class="text-[14px] text-text-secondary leading-relaxed pl-8">
                Licensing, subscription, or volume-based usage fees required to connect your software to external ecosystems (e.g., payment gateways, legacy ERP systems, data providers).
              </p>
            </div>

            <div class="p-6 rounded-[16px] bg-ops-surface border border-white/5 transition-colors hover:border-white/10 hover:bg-white/5">
              <div class="flex items-center gap-3 mb-2">
                <UIcon name="i-lucide-server" class="w-5 h-5 text-accent" />
                <h3 class="text-[16px] font-semibold text-text-primary">Infrastructure & Provisioning</h3>
              </div>
              <p class="text-[14px] text-text-secondary leading-relaxed pl-8">
                Direct costs for essential infrastructure, including domain procurement, SSL certification, cloud hosting allocation (AWS, GCP, etc.), and initial data migration workloads.
              </p>
            </div>
          </div>

          <div class="mt-10 p-6 rounded-[16px] border border-white/10 bg-white/5">
            <h4 class="text-[13px] font-bold text-white uppercase tracking-widest mb-2">Legal Disclaimer</h4>
            <p class="text-[13px] text-text-tertiary leading-relaxed">
              All quotes are valid for 14 days from the date of issuance. A deposit of 20–50% of total project cost may be required prior to commencement. Post-deployment maintenance, SLA agreements, and ongoing server costs will be negotiated as separate line items unless explicitly stated as an all-inclusive retainer in your contract.
            </p>
          </div>
        </div>

        <div class="lg:col-span-5 opacity-0 animate-fade-up" style="animation-delay: 300ms; animation-fill-mode: forwards;">

          <div class="sticky top-32">
            <h2 class="text-[24px] font-bold text-white mb-8">The Engagement Timeline</h2>

            <div class="bg-ops-surface border border-white/5 rounded-[24px] p-6 sm:p-8">
              <ol class="relative flex flex-col">
                <li
                  v-for="(step, index) in timelineItems"
                  :key="step.title"
                  class="group relative flex gap-5 opacity-0 timeline-step"
                  :style="{ animationDelay: `${350 + index * 100}ms` }"
                >
                  <!-- Marker + connecting line -->
                  <div class="flex flex-col items-center shrink-0">
                    <div class="w-8 h-8 rounded-full bg-ops-elevated border border-white/10 flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/10 transition-all duration-300">
                      <UIcon :name="step.icon" class="w-4.5 h-4.5 text-accent" />
                    </div>
                    <div
                      v-if="index < timelineItems.length - 1"
                      class="w-px flex-1 bg-white/8 my-1"
                    />
                  </div>

                  <!-- Content -->
                  <div class="pb-9 last:pb-0">
                    <span class="text-[11px] font-semibold text-accent/70 uppercase tracking-wide">Step {{ index + 1 }}</span>
                    <h3 class="text-[15px] sm:text-[16px] font-bold text-white mt-1 mb-1.5 group-hover:text-accent transition-colors duration-300">
                      {{ step.titleShort }}
                    </h3>
                    <p class="text-[13px] sm:text-[14px] text-text-secondary leading-relaxed">
                      {{ step.description }}
                    </p>
                  </div>
                </li>
              </ol>
            </div>

          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Pricing & Engagement Policy',
  description: 'Understand our bespoke pricing model, cost dependencies, and the lifecycle of an engineering engagement with OPS.',
})

// Visual Open Graph Image Generation
defineOgImage('OpsTemplate', {
  title: 'Pricing Policy & Project Lifecycle',
  description: 'Understand our bespoke pricing model, cost dependencies, and the lifecycle of an engineering engagement.',
  badge: 'Engagement Terms'
})

// ─── Pricing tiers ────────────────────────────────────────────────────────────
// NOTE: services placed under each tier are a best-effort estimate based on
// typical scope/complexity — flagged for correction as needed.

const tierOne = [
  'Web design & development',
  'SEO services & audits',
  'Domain registration & DNS setup',
  'Infographic & data visualization design',
  'Proposal & quoting software (single workflow)',
]

const tierTwo = [
  'Custom CRM or inventory management',
  'HR & payroll software',
  'Learning Management System (LMS)',
  'Applicant Tracking System (ATS)',
  'Survey & feedback platforms',
  'Business intelligence dashboards',
]

const tierThree = [
  'ERP architecture & enterprise systems',
  'MIS platforms',
  'Generative AI & autonomous agents',
  'Data & AI strategy, intelligent automation',
  'Digital transformation & IT consulting',
  'Multi-system integrations at scale',
]

// Timeline Data for Nuxt UI <UTimeline>
const timelineItems = [
  {
    title: '1. Initial Problem Discovery',
    titleShort: 'Initial Problem Discovery',
    description: 'A comprehensive consultation to identify your operational bottlenecks, business objectives, and baseline technical requirements.',
    icon: 'i-lucide-search'
  },
  {
    title: '2. Architecture & Research',
    titleShort: 'Architecture & Research',
    description: 'Our team engineers a strategic blueprint, evaluating potential tech stacks, AI integration feasibility, and required third-party services.',
    icon: 'i-lucide-microscope'
  },
  {
    title: '3. Custom Proposal & Quota',
    titleShort: 'Custom Proposal & Quote',
    description: 'Delivery of a formal Statement of Work (SOW), project timeline, and a highly detailed, bespoke pricing quote for your approval.',
    icon: 'i-lucide-file-signature'
  },
  {
    title: '4. Development & Engineering',
    titleShort: 'Development & Engineering',
    description: 'The execution phase. We write the code, configure the infrastructure, and build the custom solution exactly to specification.',
    icon: 'i-lucide-terminal-square'
  },
  {
    title: '5. Quality Assurance & Testing',
    titleShort: 'Quality Assurance & Testing',
    description: 'Rigorous stress-testing, security auditing, and user acceptance testing (UAT) to ensure flawless performance in production environments.',
    icon: 'i-lucide-shield-check'
  },
  {
    title: '6. Deployment & Completion',
    titleShort: 'Deployment & Completion',
    description: 'Final migration to your live environment, staff training, handover of documentation, and the commencement of post-launch support.',
    icon: 'i-lucide-rocket'
  }
]
</script>

<style scoped>
/* ─── Grain noise ──────────────────────────────────────────────────────────── */
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

/* ─── Dot grid panels ──────────────────────────────────────────────────────── */
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
  mask-image: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%);
  -webkit-mask-composite: source-in;
}

.dot-grid--right {
  right: 0;
  mask-image: linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%);
  -webkit-mask-composite: source-in;
}

/* ─── Animations ─────────────────────────────────────────────────────────── */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-up { animation: fade-up 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.animate-pulse-slow { animation: glow-pulse 8s ease-in-out infinite alternate; }

@keyframes glow-pulse {
  from { opacity: 0.6; }
  to   { opacity: 1; }
}

/* ─── Timeline Staggering Micro-animations ───────────────────────────────── */
.timeline-step {
  animation: fade-up 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-up, .animate-pulse-slow { animation: none; opacity: 1; transform: none; }
  .timeline-step { animation: none; opacity: 1; }
}
</style>