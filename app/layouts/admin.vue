<template>
  <div class="flex h-screen bg-mint dark:bg-ops-navy transition-colors duration-200">

    <!-- ─── Mobile overlay backdrop ──────────────────────────────────────── -->
    <Transition name="fade">
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
        @click="mobileOpen = false"
      />
    </Transition>

    <!-- ─── Sidebar ──────────────────────────────────────────────────────── -->
    <aside
      class="fixed md:static inset-y-0 left-0 z-50 flex flex-col shrink-0 bg-white dark:bg-ops-black border-r border-gray-200 dark:border-divider transition-all duration-200 ease-out"
      :class="[
        collapsed ? 'md:w-18' : 'md:w-64',
        mobileOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:translate-x-0',
      ]"
    >
      <!-- Header: collapse toggle -->
      <div class="h-14 shrink-0 flex items-center justify-center border-b border-gray-200 dark:border-divider">
        <button
          class="admin-icon-btn"
          aria-label="Toggle sidebar"
          @click="collapsed = !collapsed"
        >
          <UIcon name="i-lucide-panel-left"/>
        </button>
      </div>

      <!-- Nav -->
      <nav class="flex-1 overflow-y-auto py-3 px-2">
        <p
          v-if="!collapsed"
          class="px-2.5 pb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-text-tertiary"
        >
          Main
        </p>

        <ul class="flex flex-col gap-1">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="group flex items-center gap-2.5 px-2.5 py-2 rounded-input text-[13px] font-medium transition-all duration-150"
              :class="isActive(item.to)
                ? 'text-gray-900 dark:text-text-primary bg-accent/10'
                : 'text-gray-500 dark:text-text-secondary hover:text-gray-900 dark:hover:text-text-primary hover:bg-gray-100 dark:hover:bg-white/[0.06]'"
              @click="mobileOpen = false"
            >
              <svg
                class="w-4 h-4 shrink-0 transition-colors duration-150"
                :class="isActive(item.to) ? 'text-accent' : 'text-gray-400 dark:text-text-tertiary group-hover:text-accent'"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                v-html="item.iconPath"
              />
              <span v-if="!collapsed">{{ item.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Footer: user menu -->
      <div class="p-2 border-t border-gray-200 dark:border-divider relative" ref="userMenuRef">
        <button
          class="w-full flex items-center gap-2.5 px-2 py-2 rounded-input text-[13px] font-medium text-gray-500 dark:text-text-secondary hover:text-gray-900 dark:hover:text-text-primary hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all duration-150"
          :class="collapsed ? 'justify-center' : 'justify-between'"
          @click="userMenuOpen = !userMenuOpen"
        >
          <span class="flex items-center gap-2.5 min-w-0">
            <span class="admin-avatar shrink-0">
              <img v-if="user?.avatarUrl" :src="user.avatarUrl" :alt="user?.name || 'Admin'" class="w-full h-full object-cover rounded-full" />
              <span v-else>{{ initials }}</span>
            </span>
            <span v-if="!collapsed" class="truncate">{{ user?.name || 'Admin' }}</span>
          </span>
          <svg v-if="!collapsed" class="w-3.5 h-3.5 shrink-0 text-gray-400 dark:text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </button>

        <!-- Dropdown -->
        <Transition name="pop">
          <div
            v-if="userMenuOpen"
            class="absolute bottom-full mb-2 left-2 right-2 md:left-2 md:right-auto md:w-48 bg-white dark:bg-ops-surface border border-gray-200 dark:border-divider rounded-card shadow-xl overflow-hidden"
          >
            <div class="px-3 py-2.5 border-b border-gray-100 dark:border-divider">
              <div class="text-[13px] font-medium text-gray-900 dark:text-text-primary truncate">{{ user?.name || 'Admin' }}</div>
            </div>
            <button class="admin-menu-item">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
              Profile
            </button>
            <button class="admin-menu-item">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Settings
            </button>
            <div class="border-t border-gray-100 dark:border-divider">
              <button class="admin-menu-item text-red-500 dark:text-red-400" @click="handleLogout">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
                Log out
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </aside>

    <!-- ─── Main column ──────────────────────────────────────────────────── -->
    <div class="flex flex-col flex-1 min-w-0 h-screen">

      <header class="h-14 shrink-0 flex items-center gap-3 px-4 bg-white dark:bg-ops-navy border-b border-gray-200 dark:border-divider">
        <button
          class="admin-icon-btn md:hidden lg:hidden"
          aria-label="Open sidebar"
          @click="mobileOpen = true"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <div class="flex-1 flex items-center gap-2 min-w-0">
          <span class="text-[13px] font-medium text-gray-400 dark:text-text-tertiary">OPS Admin</span>
          <span class="text-gray-300 dark:text-text-tertiary">/</span>
          <span class="text-[13px] font-semibold truncate text-gray-900 dark:text-text-primary">{{ currentPageLabel }}</span>
        </div>

        <div class="flex items-center gap-1.5 shrink-0">
          <!-- Theme toggle -->
          <button
            class="admin-icon-btn"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme"
          >
            <svg v-if="isDark" class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1.5m0 15V21m8.25-9H21M3 12h1.5m14.16-6.66l-1.06 1.06M6.4 17.6l-1.06 1.06m0-13.32L6.4 6.4m11.2 11.2l1.06 1.06M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
            <svg v-else class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          </button>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto bg-mint dark:bg-ops-surface transition-colors duration-200">
        <div class="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <slot />
        </div>
      </main>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const { user, clear } = useUserSession()
const route = useRoute()

// ─── Sidebar state ────────────────────────────────────────────────────────────
const collapsed = ref(false)
const mobileOpen = ref(false)
const userMenuOpen = ref(false)
const userMenuRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const stored = localStorage.getItem('ops-admin-sidebar-collapsed')
  if (stored) collapsed.value = stored === 'true'
})

watch(collapsed, (val) => {
  localStorage.setItem('ops-admin-sidebar-collapsed', String(val))
})

// Close mobile drawer + user menu on route change
watch(() => route.fullPath, () => {
  mobileOpen.value = false
  userMenuOpen.value = false
})

// Close user menu on outside click
const handleClickOutside = (e: MouseEvent) => {
  if (userMenuRef.value && !userMenuRef.value.contains(e.target as Node)) {
    userMenuOpen.value = false
  }
}
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// ─── Theme (light/dark) ───────────────────────────────────────────────────────
const isDark = ref(true)

onMounted(() => {
  const stored = localStorage.getItem('ops-admin-theme')
  if (stored) {
    isDark.value = stored === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme()
})

const applyTheme = () => {
  document.documentElement.classList.toggle('dark', isDark.value)
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('ops-admin-theme', isDark.value ? 'dark' : 'light')
  applyTheme()
}

// ─── Navigation ───────────────────────────────────────────────────────────────
const icons = {
  dashboard: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />',
  insights: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />',
  enquiries: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />',
}

const navItems = [
  { label: 'Dashboard', to: '/admin', iconPath: icons.dashboard },
  { label: 'Insights', to: '/admin/insights', iconPath: icons.insights },
  { label: 'Enquiries', to: '/admin/enquiries', iconPath: icons.enquiries },
]

const isActive = (to: string) =>
  to === '/admin' ? route.path === '/admin' : route.path.startsWith(to)

const currentPageLabel = computed(() => {
  const path = route.path
  if (path.includes('/insights')) return 'Insights'
  if (path.includes('/enquiries')) return 'Enquiries'
  return 'Dashboard'
})

const initials = computed(() => {
  const name = user.value?.name || 'Admin'
  return name
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

// ─── Logout ───────────────────────────────────────────────────────────────────
const handleLogout = async () => {
  userMenuOpen.value = false
  await clear()
  await navigateTo('/admin/login')
}
</script>

<style scoped>
.admin-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
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

.admin-avatar {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: var(--color-accent);
  color: white;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.admin-menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  font-size: 13px;
  color: #6B7280;
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

/* ── Transitions ─────────────────────────────────────────────────────────── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
  transform: translateY(4px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .fade-enter-active, .fade-leave-active,
  .pop-enter-active, .pop-leave-active {
    transition: opacity 100ms ease;
  }
}
</style>