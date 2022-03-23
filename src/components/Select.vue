<template>
  <label class="select">
    <span v-if="label" class="select__label">
      {{ label }}
    </span>
    <select
      class="select__field"
      :disabled="disabled"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :selected="option.value === value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <unicon name="angle-down" fill="currentColor" width="20px" height="20px" />
  </label>
</template>

<script>
export default {
  name: 'Select',

  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    label: {
      default: '',
      type: String,
    },
    options: {
      required: true,
      type: Array,
    },
    value: {
      required: true,
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  text-align: start;

  &__label {
    margin-right: .5em;
  }

  &__field {
    min-width: 120px;
    padding: 1em calc(.5em + 20px) 1em 1em;
    color: var(--text-color-high);
    font-size: 1rem;
    background-color: var(--dark-color-3);
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 300ms;

    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';

    &::-ms-expand {
      display: none;
    }

    &:disabled {
      opacity: .7;
      cursor: not-allowed;
    }

    &:focus {
      background-color: var(--secondary-color);
    }
  }
}

.unicon {
  position: absolute;
  top: calc(50% - 10px);
  right: .25em;
  pointer-events: none;
}
</style>
