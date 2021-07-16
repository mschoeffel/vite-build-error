<template>
  <Sidebar selecteditem="Personen">
    <Header title="Personen" @add="openCreatePersonDialog"></Header>
    <PersonCreateDialog
      ref="personcreatedialog"
      @createPerson="createNewPerson"
    ></PersonCreateDialog>
    <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
      <div class="flex-1 relative z-0 flex overflow-hidden">
        <main
          class="flex-1 overflow-y-auto"
          :class="selectedPerson !== undefined ? 'xs:hidden' : ''"
        >
          <div class="px-6 pt-6 pb-4">
            <form class="flex space-x-4" action="#">
              <div class="flex-1 min-w-0">
                <label for="search" class="sr-only">Suche</label>
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
                    <SearchIcon
                      class="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search"
                    v-model="searchString"
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
                    @input="search"
                  />
                </div>
              </div>
            </form>
          </div>
          <!-- Directory list -->
          <nav class="flex-1 min-h-0 overflow-y-auto" aria-label="Directory">
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
                text-gray-500
                relative
              "
            >
              <div class="relative px-6 flex items-center space-x-3">
                <div class="flex-shrink-0 pr-4"></div>
                <div class="flex-1 min-w-0 font-bold">
                  <h3>Personen</h3>
                </div>

                <div class="flex-1 min-w-0 pl-4">
                  <p>Wohnort</p>
                </div>
              </div>
            </div>
            <ul class="relative z-0 divide-y divide-gray-200">
              <PersonListItemComponent
                v-for="person in filteredPersons"
                :key="person.id"
                :person="person"
                :selected="
                  selectedPerson !== undefined &&
                  selectedPerson.id === person.id
                "
                @selectPerson="selectPerson(person)"
              ></PersonListItemComponent>
            </ul>
          </nav>
        </main>

        <!-- Secondary column (hidden on smaller screens) -->
        <aside
          v-if="selectedPerson !== undefined"
          class="
            w-full
            md:w-1/2
            bg-white
            border-l border-gray-200
            overflow-y-auto
            lg:block
          "
        >
          <!-- Breadcrumb -->
          <nav
            class="flex items-start px-4 py-3 sm:px-6 lg:px-8 md:hidden"
            aria-label="Breadcrumb"
          >
            <a
              class="
                inline-flex
                items-center
                space-x-3
                text-sm
                font-medium
                text-gray-900
                cursor-pointer
              "
              @click="selectedPerson = undefined"
            >
              <ChevronLeftIcon
                class="-ml-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>Auswahl</span>
            </a>
          </nav>

          <article v-show="selectedPerson !== undefined" class="pb-12">
            <PersonDetailComponent
              ref="persondetail"
              :person="selectedPerson"
              @updatePerson="updatePerson"
              @removePerson="removePerson"
            ></PersonDetailComponent>
          </article>
        </aside>
      </div>
    </div>
  </Sidebar>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Sidebar from '../layouts/Sidebar.vue'
  import Header from '../layouts/Header.vue'
  import { ChevronLeftIcon, SearchIcon } from '@heroicons/vue/solid'
  import PersonCreateDialog from '../components/Person/PersonCreateDialog.vue'
  import PersonListItemComponent from '../components/Person/PersonListItemComponent.vue'
  import PersonDetailComponent from '../components/Person/PersonDetailComponent.vue'
  import Person, { createPerson, getAllPersons } from '../api/model/person'

  export default defineComponent({
    name: 'Persons',
    components: {
      PersonDetailComponent,
      PersonListItemComponent,
      PersonCreateDialog,
      Header,
      ChevronLeftIcon,
      SearchIcon,
      Sidebar,
    },
    inject: ['notify'],
    data(): {
      persons: Array<Person>
      filteredPersons: Array<Person>
      selectedPerson: Person | undefined
      sidebarOpen: boolean
      searchString: string
    } {
      return {
        persons: [],
        filteredPersons: [],
        selectedPerson: undefined,
        sidebarOpen: false,
        searchString: '',
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
      if (this.$route.params.id !== '') {
        const paramResult = this.persons.find(
          (p) => p.id === parseInt(this.$route.params.id)
        )
        if (paramResult !== undefined) {
          this.selectedPerson = paramResult
        } else {
          this.notify(
            'error',
            'Fehler beim Abrufen der Person ' + this.$route.params.id,
            'Person mit dieser Id nicht vorhanden'
          )
        }
      }
    },
    methods: {
      selectPerson(person: Person): void {
        if (
          this.selectedPerson !== undefined &&
          this.selectedPerson.id === person.id
        ) {
          this.selectedPerson = undefined
        } else {
          this.selectedPerson = person
        }
      },
      updatePerson(person) {
        Object.assign(this.selectedPerson, person)
      },
      openCreatePersonDialog() {
        this.$refs.personcreatedialog.open = true
      },
      createNewPerson(person) {
        const result = createPerson(person, true)
        if (!result.isError()) {
          this.persons.push(result.data)
          this.selectedPerson = result.data
        } else {
          this.notify('error', 'Fehler beim Erstellen der Person', result.error)
        }
      },
      removePerson(personId) {
        this.selectedPerson = undefined
        this.persons = this.persons.filter((p) => p.id !== personId)
      },
      search() {
        this.filteredPersons = this.persons.filter((p) => {
          return (
            p.firstname.includes(this.searchString) ||
            p.lastname.includes(this.searchString)
          )
        })
      },
    },
  })
</script>
