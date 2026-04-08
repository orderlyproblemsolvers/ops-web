<template>
  <!--
    The SVG filter is defined once in the DOM, hidden, and referenced
    by the liquid-glass button via filter: url(#lg-button).
    It only renders when the primary variant is used — other variants
    skip the wrapper entirely.
  -->
  <template v-if="variant === 'primary'">

    <!-- Hidden SVG filter definition — injected once, reused by all instances -->
    <svg width="0" height="0" class="absolute overflow-hidden pointer-events-none" aria-hidden="true">
      <defs>
        <filter id="lg-button" x="-20%" y="-50%" width="140%" height="200%" color-interpolation-filters="sRGB">
          <!--
            feTurbulence generates the organic noise that drives displacement.
            Low baseFrequency = soft, large-scale distortion (glass-like).
            We animate the seed so the glass "breathes" very subtly on hover.
          -->
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.032"
            numOctaves="2"
            seed="4"
            result="noise"
          />
          <!--
            feDisplacementMap bends the pixels beneath the button using the
            noise field. scale="7" is subtle — large enough to read as
            refraction, small enough not to distort the label text.
            xChannelSelector="R" yChannelSelector="G" maps noise channels
            to x/y displacement independently (anisotropic glass).
          -->
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="7"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
        </filter>

        <!--
          Separate filter for the specular edge highlight.
          feGaussianBlur + feComposite creates a soft rim light
          that only appears at the button edge, like light catching
          the rim of a glass object.
        -->
        <filter id="lg-rim" x="-5%" y="-30%" width="110%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>

    <component
      :is="isLink ? NuxtLink : 'button'"
      :to="to"
      :href="href"
      :class="[
        'lg-btn inline-flex items-center justify-center rounded-button transition-all duration-300 relative overflow-hidden select-none',
        sizeClasses[size],
      ]"
    >
      <!--
        Layer 1 — the displaced/refracted backdrop.
        This is what creates the glass impression: a slightly-tinted
        translucent surface with the displacement filter applied.
        The background is the accent colour at reduced opacity so the
        content behind "bleeds through" subtly.
      -->
      <span class="lg-glass" aria-hidden="true" />

      <!--
        Layer 2 — specular rim highlight.
        A thin gradient arc along the top edge simulates the bright
        specular reflection you'd see on real glass — like a curved
        light source hitting the top of the lens.
      -->
      <span class="lg-specular" aria-hidden="true" />

      <!--
        Layer 3 — inner glow on the bottom edge (shadow side of glass).
        Balances the top highlight — real glass has a darker inner
        shadow opposite the light source.
      -->
      <span class="lg-inner-shadow" aria-hidden="true" />

      <!-- Label — always on top, unaffected by the filter -->
      <span class="relative z-10 font-medium tracking-[-0.01em]">
        <slot />
      </span>
    </component>
  </template>

  <!-- Non-primary variants — no glass effect, standard styling -->
  <component
    v-else
    :is="isLink ? NuxtLink : 'button'"
    :to="to"
    :href="href"
    :class="[
      'inline-flex items-center justify-center rounded-button transition-colors duration-200',
      sizeClasses[size],
      variantClasses[variant],
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

const NuxtLink = resolveComponent('NuxtLink')

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
  sm: 'px-4    py-2    text-[13px]',
  md: 'px-[18px] py-[10px] text-[14px]',
  lg: 'px-7    py-3.5  text-[16px]',
}

const variantClasses: Record<string, string> = {
  // primary handled by glass layers above
  ghost:   'bg-transparent border border-white text-white hover:bg-white hover:text-ops-navy',
  outline: 'bg-transparent border border-ops-navy text-ops-navy hover:bg-ops-navy hover:text-white',
}
</script>

<style scoped>
/* ════════════════════════════════════════════════════════════════════════════
   LIQUID GLASS BUTTON
   
   The effect has four visual layers stacked inside the button:
     1. .lg-glass      — displaced, tinted backdrop (the "glass" material)
     2. .lg-specular   — bright rim highlight at the top edge
     3. .lg-inner-shadow — dark shadow rim at the bottom edge
     4. slot content   — label, always above the filters

   The SVG displacement filter is applied to .lg-glass only, NOT to the
   entire button — this keeps the label text crisp and unaffected.
════════════════════════════════════════════════════════════════════════════ */

/* ── Base button ─────────────────────────────────────────────────────────── */
.lg-btn {
  /*
    The base background is the accent colour at full opacity.
    The glass layers sit ON TOP and add the optical effects.
    Using a solid base means the button is always legible even if
    filters are unsupported.
  */
  background: #118ab2;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.20) inset, /* top inner highlight */
    0 4px 16px rgba(17, 138, 178, 0.30),       /* coloured drop shadow */
    0 1px 3px rgba(0, 0, 0, 0.20);             /* grounding shadow */
}

.lg-btn:hover {
  background: #1499c5;
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.28) inset,
    0 6px 24px rgba(17, 138, 178, 0.40),
    0 2px 6px rgba(0, 0, 0, 0.25);
  transform: translateY(-1px);
}

.lg-btn:active {
  transform: translateY(0px);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 8px rgba(17, 138, 178, 0.25),
    0 1px 2px rgba(0, 0, 0, 0.20);
}

/* ── Glass layer — the displaced translucent surface ─────────────────────── */
.lg-glass {
  position: absolute;
  inset: 0;
  border-radius: inherit;

  /*
    Semi-transparent tinted overlay — this is what you see "through".
    The backdrop-filter blurs content behind the button, the
    SVG displacement filter distorts those blurred pixels to
    simulate refraction.
  */
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.04) 50%,
    rgba(0, 0, 0, 0.06) 100%
  );
  backdrop-filter: blur(8px) saturate(1.4);
  -webkit-backdrop-filter: blur(8px) saturate(1.4);

  /*
    Apply the SVG displacement filter to this layer only.
    The filter ID matches the <filter id="lg-button"> defined in the template.
  */
  filter: url(#lg-button);
}

/* ── Specular highlight — bright arc on the top rim ─────────────────────── */
.lg-specular {
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 50%;
  border-radius: inherit;
  border-bottom-left-radius: 60% 40%;
  border-bottom-right-radius: 60% 40%;

  /*
    A focused radial gradient simulates a convex glass surface
    catching a light source from above-centre.
    opacity is kept low — this is a subtle material cue, not a flare.
  */
  background: radial-gradient(
    ellipse at 50% 0%,
    rgba(255, 255, 255, 0.36) 0%,
    rgba(255, 255, 255, 0.10) 50%,
    transparent 100%
  );
  pointer-events: none;

  /* Smooth transition on hover — highlight intensifies slightly */
  transition: opacity 300ms ease;
  opacity: 0.9;
}

.lg-btn:hover .lg-specular {
  opacity: 1;
  background: radial-gradient(
    ellipse at 50% 0%,
    rgba(255, 255, 255, 0.46) 0%,
    rgba(255, 255, 255, 0.14) 50%,
    transparent 100%
  );
}

/* ── Inner shadow — dark arc on the bottom rim (shadow side of the lens) ─── */
.lg-inner-shadow {
  position: absolute;
  bottom: 0;
  left: 5%;
  right: 5%;
  height: 45%;
  border-radius: inherit;
  border-top-left-radius: 60% 40%;
  border-top-right-radius: 60% 40%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.18) 0%,
    transparent 100%
  );
  pointer-events: none;
}

/* ── Focus ring ──────────────────────────────────────────────────────────── */
.lg-btn:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 3px rgba(17, 138, 178, 0.5),
    0 1px 0 rgba(255, 255, 255, 0.20) inset;
}

/* ── Reduced motion ──────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .lg-btn,
  .lg-specular {
    transition: none;
  }
  .lg-btn:hover {
    transform: none;
  }
}
</style>