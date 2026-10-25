<script setup lang="ts">
const id = useId();
const active = ref(0);
const questions = [
  {
    question: 'What can you help me build?',
    answer:
      'Web development, ecommerce, design, custom web applications and technical consulting. The right starting point depends on the problem you want to solve.',
  },
  {
    question: 'Can we start with a smaller scope?',
    answer:
      'Yes. Start with the essentials, agree on the scope, then plan the next steps around what is useful.',
  },
  {
    question: 'How is a project estimated?',
    answer:
      'After a conversation about the goals, features and constraints, you receive a scoped estimate.',
  },
  {
    question: 'Who will I work with?',
    answer:
      'We agree on the responsibilities and communication for your project before work begins.',
  },
];
</script>

<template>
  <div class="faq-list">
    <div v-for="(item, index) in questions" :key="item.question" class="faq-item reveal">
      <h3>
        <button
          type="button"
          :aria-expanded="active === index"
          :aria-controls="id + '-' + index"
          @click="active = active === index ? -1 : index"
        >
          {{ item.question }}<AppIcon :name="active === index ? 'minus' : 'plus'" />
        </button>
      </h3>
      <div :id="id + '-' + index" class="faq-panel" :hidden="active !== index">
        <p>{{ item.answer }}</p>
      </div>
    </div>
  </div>
</template>
