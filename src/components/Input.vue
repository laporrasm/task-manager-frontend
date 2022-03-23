<template>
  <ValidationProvider
    class="input"
    tag="label"
    v-slot="{ failed, errors }"
    :name="name"
    :rules="rules"
    :vid="vid"
  >
    <span v-if="label" class="input__label">{{ label }}</span>
    <input
      class="input__field"
      :class="{ invalid: failed }"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
    <span v-if="errors.length" class="input__error">
      {{ errors[0] }}
    </span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'Input',

  components: { ValidationProvider },

  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    label: {
      default: '',
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    placeholder: {
      required: false,
      type: String,
    },
    rules: {
      required: false,
      type: String,
    },
    type: {
      default: 'text',
      type: String,
    },
    value: {
      required: true,
      type: [Number, String],
    },
    vid: String,
  },
};
</script>

<style lang="scss" scoped>
.input {
  display: grid;
  text-align: start;

  &__error {
    margin-top: .5em;
    color: var(--danger-color);
    font-size: .875rem;
  }

  &__label {
    margin-bottom: .5em;
  }

  &__field {
    padding: 1em;
    color: var(--text-color-high);
    font-size: 1rem;
    background-color: var(--dark-color-3);
    border-radius: 4px;
    transition: background-color 300ms;

    &.invalid {
      box-shadow: 0 0 0 1px var(--danger-color) inset;
    }

    &::placeholder {
      color: var(--text-color-low);
    }

    &:disabled {
      opacity: .7;
      cursor: not-allowed;
    }

    &:not(:disabled):focus {
      background-color: var(--secondary-color);
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type=number] {
      -moz-appearance: textfield;
    }
  }
}
</style>
