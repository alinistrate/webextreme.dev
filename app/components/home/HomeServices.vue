<template>
  <section class="services section" id="services">
    <div class="container">
      <p class="eyebrow">01 / Services</p>
      <div class="section-heading reveal">
        <h2 tabindex="-1">From first idea to a connected digital experience.</h2>
        <p>Design, build and connect.<br />Choose the capabilities your project needs.</p>
      </div>
      <div class="service-story">
        <div class="service-rail" aria-hidden="true"><span></span></div>
        <ol class="service-cards" role="list">
          <li class="service-card reveal">
            <span class="service-node" aria-hidden="true"></span
            ><NuxtLink to="/services/#design"
              ><span class="eyebrow icon-number"><AppIcon name="design" />01</span>
              <div>
                <h3>Design &amp; UI/UX</h3>
                <p>Interfaces with a clear purpose.</p>
                <p class="service-detail">Journeys, wireframes and visual systems.</p>
              </div>
              <AppIcon class="service-arrow" name="arrow"
            /></NuxtLink>
          </li>
          <li class="service-card reveal">
            <span class="service-node" aria-hidden="true"></span
            ><NuxtLink to="/services/#web-development"
              ><span class="eyebrow icon-number"><AppIcon name="web-development" />02</span>
              <div>
                <h3>Web Development</h3>
                <p>Websites built around your goals.</p>
                <p class="service-detail">Responsive sites and CMS integration.</p>
              </div>
              <AppIcon class="service-arrow" name="arrow"
            /></NuxtLink>
          </li>
          <li class="service-card reveal">
            <span class="service-node" aria-hidden="true"></span
            ><NuxtLink to="/services/#automation"
              ><span class="eyebrow icon-number"><AppIcon name="automation" />03</span>
              <div>
                <h3>AI &amp; Workflow Automation</h3>
                <p>Less repetition. More useful work.</p>
                <p class="service-detail">Workflows, AI assistance and integrations.</p>
              </div>
              <AppIcon class="service-arrow" name="arrow"
            /></NuxtLink>
          </li>
          <li class="service-card reveal">
            <span class="service-node" aria-hidden="true"></span
            ><NuxtLink to="/services/#brand"
              ><span class="eyebrow icon-number"><AppIcon name="brand" />04</span>
              <div>
                <h3>Brand &amp; Creative Direction</h3>
                <p>An identity that holds together.</p>
                <p class="service-detail">Identity, typography and brand guidelines.</p>
              </div>
              <AppIcon class="service-arrow" name="arrow"
            /></NuxtLink>
          </li>
          <li class="service-card reveal">
            <span class="service-node" aria-hidden="true"></span
            ><NuxtLink to="/services/#landing-pages"
              ><span class="eyebrow icon-number"><AppIcon name="landing-pages" />05</span>
              <div>
                <h3>Landing Pages</h3>
                <p>One clear page. One focused goal.</p>
                <p class="service-detail">Campaigns, product launches and lead capture.</p>
              </div>
              <AppIcon class="service-arrow" name="arrow"
            /></NuxtLink>
          </li>
          <li class="service-card reveal">
            <span class="service-node" aria-hidden="true"></span
            ><NuxtLink to="/services/#ecommerce"
              ><span class="eyebrow icon-number"><AppIcon name="ecommerce" />06</span>
              <div>
                <h3>Ecommerce Development</h3>
                <p>Commerce designed around the customer.</p>
                <p class="service-detail">Storefronts, product journeys and checkout.</p>
              </div>
              <AppIcon class="service-arrow" name="arrow"
            /></NuxtLink>
          </li>
          <li class="service-card reveal">
            <span class="service-node" aria-hidden="true"></span
            ><NuxtLink to="/services/#software"
              ><span class="eyebrow icon-number"><AppIcon name="software" />07</span>
              <div>
                <h3>Web Apps &amp; Custom Software</h3>
                <p>Software shaped around your business.</p>
                <p class="service-detail">Portals, business tools and connected systems.</p>
              </div>
              <AppIcon class="service-arrow" name="arrow"
            /></NuxtLink>
          </li>
        </ol>
      </div>
      <div class="services-bottom">
        <p class="eyebrow">Seven capabilities. One connected approach.</p>
        <NuxtLink class="text-link" to="/contact/"
          >Discuss your project <AppIcon name="arrow"
        /></NuxtLink>
      </div>
    </div>
  </section>
</template>
