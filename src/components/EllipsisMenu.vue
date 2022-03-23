<template>
  <div class="ellipsis-menu" v-click-outside="close">
    <button
      class="ellipsis-menu__button"
      title="More"
      :class="{ active: isOpen }"
      @click="toggle"
    >
      <unicon
        name="ellipsis-h"
        fill="currentColor"
        width="24px"
        height="24px"
      />
    </button>

    <transition name="menu">
      <ul
        v-show="isOpen"
        class="ellipsis-menu__menu"
        @click.stop="close"
      >
        <slot></slot>
      </ul>
    </transition>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';

export default {
  name: 'EllipsisMenu',

  directives: {
    clickOutside: vClickOutside.directive,
  },

  data: () => ({
    isOpen: false,
  }),

  methods: {
    open() {
      this.isOpen = true;
    },

    close() {
      this.isOpen = false;
    },

    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.ellipsis-menu {
  position: relative;

  &__menu {
    position: absolute;
    top: calc(100% + .5em);
    right: 0;
    width: 200px;
    background-color: var(--dark-color-2);
    border: 1px solid var(--secondary-color);
    border-radius: 4px;
    z-index: 997;
  }

  &__button {
    width: 2.25em;
    height: 2.25em;
    display: grid;
    place-content: center;
    place-items: center;
    color: var(--text-color-medium);
    font-size: 1rem;
    border-radius: 50%;
    transition: color 150ms, background-color 150ms;

    &:hover {
      color: var(--primary-color);
      background-color: var(--secondary-color);
    }

    &.active {
      background-color: var(--secondary-color);
    }
  }
}

.menu-enter,
.menu-leave-to {
  opacity: 0;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 300ms;
}
</style>
