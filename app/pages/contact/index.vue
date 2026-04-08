<template>
  <div class="min-h-svh bg-ops-navy pt-24 pb-[80px] lg:pt-[160px] lg:pb-10">
    <div class="max-w-300 mx-auto px-5">
      
      <div class="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        <div class="lg:hidden w-full text-center sm:text-left mb-2 opacity-0 animate-fade-up" style="animation-delay: 100ms; animation-fill-mode: forwards;">
          <span class="text-label text-accent block mb-3">Start a Project</span>
          <h1 class="text-[clamp(32px,8vw,40px)] leading-[1.15] font-bold text-text-primary tracking-tight">
            Let's build something extraordinary.
          </h1>
        </div>

        <div class="lg:col-span-5 max-w-125 order-3 lg:order-1 mt-8 lg:mt-0">
          
          <div class="hidden lg:block opacity-0 animate-fade-up" style="animation-delay: 100ms; animation-fill-mode: forwards;">
            <span class="text-label text-accent block mb-4">Start a Project</span>
            <h1 class="text-[56px] leading-[1.1] font-bold text-text-primary mb-6 tracking-tight">
              Let's build something extraordinary.
            </h1>
          </div>
          
          <p class="hidden sm:block text-body text-text-secondary leading-relaxed mb-10 opacity-0 animate-fade-up" style="animation-delay: 300ms; animation-fill-mode: forwards;">
            Whether you need a custom enterprise platform, strategic IT consulting, or an AI-driven automation system, our team is ready to engineer the solution. 
          </p>

          <div class="flex flex-col gap-6 lg:gap-8 opacity-0 animate-fade-up" style="animation-delay: 400ms; animation-fill-mode: forwards;">
            <div>
              <div class="text-[12px] font-semibold text-text-secondary tracking-widest uppercase mb-2">Direct Inquiry</div>
              <a href="mailto:orderlyproblemsolvers@gmail.com" class="text-[15px] lg:text-body font-medium text-text-primary hover:text-accent transition-colors break-all sm:break-normal">
                orderlyproblemsolvers@gmail.com
              </a>
            </div>
            <div>
              <div class="text-[12px] font-semibold text-text-secondary tracking-widest uppercase mb-2">Call Us</div>
              <a href="tel:+2349018099785" class="text-[15px] lg:text-body font-medium text-text-primary hover:text-accent transition-colors">
                +234 901-8099-785
              </a>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7 w-full order-2 lg:order-2 bg-ops-surface p-6 sm:p-10 rounded-[24px] border border-divider shadow-2xl opacity-0 animate-fade-up relative min-h-125" style="animation-delay: 200ms; animation-fill-mode: forwards;">
          
          <Transition name="fade" mode="out-in">
            <div v-if="isSuccess" class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center h-full">
              <div class="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
                <svg class="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 class="text-2xl font-bold text-text-primary mb-3">Message Received</h3>
              <p class="text-[15px] text-text-secondary max-w-sm mb-8">
                Thank you for reaching out. We've received your inquiry and a member of our team will get back to you shortly.
              </p>
              <button @click="resetForm" class="text-[14px] font-medium text-accent hover:text-white transition-colors underline underline-offset-4 decoration-accent/40 hover:decoration-white">
                Send another message
              </button>
            </div>

            <form v-else @submit.prevent="handleSubmit" class="space-y-6">
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" class="block text-[13px] font-medium text-text-secondary mb-2">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    v-model="form.firstName"
                    @input="clearError('firstName')"
                    @focus="handleFieldFocus('firstName')"
                    :class="['w-full bg-ops-navy border rounded-input px-4 py-3.5 text-[15px] text-text-primary transition-all duration-200 outline-none focus:shadow-[0_0_0_3px_rgba(17,138,178,0.2)] placeholder-text-text-tertiary', errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-divider focus:border-accent']"
                    placeholder="Jane"
                  />
                  <span v-if="errors.firstName" class="text-red-400 text-[12px] mt-1.5 block">{{ errors.firstName }}</span>
                </div>
                <div>
                  <label for="lastName" class="block text-[13px] font-medium text-text-secondary mb-2">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    v-model="form.lastName"
                    @input="clearError('lastName')"
                    :class="['w-full bg-ops-navy border rounded-input px-4 py-3.5 text-[15px] text-text-primary transition-all duration-200 outline-none focus:shadow-[0_0_0_3px_rgba(17,138,178,0.2)] placeholder-text-text-tertiary', errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-divider focus:border-accent']"
                    placeholder="Doe"
                  />
                  <span v-if="errors.lastName" class="text-red-400 text-[12px] mt-1.5 block">{{ errors.lastName }}</span>
                </div>
              </div>

              <div>
                <label for="email" class="block text-[13px] font-medium text-text-secondary mb-2">Work Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  @input="clearError('email')"
                  :class="['w-full bg-ops-navy border rounded-input px-4 py-3.5 text-[15px] text-text-primary transition-all duration-200 outline-none focus:shadow-[0_0_0_3px_rgba(17,138,178,0.2)] placeholder-text-text-tertiary', errors.email ? 'border-red-500 focus:border-red-500' : 'border-divider focus:border-accent']"
                  placeholder="jane@company.com"
                />
                <span v-if="errors.email" class="text-red-400 text-[12px] mt-1.5 block">{{ errors.email }}</span>
              </div>

              <div>
                <label for="company" class="block text-[13px] font-medium text-text-secondary mb-2">Company Name <span class="text-text-tertiary font-normal">(Optional)</span></label>
                <input
                  type="text"
                  id="company"
                  v-model="form.company"
                  class="w-full bg-ops-navy border border-divider rounded-input px-4 py-3.5 text-[15px] text-text-primary transition-all duration-200 outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(17,138,178,0.2)] placeholder-text-text-tertiary"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label for="interest" class="block text-[13px] font-medium text-text-secondary mb-2">How can we help?</label>
                <div class="relative">
                  <select
                    id="interest"
                    v-model="form.interest"
                    @change="handleServiceChange"
                    :class="['w-full bg-ops-navy border rounded-input px-4 py-3.5 text-[15px] text-text-primary transition-all duration-200 outline-none focus:shadow-[0_0_0_3px_rgba(17,138,178,0.2)] appearance-none pr-10', !form.interest ? 'text-text-tertiary' : 'text-text-primary', errors.interest ? 'border-red-500 focus:border-red-500' : 'border-divider focus:border-accent']"
                  >
                    <option value="" disabled>Select a service...</option>
                    <option value="enterprise-software">Enterprise Software</option>
                    <option value="data-ai">Data & AI Strategy</option>
                    <option value="strategic-consulting">Strategic Consulting</option>
                    <option value="digital-presence">Digital Presence & Web</option>
                    <option value="other">Other</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text-secondary">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                <span v-if="errors.interest" class="text-red-400 text-[12px] mt-1.5 block">{{ errors.interest }}</span>
              </div>

              <div>
                <label for="message" class="block text-[13px] font-medium text-text-secondary mb-2">Project Details</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  @input="clearError('message')"
                  rows="4"
                  :class="['w-full bg-ops-navy border rounded-input px-4 py-3.5 text-[15px] text-text-primary transition-all duration-200 outline-none focus:shadow-[0_0_0_3px_rgba(17,138,178,0.2)] placeholder-text-text-tertiary resize-y min-h-25', errors.message ? 'border-red-500 focus:border-red-500' : 'border-divider focus:border-accent']"
                  placeholder="Tell us about your timeline, goals, and technical requirements..."
                ></textarea>
                <span v-if="errors.message" class="text-red-400 text-[12px] mt-1.5 block">{{ errors.message }}</span>
              </div>

              <div class="pt-4">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full inline-flex items-center justify-center rounded-button px-7 py-4 text-[16px] font-semibold bg-accent text-white hover:bg-accent-hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span v-if="!isSubmitting">Send Message</span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Processing...
                  </span>
                </button>
              </div>

            </form>
          </Transition>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '#imports'

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Orderly Problem Solvers",
        "description": "Contact our engineering and consulting team to start your custom software project.",
        "url": "https://www.orderlyproblemsolvers.com/contact"
      })
    }
  ]
})

useSeoMeta({
  title: 'Contact OPS | Start a Project',
  description: 'Ready to transform your operations? Contact Orderly Problem Solvers to discuss your enterprise software and strategic consulting needs.',
})

defineOgImage('OpsTemplate', {
  title: "Let's build something extraordinary.",
  description: 'Ready to transform your operations? Contact our team to discuss your next project.',
  badge: 'Contact'
})

// ─── Analytics ────────────────────────────────────────────────────────────────

const track = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', eventName, params)
}

// Track the very first field the user touches (one-time)
const formStarted = ref(false)

const handleFieldFocus = (field: string) => {
  if (formStarted.value) return
  formStarted.value = true
  track('form_start', { form_name: 'contact', first_field: field })
}

const handleServiceChange = () => {
  clearError('interest')
  if (form.value.interest) {
    track('service_selected', {
      form_name: 'contact',
      service: form.value.interest,
    })
  }
}

// ─── Toast ────────────────────────────────────────────────────────────────────

const toast = useToast()

// ─── State ────────────────────────────────────────────────────────────────────

const isSubmitting = ref(false)
const isSuccess = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  interest: '',
  message: '',
})

const errors = ref({
  firstName: '',
  lastName: '',
  email: '',
  interest: '',
  message: '',
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

const clearError = (field: keyof typeof errors.value) => {
  errors.value[field] = ''
}

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const validateForm = () => {
  let isValid = true

  if (!form.value.firstName.trim()) {
    errors.value.firstName = 'First name is required'
    isValid = false
  }
  if (!form.value.lastName.trim()) {
    errors.value.lastName = 'Last name is required'
    isValid = false
  }
  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!isValidEmail(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
    isValid = false
  }
  if (!form.value.interest) {
    errors.value.interest = 'Please select a service'
    isValid = false
  }
  if (!form.value.message.trim()) {
    errors.value.message = 'Please provide some project details'
    isValid = false
  } else if (form.value.message.trim().length < 10) {
    errors.value.message = 'Please provide a bit more detail (min 10 characters)'
    isValid = false
  }

  return isValid
}

// ─── Submit ───────────────────────────────────────────────────────────────────

const handleSubmit = async () => {
  if (!validateForm()) {
    track('form_error', { form_name: 'contact', reason: 'validation_failed' })
    return
  }

  isSubmitting.value = true

  try {
    await $fetch('/api/public/enquiries', {
      method: 'POST',
      body: form.value,
    })

    // Most important conversion event — mark this as a conversion in GA4
    track('generate_lead', {
      form_name: 'contact',
      service: form.value.interest,
      has_company: !!form.value.company,
    })

    isSuccess.value = true

  } catch (error: any) {
    track('form_submission_error', {
      form_name: 'contact',
      error_message: error?.message ?? 'unknown',
    })

    toast.add({
      title: 'Error sending message',
      description: error.message || 'Please try again later.',
      color: 'error',
    })
  } finally {
    isSubmitting.value = false
  }
}

// ─── Reset ────────────────────────────────────────────────────────────────────

const resetForm = () => {
  track('form_reset', { form_name: 'contact' })

  isSuccess.value = false
  formStarted.value = false

  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    interest: '',
    message: '',
  }
  errors.value = {
    firstName: '',
    lastName: '',
    email: '',
    interest: '',
    message: '',
  }
}
</script>

<style scoped>
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  animation: fade-up 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>