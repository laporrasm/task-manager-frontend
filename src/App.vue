<template>
  <div id="app">
    <LoadingScreen v-if="authLoader" />
    <RouterView v-else />
    <transition-group
      class="alerts-container"
      name="alerts"
      tag="ul"
    >
      <Alert
        v-for="(alert, index) in alerts"
        :index="index"
        :key="`${alert.message}-${index}`"
        :message="alert.message"
        :state="alert.state"
      />
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

import Alert from './components/Alert.vue';
import LoadingScreen from './components/LoadingScreen.vue';

export default {
  components: { Alert, LoadingScreen },

  computed: {
    ...mapState({
      authLoader: (state) => state.auth.authLoader,
      alerts: (state) => state.alerts,
    }),
  },

  methods: {
    ...mapActions(['authenticate']),
    ...mapMutations(['addAlert']),
  },

  async created() {
    const publicRoutes = ['Login', 'Register'];

    const currentRoute = this.$route.name;

    try {
      await this.authenticate();
      if (publicRoutes.includes(currentRoute)) {
        this.$router.replace({ name: 'Tasks' });
      }
    } catch (error) {
      if (!publicRoutes.includes(currentRoute)) {
        this.addAlert({
          message: error.message,
          state: 'error',
        });
        this.$router.replace({ name: 'Login' });
      }
    }
  },
};
</script>

<style scoped>
#app {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.alerts-container {
  position: absolute;
  top: 1em;
  right: 1em;
  max-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.alerts-enter,
.alerts-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.alert-enter-active,
.alert-leave-active,
.alert-move {
  transition: all 1s;
}

.alert-leave-active {
  position: absolute;
}
</style>
