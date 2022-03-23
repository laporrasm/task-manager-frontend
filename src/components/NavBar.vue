<template>
  <nav class="sidebar">
    <NavItem icon="check-square" text="Tasks" to="/tasks" />
    <NavItem icon="user" text="Account" to="/account" />
  </nav>
</template>

<script>
import NavItem from './NavItem.vue';

export default {
  name: 'Sidebar',

  components: { NavItem },
};
</script>

<style lang="scss" scoped>
.sidebar {
  grid-area: navbar;
  display: flex;

  @media only screen and (max-width: 767px) {
    justify-content: center;
    border-top: 1px solid var(--dark-color-3);
  }

  @media only screen and (min-width: 768px) {
    padding: 2em 0;
    flex-basis: 200px;
    flex-direction: column;
    border-right: 1px solid var(--dark-color-3);
  }
}
</style>
