<template>
  <div class="home">
    <Header />
    <NavBar />
    <main class="main">
      <transition name="view">
        <RouterView />
      </transition>
    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import NavBar from '../components/NavBar.vue';

export default {
  name: 'Home',

  components: { Header, NavBar },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: grid;
  grid-template-areas: "header" "main" "navbar";
  grid-template-rows: auto 1fr auto;
  overflow-x: hidden;

  @media only screen and (min-width: 768px) {
    grid-template-areas: "header header" "navbar main";
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto 1fr;
  }
}

.main {
  position: relative;
  grid-area: main;
  padding: 2em .5em;
  overflow-x: hidden;
  overflow-y: auto;

  @media only screen and (min-width: 768px) {
    padding: 2em 3em;
  }
}

.content {
  max-width: 768px;
  width: 100%;
  min-height: 100%;
}

.view-enter,
.view-leave-to {
  transform: translateX(30px);
  opacity: 0
}

.view-enter-active {
  transition: all 400ms 300ms;
}

.view-leave-active {
  transition: all 400ms;
}

@media only screen and (min-width: 768px) {
  .view-leave-active {
    position: absolute;
  }
}
</style>
