<template>
  <div class="relative min-h-svh bg-ops-navy overflow-hidden selection:bg-accent selection:text-white pb-25">
    
    <div class="grain" aria-hidden="true" />
    <div class="dot-grid dot-grid--left"  aria-hidden="true" />
    <div class="dot-grid dot-grid--right" aria-hidden="true" />
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-150 pointer-events-none z-0 animate-pulse-slow"
      style="background: radial-gradient(ellipse at 50% 40%, rgba(17,138,178,0.14) 0%, transparent 65%);"
    />

    <div class="relative z-10 max-w-3xl mx-auto px-5 pt-24 lg:pt-32">
      
      <div class="mb-16 border-b border-white/10 pb-12 opacity-0 animate-fade-up" style="animation-delay: 100ms; animation-fill-mode: forwards;">
        <span class="text-[13px] font-bold text-accent uppercase tracking-widest block mb-4">Legal</span>
        <h1 class="text-[clamp(36px,5vw,56px)] font-bold text-text-primary leading-[1.1] tracking-tight mb-6">
          Terms of Service
        </h1>
        <p class="text-[15px] text-text-tertiary">
          Last Updated: March 2026
        </p>
      </div>

      <div class="prose-content opacity-0 animate-fade-up" style="animation-delay: 200ms; animation-fill-mode: forwards;">
        
        <p>
          These Terms of Service ("Terms") govern your access to and use of the website, services, and custom software solutions provided by Orderly Problem Solvers ("OPS", "we", "us", or "our"). By accessing or using our services, you agree to be bound by these Terms.
        </p>

        <h2>1. Engineering & Consulting Services</h2>
        <p>
          OPS provides bespoke software engineering, IT infrastructure consulting, UI/UX design, and AI integration services. The specific scope, deliverables, timeline, and cost of any project will be outlined in a mutually agreed upon Statement of Work (SOW) or commercial contract. These Terms serve as the baseline agreement for all engagements unless superseded by a specific SOW.
        </p>

        <h2>2. Client Responsibilities</h2>
        <p>
          To ensure the successful delivery of custom systems, clients must provide timely access to necessary resources, including existing technical documentation, API keys, brand assets, and stakeholder feedback. Delays in client communication may result in proportional extensions to project timelines.
        </p>

        <h2>3. Intellectual Property & Ownership</h2>
        <p>
          Upon final deployment and receipt of full payment, OPS transfers the intellectual property rights of the custom-developed software to the client, as explicitly defined in the SOW. However, OPS retains the right to use underlying, pre-existing frameworks, generic code libraries, and open-source tools utilized during development. OPS also retains the right to showcase non-confidential elements of the project in our case studies and portfolio.
        </p>

        <h2>4. Payment Terms & Invoicing</h2>
        <p>
          Because our services are highly customized, pricing structures (such as milestone-based payments, retainers, or hourly consulting rates) are defined within the project contract. Invoices are generally due within 14 days of receipt unless otherwise specified. We reserve the right to halt development or withhold final deployment if payment schedules are not met.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          While we engineer robust and secure systems, OPS shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities arising from the use or inability to use the delivered software. Our total liability for any claim arising out of or relating to these Terms or the services provided shall not exceed the total amount paid by you to OPS for the specific project in question.
        </p>

        <h2>6. Third-Party Integrations</h2>
        <p>
          Our solutions often interact with third-party platforms (e.g., payment gateways, cloud providers, LLMs). OPS is not responsible for the availability, security, or performance changes of these third-party services. Clients are responsible for maintaining their own accounts and compliance with the terms of those specific third parties.
        </p>

        <h2>7. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which OPS is legally registered, without regard to its conflict of law provisions.
        </p>

        <div class="mt-16 p-8 bg-ops-surface border border-white/5 rounded-[20px] text-center">
          <h3 class="text-[20px] font-bold text-white mb-3">Questions about our Terms?</h3>
          <p class="text-[15px] text-text-secondary mb-6">If you require clarification on any of these points before signing an SOW, our team is happy to discuss them.</p>
          <NuxtLink to="/contact" class="text-[14px] font-medium text-accent hover:text-white transition-colors underline underline-offset-4 decoration-accent/40 hover:decoration-white">
            Contact us
          </NuxtLink>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Terms of Service | Orderly Problem Solvers',
  description: 'The baseline agreement governing the engineering, consulting, and software services provided by OPS.',
})
</script>

<style scoped>
/* ─── Background Elements ────────────────────────────────────────────────── */
.grain { position: absolute; inset: 0; z-index: 30; pointer-events: none; opacity: 0.035; mix-blend-mode: overlay; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E"); background-repeat: repeat; background-size: 300px 300px; }
.dot-grid { position: absolute; top: 0; bottom: 0; width: clamp(160px, 18vw, 280px); z-index: 1; pointer-events: none; opacity: 0.09; filter: blur(0.6px); background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='10' cy='10' r='1.1' fill='%23ffffff'/%3E%3C/svg%3E"); background-repeat: repeat; background-size: 20px 20px; }
.dot-grid--left { left: 0; mask-image: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%); mask-composite: intersect; -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%); -webkit-mask-composite: source-in; }
.dot-grid--right { right: 0; mask-image: linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%); mask-composite: intersect; -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%); -webkit-mask-composite: source-in; }

/* ─── Prose Styling ──────────────────────────────────────────────────────── */
.prose-content p {
  font-size: 16px;
  line-height: 1.8;
  color: #a1a1aa;
  margin-bottom: 1.5rem;
}
.prose-content h2 {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin-top: 3.5rem;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}

/* ─── Animations ─────────────────────────────────────────────────────────── */
@keyframes fade-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-up { animation: fade-up 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.animate-pulse-slow { animation: glow-pulse 8s ease-in-out infinite alternate; }
@keyframes glow-pulse { from { opacity: 0.6; } to { opacity: 1; } }

@media (prefers-reduced-motion: reduce) {
  .animate-fade-up, .animate-pulse-slow { animation: none; opacity: 1; transform: none; }
}
</style>