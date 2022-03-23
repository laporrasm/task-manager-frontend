<template>
  <div v-show="isOpen" class="modal__mask">
    <div class="modal">
      <h2>{{ title }}</h2>

      <p>{{ message }}</p>

      <div class="buttons-container">
        <Button
          :variant="isDestructive ? 'primary' : 'secondary'"
          @click="cancel"
        >
          {{ cancelButton }}
        </Button>
        <Button
          type="submit"
          :variant="isDestructive ? 'secondary' : 'primary'"
          @click="confirm"
        >
          {{ okButton }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'Modal',

  components: { Button },

  data: () => ({
    isOpen: false,
    title: '',
    message: '',
    okButton: '',
    cancelButton: '',
    isDestructive: false,

    resolvePromise: undefined,
    rejectPromise: undefined,
  }),

  methods: {
    close() {
      this.isOpen = false;
    },

    open() {
      this.isOpen = true;
    },

    show({
      title,
      message,
      okButton = 'Confirm',
      cancelButton = 'Cancel',
      isDestructive = false,
    }) {
      this.title = title;
      this.message = message;
      this.okButton = okButton;
      this.cancelButton = cancelButton;
      this.isDestructive = isDestructive;

      this.open();

      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },

    confirm() {
      this.close();
      this.resolvePromise(true);
    },

    cancel() {
      this.close();
      this.resolvePromise(false);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  max-width: 480px;
  width: 100%;
  padding: 1.5em;
  background-color: var(--dark-color-2);
  border: 1px solid var(--main-color-1);
  border-radius: 4px;

  p {
    margin: 1em 0 1.5em;
  }

  .buttons-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1em;
  }

  &__mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    place-content: center;
    place-items: center;
    gap: 1em;
    padding: 1em;
    background-color: rgba($color: #000000, $alpha: .75);
  }
}
</style>
