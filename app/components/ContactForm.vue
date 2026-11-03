<script setup lang="ts">
import { services } from '~/content/services';
const { tr, locale } = useCopy();
const id = useId();
const route = useRoute();
const fields = reactive({ name: '', email: '', service: '', details: '', website: '' });
const pending = ref(false);
const turnstileToken = ref('');
const challenge = useTemplateRef('challenge');
const { analytics } = useConsent();

const status = ref('');
onMounted(() => {
  if (services.some((service) => service.title === route.query.service))
    fields.service = String(route.query.service);
});
async function submit() {
  if (pending.value) return;
  if (!turnstileToken.value) {
    status.value = 'Please complete the security check before sending.';
    await challenge.value?.start();
    return;
  }
  pending.value = true;
  status.value = '';
  try {
    const result = await $fetch<{ message: string; test?: boolean }>(
      '/api/contact?lang=' + locale.value,
      {
        method: 'POST',
        body: { ...fields, turnstileToken: turnstileToken.value },
      },
    );
    status.value = result.message;
    if (!result.test) {
      if (analytics.value)
        window.dataLayer?.push({ event: 'generate_lead', method: 'contact_form' });
      fields.name = '';
      fields.email = '';
      fields.details = '';
    }
  } catch (error: unknown) {
    const response = error as { data?: { message?: string } };
    status.value =
      response.data?.message ??
      'We could not send your enquiry. Please try again or email contact@webextreme.dev.';
  } finally {
    pending.value = false;
    challenge.value?.reset();
  }
}
</script>

<template>
  <form
    :action="'/api/contact?lang=' + locale"
    method="post"
    id="enquiry-form"
    class="contact-form reveal"
    tabindex="-1"
    :aria-busy="pending"
    @submit.prevent="submit"
    @focusin="challenge?.start()"
  >
    <div class="form-row">
      <div class="field">
        <label :for="id + '-name'"
          >{{ tr('Name') }} <span>{{ tr('(required)') }}</span></label
        ><input
          :id="id + '-name'"
          v-model="fields.name"
          name="name"
          autocomplete="name"
          required
          minlength="2"
          maxlength="120"
          :placeholder="tr('Your name')"
        />
      </div>
      <div class="field">
        <label :for="id + '-email'"
          >{{ tr('Email') }} <span>{{ tr('(required)') }}</span></label
        ><input
          :id="id + '-email'"
          v-model="fields.email"
          name="email"
          type="email"
          autocomplete="email"
          autocorrect="off"
          autocapitalize="off"
          :spellcheck="false"
          required
          maxlength="254"
          :placeholder="locale === 'ro' ? 'tu@companie.ro' : 'you@company.com'"
        />
      </div>
    </div>
    <div class="field">
      <label :for="id + '-service'"
        >{{ tr('Service') }} <span>{{ tr('(optional)') }}</span></label
      ><select :id="id + '-service'" v-model="fields.service" name="service">
        <option value="">{{ tr('Select a service') }}</option>
        <option v-for="service in services" :key="service.id" :value="service.title">
          {{ tr(service.title) }}
        </option>
      </select>
    </div>
    <div class="field">
      <label :for="id + '-details'"
        >{{ tr('Project details') }} <span>{{ tr('(required)') }}</span></label
      >
      <textarea
        :id="id + '-details'"
        v-model="fields.details"
        name="details"
        required
        :aria-describedby="id + '-details-help'"
        minlength="20"
        maxlength="5000"
        rows="3"
        :placeholder="tr('What would you like to build?')"
      />
      <p :id="id + '-details-help'" class="form-note">
        {{ tr('Please include at least 20 characters.') }}
      </p>
    </div>
    <div class="honeypot" aria-hidden="true">
      <label :for="id + '-website'">{{ tr('Leave this field empty') }}</label
      ><input
        :id="id + '-website'"
        v-model="fields.website"
        name="website"
        tabindex="-1"
        autocomplete="off"
      />
    </div>
    <TurnstileChallenge ref="challenge" v-model="turnstileToken" />
    <button class="button black-button" type="submit" :disabled="pending">
      {{ tr(pending ? 'Sending…' : 'Send enquiry') }} <AppIcon name="arrow" />
    </button>
    <p class="form-note">
      {{ tr('We use these details to respond to your enquiry.') }}
      <NuxtLinkLocale to="/privacy/">{{ tr('Read our privacy notice.') }}</NuxtLinkLocale>
    </p>
    <p
      class="form-result"
      :class="{ 'sr-only': !status }"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ tr(status) }}
    </p>
  </form>
</template>
