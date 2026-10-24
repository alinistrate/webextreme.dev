<script setup lang="ts">
import { company } from '~/content/company';
const { settingsOpen } = useConsent();
usePageSeo(
  'Cookie Policy',
  'Essential security technology, optional Google Analytics cookies and how to change your cookie choices.',
  '/cookies/',
);
usePageMotion();
</script>
<template>
  <main id="main" ref="page" tabindex="-1">
    <section class="page-hero dark">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">/</span
          ><span>Cookie Policy</span>
        </nav>
        <p class="eyebrow yellow">Web Extreme Dev</p>
        <h1 class="page-title">Cookie Policy</h1>
        <p class="policy-meta">Last updated: 24 October 2026</p>
      </div>
    </section>
    <section class="section">
      <div class="container prose">
        <h2>Who operates the website?</h2>
        <p>
          <strong>{{ company.legalName }}</strong
          ><br />CUI {{ company.cui }}<br />{{ company.address }}<br /><a
            :href="'mailto:' + company.email"
            >{{ company.email }}</a
          >
        </p>
        <h2>Your choices</h2>
        <p>
          Analytics is optional. We do not load Google Tag Manager or Google Analytics before you
          accept analytics cookies. You can reject optional analytics and still browse the site and
          send an enquiry.
        </p>
        <p>
          <button class="cookie-button" type="button" @click="settingsOpen = true">
            Open cookie settings
          </button>
        </p>
        <h2>Essential security and preferences</h2>
        <p>
          Cloudflare delivers and protects the site. Turnstile checks contact form submissions for
          automated abuse. Its security verification is separate from analytics consent and is
          loaded when the form approaches the screen or you interact with it.
        </p>
        <p>
          We use the first-party <code>wed_consent</code> cookie to remember your analytics choice
          for 180 days. It stores the consent version and a yes/no analytics choice, not your name,
          email or project details.
        </p>
        <p>
          The local storage preference <code>wed_theme</code> remembers an explicit light or dark
          appearance choice until you change it or clear browser storage. It is a first-party
          interface preference and does not identify you or load analytics.
        </p>
        <h2>Optional analytics</h2>
        <p>
          If you accept analytics, Google Tag Manager loads the Google Analytics configuration.
          Analytics measures page views and general interactions. A successful contact submission
          can generate a lead event; names, email addresses and message text are not sent in that
          event.
        </p>
        <p>
          Google Analytics uses first-party cookies <code>_ga</code> and
          <code>_ga_S462Q33299</code> to distinguish browsers and sessions. Their configured
          lifetime is up to two years and can be renewed during use. They are not enabled before
          consent. No advertising or remarketing tags are part of this implementation.
        </p>
        <h2>Cookie inventory</h2>
        <div class="table-scroll">
          <table class="cookie-table">
            <caption>
              Cookies and similar technologies used by this website
            </caption>
            <thead>
              <tr>
                <th scope="col">Name / service</th>
                <th scope="col">Purpose</th>
                <th scope="col">When active</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">wed_consent</th>
                <td>Remember cookie choice for 180 days</td>
                <td>After saving a choice</td>
              </tr>
              <tr>
                <th scope="row">wed_theme (local storage)</th>
                <td>Remember the selected color theme until changed or cleared</td>
                <td>Only after an appearance choice</td>
              </tr>
              <tr>
                <th scope="row">Cloudflare / Turnstile</th>
                <td>Essential security and spam verification</td>
                <td>When needed for delivery and the contact form</td>
              </tr>
              <tr>
                <th scope="row">_ga, _ga_S462Q33299</th>
                <td>Optional Google Analytics measurement; up to two years</td>
                <td>Only after accepting analytics</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          GA4 user-level and event-level data retention is set to two months, with automatic renewal
          on new activity disabled. Standard aggregated reports can have a different retention
          lifecycle. Cookie lifetime and analytics data retention are separate settings.
        </p>
        <h2>Changing your choice</h2>
        <p>
          Use Cookie settings in the footer at any time. Rejecting analytics after previously
          accepting it stops the integration on the next page load and removes analytics cookies
          accessible to this site. You can also clear or block cookies in your browser. Blocking
          essential technology may affect the security check.
        </p>
        <h2>More information</h2>
        <p>
          Read our <NuxtLink to="/privacy/">Privacy Policy</NuxtLink>,
          <a href="https://policies.google.com/technologies/cookies">Google's cookie information</a>
          and
          <a href="https://www.cloudflare.com/turnstile-privacy-policy/"
            >Cloudflare's Turnstile Privacy Policy</a
          >. If the providers or tracking setup change, this policy and the consent choices must be
          reviewed.
        </p>
      </div>
    </section>
  </main>
</template>
