<template>
  <li
    class="card"
    v-click-outside="cancelDescriptionEdit"
    :class="{ completed: task.completed }"
  >
    <label class="checkbox" :class="{ checked: task.completed }">
      <unicon name="check" fill="currentColor" width="24px" height="24px" />
      <input
        type="checkbox"
        class="checkbox__input"
        :checked="task.completed"
        @change="onUpdate({ completed: !task.completed })"
      >
    </label>

    <template v-if="editing">
      <input
        class="description"
        ref="descriptionInput"
        type="text"
        v-if="editing"
        v-model="descriptionCopy"
      />
      <Button
        type="submit"
        v-if="editing"
        @click="onUpdate({ description: descriptionCopy })"
      >
        Update
      </Button>
    </template>

    <template v-else>
      <p
        class="description"
        :class="{ completed: task.completed }"
      >
        {{ task.description }}
      </p>
      <EllipsisMenu v-if="!task.completed">
        <EllipsisMenuItem
          :icon="`${!task.completed ? 'check' : 'times'}-square`"
          @click="onUpdate({ completed: !task.completed })"
        >
          {{ `Mark as ${!task.completed ? 'Complete' : 'Incomplete'}`}}
        </EllipsisMenuItem>
        <EllipsisMenuItem icon="edit-alt" @click="editDescription">
          Edit Description
        </EllipsisMenuItem>
        <EllipsisMenuItem icon="trash-alt" @click="onDelete">
          Delete Task
        </EllipsisMenuItem>
      </EllipsisMenu>
    </template>

    <div v-if="loading" class="loading-overlay">
      <Spinner />
    </div>
  </li>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { mapActions, mapMutations } from 'vuex';

import vClickOutside from 'v-click-outside';

import Button from './Button.vue';
import EllipsisMenu from './EllipsisMenu.vue';
import EllipsisMenuItem from './EllipsisMenuItem.vue';
import Spinner from './Spinner.vue';

export default {
  name: 'TaskCard',

  components: {
    Button,
    EllipsisMenu,
    EllipsisMenuItem,
    Spinner,
  },

  directives: {
    clickOutside: vClickOutside.directive,
  },

  props: {
    task: {
      required: true,
      type: Object,
    },
  },

  data: () => ({
    editing: false,
    loading: false,
    descriptionCopy: '',
  }),

  methods: {
    ...mapActions(['deleteTask', 'updateTask']),
    ...mapMutations(['addAlert']),

    async onDelete() {
      try {
        this.loading = true;
        await this.deleteTask(this.task._id);
        this.addAlert({
          message: 'Task Deleted',
          state: 'success',
        });
      } catch (error) {
        this.addAlert({
          message: error.message,
          state: 'error',
        });
      } finally {
        this.loading = false;
      }
    },

    async onUpdate(updates) {
      try {
        this.loading = true;

        await this.updateTask({
          _id: this.task._id,
          updates,
        });

        if (Object.keys(updates).includes('description')) {
          this.editing = false;
          this.descriptionCopy = '';
        }

        this.addAlert({
          message: 'Task Updated',
          state: 'success',
        });
      } catch (error) {
        this.addAlert({
          message: error.message,
          state: 'error',
        });
      } finally {
        this.loading = false;
      }
    },

    editDescription() {
      this.editing = true;
      this.descriptionCopy = this.task.description;

      this.$nextTick(() => {
        this.$refs.descriptionInput.focus();
      });
    },

    cancelDescriptionEdit() {
      this.editing = false;
      this.descriptionCopy = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: .5em;
  align-items: center;
  padding: 1em 1.25em;
  text-align: start;
  border-bottom: 1px solid var(--dark-color-3);
  transition: background-color 300ms, opacity 300ms;

  &:hover {
    background-color: var(--dark-color-3);
  }

  @media only screen and (max-width: 500px) {
    border-radius: 0;
  }
}

.checkbox {
  width: 30px;
  height: 30px;
  display: grid;
  place-content: center;
  place-items: center;
  color: transparent;
  border: 3px solid var(--secondary-color);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 300ms;

  &.checked {
    color: white;
    background-color: var(--primary-color);
    border-color: var(--primary-color);
  }

  &:not(.checked):hover {
    color: var(--primary-color);
    border-color: currentColor;
  }

  &__input {
    display: none;
  }
}

.description {
  padding: .5em;
  color: var(--text-color-high);
  font-size: 1rem;
  line-height: 140%;
  text-align: start;
  transition: background-color 300ms, text-decoration 300ms;

  &.completed {
    color: var(--text-color-low);
    text-decoration: line-through 1px solid var(--text-color-low);
  }
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background-color: var(--dark-color-2);
}
</style>
