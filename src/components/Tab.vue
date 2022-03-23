<template>
  <router-link exact-active-class="tab--active" class="tab" :to="to">
    {{ label }}
  </router-link>
</template>

<script>
export default {
  name: 'Tab',

  model: {
    event: 'change',
    prop: 'selected',
  },

  props: {
    label: {
      required: true,
      type: String,
    },
    to: {
      required: true,
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.tab {
  padding: calc(.75em + 3px) 1em .75em;
  color: var(--text-color-medium);
  border-bottom: 3px solid transparent;
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  transition: all 300ms;

  &:not(&--active):hover {
    background-color: var(--dark-color-2);
  }

  &--active {
    color: var(--primary-color);
    border-bottom-color: currentColor;
  }
}
</style>
