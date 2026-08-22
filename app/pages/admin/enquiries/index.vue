<template>
  <div class="max-w-6xl mx-auto pb-20">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-text-primary">Enquiries</h1>
        <p class="text-sm text-gray-500 dark:text-text-secondary mt-1">Manage project requests and contact form submissions.</p>
      </div>
    </div>

    <div class="bg-white dark:bg-ops-black border border-gray-200 dark:border-divider rounded-card overflow-hidden">

      <!-- ─── Loading state ────────────────────────────────────────────── -->
      <div v-if="status === 'pending'" class="flex flex-col items-center justify-center py-16 px-4 text-center">
        <svg class="w-8 h-8 animate-spin text-gray-400 dark:text-text-tertiary mb-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p class="text-sm font-medium text-gray-900 dark:text-text-primary">Loading enquiries...</p>
      </div>

      <!-- ─── Empty state ──────────────────────────────────────────────── -->
      <div v-else-if="!enquiries?.length" class="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div class="w-12 h-12 rounded-full bg-gray-50 dark:bg-white/[0.04] flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-gray-400 dark:text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <p class="text-sm font-medium text-gray-900 dark:text-text-primary">No enquiries yet.</p>
        <p class="text-sm text-gray-500 dark:text-text-secondary mt-1">When someone fills out your contact form, it will appear here.</p>
      </div>

      <!-- ─── Table ─────────────────────────────────────────────────────── -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-gray-50 dark:bg-ops-surface border-b border-gray-200 dark:border-divider">
              <th class="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-text-tertiary">Contact</th>
              <th class="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-text-tertiary">Company</th>
              <th class="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-text-tertiary">Request</th>
              <th class="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-text-tertiary">Date</th>
              <th class="px-4 py-3 w-10" />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in enquiries"
              :key="row.id"
              class="border-b border-gray-100 dark:border-divider last:border-0 hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors duration-150"
            >
              <td class="px-4 py-3.5 align-top">
                <div class="font-medium text-[13px] text-gray-900 dark:text-text-primary">
                  {{ row.fullName || `${row.firstName} ${row.lastName}`.trim() }}
                </div>
                <div class="text-[12px] text-gray-500 dark:text-text-tertiary">{{ row.email }}</div>
              </td>

              <td class="px-4 py-3.5 align-top">
                <span class="text-[13px] text-gray-600 dark:text-text-secondary">{{ row.company || '—' }}</span>
              </td>

              <td class="px-4 py-3.5 align-top max-w-xs">
                <div class="text-[13px] text-gray-600 dark:text-text-secondary truncate" :title="row.interest">
                  {{ row.interest }}
                </div>
              </td>

              <td class="px-4 py-3.5 align-top">
                <span class="text-[13px] text-gray-500 dark:text-text-tertiary">{{ formatDate(row.createdAt) }}</span>
              </td>

              <td class="px-4 py-3.5 align-top relative">
                <button
                  class="admin-icon-btn"
                  aria-label="Actions"
                  @click="openMenuId = openMenuId === row.id ? null : row.id"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </button>

                <Transition name="pop">
                  <div
                    v-if="openMenuId === row.id"
                    class="absolute right-4 top-full mt-1 z-20 w-44 bg-white dark:bg-ops-surface border border-gray-200 dark:border-divider rounded-card shadow-xl overflow-hidden"
                    v-click-outside="() => (openMenuId = null)"
                  >
                    <a
                      :href="`mailto:${row.email}?subject=Re: Orderly Problem Solvers Inquiry`"
                      target="_blank"
                      class="admin-menu-item"
                      @click="openMenuId = null"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                      Email reply
                    </a>
                    <div class="border-t border-gray-100 dark:border-divider">
                      <button class="admin-menu-item text-red-500 dark:text-red-400" @click="handleDelete(row.id)">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </Transition>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '#imports'

definePageMeta({ layout: 'admin', middleware: ['admin'] })
useSeoMeta({ title: 'Enquiries | OPS Admin' })

const toast = useToast()
const { data: enquiries, status, refresh } = useFetch('/api/enquiries')

const openMenuId = ref<number | null>(null)

function formatDate(dateString: string) {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateString))
}

async function handleDelete(id: number) {
  openMenuId.value = null
  if (!confirm('Are you sure you want to delete this enquiry?')) return

  try {
    await $fetch(`/api/enquiries/${id}`, { method: 'DELETE' })
    toast.add({ title: 'Enquiry deleted', color: 'success' })
    await refresh()
  } catch (error: any) {
    toast.add({ title: 'Error deleting enquiry', description: error.message, color: 'error' })
  }
}

// Minimal click-outside directive so the row action menu closes without a UI library
const vClickOutside = {
  mounted(el: HTMLElement & { _clickOutsideHandler?: (e: MouseEvent) => void }, binding: { value: () => void }) {
    el._clickOutsideHandler = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', el._clickOutsideHandler, true)
  },
  unmounted(el: HTMLElement & { _clickOutsideHandler?: (e: MouseEvent) => void }) {
    if (el._clickOutsideHandler) {
      document.removeEventListener('click', el._clickOutsideHandler, true)
    }
  },
}
</script>

<style scoped>
.admin-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-input, 10px);
  color: #9CA3AF;
  transition: color 150ms ease, background 150ms ease;
}
.admin-icon-btn:hover {
  color: #111827;
  background: rgba(0, 0, 0, 0.05);
}
:global(.dark) .admin-icon-btn {
  color: #86868B;
}
:global(.dark) .admin-icon-btn:hover {
  color: #F5F5F7;
  background: rgba(255, 255, 255, 0.06);
}

.admin-menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  font-size: 13px;
  color: #6B7280;
  text-decoration: none;
  transition: color 150ms ease, background 150ms ease;
}
.admin-menu-item:hover {
  color: #111827;
  background: rgba(0, 0, 0, 0.04);
}
:global(.dark) .admin-menu-item {
  color: #86868B;
}
:global(.dark) .admin-menu-item:hover {
  color: #F5F5F7;
  background: rgba(255, 255, 255, 0.06);
}

.pop-enter-active {
  transition: opacity 150ms ease, transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-leave-active {
  transition: opacity 100ms ease, transform 100ms ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .pop-enter-active, .pop-leave-active {
    transition: opacity 100ms ease;
  }
}
</style>