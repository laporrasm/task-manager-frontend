<template>
  <div class="avatar" :class="sizeClass">
    <img
      v-if="avatar"
      :src="avatar"
      alt="avatar"
      class="avatar"
    />
    <span v-else>{{ (user.name || '').charAt(0) }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Avatar',

  props: {
    size: {
      required: true,
      type: String,
    },
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user || {},
      avatar: (state) => state.auth.avatar,
    }),

    sizeClass() {
      switch (this.size) {
        case 'small':
          return 'avatar--small';
        case 'large':
          return 'avatar--large';
        default:
          return 'avatar--large';
      }
    },
  },
};
</script>

<style lang="scss">
.avatar {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  display: grid;
  place-content: center;
  place-items: center;
  color: var(--text-color-high);
  background-color: var(--primary-color);
  border-radius: 50%;
  user-select: none;

  &--small {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }

  &--large {
    width: 100px;
    height: 100px;
    font-size: 3rem;
  }
}
</style>
