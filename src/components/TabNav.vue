<template>
  <nav class="tab-nav">
    <Tab
      v-for="tab in tabs"
      :key="tab.route"
      :label="tab.label"
      :to="tab.to"
    />
  </nav>
</template>

<script>
import Tab from './Tab.vue';

export default {
  name: 'TabNav',

  components: { Tab },

  props: {
    tabs: {
      required: true,
      type: Array,
    },
  },
};
</script>

<style scoped>
.tab-nav {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--dark-color-3);
  margin-bottom: 1em;
}
</style>
