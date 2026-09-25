<script setup lang="ts">
import { site } from '@/config/site'
import { useSubscribeForm } from '@/composables/useSubscribeForm'
import EditionPicker from './EditionPicker.vue'
import FormField from './FormField.vue'
import FormSuccess from './FormSuccess.vue'
import { ui } from '@/config/site'

const { form, submitting, error, doneMessage, submit } = useSubscribeForm('newsletter', ['manana'])
</script>

<template>
  <FormSuccess
    v-if="doneMessage"
    :title="ui.forms.doneTitle"
    :message="doneMessage"
    :note="site.newsletter.pendingNote"
  />

  <form v-else class="nl-form" novalidate @submit.prevent="submit">
    <fieldset class="nl-form__editions">
      <legend class="nl-form__legend">{{ ui.forms.editions }}</legend>
      <EditionPicker v-model="form.editions" />
    </fieldset>

    <div class="nl-form__row">
      <FormField id="nl-email" :label="ui.forms.email">
        <input
          id="nl-email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          :placeholder="ui.forms.emailPlaceholder"
          required
        />
      </FormField>
      <FormField id="nl-name" :label="ui.forms.name" optional>
        <input id="nl-name" v-model="form.name" type="text" autocomplete="name" />
      </FormField>
    </div>

    <p v-if="error" class="nl-form__error" role="alert">{{ error }}</p>

    <div class="nl-form__submit">
      <button type="submit" class="btn btn--primary" :disabled="submitting">
        {{ submitting ? ui.forms.sending : site.newsletter.cta }}
      </button>
      <span class="nl-form__price">{{ site.newsletter.price }}</span>
    </div>
  </form>
</template>

<style scoped lang="scss">
.nl-form {
  @include flex(column, stretch, flex-start, 1.5rem);

  &__editions {
    border: 0;
    min-width: 0;
  }

  &__legend {
    font-family: $font-display;
    font-weight: 800;
    font-size: $text-lg;
    margin-bottom: 0.9rem;
  }

  &__row {
    @include flex-cards(240px, 1rem);
  }

  &__error {
    color: $ink;
    border-left: 3px solid $stamp;
    padding-left: 0.6rem;
    font-weight: 600;
    font-size: $text-sm;
  }

  &__submit {
    @include flex(row, center, flex-start, 0.75rem 1.25rem);
    flex-wrap: wrap;

    .btn {
      border-radius: 0;
    }
  }

  &__price {
    font-size: $text-sm;
    color: $ink-muted;
  }
}
</style>
