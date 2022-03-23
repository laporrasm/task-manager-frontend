<template>
  <div class="content">
    <h1>My Tasks</h1>

    <TabNav :tabs="tabs" />

    <RouterView />
  </div>
</template>

<script>
import TabNav from '../components/TabNav.vue';

export default {
  name: 'Tasks',
  title: 'My Tasks | SimpleToDoList',

  components: { TabNav },

  data: () => ({
    tabs: [
      {
        label: 'To Do',
        to: '/tasks',
      },
      {
        label: 'Completed',
        to: '/tasks/completed',
      },
    ],
  }),
};
</script>
