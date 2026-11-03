<script setup lang="ts">
const { tr } = useCopy();
</script>
<template>
  <section class="contact section" id="contact">
    <div class="container contact-grid">
      <div class="reveal">
        <p class="eyebrow">{{ tr('05 / Get in touch') }}</p>
        <h2 tabindex="-1">{{ tr('Let us build') }}<br />{{ tr('what comes next.') }}</h2>
        <p class="contact-intro">
          {{ tr('Tell us about the idea, the challenge or the next thing you want to improve.') }}
        </p>
        <a class="email-link" href="mailto:contact@webextreme.dev"
          ><AppIcon name="email" />contact@webextreme.dev</a
        >
      </div>
      <ContactForm />
    </div>
  </section>
</template>
