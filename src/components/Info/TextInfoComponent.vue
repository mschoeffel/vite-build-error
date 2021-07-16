<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-500">{{
      label
    }}</label>
    <div class="mt-1 relative rounded-md">
      <p :id="id" class="text-sm"> {{ value }} {{ appendix }} </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'TextInfoComponent',
    props: {
      value: {
        type: [String, Number],
        default: '',
        required: true,
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
        default: '',
        required: false,
      },
    },
  })
</script>
