<template>
  <div class="px-6 pt-6 pb-4">
    <form class="mt-6 flex space-x-4" action="#">
      <div class="flex-1 min-w-0">
        <label for="search" class="sr-only">Search</label>
        <div class="relative rounded-md shadow-sm">
          <div
            class="
              absolute
              inset-y-0
              left-0
              pl-3
              flex
              items-center
              pointer-events-none
            "
          >
            <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search"
            v-model="searchInput"
            type="search"
            name="search"
            class="
              focus:ring-indigo-500 focus:border-indigo-500
              block
              w-full
              pl-10
              sm:text-sm
              border-gray-300
              rounded-md
            "
            placeholder="Suche"
            @input="updateList"
          />
        </div>
      </div>
    </form>
  </div>
  <nav class="flex-1 min-h-0 overflow-y-auto max-h-96" aria-label="Directory">
    <div class="relative">
      <div
        class="
          z-10
          sticky
          top-0
          border-t border-b border-gray-200
          bg-gray-50
          px-6
          py-1
          text-sm
          font-medium
          text-gray-500 text-left
        "
      >
        <h3>Personen</h3>
      </div>
      <ul class="relative z-0 divide-y divide-gray-200">
        <li
          v-for="person in filteredPersons"
          :key="person.id"
          @click="selectPerson(person.id)"
        >
          <div
            class="
              relative
              px-6
              py-5
              flex
              items-center
              space-x-3
              hover:bg-gray-50
              focus-within:ring-2
              focus-within:ring-inset
              focus-within:ring-indigo-500
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
                <span class="absolute inset-0" aria-hidden="true" />
                <p class="text-sm font-medium text-gray-900">
                  {{ person.firstname }} {{ person.lastname }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ person.email }}
                </p>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
  import { SearchIcon } from '@heroicons/vue/solid'
  import Person, { getAllPersons } from '../../api/model/person'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'PersonSelectList',
    components: {
      SearchIcon,
    },
    inject: ['notify'],
    emits: ['selectPerson'],
    data(): {
      persons: Array<Person>
      filteredPersons: Array<Person>
      searchInput: string
    } {
      return {
        persons: [],
        filteredPersons: [],
        searchInput: '',
      }
    },
    beforeMount(): void {
      const result = getAllPersons(true)
      if (!result.isError()) {
        this.persons = result.data
        this.filteredPersons = result.data
      } else {
        this.notify('error', 'Fehler beim Abrufen der Personen', result.error)
      }
    },
    methods: {
      selectPerson(id): void {
        this.$emit('selectPerson', id)
      },
      updateList(): void {
        this.filteredPersons = this.persons.filter(
          (p) =>
            p.firstname.includes(this.searchInput) ||
            p.lastname.includes(this.searchInput)
        )
      },
    },
  })
</script>

<style scoped></style>
