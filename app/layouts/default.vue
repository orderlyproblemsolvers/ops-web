<template>
  <div class="min-h-screen bg-ops-navy text-text-primary flex flex-col">
    <AppNavbar />
    
    <main class="grow">
      <slot />
    </main>

    <AppFooter/>
    
    </div>
</template>

<script setup lang="ts">
import AppNavbar from '~/components/layout/AppNavbar.vue'
import AppFooter from '~/components/layout/AppFooter.vue';
</script>