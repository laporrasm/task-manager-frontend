<template>
  <div class="login">
    <header class="login__header">
      <Logo />
      <p>
        Don't have an account?
        <Link to="/register">Sign up</Link>
      </p>
    </header>

    <ValidationObserver slim v-slot="{ handleSubmit }">
      <form class="login__form" @submit.prevent="handleSubmit(onSubmit)">
        <h1>Welcome back!</h1>
        <Input
          label="Email address"
          name="name"
          rules="required|email"
          type="email"
          v-model="credentials.email"
        />
        <Input
          label="Password"
          name="password"
          rules="required|min:7"
          type="password"
          v-model="credentials.password"
        />
        <Button
          type="submit"
          variant="primary"
          :disabled="loading"
          :showLoader="loading"
        >
          Login
        </Button>
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
  name: 'Login',

  components: {
    Button,
    Input,
    Link,
    Logo,
    ValidationObserver,
  },

  data: () => ({
    credentials: {
      email: '',
      password: '',
    },
    loading: false,
  }),

  methods: {
    ...mapActions(['login']),
    ...mapMutations(['addAlert']),

    async onSubmit() {
      try {
        this.loading = true;
        await this.login(this.credentials);
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
.login {
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
