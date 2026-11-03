<script setup lang="ts">
const { tr } = useCopy();
usePageSeo(
  'Contact',
  'Tell Web Extreme Dev about your website, ecommerce or web application project. Contact contact@webextreme.dev or send an enquiry.',
  '/contact/',
);
usePageMotion();
</script>

<template>
  <main id="main" ref="page" tabindex="-1">
    <section class="page-hero dark">
      <div class="container">
        <nav class="breadcrumb" :aria-label="tr('Breadcrumb')">
          <NuxtLinkLocale to="/">{{ tr('Home') }}</NuxtLinkLocale
          ><span aria-hidden="true">/</span><span aria-current="page">{{ tr('Contact') }}</span>
        </nav>
        <div class="page-hero-grid">
          <div>
            <p class="eyebrow yellow reveal">{{ tr('Contact') }}</p>
            <h1 tabindex="-1" class="page-title reveal">
              <span class="page-title-line">{{ tr('Let us build') }}</span>
              <span class="page-title-line">{{ tr('what comes next.') }}</span>
            </h1>
            <p class="page-lead reveal">
              {{
                tr('Tell us about the idea, the challenge or the next thing you want to improve.')
              }}
            </p>
          </div>
          <PageHeroArt variant="contact" />
        </div>
      </div>
    </section>
    <section class="section contact-page-form">
      <div class="container contact-page-grid">
        <div class="contact-aside reveal">
          <p class="eyebrow icon-label">
            <AppIcon name="conversation" framed />{{ tr('Start a conversation') }}
          </p>
          <h2 tabindex="-1">
            {{ tr('A few details.') }}<br />{{ tr('A useful starting point.') }}
          </h2>
          <p>
            {{
              tr(
                'Share the goal, the context and any important constraints. We can clarify the scope and the next steps from there.',
              )
            }}
          </p>
          <a class="email-link" href="mailto:contact@webextreme.dev"
            ><AppIcon name="email" />contact@webextreme.dev</a
          >
          <div class="contact-next">
            <h3>{{ tr('What happens next') }}</h3>
            <ol>
              <li>{{ tr('We review the project context.') }}</li>
              <li>{{ tr('We clarify the important questions.') }}</li>
              <li>{{ tr('We agree the proposed next steps.') }}</li>
            </ol>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
    <section class="section soft-section">
      <div class="container decision-grid">
        <h2 class="reveal" tabindex="-1">
          {{ tr('Still exploring') }}<br />{{ tr('the possibilities?') }}
        </h2>
        <div class="reveal">
          <p>
            {{
              tr(
                'Explore the capabilities or see how a project moves from the first conversation to launch.',
              )
            }}
          </p>
          <div class="inline-links">
            <NuxtLinkLocale class="text-link" to="/services/"
              >{{ tr('Explore services') }} <AppIcon name="arrow" /></NuxtLinkLocale
            ><NuxtLinkLocale class="text-link" to="/approach/"
              >{{ tr('Our approach') }} <AppIcon name="arrow"
            /></NuxtLinkLocale>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
