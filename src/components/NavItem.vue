<template>
  <RouterLink
    :to="to"
    class="nav-item"
    active-class="nav-item--active"
  >
    <unicon :name="icon" fill="currentColor" width="20px" height="20px" />
    {{ text }}
  </RouterLink>
</template>

<script>
export default {
  name: 'NavItem',

  props: {
    icon: {
      required: true,
      type: String,
    },
    text: {
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
.nav-item {
  display: flex;
  align-items: center;
  gap: .5em;
  color: var(--text-color-medium);
  font-size: 1rem;
  transition: background-color 150ms, border-color 150ms;

  @media only screen and (max-width: 767px) {
    flex-basis: 100px;
    flex-direction: column;
    padding: calc(.75em + 4px) .75em .75em .75em;
    font-size: .75rem;
    border-top: 4px solid transparent;
  }

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    padding: 1em 1em 1em calc(1em + 4px);
    border-left: 4px solid transparent;
  }

  &--active {
    color: var(--text-color-high);
    background-color: var(--dark-color-2);
    border-color: var(--primary-color);
  }

  &:hover {
    background-color: var(--dark-color-2);
  }
}
</style>
