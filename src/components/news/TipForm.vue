<script setup lang="ts">
import { site } from '@/config/site'
import { useTipForm, TIP_MIN_LENGTH } from '@/composables/useTipForm'
import FormField from './FormField.vue'
import FormSuccess from './FormSuccess.vue'
import { ui } from '@/config/site'

const { form, length, isLongEnough, submitting, error, doneMessage, submit } = useTipForm()
</script>

<template>
  <FormSuccess v-if="doneMessage" :title="ui.forms.tipDoneTitle" :message="doneMessage" :note="site.tips.success" />

  <form v-else class="tip-form" novalidate @submit.prevent="submit">
    <FormField
      id="tip-text"
      :label="ui.forms.tipText"
      :hint="isLongEnough ? '' : ui.forms.tipMin(Math.min(length, TIP_MIN_LENGTH))"
    >
      <textarea
        id="tip-text"
        v-model="form.text"
        :placeholder="ui.forms.tipPlaceholder"
        :minlength="TIP_MIN_LENGTH"
        aria-describedby="tip-text-hint"
        required
      ></textarea>
    </FormField>

    <div class="tip-form__row">
      <FormField id="tip-name" :label="ui.forms.name" optional>
        <input id="tip-name" v-model="form.name" type="text" autocomplete="name" />
      </FormField>
      <FormField id="tip-contact" :label="ui.forms.contact" optional>
        <input id="tip-contact" v-model="form.contact" type="text" :placeholder="ui.forms.contactPlaceholder" />
      </FormField>
    </div>

    <p class="tip-form__privacy">
      <i class="fa-solid fa-shield-halved" aria-hidden="true"></i> {{ ui.forms.tipsPrivacy }}
    </p>

    <p v-if="error" class="tip-form__error" role="alert">{{ error }}</p>

    <button type="submit" class="btn btn--dark tip-form__btn" :disabled="submitting">
      {{ submitting ? ui.forms.sending : site.tips.formCta }}
    </button>
  </form>
</template>

<style scoped lang="scss">
.tip-form {
  @include flex(column, stretch, flex-start, 1.25rem);

  &__row {
    @include flex-cards(220px, 1rem);
  }

  &__privacy {
    font-size: $text-sm;
    color: $ink-soft;

    i {
      color: $accent;
      margin-right: 0.3rem;
    }
  }

  &__error {
    color: $ink;
    border-left: 3px solid $stamp;
    padding-left: 0.6rem;
    font-weight: 600;
    font-size: $text-sm;
  }

  &__btn {
    align-self: flex-start;
    border-radius: 0;
  }
}
</style>
