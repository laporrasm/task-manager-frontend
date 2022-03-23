<template>
  <div class="register">
    <header class="register__header">
      <Logo />
      <p>
        Already have an account?
        <Link to="/login">Login</Link>
      </p>
    </header>

    <ValidationObserver slim v-slot="{ handleSubmit }">
      <form class="register__form" @submit.prevent="handleSubmit(onSubmit)">
        <h1>Register</h1>
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
          label="Email address"
          name="email"
          rules="required|email"
          type="email"
          v-model="form.email"
        />
        <Input
          label="Password"
          name="password"
          rules="required|min:7"
          type="password"
          v-model="form.password"
        />
        <Button type="submit" variant="primary">Sign up</Button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';

import { mapActions, mapMutations } from 'vuex';

import Button from '../components/Button.vue';
import Input from '../components/Input.vue';
import Link from '../components/Link.vue';
import Logo from '../components/Logo.vue';

export default {
  name: 'Register',

  components: {
    Button,
    Input,
    Link,
    Logo,
    ValidationObserver,
  },

  data: () => ({
    form: {
      name: '',
      age: '',
      email: '',
      password: '',
    },
    loading: false,
  }),

  methods: {
    ...mapActions(['register']),
    ...mapMutations(['addAlert']),

    async onSubmit() {
      try {
        this.loading = true;
        await this.register(this.form);
        this.$router.replace('/');
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
.register {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 1.5em 2em;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
  }

  &__form {
    justify-self: center;
    max-width: 450px;
    width: 100%;
    display: grid;
    align-content: center;
    gap: 1.5em;
    margin-top: 2em;

    h1 {
      margin-bottom: 1em;
      text-align: center;
    }

    .button {
      margin-top: 1em;
    }
  }
}
</style>
