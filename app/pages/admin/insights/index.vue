<template>
  <div class="max-w-5xl mx-auto pb-20">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-text-primary">Insights</h1>
        <p class="text-sm text-gray-500 dark:text-text-secondary mt-1">Manage your articles, guides, and reports.</p>
      </div>
      <NuxtLink to="/admin/insights/create" class="admin-btn-primary">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        New Insight
      </NuxtLink>
    </div>

    <div class="bg-white dark:bg-ops-black border border-gray-200 dark:border-divider rounded-card overflow-hidden">

      <!-- ─── Loading state ────────────────────────────────────────────── -->
      <div v-if="status === 'pending'" class="flex flex-col items-center justify-center py-16 px-4 text-center">
        <svg class="w-8 h-8 animate-spin text-gray-400 dark:text-text-tertiary mb-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p class="text-sm font-medium text-gray-900 dark:text-text-primary">Loading insights...</p>
        <p class="text-sm text-gray-500 dark:text-text-secondary mt-1">Retrieving your latest posts.</p>
      </div>

      <!-- ─── Empty state ──────────────────────────────────────────────── -->
      <div v-else-if="!posts?.length" class="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div class="w-12 h-12 rounded-full bg-gray-50 dark:bg-white/[0.04] flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-gray-400 dark:text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <p class="text-sm font-medium text-gray-900 dark:text-text-primary">No insights found.</p>
        <p class="text-sm text-gray-500 dark:text-text-secondary mt-1 mb-6">Get started by creating your first post.</p>
        <NuxtLink to="/admin/insights/create" class="admin-btn-primary">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create Insight
        </NuxtLink>
      </div>

      <!-- ─── Table ─────────────────────────────────────────────────────── -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-gray-50 dark:bg-ops-surface border-b border-gray-200 dark:border-divider">
              <th class="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-text-tertiary">Title</th>
              <th class="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-text-tertiary">Category</th>
              <th class="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-text-tertiary">Format</th>
              <th class="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-text-tertiary">Status</th>
              <th class="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-text-tertiary">Date</th>
              <th class="px-4 py-3 w-10" />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in posts"
              :key="row.id"
              class="border-b border-gray-100 dark:border-divider last:border-0 hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors duration-150"
            >
              <td class="px-4 py-3.5 align-top">
                <span class="font-medium text-[13px] text-gray-900 dark:text-text-primary">{{ row.title }}</span>
              </td>

              <td class="px-4 py-3.5 align-top">
                <span class="text-[13px] text-gray-600 dark:text-text-secondary">{{ row.category }}</span>
              </td>

              <td class="px-4 py-3.5 align-top">
                <span class="text-[13px] text-gray-600 dark:text-text-secondary">{{ row.format }}</span>
              </td>

              <td class="px-4 py-3.5 align-top">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border"
                  :class="row.isPublished
                    ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20'
                    : 'bg-gray-100 text-gray-500 border-gray-200 dark:bg-white/[0.04] dark:text-text-tertiary dark:border-divider'"
                >
                  {{ row.isPublished ? 'Published' : 'Draft' }}
                </span>
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
                    <NuxtLink :to="`/admin/insights/${row.id}`" class="admin-menu-item" @click="openMenuId = null">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                      Edit
                    </NuxtLink>
                    <NuxtLink :to="`/insights/${row.slug}`" target="_blank" class="admin-menu-item" @click="openMenuId = null">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                      View live
                    </NuxtLink>
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

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

useSeoMeta({ title: 'Insights | OPS Admin' })

const toast = useToast()

// Fetch posts from our new API route
const { data: posts, status, refresh } = useFetch('/api/insights')

const openMenuId = ref<number | null>(null)

// Helper to format timestamps into readable dates (e.g., "Apr 6, 2026")
function formatDate(dateString: string) {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(dateString))
}

// Handle the deletion request
async function handleDelete(id: number) {
  openMenuId.value = null
  if (!confirm('Are you sure you want to delete this insight? This cannot be undone.')) return

  try {
    await $fetch(`/api/insights/${id}`, { method: 'DELETE' })
    toast.add({ title: 'Insight deleted', color: 'success' })
    await refresh()
  } catch (error: any) {
    toast.add({ title: 'Error deleting insight', description: error.message, color: 'warning' })
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
.admin-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--radius-button, 980px);
  background: var(--color-accent);
  color: white;
  font-size: 13px;
  font-weight: 600;
  transition: background 150ms ease;
}
.admin-btn-primary:hover {
  background: var(--color-accent-hover);
}

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