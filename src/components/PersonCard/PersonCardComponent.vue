<template>
  <div
    :key="id"
    class="
      w-full
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
    "
    :class="
      edit
        ? ''
        : 'hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
    "
    @click="navigateToPerson"
  >
    <div class="flex-shrink-0">
      <img class="h-10 w-10 rounded-full" :src="image" alt="" />
    </div>
    <div class="flex-1 min-w-0">
      <a href="#" class="focus:outline-none">
        <span class="absolute inset-0" aria-hidden="true" />
        <p class="text-sm font-medium text-gray-900">
          {{ main }}
        </p>
        <p class="text-sm text-gray-500 truncate">
          {{ secondary }}
        </p>
      </a>
    </div>
    <button
      v-if="edit"
      type="button"
      class="
        z-10
        inline-flex
        justify-center
        px-3.5
        py-2
        border border-gray-300
        shadow-sm
        text-sm
        font-medium
        rounded-md
        text-gray-700
        bg-white
        hover:bg-gray-50
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-indigo-500
      "
      @click.stop.prevent="removePerson"
    >
      <TrashIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      <span class="sr-only">Löschen</span>
    </button>
  </div>
</template>

<script lang="ts">
  import { TrashIcon } from '@heroicons/vue/solid'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'PersonCardComponent',
    components: {
      TrashIcon,
    },
    props: {
      id: {
        type: Number,
        default: null,
      },
      image: {
        default: '',
        type: String,
      },
      edit: {
        default: false,
        type: Boolean,
      },
      main: {
        type: String,
        default: '',
      },
      secondary: {
        type: String,
        default: '',
      },
    },
    emits: ['removePerson'],
    methods: {
      removePerson(): void {
        this.$emit('removePerson')
      },
      navigateToPerson() {
        this.$router.push('/persons/' + this.id)
      },
    },
  })
</script>

<style scoped></style>
