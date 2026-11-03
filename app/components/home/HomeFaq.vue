<script setup lang="ts">
const { tr } = useCopy();
</script>
<template>
  <section class="faq section" id="faq">
    <div class="container faq-grid">
      <div class="reveal">
        <p class="eyebrow">{{ tr('04 / Before we start') }}</p>
        <h2>{{ tr('Good questions.') }}<br />{{ tr('Straight answers.') }}</h2>
      </div>
      <FaqAccordion />
    </div>
  </section>
</template>
