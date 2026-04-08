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
          Privacy Policy
        </h1>
        <p class="text-[15px] text-text-tertiary">
          Last Updated: March 2026
        </p>
      </div>

      <div class="prose-content opacity-0 animate-fade-up" style="animation-delay: 200ms; animation-fill-mode: forwards;">
        
        <p>
          At Orderly Problem Solvers ("OPS", "we", "us", or "our"), we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We may collect, use, store and transfer different kinds of personal data about you, which we have grouped together as follows:
        </p>
        <ul>
          <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier, and company name.</li>
          <li><strong>Contact Data:</strong> includes billing address, email address, and telephone numbers.</li>
          <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
          <li><strong>Usage Data:</strong> includes information about how you use our website, products, and services.</li>
        </ul>

        <h2>2. How We Use Your Data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul>
          <li>To perform the contract we are about to enter into or have entered into with you (e.g., project consultations).</li>
          <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          <li>To manage our relationship with you, including notifying you about changes to our terms or privacy policy.</li>
          <li>To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance, support, reporting, and hosting of data).</li>
        </ul>

        <h2>3. Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions, and they are subject to a duty of confidentiality.
        </p>

        <h2>4. Third-Party Links</h2>
        <p>
          This website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
        </p>

        <h2>5. Your Legal Rights</h2>
        <p>
          Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data, and (where the lawful ground of processing is consent) to withdraw consent.
        </p>

        <h2>6. Contact Details</h2>
        <p>
          If you have any questions about this privacy policy or our privacy practices, please contact us at:
          <br><br>
          <strong>Email:</strong> <a href="mailto:orderlyproblemsolvers@gmail.com" class="text-accent hover:text-white transition-colors">orderlyproblemsolvers@gmail.com</a>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Privacy Policy | Orderly Problem Solvers',
  description: 'Learn how Orderly Problem Solvers collects, uses, and protects your personal data.',
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
  color: #a1a1aa; /* text-text-secondary */
  margin-bottom: 1.5rem;
}
.prose-content h2 {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin-top: 3rem;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}
.prose-content ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 2rem;
  color: #a1a1aa;
}
.prose-content li {
  margin-bottom: 0.5rem;
  line-height: 1.7;
}
.prose-content strong {
  color: #e4e4e7;
  font-weight: 600;
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