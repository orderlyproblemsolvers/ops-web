<template>
  <div class="max-w-6xl mx-auto pb-20">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Enquiries</h1>
        <p class="text-sm text-gray-500 mt-1">Manage project requests and contact form submissions.</p>
      </div>
    </div>

    <UCard :ui="{ body: 'p-0 sm:p-0' }" class="overflow-hidden border-gray-200 dark:border-gray-800">
      <UTable
        :columns="columns"
        :data="enquiries || []"
        :loading="status === 'pending'"
        class="w-full"
        :ui="{base: 'bg-ops-black'}"
      >
        <template #name-cell="{ row }">
          <div class="font-medium text-gray-900 dark:text-white">
            {{ row.original.firstName }} {{ row.original.lastName }}
          </div>
          <div class="text-xs text-gray-500">{{ row.original.email }}</div>
        </template>

        <template #company-cell="{ row }">
          <span class="text-sm text-gray-600 dark:text-gray-300">{{ row.original.company || '-' }}</span>
        </template>

        <template #interest-cell="{ row }">
          <UBadge color="neutral" variant="subtle" size="xs" class="capitalize">
            {{ formatInterest(row.original.interest as string) }}
          </UBadge>
        </template>

        <template #message-cell="{ row }">
          <div class="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate" :title="row.original.message as string">
            {{ row.original.message }}
          </div>
        </template>

        <template #createdAt-cell="{ row }">
          <span class="text-gray-500 dark:text-gray-400 text-sm">{{ formatDate(row.original.createdAt as any) }}</span>
        </template>

        <template #actions-cell="{ row }">
          <UDropdownMenu :ui="{content: 'bg-ops-black'}" :items="actionItems(row.original)">
            <UButton color="neutral" variant="ghost" icon="i-lucide-more-horizontal" aria-label="Actions" />
          </UDropdownMenu>
        </template>

        <template #empty>
          <div v-if="status === 'pending'" class="flex flex-col items-center justify-center py-16 px-4 text-center">
            <UIcon name="i-lucide-loader-circle" class="w-8 h-8 animate-spin text-gray-400 dark:text-gray-500 mb-4" />
            <p class="text-sm font-medium text-gray-900 dark:text-white">Loading enquiries...</p>
          </div>
          <div v-else class="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div class="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center mb-4">
              <UIcon name="i-lucide-inbox" class="w-6 h-6 text-gray-400" />
            </div>
            <p class="text-sm font-medium text-gray-900 dark:text-white">No enquiries yet.</p>
            <p class="text-sm text-gray-500 mt-1 mb-6">When someone fills out your contact form, it will appear here.</p>
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '#imports'

definePageMeta({ layout: 'admin', middleware: ['admin'] })
useSeoMeta({ title: 'Enquiries | OPS Admin' })

const toast = useToast()
const { data: enquiries, status, refresh } = useFetch('/api/enquiries')

const columns = [
  { accessorKey: 'name', header: 'Contact' },
  { accessorKey: 'company', header: 'Company' },
  { accessorKey: 'interest', header: 'Interest' },
  { accessorKey: 'message', header: 'Message' },
  { accessorKey: 'createdAt', header: 'Date' },
  { id: 'actions', header: '' }
]

function formatInterest(value: string) {
  const map: Record<string, string> = {
    'enterprise-software': 'Enterprise Software',
    'data-ai': 'Data & AI',
    'strategic-consulting': 'Consulting',
    'digital-presence': 'Digital Presence',
    'other': 'Other'
  }
  return map[value] || value
}

function formatDate(dateString: string) {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateString))
}

const actionItems = (row: any) => [
  [
    {
      label: 'Email Reply',
      icon: 'i-lucide-mail',
      // Changed from onSelect to 'to' to render a native anchor link
      to: `mailto:${row.email}?subject=Re: Orderly Problem Solvers Inquiry`,
      target: '_blank' // Helps ensure the mail app opens correctly without closing your admin tab
    }
  ],
  [
    {
      label: 'Delete',
      icon: 'i-lucide-trash-2',
      color: 'error',
      onSelect: () => handleDelete(row.id)
    }
  ]
]

async function handleDelete(id: number) {
  if (!confirm('Are you sure you want to delete this enquiry?')) return

  try {
    await $fetch(`/api/enquiries/${id}`, { method: 'DELETE' })
    toast.add({ title: 'Enquiry deleted', color: 'success' })
    await refresh()
  } catch (error: any) {
    toast.add({ title: 'Error deleting enquiry', description: error.message, color: 'error' })
  }
}
</script>