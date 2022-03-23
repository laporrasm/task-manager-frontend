<template>
  <div class="to-do">
    <AddTaskForm />

    <section class="sort-bar section">
      <Select
        label="Sort By:"
        v-model="sortBy"
        :options="sortByOptions"
        @input="loadTasks"
      />
      <Select
        label="Show:"
        v-model="limit"
        :options="limitOptions"
        @input="loadTasks"
      />
    </section>

    <section class="section tasks-list">
      <ul v-if="tasks.length">
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
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

import AddTaskForm from '../components/AddTaskForm.vue';
import Button from '../components/Button.vue';
import LoadingScreen from '../components/LoadingScreen.vue';
import Select from '../components/Select.vue';
import TaskCard from '../components/TaskCard.vue';

export default {
  name: 'ToDo',

  components: {
    AddTaskForm,
    Button,
    LoadingScreen,
    Select,
    TaskCard,
  },

  data: () => ({
    sortByOptions: [
      {
        label: 'A-Z',
        value: 'description_desc',
      },
      {
        label: 'Z-A',
        value: 'description_asc',
      },
      {
        label: 'Newest',
        value: 'createdAt_desc',
      },
      {
        label: 'Oldest',
        value: 'createdAt_asc',
      },
    ],
    sortBy: 'createdAt_desc',

    limitOptions: [
      {
        label: '5',
        value: '5',
      },
      {
        label: '10',
        value: '10',
      },
      {
        label: '15',
        value: '15',
      },
      {
        label: '20',
        value: '20',
      },
    ],

    loader: false,

    limit: '5',
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

    async loadTasks() {
      try {
        this.loader = true;

        this.setTasks([]);

        this.skip = 0;

        await this.getTasks({
          completed: false,
          sortBy: this.sortBy,
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

    async loadMore() {
      try {
        this.loader = true;
        this.skip += parseInt(this.limit, 10);

        await this.getTasks({
          completed: false,
          sortBy: this.sortBy,
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

  mounted() {
    this.loadTasks();
  },
};
</script>

<style scoped>
.no-tasks {
  color: var(--text-color-low);
  text-align: center;
}

.sort-bar {
  display: flex;
  align-items: center;
  gap: 1.5em;
  overflow-x: auto;
}

.loader {
  display: grid;
  place-content: center;
  place-items: center;
}

.load-more-button {
  display: flex;
  justify-content: center;
  margin-top: 1em;
}

@media only screen and (max-width: 500px) {
  .tasks-list {
    padding: 1em 0;
  }
}

.section + .section {
  margin-top: 1em;
}
</style>
