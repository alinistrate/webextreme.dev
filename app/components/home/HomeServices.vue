<script setup lang="ts">
const { tr } = useCopy();
</script>
<template>
  <section class="services section" id="services">
    <div class="container">
      <p class="eyebrow">{{ tr('01 / Services') }}</p>
      <div class="section-heading reveal">
        <h2 tabindex="-1">{{ tr('From first idea to a connected digital experience.') }}</h2>
        <p>
          {{ tr('Design, build and connect.') }}<br />{{
            tr('Choose the capabilities your project needs.')
          }}
        </p>
      </div>
      <div class="service-story">
        <div class="service-rail" aria-hidden="true"><span></span></div>
        <ol class="service-cards" role="list">
          <li class="service-card reveal">
            <span class="service-node" aria-hidden="true"></span
            ><NuxtLinkLocale to="/services/#design"
              ><span class="eyebrow icon-number"><AppIcon name="design" />01</span>
              <div>
                <h3>{{ tr('Design & UI/UX') }}</h3>
                <p>{{ tr('Interfaces with a clear purpose.') }}</p>
                <p class="service-detail">{{ tr('Journeys, wireframes and visual systems.') }}</p>
              </div>
              <AppIcon class="service-arrow" name="arrow"
            /></NuxtLinkLocale>
          </li>
          <li class="service-card reveal">
            <span class="service-node" aria-hidden="true"></span
            ><NuxtLinkLocale to="/services/#web-development"
              ><span class="eyebrow icon-number"><AppIcon name="web-development" />02</span>
              <div>
                <h3>{{ tr('Web Development') }}</h3>
                <p>{{ tr('Websites built around your goals.') }}</p>
                <p class="service-detail">{{ tr('Responsive sites and CMS integration.') }}</p>
              </div>
              <AppIcon class="service-arrow" name="arrow"
            /></NuxtLinkLocale>
          </li>
          <li class="service-card reveal">
            <span class="service-node" aria-hidden="true"></span
            ><NuxtLinkLocale to="/services/#automation"
              ><span class="eyebrow icon-number"><AppIcon name="automation" />03</span>
              <div>
                <h3>{{ tr('AI & Workflow Automation') }}</h3>
                <p>{{ tr('Less repetition. More useful work.') }}</p>
                <p class="service-detail">{{ tr('Workflows, AI assistance and integrations.') }}</p>
              </div>
              <AppIcon class="service-arrow" name="arrow"
            /></NuxtLinkLocale>
          </li>
          <li class="service-card reveal">
            <span class="service-node" aria-hidden="true"></span
            ><NuxtLinkLocale to="/services/#brand"
              ><span class="eyebrow icon-number"><AppIcon name="brand" />04</span>
              <div>
                <h3>{{ tr('Brand & Creative Direction') }}</h3>
                <p>{{ tr('An identity that holds together.') }}</p>
                <p class="service-detail">{{ tr('Identity, typography and brand guidelines.') }}</p>
              </div>
              <AppIcon class="service-arrow" name="arrow"
            /></NuxtLinkLocale>
          </li>
          <li class="service-card reveal">
            <span class="service-node" aria-hidden="true"></span
            ><NuxtLinkLocale to="/services/#landing-pages"
              ><span class="eyebrow icon-number"><AppIcon name="landing-pages" />05</span>
              <div>
                <h3>{{ tr('Landing Pages') }}</h3>
                <p>{{ tr('One clear page. One focused goal.') }}</p>
                <p class="service-detail">
                  {{ tr('Campaigns, product launches and lead capture.') }}
                </p>
              </div>
              <AppIcon class="service-arrow" name="arrow"
            /></NuxtLinkLocale>
          </li>
          <li class="service-card reveal">
            <span class="service-node" aria-hidden="true"></span
            ><NuxtLinkLocale to="/services/#ecommerce"
              ><span class="eyebrow icon-number"><AppIcon name="ecommerce" />06</span>
              <div>
                <h3>{{ tr('Ecommerce Development') }}</h3>
                <p>{{ tr('Commerce designed around the customer.') }}</p>
                <p class="service-detail">
                  {{ tr('Storefronts, product journeys and checkout.') }}
                </p>
              </div>
              <AppIcon class="service-arrow" name="arrow"
            /></NuxtLinkLocale>
          </li>
          <li class="service-card reveal">
            <span class="service-node" aria-hidden="true"></span
            ><NuxtLinkLocale to="/services/#software"
              ><span class="eyebrow icon-number"><AppIcon name="software" />07</span>
              <div>
                <h3>{{ tr('Web Application Development') }}</h3>
                <p>{{ tr('Web applications shaped around your business.') }}</p>
                <p class="service-detail">
                  {{ tr('Portals, business tools and connected systems.') }}
                </p>
              </div>
              <AppIcon class="service-arrow" name="arrow"
            /></NuxtLinkLocale>
          </li>
          <li class="service-card reveal">
            <span class="service-node" aria-hidden="true"></span
            ><NuxtLinkLocale to="/services/#consulting">
              <span class="eyebrow icon-number"><AppIcon name="consulting" />08</span>
              <div>
                <h3>{{ tr('Web & Technical Consulting') }}</h3>
                <p>{{ tr('A clear direction before the next build.') }}</p>
                <p class="service-detail">
                  {{ tr('Audits, technical decisions and development planning.') }}
                </p>
              </div>
              <AppIcon class="service-arrow" name="arrow" />
            </NuxtLinkLocale>
          </li>
          <li class="service-card reveal">
            <span class="service-node" aria-hidden="true"></span
            ><NuxtLinkLocale to="/services/#hosting">
              <span class="eyebrow icon-number"><AppIcon name="hosting" />09</span>
              <div>
                <h3>{{ tr('Custom Web Hosting') }}</h3>
                <p>{{ tr('Hosting tailored to each client.') }}</p>
                <p class="service-detail">
                  {{ tr('Configuration and support agreed around your project.') }}
                </p>
              </div>
              <AppIcon class="service-arrow" name="arrow" />
            </NuxtLinkLocale>
          </li>
        </ol>
      </div>
      <div class="services-bottom">
        <p class="eyebrow">{{ tr('Nine capabilities. One connected approach.') }}</p>
        <NuxtLinkLocale class="text-link" to="/contact/"
          >{{ tr('Discuss your project') }} <AppIcon name="arrow"
        /></NuxtLinkLocale>
      </div>
    </div>
  </section>
</template>
