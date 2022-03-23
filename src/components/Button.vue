<template>
  <button
    class="button"
    :class="variantClass"
    :disabled="disabled"
    :type="type"
    @click="$emit('click', $event)"
  >
    <Spinner v-if="showLoader" :white="true" />
    <slot v-else />
  </button>
</template>

<script>
import Spinner from './Spinner.vue';

export default {
  name: 'Button',

  components: { Spinner },

  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    showLoader: {
      default: false,
      type: Boolean,
    },
    type: {
      default: 'button',
      type: String,
    },
    variant: {
      default: 'secondary',
      type: String,
    },
  },

  computed: {
    variantClass() {
      switch (this.variant) {
        case 'secondary':
          return 'button--secondary';
        case 'primary':
          return 'button--primary';
        case 'text':
          return 'button--text';
        case 'danger':
          return 'button--danger';
        default:
          return 'button--secondary';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5em;
  padding: .75em 1em;
  color: var(--text-color-high);
  font-size: 1rem;
  font-weight: var(--medium);
  text-align: center;
  border-radius: .25em;
  transition: background-color 150ms;

  &:disabled {
    opacity: .7;
    cursor: not-allowed;
  }

  &--primary {
    color: var(--dark-color-1);
    background-color: var(--primary-color);
  }

  &--secondary {
    color: var(--primary-color);
    box-shadow: 0 0 0 1px currentColor inset;
  }

  &--text {
    color: var(--primary-color);

    &:hover {
      background-color: var(--dark-color-3);
    }
  }

  &--danger {
    color: var(--dark-color-1);
    background-color: var(--danger-color);
  }
}
</style>
