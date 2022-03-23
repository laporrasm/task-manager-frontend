<template>
  <section class="section">
    <Avatar size="large" />

    <div class="buttons-container">
      <ValidationProvider
        class="file-uploader"
        name="avatar"
        ref="input"
        rules="image|size:1024"
        tag="label"
      >
        <input
          class="file-uploader__input"
          type="file"
          @change="onUpload"
        />
        <unicon name="upload" fill="currentColor" width="18px" height="18px" />
        Upload
      </ValidationProvider>

      <Button @click="onDelete">
        Delete
      </Button>
    </div>

    <p>
      Maximum file size is 1MB. Allowed file types: .jpg, .jpeg and .png
    </p>
  </section>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

import { mapActions, mapMutations } from 'vuex';

import Avatar from './Avatar.vue';
import Button from './Button.vue';

export default {
  name: 'UpdateAvatarForm',

  components: { Avatar, Button, ValidationProvider },

  data: () => ({
    loader: false,
  }),

  methods: {
    ...mapActions(['addAvatar', 'removeAvatar']),
    ...mapMutations(['addAlert']),

    async onUpload(event) {
      try {
        this.loader = true;

        const file = event.target.files[0];

        const { errors, valid } = await this.$refs.input.validate(file);
        if (!valid) throw new Error(errors[0]);

        const formData = new FormData();
        formData.append('avatar', file);

        await this.addAvatar(formData);

        this.addAlert({
          message: 'Avatar updated',
          state: 'success',
        });
      } catch (error) {
        this.addAlert({
          message: error.message,
          state: 'error',
        });
      } finally {
        this.loader = false;
      }
    },

    async onDelete() {
      try {
        this.loader = true;
        await this.removeAvatar();
        this.addAlert({
          message: 'Avatar deleted',
          state: 'success',
        });
      } catch (error) {
        this.addAlert({
          message: error,
          state: 'error',
        });
      } finally {
        this.loader = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 1em;

  @media only screen and (min-width: 501px) {
    grid-template-columns: auto 1fr;
    grid-template-rows: repeat(2, auto);
    justify-content: flex-start;
    justify-items: flex-start;
    align-items: flex-start;

    .avatar {
      grid-row: 1 / -1;
    }
  }
}

.file-uploader {
  display: flex;
  align-items: center;
  gap: .5em;
  padding: .75em 1em;
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: var(--medium);
  box-shadow: 0 0 0 1px currentColor inset;
  // background-color: var(--dark-color-3);
  border-radius: 4px;
  cursor: pointer;
  transition: color 150ms, background-color 150ms;

  &__input {
    display: none;
  }
}

@media only screen and (max-width: 500px) {
  p {
    grid-column: 1 / -1;
  }
}

.buttons-container {
  align-self: flex-end;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em;
}
</style>
