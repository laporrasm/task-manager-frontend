<template>
  <div class="loading-screen">
    <Spinner :size="spinnerSize" />
  </div>
</template>

<script>
import Spinner from './Spinner.vue';

export default {
  name: 'LoadingScreen',

  components: { Spinner },

  props: {
    spinnerSize: {
      default: 'large',
      type: String,
    },
  },
};
</script>

<style scoped>
.loading-screen {
  height: 100%;
  display: grid;
  place-content: center;
  place-items: center;
  padding: 2em;
}
</style>
