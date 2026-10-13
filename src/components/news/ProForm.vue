<script setup lang="ts">
import { site, ui } from '@/config/site'
import { useProLead } from '@/composables/useProLead'
import FormField from './FormField.vue'
import FormSuccess from './FormSuccess.vue'

const { form, submitting, error, doneMessage, submit } = useProLead()
const t = ui.proPage
</script>

<template>
  <FormSuccess v-if="doneMessage" :title="t.doneTitle" :message="doneMessage" />

  <form v-else class="pro-form" novalidate @submit.prevent="submit">
    <fieldset class="pro-form__plans">
      <legend class="pro-form__legend">{{ t.plan }}</legend>
      <label
        v-for="plan in site.pro.plans"
        :key="plan.key"
        class="pro-form__plan"
        :class="{ 'pro-form__plan--on': form.plan === plan.key }"
      >
        <input v-model="form.plan" type="radio" name="pro-plan" :value="plan.key" />
        <span class="pro-form__plan-name">{{ plan.name }}</span>
        <span class="pro-form__plan-price"
          >{{ plan.price }} <small>{{ plan.per }}</small></span
        >
      </label>
    </fieldset>

    <div class="pro-form__row">
      <FormField id="pro-name" :label="ui.forms.name">
        <input id="pro-name" v-model="form.name" type="text" autocomplete="name" required />
      </FormField>
      <FormField id="pro-role" :label="t.role" optional>
        <input id="pro-role" v-model="form.role" type="text" autocomplete="organization-title" />
      </FormField>
    </div>
    <FormField id="pro-company" :label="ui.forms.company">
      <input
        id="pro-company"
        v-model="form.company"
        type="text"
        autocomplete="organization"
        required
      />
    </FormField>
    <div class="pro-form__row">
      <FormField id="pro-email" :label="ui.forms.email">
        <input
          id="pro-email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          :placeholder="ui.forms.emailPlaceholder"
          required
        />
      </FormField>
      <FormField id="pro-phone" :label="t.phone" optional>
        <input id="pro-phone" v-model="form.phone" type="tel" autocomplete="tel" />
      </FormField>
    </div>
    <FormField id="pro-message" :label="t.message" optional>
      <input
        id="pro-message"
        v-model="form.message"
        type="text"
        :placeholder="t.messagePlaceholder"
      />
    </FormField>

    <label class="pro-form__check">
      <input v-model="form.wantsMeeting" type="checkbox" />
      {{ site.pro.meeting }}
    </label>

    <p v-if="error" class="pro-form__error" role="alert">{{ error }}</p>

    <button type="submit" class="pro-form__btn" :disabled="submitting">
      {{ submitting ? ui.forms.sending : site.pro.cta }} <span aria-hidden="true">→</span>
    </button>
    <p class="pro-form__note">{{ site.pro.terms }} {{ t.formNote }}</p>
  </form>
</template>

<style scoped lang="scss">
.pro-form {
  @include flex(column, stretch, flex-start, 14px);
  font-family: $font-display;

  input:not([type='radio']):not([type='checkbox']) {
    border-radius: 3px;
    border-color: $box-line;
    background: $paper;
  }

  &__plans {
    border: 0;
    @include flex(column, stretch, flex-start, 8px);
  }

  &__legend {
    font-size: $text-sm;
    font-weight: 700;
    margin-bottom: 6px;
  }

  &__plan {
    @include flex(row, center, flex-start, 10px);
    flex-wrap: wrap;
    margin: 0;
    padding: 12px 14px;
    border: 1px solid $box-line;
    border-radius: 4px;
    background: $paper;
    cursor: pointer;
    color: $ink;
    font-size: 14px;

    input {
      width: auto;
      accent-color: $navy;
    }

    &--on {
      border-color: $navy;
      box-shadow: inset 0 0 0 1px $navy;
    }
  }

  &__plan-name {
    font-weight: 700;
  }

  &__plan-price {
    margin-left: auto;
    font-weight: 700;

    small {
      font-weight: 400;
      color: $ink-quiet;
    }
  }

  &__row {
    @include flex-cards(200px, 14px);
  }

  &__check {
    @include flex(row, center, flex-start, 10px);
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: $ink;

    input {
      width: 18px;
      height: 18px;
      padding: 0;
      accent-color: $navy;
    }
  }

  &__error {
    border-left: 3px solid $stamp;
    padding-left: 10px;
    font-size: $text-sm;
    font-weight: 600;
  }

  &__btn {
    align-self: flex-start;
    background: $stamp;
    color: $paper;
    padding: 12px 20px;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 700;
    box-shadow: 0 4px 14px rgba(200, 16, 46, 0.35);
    @include transition(background);

    &:hover {
      background: $stamp-deep;
    }

    &:disabled {
      opacity: 0.6;
    }
  }

  &__note {
    font-size: 12px;
    color: $ink-quiet;
  }
}
</style>
