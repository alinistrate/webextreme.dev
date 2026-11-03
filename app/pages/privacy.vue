<script setup lang="ts">
import { company } from '~/content/company';
const { tr } = useCopy();

usePageSeo(
  'Privacy Policy',
  'How WEB EXTREME DEV SRL handles enquiries, website security, optional analytics and your data protection rights.',
  '/privacy/',
);
usePageMotion();
</script>
<template>
  <main id="main" ref="page" tabindex="-1">
    <section class="page-hero dark">
      <div class="container">
        <nav class="breadcrumb" :aria-label="tr('Breadcrumb')">
          <NuxtLinkLocale to="/">{{ tr('Home') }}</NuxtLinkLocale
          ><span aria-hidden="true">/</span><span>{{ tr('Privacy Policy') }}</span>
        </nav>
        <p class="eyebrow yellow">Web Extreme Dev</p>
        <h1 class="page-title">{{ tr('Privacy Policy') }}</h1>
        <p class="policy-meta">{{ tr('Last updated: 24 October 2026') }}</p>
      </div>
    </section>
    <section class="section">
      <div class="container prose">
        <h2>{{ tr('Who is responsible for your data?') }}</h2>
        <p>
          <strong>{{ tr(company.legalName) }}</strong
          ><br />{{ tr('CUI') }} {{ tr(company.cui) }}<br />{{ tr(company.address) }}<br /><a
            :href="'mailto:' + company.email"
            >{{ tr(company.email) }}</a
          >
        </p>
        <p>
          {{
            tr(
              'This policy covers webextreme.dev and the contact form operated by Web Extreme Dev.',
            )
          }}
        </p>
        <h2>{{ tr('Information we process') }}</h2>
        <p>
          {{
            tr(
              'If you send an enquiry, we receive your name, email address, optional service selection and the project details you provide. Please do not include passwords or sensitive personal information.',
            )
          }}
        </p>
        <p>
          {{
            tr(
              'Our hosting and security providers process technical information such as IP addresses, browser details and security signals to deliver the website and prevent abuse.',
            )
          }}
        </p>
        <h2>{{ tr('Why we use it') }}</h2>
        <ul>
          <li>
            {{
              tr('To respond to enquiries and take steps you request before entering a contract.')
            }}
          </li>
          <li>
            {{
              tr(
                'To manage business correspondence and protect the website against spam and abuse, based on our legitimate interests.',
              )
            }}
          </li>
          <li>
            {{ tr('With your consent, to understand website usage through Google Analytics.') }}
          </li>
          <li>
            {{ tr('Where required, to meet legal obligations and handle or defend legal claims.') }}
          </li>
        </ul>
        <p>
          {{
            tr(
              'Providing contact details is voluntary, but without an email address and enough information we may be unable to respond.',
            )
          }}
        </p>
        <h2>{{ tr('Providers and international processing') }}</h2>
        <p>
          {{
            tr(
              'We use Cloudflare for hosting, DNS, email forwarding and Turnstile spam protection; Mailjet for transactional email; and Google for our business email and, if you allow it, Google Analytics delivered through Google Tag Manager.',
            )
          }}
        </p>
        <p>
          {{
            tr(
              'These providers may process data in countries outside the European Economic Area. Where international transfers require safeguards, the applicable provider agreements and transfer mechanisms apply. You can contact us for information about the safeguards relevant to your enquiry.',
            )
          }}
        </p>
        <p>
          {{ tr("Read the providers' information:") }}
          <a href="https://www.cloudflare.com/privacypolicy/">{{
            tr('Cloudflare Privacy Policy')
          }}</a
          >,
          <a href="https://www.cloudflare.com/turnstile-privacy-policy/">{{
            tr('Turnstile Privacy Policy')
          }}</a
          >,
          <a href="https://www.mailjet.com/legal/privacy-policy/">{{
            tr('Mailjet Privacy Policy')
          }}</a>
          {{ tr('and') }}
          <a href="https://policies.google.com/privacy">{{ tr('Google Privacy Policy') }}</a
          >.
        </p>
        <h2>{{ tr('How long information is kept') }}</h2>
        <p>
          {{
            tr(
              'We keep enquiry emails for as long as needed to respond, manage related follow-up and, where applicable, comply with legal obligations or handle legal claims. When the purpose no longer applies, the correspondence should be deleted. Provider backups and security records follow their applicable retention arrangements.',
            )
          }}
        </p>
        <p>
          {{
            tr(
              'Our cookie choice is remembered for 180 days. Optional analytics storage and data retention are described in our',
            )
          }}
          <NuxtLinkLocale to="/cookies/">{{ tr('Cookie Policy') }}</NuxtLinkLocale
          >.
        </p>
        <h2>{{ tr('Your rights') }}</h2>
        <p>
          {{
            tr(
              'Depending on the circumstances, you can request access, correction, deletion, restriction or portability of your personal data, and object to processing based on legitimate interests. You can withdraw analytics consent using Cookie settings in the footer. Withdrawal does not affect processing that was lawful before withdrawal.',
            )
          }}
        </p>
        <p>
          {{ tr('To exercise your rights, email') }}
          <a :href="'mailto:' + company.email">{{ tr(company.email) }}</a
          >{{ tr('. You can also complain to the Romanian supervisory authority,') }}
          <a href="https://www.dataprotection.ro/">{{ tr('ANSPDCP') }}</a
          >{{ tr(', or your competent data protection authority.') }}
        </p>
        <h2>{{ tr('Automated decisions and updates') }}</h2>
        <p>
          {{
            tr(
              'We do not use contact enquiries to make automated decisions with legal or similarly significant effects. We may update this policy when the website or processing changes. The date at the top identifies the current version.',
            )
          }}
        </p>
      </div>
    </section>
  </main>
</template>
