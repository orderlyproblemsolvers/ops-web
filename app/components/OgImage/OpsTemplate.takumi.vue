<template>
  <div 
    class="w-full h-full flex flex-col items-center justify-center relative p-8"
    style="background-color: #050a15; font-family: sans-serif;"
  >
    <div 
      class="absolute top-0 left-0 w-full h-full"
      style="background-image: radial-gradient(circle at 50% 50%, rgba(17, 138, 178, 0.25) 0%, transparent 65%);"
    ></div>

    <div class="flex flex-col items-center justify-center relative z-10 w-full" style="max-width: 900px; text-align: center;">
      
      <img 
        src="/img/logo.png" 
        height="150" 
        class="mb-4" 
        style="object-fit: contain; filter: invert(100%);" 
      />

      <div 
        v-if="badge" 
        class="text-[22px] font-bold uppercase tracking-[0.2em] mb-4"
        style="color: #118ab2;"
      >
        {{ badge }}
      </div>

      <h1 
        class="text-[56px] font-bold text-white leading-[1.1] tracking-tight mb-6"
      >
        {{ title }}
      </h1>

      <p 
        class="text-[28px] leading-normal"
        style="color: #a1a1aa;"
      >
        {{ description }}
      </p>

    </div>

    <div class="absolute bottom-12 flex flex-row items-center justify-center w-full z-10">
      <div class="text-[24px] font-bold  tracking-widest" style="color: #52525b;">
        orderlyproblemsolvers.com
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
// Props injected automatically by defineOgImageComponent
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  badge: {
    type: String,
    default: ''
  }
})
</script>