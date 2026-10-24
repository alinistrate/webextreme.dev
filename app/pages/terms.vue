<script setup lang="ts">
import { company } from '~/content/company';

usePageSeo(
  'Terms & Conditions',
  'Website terms, company details and the basis for discussing a project with Web Extreme Dev.',
  '/terms/',
);
usePageMotion();
</script>
<template>
  <main id="main" ref="page" tabindex="-1">
    <section class="page-hero dark">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">/</span
          ><span>Terms & Conditions</span>
        </nav>
        <p class="eyebrow yellow">Web Extreme Dev</p>
        <h1 class="page-title">Terms & Conditions</h1>
        <p class="policy-meta">Last updated: 24 October 2026</p>
      </div>
    </section>
    <section class="section">
      <div class="container prose">
        <h2>Website operator</h2>
        <p>
          <strong>{{ company.legalName }}</strong
          ><br />CUI {{ company.cui }}<br />{{ company.address }}<br /><a
            :href="'mailto:' + company.email"
            >{{ company.email }}</a
          >
        </p>
        <h2>Using this website</h2>
        <p>
          These terms apply to your use of webextreme.dev. Please use the website lawfully and do
          not attempt to disrupt it, bypass security controls, introduce malicious code or submit
          spam.
        </p>
        <p>
          The website presents our design, web development, ecommerce, automation and software
          services. Its content is general information and does not by itself create a contract for
          services.
        </p>
        <h2>Enquiries and project agreements</h2>
        <p>
          Sending an enquiry does not place an order or commit either party to a project. Scope,
          deliverables, estimates, fees, timing, responsibilities, intellectual property and support
          are agreed separately in writing before work starts.
        </p>
        <p>
          Where a separate signed agreement applies, it governs that project. No fixed price,
          completion date, maintenance arrangement or service level should be assumed from a general
          website description.
        </p>
        <h2>Information and availability</h2>
        <p>
          We aim to keep the information accurate and the website available, but content may change
          and access may be interrupted by maintenance, technical problems or third-party services.
          Please contact us if you find an error or need confirmation of a particular capability.
        </p>
        <h2>Intellectual property</h2>
        <p>
          The Web Extreme Dev identity, original website content and original design materials are
          protected by applicable intellectual property laws. Third-party software, fonts and other
          licensed materials remain subject to their own licences. Permission to view the website
          does not transfer ownership of those materials.
        </p>
        <h2>Links and third-party services</h2>
        <p>
          External links are provided for relevant information. Their operators control their own
          websites and terms. Our use of Cloudflare, Mailjet and Google services is explained in the
          <NuxtLink to="/privacy/">Privacy Policy</NuxtLink> and
          <NuxtLink to="/cookies/">Cookie Policy</NuxtLink>.
        </p>
        <h2>Responsibility and applicable law</h2>
        <p>
          Nothing in these terms excludes rights or liability that cannot lawfully be excluded.
          These website terms are governed by Romanian law, subject to any mandatory rights and
          protections that apply to you.
        </p>
        <h2>Contact and changes</h2>
        <p>
          Questions about these terms can be sent to
          <a :href="'mailto:' + company.email">{{ company.email }}</a
          >. We may update these website terms; the date above identifies the current version.
        </p>
      </div>
    </section>
  </main>
</template>
