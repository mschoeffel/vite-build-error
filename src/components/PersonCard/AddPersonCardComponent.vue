<template>
  <div class="w-full">
    <div
      class="
        relative
        rounded-lg
        border border-gray-300
        bg-white
        px-6
        py-5
        shadow-sm
        flex
        items-center
        space-x-3
        hover:border-gray-400
        focus-within:ring-2
        focus-within:ring-offset-2
        focus-within:ring-indigo-500
      "
      @click="openSelectDialog"
    >
      <div class="flex-shrink-0">
        <PlusIcon class="h-10 w-10 rounded-full" />
      </div>
      <div class="flex-1 min-w-0">
        <a href="#" class="focus:outline-none">
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-sm font-medium text-gray-900">{{ text }}</p>
        </a>
      </div>
    </div>
    <PersonSelectDialog
      ref="selectDialog"
      @selectPerson="add"
    ></PersonSelectDialog>
  </div>
</template>

<script lang="ts">
  import { PlusIcon } from '@heroicons/vue/solid'
  import { defineComponent } from 'vue'
  import PersonSelectDialog from '../Person/PersonSelectDialog.vue'
  export default defineComponent({
    name: 'AddPersonCardComponent',
    components: {
      PersonSelectDialog,
      PlusIcon,
    },
    props: {
      text: {
        type: String,
        default: '',
      },
    },
    emits: ['add'],
    data() {
      return {
        select: false,
      }
    },
    methods: {
      openSelectDialog() {
        this.$refs.selectDialog.open = true
      },
      add(personId) {
        this.select = true
        this.$emit('add', personId)
      },
    },
  })
</script>

<style scoped></style>
