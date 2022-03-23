<template>
  <span
    class="spinner"
    :class="[{ 'spinner--white': white },sizeClass]"
  >
  </span>
</template>

<script>
export default {
  name: 'Spinner',

  props: {
    size: {
      default: 'small',
      type: String,
    },

    white: {
      default: false,
      type: Boolean,
    },
  },

  computed: {
    sizeClass() {
      switch (this.size) {
        case 'small':
          return 'spinner--small';
        case 'medium':
          return 'spinner--medium';
        case 'large':
          return 'spinner--large';
        default:
          return 'spinner--small';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.spinner {
  border-style: solid;
  border-color: var(--dark-color-3);
  border-bottom-color: var(--primary-color);
  border-radius: 50%;
  animation: 1s linear infinite spinner;

  &--small {
    width: 20px;
    height: 20px;
    border-width: 3px;
  }

  &--medium {
    width: 30px;
    height: 30px;
    border-width: 4px;
  }

  &--large {
    width: 50px;
    height: 50px;
    border-width: 5px;
  }

  &--white {
    border-color: var(--text-color-low);
    border-bottom-color: var(--text-color-high);
  }
}

@keyframes spinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
