<template>
  <div class="services-journey">
    <div class="journey-track" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M50 0 C50 5 56 9 50 14.3 S44 23 50 28.6 S56 37 50 42.9 S44 52 50 57.2 S56 66 50 71.5 S44 80 50 85.8 S56 95 50 100"
        />
      </svg>
      <div class="journey-orb"><span></span></div>
    </div>
    <slot />
  </div>
</template>
