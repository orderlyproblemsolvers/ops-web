<template>
  <div class="max-w-5xl mx-auto pb-20">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Insights</h1>
        <p class="text-sm text-gray-500 mt-1">Manage your articles, guides, and reports.</p>
      </div>
      <UButton icon="i-lucide-plus" color="secondary" to="/admin/insights/create">
        New Insight
      </UButton>
    </div>

    <UCard :ui="{ body: 'p-0 sm:p-0' }" class="overflow-hidden border-gray-200 dark:border-gray-800">
      <UTable
        :columns="columns"
        :data="posts || []"
        :loading="status === 'pending'"
        class="w-full"
        :ui="{base: 'bg-ops-black'}"
      >
        <template #title-cell="{ row }">
          <span class="font-medium text-gray-900 dark:text-white">{{ row.original.title }}</span>
        </template>

        <template #isPublished-cell="{ row }">
          <UBadge :color="row.original.isPublished ? 'success' : 'neutral'" variant="subtle" size="xs" class="font-medium">
            {{ row.original.isPublished ? 'Published' : 'Draft' }}
          </UBadge>
        </template>

        <template #createdAt-cell="{ row }">
          <span class="text-gray-500 dark:text-gray-400 text-sm">{{ formatDate(row.original.createdAt as string) }}</span>
        </template>

        <template #actions-cell="{ row }">
          <UDropdownMenu :ui="{content: 'bg-ops-black'}" :items="actionItems(row.original)">
            <UButton color="neutral" variant="ghost" icon="i-lucide-more-horizontal" aria-label="Actions" />
          </UDropdownMenu>
        </template>

        <template #empty>
          <div v-if="status === 'pending'" class="flex flex-col items-center justify-center py-16 px-4 text-center">
            <UIcon name="i-lucide-loader-circle" class="w-8 h-8 animate-spin text-gray-400 dark:text-gray-500 mb-4" />
            <p class="text-sm font-medium text-gray-900 dark:text-white">Loading insights...</p>
            <p class="text-sm text-gray-500 mt-1">Retrieving your latest posts.</p>
          </div>

          <div v-else class="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div class="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center mb-4">
              <UIcon name="i-lucide-file-text" class="w-6 h-6 text-gray-400" />
            </div>
            <p class="text-sm font-medium text-gray-900 dark:text-white">No insights found.</p>
            <p class="text-sm text-gray-500 mt-1 mb-6">Get started by creating your first post.</p>
            <UButton icon="i-lucide-plus" color="primary" to="/admin/insights/create">
              Create Insight
            </UButton>
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '#imports'

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

useSeoMeta({ title: 'Insights | OPS Admin' })

const toast = useToast()

// Fetch posts from our new API route
const { data: posts, status, refresh } = useFetch('/api/insights')

// Define table columns (v3 Syntax)
const columns = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    accessorKey: 'format',
    header: 'Format'
  },
  {
    accessorKey: 'isPublished',
    header: 'Status'
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    id: 'actions', // This 'id' satisfies the error requirement
    header: ''     // Keep header empty for the three-dot menu
  }
]

// Helper to format timestamps into readable dates (e.g., "Apr 6, 2026")
function formatDate(dateString: string) {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(new Date(dateString))
}

// Generate dropdown items for each specific row
const actionItems = (row: any) => [
  [
    {
      label: 'Edit',
      icon: 'i-lucide-pencil',
      to: `/admin/insights/${row.id}` // We will build this edit page next!
    },
    {
      label: 'View Live',
      icon: 'i-lucide-external-link',
      to: `/insights/${row.slug}`, // The public URL route
      target: '_blank'
    }
  ],
  [
    {
      label: 'Delete',
      icon: 'i-lucide-trash-2',
      class: 'text-red-500 dark:text-red-400',
      click: () => handleDelete(row.id)
    }
  ]
]

// Handle the deletion request
async function handleDelete(id: number) {
  // Simple browser confirmation prompt
  if (!confirm('Are you sure you want to delete this insight? This cannot be undone.')) return

  try {
    await $fetch(`/api/insights/${id}`, { method: 'DELETE' })
    toast.add({ title: 'Insight deleted', color: 'success' })
    
    // Refresh the table data silently
    await refresh()
  } catch (error: any) {
    toast.add({ title: 'Error deleting insight', description: error.message, color: 'warning' })
  }
}
</script>