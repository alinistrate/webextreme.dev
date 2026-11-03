<script setup lang="ts">
const { tr } = useCopy();
usePageSeo(
  'Accessibility',
  'Accessibility features and how to report a problem on the Web Extreme Dev website.',
  '/accessibility/',
);
usePageMotion();
</script>

<template>
  <main id="main" ref="page" tabindex="-1">
    <section class="page-hero dark">
      <div class="container">
        <nav class="breadcrumb" :aria-label="tr('Breadcrumb')">
          <NuxtLinkLocale to="/">{{ tr('Home') }}</NuxtLinkLocale
          ><span aria-hidden="true">/</span><span>{{ tr('Accessibility') }}</span>
        </nav>
        <p class="eyebrow yellow">Web Extreme Dev</p>
        <h1 class="page-title">{{ tr('Accessibility') }}</h1>
      </div>
    </section>
    <section class="section">
      <div class="container prose">
        <h2>{{ tr('Our accessibility target') }}</h2>
        <p>
          {{
            tr(
              'We build towards WCAG 2.2 Level AA. This is a technical target, not a claim of legal certification.',
            )
          }}
        </p>
        <h2>{{ tr('Using the website') }}</h2>
        <p>
          {{
            tr(
              'You can navigate using a keyboard, skip directly to the main content and enlarge text. Entrance animations use short transitions. Scroll scenes follow your scrolling. The rotating homepage headline has a pause button and stops while it is offscreen or the browser tab is hidden. Content remains available when JavaScript is disabled.',
            )
          }}
        </p>
        <h2>{{ tr('Report a problem') }}</h2>
        <p>
          {{ tr('If something prevents you from using the website, email') }}
          <a href="mailto:contact@webextreme.dev">contact@webextreme.dev</a
          >{{
            tr(
              '. Please include the page, what you were trying to do, and your browser or assistive technology if you can.',
            )
          }}
        </p>
      </div>
    </section>
  </main>
</template>
