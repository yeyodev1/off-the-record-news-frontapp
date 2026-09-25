<script setup lang="ts">
import { site } from '@/config/site'
import { useSubscribeForm } from '@/composables/useSubscribeForm'
import FormField from './FormField.vue'
import FormSuccess from './FormSuccess.vue'
import { ui } from './uiCopy'

const { form, submitting, error, doneMessage, submit } = useSubscribeForm('pro')
</script>

<template>
  <FormSuccess
    v-if="doneMessage"
    inverted
    :title="ui.forms.proDoneTitle"
    :message="doneMessage"
    :note="site.newsletter.pendingNote"
  />

  <form v-else class="pro-form" novalidate @submit.prevent="submit">
    <FormField id="pro-email" :label="ui.forms.email" inverted>
      <input
        id="pro-email"
        v-model="form.email"
        type="email"
        autocomplete="email"
        :placeholder="ui.forms.emailPlaceholder"
        required
      />
    </FormField>
    <FormField id="pro-name" :label="ui.forms.name" optional inverted>
      <input id="pro-name" v-model="form.name" type="text" autocomplete="name" />
    </FormField>
    <FormField id="pro-company" :label="ui.forms.company" optional inverted>
      <input id="pro-company" v-model="form.company" type="text" autocomplete="organization" />
    </FormField>

    <p v-if="error" class="pro-form__error" role="alert">{{ error }}</p>

    <button type="submit" class="btn btn--primary pro-form__btn" :disabled="submitting">
      {{ submitting ? ui.forms.sending : site.pro.cta }}
    </button>
  </form>
</template>

<style scoped lang="scss">
.pro-form {
  @include flex(column, stretch, flex-start, 1rem);

  &__error {
    color: #ff9c95;
    font-weight: 600;
    font-size: $text-sm;
  }

  &__btn {
    border-radius: 0;
    margin-top: 0.4rem;
  }
}
</style>
