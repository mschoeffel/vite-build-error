<template>
  <TextInfoComponent
    :id="id"
    :value="value ? 'ja' : 'nein'"
    :label="label"
  ></TextInfoComponent>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import TextInfoComponent from './TextInfoComponent.vue'

  export default defineComponent({
    name: 'BooleanInfoComponent',
    components: { TextInfoComponent },
    props: {
      value: {
        type: Boolean,
        default: false,
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
    },
  })
</script>
