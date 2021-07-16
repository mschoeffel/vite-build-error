<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-500">{{
      label
    }}</label>
    <div class="mt-1 relative rounded-md">
      <Switch
        :id="id"
        v-model="localValue"
        :class="[
          localValue ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        ]"
      >
        <span class="sr-only">Besitzt {{ label }}</span>
        <span
          aria-hidden="true"
          :class="[
            localValue ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
          ]"
        />
      </Switch>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Switch } from '@headlessui/vue'

  export default defineComponent({
    name: 'BooleanInputComponent',
    components: {
      Switch,
    },
    props: {
      modelValue: {
        type: Boolean,
        default: false,
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
    emits: ['update:modelValue'],
    computed: {
      localValue: {
        get(): boolean {
          return this.modelValue
        },
        set(localValue: boolean): void {
          this.$emit('update:modelValue', localValue)
        },
      },
    },
  })
</script>

<style scoped></style>
