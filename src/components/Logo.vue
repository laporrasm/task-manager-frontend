<template>
  <a href="/" class="logo">
    <span class="green">Todo</span>
    <span class="white">List</span>
  </a>
</template>

<script>
export default {
  name: 'Logo',
};
</script>

<style lang="scss" scoped>
.logo {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: var(--bold);
  user-select: none;
}

.white {
  color: var(--text-color-high);
}

.green {
  color: var(--primary-color);
}
</style>
