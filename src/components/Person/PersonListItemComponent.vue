<template>
  <li :key="person.id" @click="selectPerson">
    <div
      :class="selected ? 'ring-2 ring-inset ring-indigo-500' : ''"
      class="
        relative
        px-6
        py-5
        flex
        items-center
        space-x-3
        hover:bg-gray-50
        focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500
      "
    >
      <div class="flex-shrink-0">
        <img
          class="h-10 w-10 rounded-full"
          :src="person.profile_image"
          alt=""
        />
      </div>
      <div class="flex-1 min-w-0">
        <a href="#" class="focus:outline-none">
          <!-- Extend touch target to entire panel -->
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-sm font-medium text-gray-900">
            {{ person.firstname }} {{ person.lastname }}
          </p>
        </a>
      </div>
      <div class="flex-1 min-w-0">
        <a href="#" class="focus:outline-none">
          <!-- Extend touch target to entire panel -->
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-sm font-medium text-gray-900">
            {{ person.street }} {{ person.street_number }}
          </p>
          <p class="text-sm text-gray-500 truncate">
            {{ person.postcode }} {{ person.city }}
          </p>
        </a>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Person from '../../api/model/person'

  export default defineComponent({
    name: 'PersonListItemComponent',
    props: {
      person: {
        type: Object as () => Person,
        default: null,
      },
      selected: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['selectPerson'],
    methods: {
      selectPerson(): void {
        this.$emit('selectPerson')
      },
    },
  })
</script>

<style scoped></style>
