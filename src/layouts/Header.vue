<template>
  <div
    class="
      border-b border-gray-200
      px-4
      py-4
      sm:flex sm:items-center sm:justify-between sm:px-6
      lg:px-8
      flex
      items-center
    "
  >
    <div class="flex-1 min-w-0">
      <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
        {{ title }}
      </h1>
    </div>
    <div class="flex sm:ml-4">
      <button
        type="button"
        class="
          order-0
          inline-flex
          items-center
          px-4
          py-2
          border border-transparent
          shadow-sm
          text-sm
          font-medium
          rounded-md
          text-white
          bg-indigo-600
          hover:bg-indigo-700
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
          sm:order-1 sm:ml-3
        "
        @click="add"
      >
        Hinzufügen
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Header',
    props: {
      title: {
        type: String,
        default: 'MiWo',
      },
    },
    emits: ['add'],
    methods: {
      add() {
        this.$emit('add')
      },
    },
  })
</script>

<style scoped></style>
