<template>
  <div class="min-h-screen bg-ops-navy flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-accent selection:text-white">
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <NuxtLink to="/">
        <img src="/img/logo.svg" alt="OPS Logo" class="h-12 w-auto mx-auto invert opacity-90 hover:opacity-100 transition-opacity" />
      </NuxtLink>
      <h2 class="mt-6 text-[24px] font-bold text-white tracking-tight">
        Sign in to OPS Admin
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-ops-surface border border-white/10 py-8 px-4 shadow-2xl sm:rounded-[20px] sm:px-10 relative overflow-hidden">
        
        <div class="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/5 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />

        <form class="space-y-6 relative z-10" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="block text-[13px] font-medium text-text-secondary mb-1.5">Email address</label>
            <div class="mt-1">
              <input 
                id="email" 
                v-model="email" 
                name="email" 
                type="email" 
                autocomplete="email" 
                required 
                class="block w-full appearance-none rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-[14px] transition-colors" 
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-[13px] font-medium text-text-secondary mb-1.5">Password</label>
            <div class="mt-1">
              <input 
                id="password" 
                v-model="password" 
                name="password" 
                type="password" 
                autocomplete="current-password" 
                required 
                class="block w-full appearance-none rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-[14px] transition-colors" 
              />
            </div>
          </div>

          <div v-if="errorMessage" class="rounded-[8px] bg-red-500/10 border border-red-500/20 p-3">
            <p class="text-[13px] text-red-400 font-medium text-center">{{ errorMessage }}</p>
          </div>

          <div>
            <button 
              type="submit" 
              :disabled="isLoading"
              class="flex w-full justify-center rounded-[10px] bg-accent px-4 py-3 text-[14px] font-medium text-white shadow-sm hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ops-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="!isLoading">Sign in</span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Authenticating...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Since this is the login page, we don't apply the 'admin' middleware here.
// Instead, we apply a guest middleware to redirect them if they are ALREADY logged in.
definePageMeta({
  layout: false, // Don't use the standard website header/footer for the admin login
})

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })

    // If successful, reload the session state globally and redirect to the dashboard
    const { fetch: refreshSession } = useUserSession()
    await refreshSession()
    
    await navigateTo('/admin')
  } catch (error: any) {
    errorMessage.value = error.data?.statusMessage || 'An error occurred during login.'
  } finally {
    isLoading.value = false
  }
}
</script>