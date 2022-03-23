<template>
  <div class="content">
    <h1>My Profile</h1>

    <RouterView />

    <UpdateAvatarForm />

    <UpdateProfileForm />

    <UpdatePasswordForm />

    <section class="section">
      <h3>Manage Account</h3>
      <div class="buttons-container">
        <Button @click="onLogout">Logout</Button>
        <Button @click="onLogoutAll">Logout all sessions</Button>
        <Button variant="danger" @click="onDelete">Delete Account</Button>
      </div>
    </section>

    <ConfirmDialogue ref="confirmDialogue" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

import Button from '../components/Button.vue';
import ConfirmDialogue from '../components/ConfirmDialogue.vue';
import UpdateAvatarForm from '../components/UpdateAvatarForm.vue';
import UpdatePasswordForm from '../components/UpdatePasswordForm.vue';
import UpdateProfileForm from '../components/UpdateProfileForm.vue';

export default {
  name: 'Account',
  title: 'My Account | SimpleToDoList',

  components: {
    Button,
    ConfirmDialogue,
    UpdateAvatarForm,
    UpdatePasswordForm,
    UpdateProfileForm,
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user || {},
    }),
  },

  methods: {
    ...mapActions(['deleteAccount', 'logout', 'logoutAll']),
    ...mapMutations(['addAlert']),

    async onLogout() {
      try {
        await this.logout();
        this.$router.replace('/login');
      } catch (error) {
        this.addAlert({
          message: error.message,
          state: 'error',
        });
      }
    },

    async onLogoutAll() {
      try {
        const ok = await this.$refs.confirmDialogue.show({
          title: 'Logout from all sessions',
          message: 'Are you sure? This action will logout all sessions from all your devices. You will need to login again.',
          okButton: 'Logout all',
          cancelButton: 'Keep them active',
        });

        if (!ok) return;

        await this.logoutAll();
        this.$router.replace('/login');
      } catch (error) {
        this.addAlert({
          message: error.message,
          state: 'error',
        });
      }
    },

    async onDelete() {
      try {
        const ok = await this.$refs.confirmDialogue.show({
          title: 'Delete Account',
          message: 'Are you sure you want to delete your account? All your tasks and data will be deleted and cannot be recovered.',
          okButton: 'Delete account',
          cancelButton: 'Keep account',
          isDestructive: true,
        });

        if (!ok) return;

        await this.deleteAccount();
        this.$router.replace('/register');
      } catch (error) {
        this.addAlert({
          message: error.message,
          state: 'error',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
}

.section {
  padding: 1.5em;
}

.section:last-of-type h3 {
  margin-bottom: calc(1rem + .5em);
}

.buttons-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em;
}
</style>
