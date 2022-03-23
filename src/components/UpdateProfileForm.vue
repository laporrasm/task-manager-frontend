<template>
  <ValidationObserver class="section" tag="section" v-slot="{ handleSubmit }">
    <form class="form" novalidate @submit.prevent="handleSubmit(onSubmit)">
      <h3>Update Profile</h3>

      <Input
        label="Name"
        name="name"
        rules="required"
        v-model="form.name"
      />
      <Input
        label="Age"
        name="age"
        rules="integer|positive"
        type="number"
        v-model="form.age"
      />
      <Input
        label="Email"
        name="email"
        rules="email|required"
        type="email"
        v-model="form.email"
      />

      <Button type="submit" :disabled="loading" :showLoader="loading">
        Update
      </Button>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate';

import { mapActions, mapMutations, mapState } from 'vuex';

import Button from './Button.vue';
import Input from './Input.vue';

export default {
  name: 'UpdateProfileForm',

  components: { Button, Input, ValidationObserver },

  data: () => ({
    form: {
      age: 0,
      email: '',
      name: '',
    },

    loading: false,
  }),

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },

  methods: {
    ...mapActions(['updateProfile']),
    ...mapMutations(['addAlert']),

    async onSubmit() {
      try {
        this.loading = true;
        await this.updateProfile({
          age: this.form.age,
          email: this.form.email,
          name: this.form.name,
        });
        this.addAlert({
          message: 'Profile updated',
          state: 'success',
        });
        this.form = {
          age: this.user.age,
          email: this.user.email,
          name: this.user.name,
        };
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

  mounted() {
    if (this.user) {
      this.form = {
        age: this.user.age,
        email: this.user.email,
        name: this.user.name,
      };
    } else {
      this.addAlert({
        message: 'No user',
        state: 'error',
      });
    }
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
