<template>
  <header class="header">
    <Logo />
    <ProfileMenu />
  </header>
</template>

<script>
import Logo from './Logo.vue';
import ProfileMenu from './ProfileMenu.vue';

export default {
  name: 'Header',

  components: { Logo, ProfileMenu },
};
</script>

<style lang="scss" scoped>
.header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  border-bottom: 1px solid var(--dark-color-3);

  @media only screen and (min-width: 768px) {
    padding: 1em 2em;
  }
}
</style>
