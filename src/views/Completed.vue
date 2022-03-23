<template>
  <section class="completed-tasks section">
    <ul v-if="tasks.length" class="tasks-list">
      <TaskCard
        v-for="task in tasks"
        :key="task._id"
        :task="task"
      />
    </ul>

    <LoadingScreen spinnerSize="medium" v-if="loader" />

    <div v-else-if="tasks.length" class="load-more-button">
      <Button variant="text" @click="loadMore">
        Load More
      </Button>
    </div>

    <p class="no-tasks" v-else>
      No Tasks
    </p>
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

import Button from '../components/Button.vue';
import LoadingScreen from '../components/LoadingScreen.vue';
import TaskCard from '../components/TaskCard.vue';

export default {
  name: 'Completed',

  components: { Button, LoadingScreen, TaskCard },

  data: () => ({
    loader: false,

    limit: 5,
    skip: 0,
  }),

  computed: {
    ...mapState({
      tasks: (state) => state.tasks.tasks,
    }),
  },

  methods: {
    ...mapActions(['getTasks']),
    ...mapMutations(['addAlert', 'setTasks']),

    async loadMore() {
      try {
        this.loader = true;
        this.skip += this.limit;

        await this.getTasks({
          completed: true,
          limit: this.limit,
          skip: this.skip,
        });
      } catch (error) {
        this.addAlert({
          message: error.message,
          state: 'error',
        });
      } finally {
        this.loader = false;
      }
    },
  },

  async mounted() {
    try {
      this.loader = true;

      this.setTasks([]);

      await this.getTasks({
        completed: true,
        limit: this.limit,
        skip: this.skip,
      });
    } catch (error) {
      this.addAlert({
        message: error.message,
        state: 'error',
      });
    } finally {
      this.loader = false;
    }
  },
};
</script>

<style scoped>
.no-tasks {
  color: var(--text-color-low);
  text-align: center;
}

.load-more-button {
  display: flex;
  justify-content: center;
  margin-top: 1em;
}

@media only screen and (max-width: 500px) {
  .completed-tasks {
    padding: 1em 0;
  }
}
</style>
