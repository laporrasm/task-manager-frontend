<template>
  <div class="alert" :class="stateClass">
    <span>{{ message }}</span>
    <button class="close-button" @click="removeAlert(index)">
      <unicon
        name="times"
        fill="currentColor"
        width="24px"
        height="24px"
      />
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Alert',

  props: {
    index: {
      required: true,
      type: Number,
    },
    message: {
      required: true,
      type: String,
    },
    state: {
      required: true,
      type: String,
    },
  },

  computed: {
    stateClass() {
      switch (this.state) {
        case 'success':
          return 'alert--success';
        case 'error':
          return 'alert--error';
        default:
          return 'alert--success';
      }
    },
  },

  methods: {
    ...mapMutations(['removeAlert']),
  },

  created() {
    setTimeout(() => this.removeAlert(this.index), 5000);
  },
};
</script>

<style lang="scss" scoped>
.alert {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 1em;
  padding: 1em 1em 1em calc(1em + 3px);
  color: var(--text-color-high);
  background-color: var(--dark-color-2);
  border: 1px solid var(--dark-color-3);
  border-left: 3px solid currentColor;
  border-radius: 4px;
  box-shadow: 0 0 10px 10px rgba($color: #000000, $alpha: .5);

  &--error {
    border-left-color: var(--danger-color);
  }

  &--success {
    border-left-color: var(--success-color);
  }
}

.close-button {
  color: var(--text-color-low);

  &:hover {
    color: var(--text-color-high);
  }
}
</style>
