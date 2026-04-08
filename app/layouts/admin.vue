<template>
  <UDashboardGroup storage-key="ops-admin-sidebar">

    <USidebar
      v-model:open="open"
      collapsible="icon"
      :ui="{
        container: 'h-full flex flex-col',
        inner: 'flex flex-col h-full',
        body: 'flex-1 overflow-y-auto py-2 px-2',
        footer: 'p-2 border-t',
      }"
      class="ops-sidebar"
    >

      <template #header="{ collapsed }">
        <div class="flex items-center justify-center w-full h-14">
          <UButton
            icon="i-lucide-panel-left"
            color="neutral"
            variant="ghost"
            size="sm"
            class="ops-icon-btn"
            aria-label="Toggle sidebar"
            @click="open = !open"
          />
        </div>
      </template>

      <template #default="{ collapsed }">
        <div class="flex flex-col gap-1">
          <p
            v-if="!collapsed"
            class="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-widest"
            style="color: #6E6E73;"
          >
            Main
          </p>

          <UNavigationMenu
            :items="navItems"
            orientation="vertical"
            :ui="{
              link: [
                'group flex items-center gap-2.5 px-2.5 py-2 rounded-[10px]',
                'text-[13px] font-medium transition-all duration-150',
                'text-[#86868B] hover:text-[#F5F5F7] hover:bg-white/[0.07]',
              ].join(' '),
              linkActive: 'text-[#F5F5F7] bg-white/[0.08]',
              linkLeadingIcon: 'w-4 h-4 shrink-0 text-white',
              label: collapsed ? 'sr-only' : '',
            }"
          />
        </div>
      </template>

      <template #footer="{ collapsed }">
        <UDropdownMenu
          :items="userMenuItems"
          :content="{ align: collapsed ? 'start' : 'center', side: 'top', sideOffset: 8 }"
          :ui="{ content: 'min-w-[180px] ops-dropdown bg-ops-navy' }"
        >
          <UButton
            :label="collapsed ? undefined : (user?.name || 'Admin')"
            color="neutral"
            variant="ghost"
            :trailing-icon="collapsed ? undefined : 'i-lucide-chevrons-up-down'"
            class="w-full overflow-hidden ops-user-btn"
            :class="collapsed ? 'justify-center px-0' : 'justify-between'"
          >
            <template #leading>
              <UAvatar
                :src="user?.avatarUrl"
                :alt="user?.name || 'Admin'"
                size="xs"
                :ui="{ root: 'shrink-0' }"
              />
            </template>
          </UButton>
        </UDropdownMenu>
      </template>

    </USidebar>

    <div class="flex flex-col flex-1 min-w-0 min-h-screen ops-main">

      <header class="h-14 shrink-0 flex items-center gap-3 px-4 ops-topbar">

        <UButton
          icon="i-lucide-menu"
          color="neutral"
          variant="ghost"
          size="sm"
          aria-label="Open sidebar"
          class="md:hidden ops-icon-btn"
          @click="open = !open"
        />

        <div class="flex-1 flex items-center gap-2 min-w-0">
          <span class="text-[13px] font-medium" style="color: #86868B;">
            OPS Admin
          </span>
          <span style="color: #6E6E73;">/</span>
          <span class="text-[13px] font-semibold truncate" style="color: #F5F5F7;">
            {{ currentPageLabel }}
          </span>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <UAvatar
            :src="user?.avatarUrl"
            :alt="user?.name || 'Admin'"
            size="xs"
            class="cursor-pointer ring-1 ring-white/10 hover:ring-accent transition-all"
          />
        </div>

      </header>

      <main class="flex-1 overflow-y-auto ops-content">
        <div class="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <slot />
        </div>
      </main>

    </div>

  </UDashboardGroup>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'

const { user, clear } = useUserSession()
const route = useRoute()
const open = ref(true)

// ── Navigation ────────────────────────────────────────────────────────────────
const navItems: NavigationMenuItem[] = [
  {
    label: 'Dashboard',
    icon:  'i-lucide-layout-dashboard',
    to:    '/admin',
  },
  {
    label: 'Insights',
    icon:  'i-lucide-file-text',
    to:    '/admin/insights',
  },
  {
    label: 'Enquiries',
    icon:  'i-lucide-inbox',
    to:    '/admin/enquiries',
  },
]

// ── Mobile Route Watcher (Auto-close sidebar on mobile navigation) ────────────
watch(() => route.fullPath, () => {
  // 768px is the 'md' breakpoint in Tailwind
  if (import.meta.client && window.innerWidth < 768) {
    open.value = false
  }
})

// ── Bulletproof Breadcrumb Logic ──────────────────────────────────────────────
const currentPageLabel = computed(() => {
  const path = route.path
  if (path.includes('/insights')) return 'Insights'
  if (path.includes('/enquiries')) return 'Enquiries'
  return 'Dashboard'
})

// ── User dropdown ─────────────────────────────────────────────────────────────
const userMenuItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: user.value?.name || 'Admin',
      icon:  'i-lucide-user',
      type:  'label',
    },
  ],
  [
    { label: 'Profile',  icon: 'i-lucide-user'     },
    { label: 'Settings', icon: 'i-lucide-settings'  },
  ],
  [
    {
      label:    'Log out',
      icon:     'i-lucide-log-out',
      class:    'text-red-400',
      onSelect: async () => {
        await clear()
        await navigateTo('/admin/login')
      },
    },
  ],
])
</script>

<style scoped>
/* ── Sidebar surface ─────────────────────────────────────────────────────── */
:deep(.ops-sidebar [data-sidebar]) {
  background: #020f1a;          /* ops-black */
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

/* ── Top navbar ──────────────────────────────────────────────────────────── */
.ops-topbar {
  background: #051c2c;          /* ops-navy */
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

/* ── Main content area ───────────────────────────────────────────────────── */
.ops-main {
  background: #0A2840;          /* ops-surface */
}

.ops-content {
  background: #0A2840;
}

/* ── Icon buttons in topbar/sidebar ─────────────────────────────────────── */
.ops-icon-btn {
  color: #86868B;
}
.ops-icon-btn:hover {
  color: #F5F5F7;
  background: rgba(255, 255, 255, 0.06);
}

/* ── User button in sidebar footer ──────────────────────────────────────── */
:deep(.ops-user-btn) {
  color: #86868B;
  transition: color 150ms ease, background 150ms ease;
}
:deep(.ops-user-btn:hover) {
  color: #F5F5F7;
  background: rgba(255, 255, 255, 0.06);
}

/* ── Dropdown menu ───────────────────────────────────────────────────────── */
:deep(.ops-dropdown) {
  background: #0A2840;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}
:deep(.ops-dropdown [role="menuitem"]) {
  color: #86868B;
  font-size: 13px;
}
:deep(.ops-dropdown [role="menuitem"]:hover) {
  color: #F5F5F7;
  background: rgba(255, 255, 255, 0.06);
}

/* ── Active nav item ─────────────────────────────────────────────────────── */
:deep([data-active="true"] a),
:deep([aria-current="page"]) {
  color: #F5F5F7 !important;
  background: rgba(17, 138, 178, 0.12) !important;
}
:deep([data-active="true"] .lucide),
:deep([aria-current="page"] .lucide) {
  color: #118ab2;
}

/* ── Nav link accent on hover ────────────────────────────────────────────── */
:deep(.ops-sidebar [data-sidebar] a:hover .lucide) {
  color: #118ab2;
}

/* ── Footer divider ──────────────────────────────────────────────────────── */
:deep(.ops-sidebar [data-sidebar] footer) {
  border-top-color: rgba(255, 255, 255, 0.06);
}

/* ── Responsive: on mobile sidebar overlays as drawer ───────────────────── */
:deep([data-sidebar-overlay]) {
  background: rgba(2, 15, 26, 0.7);
  backdrop-filter: blur(4px);
}
</style>