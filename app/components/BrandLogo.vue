<script setup lang="ts">
import { devGlyphs, symbolPaths, wordmarkGlyphs } from '~/content/brand';
</script>

<template>
  <svg aria-hidden="true" viewBox="0 0 340 80">
    <g class="header-symbol">
      <g fill="#FFD426" transform="translate(0 8) scale(.64)">
        <path class="x-upper" :d="symbolPaths[0]" />
        <path class="x-lower" :d="symbolPaths[1]" />
      </g>
    </g>
    <g class="header-wordmark-enter" fill-rule="evenodd">
      <g transform="translate(82 16) scale(.9)">
        <g class="wordmark">
          <path
            v-for="glyph in wordmarkGlyphs"
            :key="glyph.id"
            :d="glyph.path"
            :transform="'translate(' + glyph.x + ' 0)'"
          />
        </g>
      </g>
      <g transform="translate(82 56) scale(.36)">
        <g class="devmark">
          <path
            v-for="glyph in devGlyphs"
            :key="glyph.id"
            :d="glyph.path"
            :transform="'translate(' + glyph.x + ' 0)'"
          />
        </g>
      </g>
    </g>
  </svg>
</template>
