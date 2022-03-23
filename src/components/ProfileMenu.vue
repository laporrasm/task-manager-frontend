<template>
  <div class="profile-menu" v-click-outside="close">
    <button class="profile-menu__toggler" @click="toggle">
      <Avatar size="small" />
      <span>{{firstName}}</span>
      <unicon name="angle-down" fill="currentColor" width="20px" height="20px" />
    </button>

    <transition name="menu">
      <ul class="profile-menu__menu" v-show="isOpen" @click.stop="close">
        <li class="profile-snippet">
          <Avatar size="small" />
          <h5>{{ user.name }}</h5>
          <span>{{ user.email }}</span>
        </li>

        <EllipsisMenuItem icon="user" to="/account">My Account</EllipsisMenuItem>
        <EllipsisMenuItem icon="sign-out-alt" @click="onLogout">Sign out</EllipsisMenuItem>
      </ul>
    </transition>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';

import { mapActions, mapMutations, mapState } from 'vuex';

import Avatar from './Avatar.vue';
import EllipsisMenuItem from './EllipsisMenuItem.vue';

export default {
  name: 'ProfileMenu',

  components: { Avatar, EllipsisMenuItem },

  directives: {
    clickOutside: vClickOutside.directive,
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    firstName() {
      const { name = 'User' } = this.user || {};

      if (name.indexOf(' ') >= 0) {
        return name.substring(0, name.indexOf(' '));
      }
      return name;
    },
  },

  data: () => ({
    isOpen: false,
  }),

  methods: {
    ...mapActions(['logout']),
    ...mapMutations(['addAlert']),

    open() {
      this.isOpen = true;
    },

    close() {
      this.isOpen = false;
    },

    toggle() {
      this.isOpen = !this.isOpen;
    },

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
  },
};
</script>

<style lang="scss" scoped>
.profile-menu {
  position: relative;

  &__menu {
    position: absolute;
    top: calc(100% + .5em);
    right: 0;
    min-width: 250px;
    max-width: 100vw;
    background-color: var(--dark-color-2);
    border: 1px solid var(--secondary-color);
    border-radius: 4px;
    z-index: 997;
  }

  &__toggler {
    display: flex;
    align-items: center;
    gap: .5em;
    color: var(--text-color-high);
  }
}

.profile-snippet {
  padding: 1em;
  display: grid;
  grid-template-areas: "avatar name" "avatar email";
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(2, auto);
  gap: .5em;
  border-bottom: 1px solid var(--dark-color-3);

  .avatar {
    grid-area: avatar;
  }

  h5 {
    margin: 0;
    color: var(--text-color-high);
    font-size: 1rem;
    font-weight: var(--medium);
    line-height: 100%;
  }

  span {
    font-size: .875rem;
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
