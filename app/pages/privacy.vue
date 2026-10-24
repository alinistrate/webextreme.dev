<script setup lang="ts">
import { company } from '~/content/company';

usePageSeo(
  'Privacy Policy',
  'How WEB EXTREME DEV SRL handles enquiries, website security, optional analytics and your data protection rights.',
  '/privacy/',
);
</script>
<template>
  <main id="main" tabindex="-1">
    <section class="page-hero dark">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">/</span
          ><span>Privacy Policy</span>
        </nav>
        <p class="eyebrow yellow">Web Extreme Dev</p>
        <h1 class="page-title">Privacy Policy</h1>
        <p class="policy-meta">Last updated: 24 October 2026</p>
      </div>
    </section>
    <section class="section">
      <div class="container prose">
        <h2>Who is responsible for your data?</h2>
        <p>
          <strong>{{ company.legalName }}</strong
          ><br />CUI {{ company.cui }}<br />{{ company.address }}<br /><a
            :href="'mailto:' + company.email"
            >{{ company.email }}</a
          >
        </p>
        <p>This policy covers webextreme.dev and the contact form operated by Web Extreme Dev.</p>
        <h2>Information we process</h2>
        <p>
          If you send an enquiry, we receive your name, email address, optional service selection
          and the project details you provide. Please do not include passwords or sensitive personal
          information.
        </p>
        <p>
          Our hosting and security providers process technical information such as IP addresses,
          browser details and security signals to deliver the website and prevent abuse.
        </p>
        <h2>Why we use it</h2>
        <ul>
          <li>To respond to enquiries and take steps you request before entering a contract.</li>
          <li>
            To manage business correspondence and protect the website against spam and abuse, based
            on our legitimate interests.
          </li>
          <li>With your consent, to understand website usage through Google Analytics.</li>
          <li>Where required, to meet legal obligations and handle or defend legal claims.</li>
        </ul>
        <p>
          Providing contact details is voluntary, but without an email address and enough
          information we may be unable to respond.
        </p>
        <h2>Providers and international processing</h2>
        <p>
          We use Cloudflare for hosting, DNS, email forwarding and Turnstile spam protection;
          Mailjet for transactional email; and Google for our business email and, if you allow it,
          Google Analytics delivered through Google Tag Manager.
        </p>
        <p>
          These providers may process data in countries outside the European Economic Area. Where
          international transfers require safeguards, the applicable provider agreements and
          transfer mechanisms apply. You can contact us for information about the safeguards
          relevant to your enquiry.
        </p>
        <p>
          Read the providers' information:
          <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare Privacy Policy</a>,
          <a href="https://www.cloudflare.com/turnstile-privacy-policy/">Turnstile Privacy Policy</a
          >, <a href="https://www.mailjet.com/legal/privacy-policy/">Mailjet Privacy Policy</a> and
          <a href="https://policies.google.com/privacy">Google Privacy Policy</a>.
        </p>
        <h2>How long information is kept</h2>
        <p>
          We keep enquiry emails for as long as needed to respond, manage related follow-up and,
          where applicable, comply with legal obligations or handle legal claims. When the purpose
          no longer applies, the correspondence should be deleted. Provider backups and security
          records follow their applicable retention arrangements.
        </p>
        <p>
          Our cookie choice is remembered for 180 days. Optional analytics storage and data
          retention are described in our <NuxtLink to="/cookies/">Cookie Policy</NuxtLink>.
        </p>
        <h2>Your rights</h2>
        <p>
          Depending on the circumstances, you can request access, correction, deletion, restriction
          or portability of your personal data, and object to processing based on legitimate
          interests. You can withdraw analytics consent using Cookie settings in the footer.
          Withdrawal does not affect processing that was lawful before withdrawal.
        </p>
        <p>
          To exercise your rights, email <a :href="'mailto:' + company.email">{{ company.email }}</a
          >. You can also complain to the Romanian supervisory authority,
          <a href="https://www.dataprotection.ro/">ANSPDCP</a>, or your competent data protection
          authority.
        </p>
        <h2>Automated decisions and updates</h2>
        <p>
          We do not use contact enquiries to make automated decisions with legal or similarly
          significant effects. We may update this policy when the website or processing changes. The
          date at the top identifies the current version.
        </p>
      </div>
    </section>
  </main>
</template>
