<template>
  <RouterLink class="link" :to="to">
    <slot />
  </RouterLink>
</template>

<script>
export default {
  name: 'Link',

  props: {
    to: {
      required: true,
      type: [Object, String],
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  color: var(--primary-color);

  &:hover {
    text-decoration: underline;
  }
}
</style>
