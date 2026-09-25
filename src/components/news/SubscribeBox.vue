<script setup lang="ts">
import { site } from '@/config/site'
import { useSubscribeForm } from '@/composables/useSubscribeForm'
import FormSuccess from './FormSuccess.vue'
import SmartLabel from './SmartLabel.vue'
import { ui } from '@/config/site'

// Desde la portada se suscribe a las dos ediciones diarias; el detalle se elige en /boletines.
const { form, submitting, error, doneMessage, submit } = useSubscribeForm('newsletter', ['manana', 'noche'])
</script>

<template>
  <section class="box" aria-labelledby="subscribe-box-title">
    <div class="box__copy">
      <SmartLabel>{{ site.newsletter.price }}</SmartLabel>
      <h2 id="subscribe-box-title" class="box__title">{{ site.newsletter.title }}</h2>
      <p class="box__text">{{ site.newsletter.subtitle }}</p>
    </div>

    <FormSuccess
      v-if="doneMessage"
      class="box__form"
      :title="ui.forms.doneTitle"
      :message="doneMessage"
      :note="site.newsletter.pendingNote"
    />
    <form v-else class="box__form" novalidate @submit.prevent="submit">
      <label for="subscribe-box-email" class="visually-hidden">{{ ui.forms.email }}</label>
      <div class="box__row">
        <input
          id="subscribe-box-email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          :placeholder="ui.forms.emailPlaceholder"
          :aria-invalid="Boolean(error)"
          aria-describedby="subscribe-box-help"
          required
        />
        <button type="submit" class="btn btn--dark" :disabled="submitting">
          {{ submitting ? ui.forms.sending : site.newsletter.cta }}
        </button>
      </div>
      <p v-if="error" class="box__error" role="alert">{{ error }}</p>
      <p id="subscribe-box-help" class="box__help">
        {{ ui.forms.homeBoxNote }}
        <RouterLink to="/boletines">{{ ui.forms.homeBoxLink }}</RouterLink>
      </p>
    </form>
  </section>
</template>

<style scoped lang="scss">
.box {
  @include flex(column, stretch, flex-start, 1.5rem);
  padding: 1.75rem 1.25rem;
  background: $accent-soft;
  border-top: 4px solid $accent;

  @include from('md') {
    flex-direction: row;
    align-items: center;
    gap: 3rem;
    padding: 2.5rem;
  }

  &__copy {
    @include flex(column, stretch, flex-start, 0.5rem);
    flex: 1 1 50%;
  }

  &__title {
    font-size: $display-sm;
    font-weight: 900;
    letter-spacing: -0.03em;
  }

  &__text {
    color: $ink-soft;
    max-width: 44ch;
  }

  &__form {
    flex: 1 1 50%;
  }

  &__row {
    @include flex(column, stretch, flex-start, 0.6rem);

    @include from('sm') {
      flex-direction: row;
    }

    input {
      border-color: $ink;
      border-radius: 0;
      background: $paper;
    }

    .btn {
      border-radius: 0;
      white-space: nowrap;
    }
  }

  &__error {
    color: $ink;
    border-left: 3px solid $stamp;
    padding-left: 0.6rem;
    font-size: $text-sm;
    font-weight: 600;
    margin-top: 0.5rem;
  }

  &__help {
    font-size: $text-xs;
    color: $ink-soft;
    margin-top: 0.6rem;

    a {
      color: $accent-deep;
      font-weight: 700;
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }
}
</style>
