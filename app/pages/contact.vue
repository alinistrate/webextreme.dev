<script setup lang="ts">
usePageSeo(
  'Contact',
  'Tell Web Extreme Dev about your website, ecommerce or software project. Contact contact@webextreme.dev or send an enquiry.',
  '/contact/',
);
usePageMotion();
</script>

<template>
  <main id="main" ref="page" tabindex="-1">
    <section class="page-hero dark">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">/</span
          ><span aria-current="page">Contact</span>
        </nav>
        <div class="page-hero-grid">
          <div>
            <p class="eyebrow yellow reveal">Contact</p>
            <h1 tabindex="-1" class="page-title reveal">Let us build<br />what comes next.</h1>
            <p class="page-lead reveal">
              Tell us about the idea, the challenge or the next thing you want to improve.
            </p>
          </div>
          <div class="page-art reveal" aria-hidden="true">
            <div class="page-grid-art"></div>
            <svg viewBox="0 0 100 100">
              <path d="M0 0H28L50 28L72 0H100L60 46H40Z" />
              <path d="M40 54H60L100 100H72L50 72L28 100H0Z" /></svg
            ><span>DESIGN / BUILD / CONNECT</span>
          </div>
        </div>
      </div>
    </section>
    <section class="section contact-page-form">
      <div class="container contact-page-grid">
        <div class="contact-aside reveal">
          <p class="eyebrow">Start a conversation</p>
          <h2 tabindex="-1">A few details.<br />A useful starting point.</h2>
          <p>
            Share the goal, the context and any important constraints. We can clarify the scope and
            the next steps from there.
          </p>
          <a class="email-link" href="mailto:contact@webextreme.dev">contact@webextreme.dev</a>
          <p class="location-copy">Based in Sibiu, Romania.</p>
          <div class="contact-next">
            <h3>What happens next</h3>
            <ol>
              <li>We review the project context.</li>
              <li>We clarify the important questions.</li>
              <li>We agree the proposed next steps.</li>
            </ol>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
    <section class="section soft-section">
      <div class="container decision-grid">
        <h2 class="reveal" tabindex="-1">Still exploring<br />the possibilities?</h2>
        <div class="reveal">
          <p>
            Explore the capabilities or see how a project moves from the first conversation to
            launch.
          </p>
          <div class="inline-links">
            <NuxtLink class="text-link" to="/services/"
              >Explore services <span aria-hidden="true">↗</span></NuxtLink
            ><NuxtLink class="text-link" to="/approach/"
              >Our approach <span aria-hidden="true">↗</span></NuxtLink
            >
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
