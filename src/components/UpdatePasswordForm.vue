<template>
  <ValidationObserver class="section" tag="section" v-slot="{ handleSubmit }">
    <form class="form" novalidate @submit.prevent="handleSubmit(onSubmit)">
      <h3>Update Password</h3>

      <Input
        label="New Password"
        name="password"
        rules="min:7|confirmed:confirmation|required"
        type="password"
        v-model="form.newPassword"
      />
      <Input
        label="Confirm Password"
        name="confirmation"
        type="password"
        vid="confirmation"
        v-model="form.confirmPassword"
      />

      <Button
        type="submit"
        :disabled="loading"
        :showLoader="loading"
      >
        Update
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
  name: 'UpdatePasswordForm',

  components: { Button, Input, ValidationObserver },

  data: () => ({
    form: {
      newPassword: '',
      confirmPassword: '',
    },

    loading: false,
  }),

  methods: {
    ...mapActions(['updatePassword']),
    ...mapMutations(['addAlert']),

    async onSubmit() {
      try {
        this.loading = true;
        await this.updatePassword(this.form.newPassword);
        this.addAlert({
          message: 'Password updated',
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

<style scoped>
.form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;
}

h3 {
  margin-bottom: .5em;
}

.button {
  justify-self: flex-start;
  margin-top: 1em;
}
</style>
