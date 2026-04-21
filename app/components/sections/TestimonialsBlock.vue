<template>
  <section class="bg-ops-navy py-16 md:py-24 px-5 overflow-hidden border-t border-divider">
    <div class="max-w-275 mx-auto">
      
      <div class="flex items-center gap-4 mb-10 md:mb-14 opacity-0 animate-fade-up" style="animation-delay: 100ms; animation-fill-mode: forwards;">
        <div class="w-6 h-px bg-accent/60" />
        <h2 class="text-[12px] font-semibold text-accent uppercase tracking-widest">
          Client Stories
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2">
        
        <div class="flex flex-col justify-between md:pr-10 lg:pr-16 pb-10 md:pb-0 border-b border-divider md:border-b-0 md:border-r opacity-0 animate-fade-up" style="animation-delay: 200ms; animation-fill-mode: forwards;">
          <div>
            <svg class="w-5 h-5 text-text-tertiary mb-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote class="text-[16px] md:text-body text-text-primary leading-relaxed mb-8">
              "Before OPS, we were drowning in manual paperwork. The unified MIS platform they engineered hasn't just reduced our administrative processing time by 85%—it has given us complete operational clarity. Parent satisfaction is at an all-time high, and our staff can finally focus on education rather than data entry."
            </blockquote>
          </div>
          
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-white/3 border border-divider flex items-center justify-center shrink-0 p-2">
              <img 
                src="/img/partners/partners-01.svg" 
                alt="The Covenant Academy Logo" 
                class="w-full h-full object-contain opacity-80 grayscale"
              />
            </div>
            <div>
              <div class="text-[14px] font-medium text-text-primary mb-0.5">A. O.</div>
              <div class="text-[13px] text-text-tertiary">Executive Director, TCAD</div>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-between md:pl-10 lg:pl-16 pt-10 md:pt-0 opacity-0 animate-fade-up" style="animation-delay: 300ms; animation-fill-mode: forwards;">
          <div>
            <svg class="w-5 h-5 text-text-tertiary mb-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote class="text-[16px] md:text-body text-text-primary leading-relaxed mb-8">
              "The digital presence and platform OPS built for us completely transformed our acquisition funnel. It's not just a beautiful website; it's a high-converting machine. Within months of launch, we've seen a massive surge in qualified leads and a seamless onboarding process that our new clients absolutely love."
            </blockquote>
          </div>
          
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-white/3 border border-divider flex items-center justify-center shrink-0 p-2.5">
              <img 
                src="/img/partners/partners-05.svg" 
                alt="B&S Educational Services Logo" 
                class="w-full h-full object-contain opacity-80 grayscale"
              />
            </div>
            <div>
              <div class="text-[14px] font-medium text-text-primary mb-0.5">S. A.</div>
              <div class="text-[13px] text-text-tertiary">Managing Director, B&S Educational</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Component logic
</script>

<style scoped>
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  animation: fade-up 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>