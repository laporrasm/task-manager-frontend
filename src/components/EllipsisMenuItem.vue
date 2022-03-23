<template>
  <component
    type="button"
    class="item"
    :is="to ? 'router-link' : 'button'"
    :to="to"
    @click.prevent="emitClick"
  >
    <unicon
      :name="icon"
      fill="currentColor"
      width="18px"
      height="18px"
    >
    </unicon>
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'EllipsisMenuItem',

  props: {
    icon: {
      required: true,
      type: String,
    },
    to: {
      default: '',
      type: String,
    },
  },

  methods: {
    emitClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: .75em;
  padding: 1em;
  color: var(--text-color-medium);
  transition: background-color 150ms;

  &:hover {
    color: var(--primary-color);
    background-color: var(--dark-color-3);
  }

  &:first-child {
    border-radius: 4px 4px 0 0;
  }

  &:last-child {
    border-radius: 0 0 4px 4px;
  }

  & + & {
    border-top: 1px solid var(--dark-color-3);
  }
}
</style>
