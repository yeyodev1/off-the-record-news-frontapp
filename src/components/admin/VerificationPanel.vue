<script setup lang="ts">
import { admin } from '@/config/admin'
import type { Verification } from '@/types'

/** Lo que encontró el verificador: errores primero, cada uno contra las fuentes. */
defineProps<{ verification?: Verification | null; compact?: boolean }>()
</script>

<template>
  <div v-if="!verification" class="verify verify--none">
    <i class="fa-regular fa-circle-question"></i> {{ admin.verification.none }}
  </div>
  <div
    v-else
    class="verify"
    :class="{
      'verify--error': verification.errors,
      'verify--warn': !verification.errors && verification.warnings,
      'verify--ok': !verification.errors && !verification.warnings,
    }"
  >
    <p class="verify__head">
      <i
        class="fa-solid"
        :class="
          verification.errors
            ? 'fa-circle-xmark'
            : verification.warnings
              ? 'fa-triangle-exclamation'
              : 'fa-circle-check'
        "
      ></i>
      <strong>{{ admin.verification.title }}:</strong>
      <span v-if="verification.errors || verification.warnings">{{
        admin.verification.summary(verification.errors, verification.warnings)
      }}</span>
      <span v-else>{{ admin.verification.clean }}</span>
    </p>
    <ul v-if="verification.flags.length" class="verify__flags">
      <li v-for="(flag, i) in verification.flags" :key="i" :class="`verify__flag--${flag.level}`">
        <i
          class="fa-solid"
          :class="flag.level === 'error' ? 'fa-xmark' : 'fa-exclamation'"
          aria-hidden="true"
        ></i>
        {{ flag.text }}
      </li>
    </ul>
    <p v-if="!compact && verification.errors" class="verify__help">{{ admin.verification.help }}</p>
  </div>
</template>

<style scoped lang="scss">
.verify {
  @include flex(column, stretch, flex-start, 0.45rem);
  padding: 0.75rem 0.9rem;
  border-radius: $radius-sm;
  font-size: $text-sm;
  border: 1px solid $line;

  &--error {
    background: $danger-bg;
    border-color: rgba($danger, 0.3);
  }

  &--warn {
    background: $warning-bg;
    border-color: rgba($warning, 0.35);
  }

  &--ok {
    background: $success-bg;
    border-color: rgba($success, 0.3);
  }

  &--none {
    color: $ink-muted;
  }

  &__head {
    @include flex(row, center, flex-start, 0.4rem);
    flex-wrap: wrap;
  }

  &--error &__head i {
    color: $danger;
  }

  &--warn &__head i {
    color: $warning;
  }

  &--ok &__head i {
    color: $success;
  }

  &__flags {
    list-style: none;
    @include flex(column, stretch, flex-start, 0.3rem);

    li {
      @include flex(row, baseline, flex-start, 0.45rem);
      line-height: 1.4;

      i {
        flex: 0 0 auto;
        width: 0.8rem;
        text-align: center;
      }
    }
  }

  &__flag--error i {
    color: $danger;
  }

  &__flag--aviso i {
    color: $warning;
  }

  &__help {
    font-size: $text-xs;
    color: $ink-soft;
  }
}
</style>
