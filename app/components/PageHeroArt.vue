<script setup lang="ts">
defineProps<{ variant: 'services' | 'approach' | 'about' | 'contact' }>();
const captions = {
  services: 'CAPABILITIES / CONNECTED',
  approach: 'SIX STAGES / ONE DIRECTION',
  about: 'DEPTH / CRAFT / DELIVERY',
  contact: 'YOUR IDEA / OUR NEXT CONVERSATION',
};
</script>
<template>
  <div class="page-art reveal" :class="'art-' + variant" aria-hidden="true">
    <div class="art-coordinate"></div>
    <svg class="hero-illustration" viewBox="0 0 300 300" fill="none">
      <template v-if="variant === 'services'">
        <g class="art-piece">
          <rect x="38" y="48" width="224" height="180" rx="12" class="art-surface" />
          <path d="M38 79H262" class="art-line" />
          <circle cx="53" cy="64" r="3" class="art-accent" />
          <circle cx="65" cy="64" r="3" class="art-muted" />
          <circle cx="77" cy="64" r="3" class="art-muted" />
        </g>
        <g class="art-piece">
          <rect x="58" y="99" width="106" height="106" rx="6" class="art-accent" />
          <path d="m96 128-15 24 15 24m29-48 15 24-15 24m-12-51-8 54" class="art-dark-line" />
        </g>
        <g class="art-piece">
          <rect x="181" y="99" width="61" height="45" rx="6" class="art-wire" />
          <path d="M193 116H230M193 127H219" class="art-line" />
        </g>
        <g class="art-piece">
          <rect x="181" y="160" width="61" height="45" rx="6" class="art-wire" />
          <path d="m196 183 10 9 20-21" class="art-yellow-line" />
        </g>
      </template>
      <template v-else-if="variant === 'approach'">
        <g class="art-piece">
          <path
            d="M56 67H221Q244 67 244 90V122Q244 145 221 145H79Q56 145 56 168V200Q56 223 79 223H244"
            class="art-yellow-line"
          />
          <path d="m233 212 12 11-12 11" class="art-yellow-line" />
        </g>
        <g
          v-for="(point, index) in [
            [56, 67],
            [150, 67],
            [244, 100],
            [150, 145],
            [56, 190],
            [150, 223],
          ]"
          :key="index"
          class="art-piece"
        >
          <circle :cx="point[0]" :cy="point[1]" r="17" class="art-surface" />
          <circle :cx="point[0]" :cy="point[1]" r="5" class="art-accent" />
        </g>
      </template>
      <template v-else-if="variant === 'about'">
        <g class="art-piece">
          <path d="m150 151 112 57-112 57-112-57Z" class="art-wire" />
          <path d="M150 208V265" class="art-line" />
        </g>
        <g class="art-piece">
          <path d="m150 108 112 57-112 57-112-57Z" class="art-surface" />
          <path d="M150 165V222" class="art-line" />
        </g>
        <g class="art-piece">
          <path d="m150 59 112 57-112 57-112-57Z" class="art-accent" />
          <path d="m116 116 34-18 34 18-34 18Z" class="art-dark-line" />
        </g>
        <g class="art-piece">
          <path d="M150 31V43M27 116H15M285 116H273" class="art-yellow-line" />
        </g>
      </template>
      <template v-else>
        <g class="art-piece">
          <path
            d="M80 119H244Q258 119 258 133V218Q258 232 244 232H216L190 253V232H80Q66 232 66 218V133Q66 119 80 119Z"
            class="art-wire"
          />
          <path d="M95 184H226M95 201H181" class="art-line" />
        </g>
        <g class="art-piece">
          <path
            d="M44 49H212Q226 49 226 63V142Q226 156 212 156H98L69 180V156H44Q30 156 30 142V63Q30 49 44 49Z"
            class="art-accent"
          />
          <path d="M57 80H196M57 99H172M57 118H132" class="art-dark-line" />
        </g>
        <g class="art-piece">
          <circle cx="245" cy="57" r="20" class="art-surface" />
          <path d="m235 57 7 7 13-14" class="art-yellow-line" />
        </g>
      </template>
    </svg>
    <span>{{ captions[variant] }}</span>
  </div>
</template>
