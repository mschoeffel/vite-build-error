<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-500">{{
      label
    }}</label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        :id="id"
        :value="modelValue"
        type="text"
        :name="id + 'Name'"
        :class="appendix !== undefined ? 'pr-12' : ''"
        class="
          focus:ring-indigo-500 focus:border-indigo-500
          block
          w-full
          sm:text-sm
          border-gray-300
          rounded-md
        "
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div
        v-if="appendix !== undefined"
        class="
          absolute
          inset-y-0
          right-0
          pr-3
          flex
          items-center
          pointer-events-none
        "
      >
        <span :id="id + 'Appendix'" class="text-gray-500 sm:text-sm">
          {{ appendix }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'TextInputComponent',
    props: {
      modelValue: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '[LABEL NOT SET]',
        required: true,
      },
      id: {
        type: String,
        default: '[ID NOT SET]',
        required: true,
      },
      appendix: {
        type: String,
        default: undefined,
        required: false,
      },
    },
    emits: ['update:modelValue'],
  })
</script>

<style scoped></style>
