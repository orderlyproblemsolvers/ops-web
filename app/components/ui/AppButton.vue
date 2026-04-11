<template>
  <template v-if="variant === 'primary'">
    <svg width="0" height="0" class="absolute overflow-hidden pointer-events-none" aria-hidden="true">
      <defs>
        <filter id="lg-refract" x="-20%" y="-50%" width="140%" height="200%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.028" numOctaves="3" seed="7" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
          <feColorMatrix in="displaced" type="saturate" values="1.15"/>
        </filter>
      </defs>
    </svg>

    <component
      :is="isLink ? NuxtLink : 'button'"
      :to="to"
      :href="href"
      v-bind="attrs"
      :class="['lg-btn', sizeClasses[size], attrs.class]"
    >
      <span class="lg-shell" aria-hidden="true">
        <span class="lg-fill" />
        <span class="lg-border" />
        <span class="lg-specular-top" />
        <span class="lg-caustic" />
        <span class="lg-prism-l" />
        <span class="lg-prism-r" />
        <span class="lg-depth" />
      </span>
      <span class="lg-label"><slot /></span>
    </component>
  </template>

  <component
    v-else
    :is="isLink ? NuxtLink : 'button'"
    :to="to"
    :href="href"
    v-bind="attrs"
    :class="[
      'inline-flex items-center justify-center rounded-full transition-colors duration-200',
      sizeClasses[size],
      variantClasses[variant],
      attrs.class,
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, resolveComponent, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const NuxtLink = resolveComponent('NuxtLink')
const attrs = useAttrs()

interface Props {
  variant?: 'primary' | 'ghost' | 'outline'
  size?:    'sm' | 'md' | 'lg'
  href?:    string | null
  to?:      string | object | null
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size:    'md',
  href:    null,
  to:      null,
})

const isLink = computed(() => !!props.to || !!props.href)

const sizeClasses: Record<string, string> = {
  sm: 'lg-sm',
  md: 'lg-md',
  lg: 'lg-lg',
}

const variantClasses: Record<string, string> = {
  ghost:   'bg-transparent border border-white text-white hover:bg-white hover:text-ops-navy',
  outline: 'bg-transparent border border-ops-navy text-ops-navy hover:bg-ops-navy hover:text-white',
}
</script>

<style scoped>
.lg-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  cursor: pointer;
  border: none;
  background: transparent;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: -0.01em;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  isolation: isolate;
  -webkit-tap-highlight-color: transparent;
}

.lg-sm { padding: 8px 20px;  font-size: 13px; }
.lg-md { padding: 12px 28px; font-size: 15px; }
.lg-lg { padding: 16px 38px; font-size: 17px; }

.lg-shell {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
}

.lg-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    145deg,
    rgba(17, 138, 178, 0.45) 0%,
    rgba(17, 138, 178, 0.22) 50%,
    rgba(10, 100, 140, 0.28) 100%
  );
  backdrop-filter: blur(24px) saturate(1.8) brightness(1.1);
  -webkit-backdrop-filter: blur(24px) saturate(1.8) brightness(1.1);
  filter: url(#lg-refract);
}

.lg-border {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid rgba(100, 210, 240, 0.28);
  box-shadow:
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.10),
    0 0 0 1px rgba(0, 0, 0, 0.15);
}

.lg-specular-top {
  position: absolute;
  top: 0; left: 8%; right: 8%;
  height: 55%;
  border-bottom-left-radius: 60% 100%;
  border-bottom-right-radius: 60% 100%;
  background: radial-gradient(
    ellipse at 50% -10%,
    rgba(255, 255, 255, 0.55) 0%,
    rgba(180, 235, 255, 0.22) 35%,
    rgba(255, 255, 255, 0.04) 65%,
    transparent 100%
  );
  mix-blend-mode: screen;
  pointer-events: none;
  transition: background 0.25s ease;
}

.lg-caustic {
  position: absolute;
  bottom: 0; left: 15%; right: 15%;
  height: 40%;
  border-top-left-radius: 50% 80%;
  border-top-right-radius: 50% 80%;
  background: linear-gradient(
    to top,
    rgba(17, 138, 178, 0.25) 0%,
    rgba(100, 210, 240, 0.10) 50%,
    transparent 100%
  );
  mix-blend-mode: screen;
  pointer-events: none;
}

.lg-prism-l {
  position: absolute;
  top: 20%; bottom: 20%; left: 0;
  width: 3px;
  border-radius: 2px 0 0 2px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(100, 220, 255, 0.65) 40%,
    rgba(17, 138, 178, 0.55) 70%,
    transparent 100%
  );
  filter: blur(1px);
  mix-blend-mode: screen;
  pointer-events: none;
}

.lg-prism-r {
  position: absolute;
  top: 20%; bottom: 20%; right: 0;
  width: 3px;
  border-radius: 0 2px 2px 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(17, 138, 178, 0.55) 40%,
    rgba(80, 200, 230, 0.50) 70%,
    transparent 100%
  );
  filter: blur(1px);
  mix-blend-mode: screen;
  pointer-events: none;
}

.lg-depth {
  position: absolute;
  inset: 3px;
  border-radius: 9999px;
  box-shadow:
    inset 0 2px 8px rgba(0, 0, 0, 0.20),
    inset 0 -1px 4px rgba(0, 0, 0, 0.10);
  pointer-events: none;
}

.lg-label {
  position: relative;
  z-index: 10;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.30);
  display: flex;
  align-items: center;
  gap: 8px;
}

.lg-btn::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 9999px;
  box-shadow:
    0 8px 32px rgba(17, 138, 178, 0.40),
    0 2px 8px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(17, 138, 178, 0.18);
  z-index: -1;
  transition: box-shadow 0.25s ease;
  pointer-events: none;
}

.lg-btn:hover {
  transform: translateY(-2px) scale(1.015);
}

.lg-btn:hover::after {
  box-shadow:
    0 16px 48px rgba(17, 138, 178, 0.50),
    0 4px 16px rgba(0, 0, 0, 0.30),
    0 0 40px rgba(17, 138, 178, 0.25),
    0 0 0 1px rgba(100, 210, 240, 0.22);
}

.lg-btn:hover .lg-specular-top {
  background: radial-gradient(
    ellipse at 50% -10%,
    rgba(255, 255, 255, 0.70) 0%,
    rgba(180, 235, 255, 0.30) 35%,
    rgba(255, 255, 255, 0.06) 65%,
    transparent 100%
  );
}

.lg-btn:active {
  transform: translateY(0px) scale(0.985);
  transition-duration: 0.1s;
}

.lg-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(17, 138, 178, 0.55);
}

@media (prefers-reduced-motion: reduce) {
  .lg-btn,
  .lg-btn::after,
  .lg-specular-top { transition: none; }
  .lg-btn:hover { transform: none; }
}
</style>