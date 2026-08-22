<template>
  <section class="bg-mint py-14 md:py-16 px-5 overflow-hidden">
    <div class="max-w-275 mx-auto">

      <div class="flex items-center gap-4 mb-8 opacity-0 animate-fade-up" style="animation-delay: 100ms; animation-fill-mode: forwards;">
        <div class="w-6 h-px bg-accent/60" />
        <h2 class="text-[12px] font-semibold text-accent uppercase tracking-widest">
          Client Stories
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

        <!-- Testimonial 1 -->
        <div
          class="flex flex-col gap-5 bg-white rounded-card border border-gray-200 p-6 md:p-7 opacity-0 animate-fade-up"
          style="animation-delay: 200ms; animation-fill-mode: forwards;"
        >
          <svg class="w-5 h-5 text-gray-300 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote class="text-[14px] md:text-[15px] text-gray-800 leading-relaxed flex-1">
            "Before OPS, we were drowning in manual paperwork. The unified MIS platform they engineered hasn't just reduced our administrative processing time by 85%—it has given us complete operational clarity."
          </blockquote>

          <div class="flex items-center gap-3 shrink-0">
            <div class="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 p-2">
              <img
                src="/img/partners/partners-01.svg"
                alt="The Covenant Academy Logo"
                class="w-full h-full object-contain opacity-80"
              />
            </div>
            <div>
              <div class="text-[13px] font-medium text-gray-900 mb-0.5">A. O.</div>
              <div class="text-[12px] text-gray-500">Executive Director, TCAD</div>
            </div>
          </div>
        </div>

        <!-- Testimonial 2 -->
        <div
          class="flex flex-col gap-5 bg-white rounded-card border border-gray-200 p-6 md:p-7 opacity-0 animate-fade-up"
          style="animation-delay: 280ms; animation-fill-mode: forwards;"
        >
          <svg class="w-5 h-5 text-gray-300 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote class="text-[14px] md:text-[15px] text-gray-800 leading-relaxed flex-1">
            "The digital presence and platform OPS built for us completely transformed our acquisition funnel. It's not just a beautiful website; it's a high-converting machine."
          </blockquote>

          <div class="flex items-center gap-3 shrink-0">
            <div class="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 p-2.5">
              <img
                src="/img/partners/partners-05.svg"
                alt="B&S Educational Services Logo"
                class="w-full h-full object-contain opacity-80"
              />
            </div>
            <div>
              <div class="text-[13px] font-medium text-gray-900 mb-0.5">S. A.</div>
              <div class="text-[12px] text-gray-500">Managing Director, B&S Educational</div>
            </div>
          </div>
        </div>

        <!-- Testimonial 3 -->
        <div
          class="md:col-span-1 flex flex-col gap-4 bg-white rounded-card border border-gray-200 p-5 md:p-6 opacity-0 animate-fade-up"
          style="animation-delay: 440ms; animation-fill-mode: forwards;"
        >
          <svg class="w-4 h-4 text-gray-300 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote class="text-[13px] text-gray-800 leading-relaxed flex-1">
            "Automation gave our team hours back every single week. It just works."
          </blockquote>

          <div class="flex items-center gap-2.5 shrink-0">
            <div class="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 p-1.5">
              <img
                src="/img/partners/partners-03.svg"
                alt="Client logo"
                class="w-full h-full object-contain opacity-80"
              />
            </div>
            <div>
              <div class="text-[13px] font-medium text-gray-900 leading-tight">J. K.</div>
              <div class="text-[11px] text-gray-500 leading-tight">Operations Lead</div>
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