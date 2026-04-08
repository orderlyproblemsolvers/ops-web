<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard>
        <template #header>
          <h3 class="font-medium text-gray-900 dark:text-white">Total Insights</h3>
        </template>
        <p class="text-3xl font-bold text-accent">0</p>
      </UCard>
      
      <UCard>
        <template #header>
          <h3 class="font-medium text-gray-900 dark:text-white">New Enquiries</h3>
        </template>
        <p class="text-3xl font-bold text-accent">0</p>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

useSeoMeta({ title: 'Dashboard | OPS Admin' })
</script>