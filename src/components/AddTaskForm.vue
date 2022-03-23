<template>
  <ValidationObserver class="section" tag="section" v-slot="{ handleSubmit }">
    <form class="form" @submit.prevent="handleSubmit(onSubmit)">
      <Input
        name="description"
        placeholder="Task description"
        rules="required"
        v-model="description"
        :disabled="loading"
      />

      <Button
        type="submit"
        variant="text"
        :disabled="loading"
        :showLoader="loading"
      >
        Add
      </Button>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate';

import { mapActions, mapMutations } from 'vuex';

import Button from './Button.vue';
import Input from './Input.vue';

export default {
  name: 'AddTaskForm',

  components: { Button, Input, ValidationObserver },

  data: () => ({
    description: '',
    loading: false,
  }),

  methods: {
    ...mapActions(['createTask']),
    ...mapMutations(['addAlert']),

    async onSubmit() {
      try {
        this.loading = true;

        await this.createTask(this.description);

        this.description = '';

        this.addAlert({
          message: 'Task Created',
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
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: .75em;
}

.button {
  min-width: 0;
}
</style>
