<template>
  <Sidebar selecteditem="Wohnungen">
    <Header title="Wohnungen" @add="openCreateApartmentDialog"></Header>
    <ApartmentCreateDialog
      ref="apartmentcreatedialog"
      @createApartment="createNewApartment"
    ></ApartmentCreateDialog>
    <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
      <div class="flex-1 relative z-0 flex overflow-hidden">
        <main
          class="flex-1 overflow-y-auto"
          :class="selectedApartment !== undefined ? 'xs:hidden' : ''"
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
              <button
                type="button"
                :class="
                  potentialTenantFilter
                    ? 'border-indigo-500 border-r-4'
                    : 'border-gray-300'
                "
                class="
                  inline-flex
                  justify-center
                  px-3.5
                  py-2
                  border
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
                @click="$refs.filterdialog.open = true"
              >
                <FilterIcon
                  class="h-5 w-5"
                  :class="
                    potentialTenantFilter ? 'text-indigo-500' : 'text-gray-400'
                  "
                  aria-hidden="true"
                />
                <span class="sr-only">Filter</span>
              </button>
              <FilterApartmentDialog
                ref="filterdialog"
                @filter="filterPotentialTenant"
              ></FilterApartmentDialog>
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
                  <h3>Wohnungen</h3>
                </div>

                <div class="flex-1 min-w-0">
                  <p>Daten</p>
                </div>
                <div class="flex-1 min-w-0">
                  <p>Mieter</p>
                </div>
                <div
                  class="flex-1 min-w-0 items-center space-x-2 hidden md:block"
                >
                  <p>Interesennten</p>
                </div>
              </div>
            </div>
            <ul class="relative z-0 divide-y divide-gray-200">
              <ApartmentListItemComponent
                v-for="apartment in filteredApartments"
                :key="apartment.id"
                :apartment="apartment"
                :selected="
                  selectedApartment !== undefined &&
                  selectedApartment.id === apartment.id
                "
                @selectApartment="selectWohnung(apartment)"
              ></ApartmentListItemComponent>
            </ul>
          </nav>
        </main>

        <!-- Secondary column (hidden on smaller screens) -->
        <aside
          v-if="selectedApartment !== undefined"
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
              @click="selectedApartment = undefined"
            >
              <ChevronLeftIcon
                class="-ml-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>Auswahl</span>
            </a>
          </nav>

          <article v-if="selectedApartment !== undefined" class="pb-12">
            <ApartmentDetailComponent
              v-if="selectedApartment !== undefined"
              ref="apartmentDetail"
              :apartment="selectedApartment"
              @removeTenant="removeTenantOfSelectedApartment"
              @addTenant="addTenantToSelectedApartment"
              @removePotentialTenant="removePotentialTenantOfSelectedApartment"
              @addPotentialTenant="addPotentialTenantToSelectedApartment"
              @updateApartment="updateApartment"
              @removeApartment="removeApartment"
            ></ApartmentDetailComponent>
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
  import { ChevronLeftIcon, FilterIcon, SearchIcon } from '@heroicons/vue/solid'
  import ApartmentListItemComponent from '../components/Apartment/ApartmentListItemComponent.vue'
  import Apartment, {
    createApartment,
    filterForPotentialTenant,
    getAllApartments,
  } from '../api/model/apartment'
  import ApartmentDetailComponent from '../components/Apartment/ApartmentDetailComponent.vue'
  import FilterApartmentDialog from '../components/Filter/FilterApartmentDialog.vue'
  import ApartmentCreateDialog from '../components/Apartment/ApartmentCreateDialog.vue'

  export default defineComponent({
    components: {
      ApartmentCreateDialog,
      FilterApartmentDialog,
      ApartmentDetailComponent,
      ApartmentListItemComponent,
      Header,
      ChevronLeftIcon,
      FilterIcon,
      SearchIcon,
      Sidebar,
    },
    inject: ['notify'],
    data(): {
      apartments: Array<Apartment>
      filteredApartments: Array<Apartment>
      selectedApartment: Apartment | undefined
      sidebarOpen: boolean
      searchString: string
      potentialTenantFilter: boolean
    } {
      return {
        apartments: [],
        filteredApartments: [],
        selectedApartment: undefined,
        sidebarOpen: false,
        searchString: '',
        potentialTenantFilter: false,
      }
    },
    beforeMount(): void {
      const result = getAllApartments(true)
      if (!result.isError()) {
        this.apartments = result.data
        this.filteredApartments = result.data
      } else {
        this.notify('error', 'Fehler beim Abrufen der Wohnungen', result.error)
      }

      if (this.$route.params.id !== '') {
        const paramResult = this.apartments.find(
          (a) => a.id === parseInt(this.$route.params.id)
        )
        if (paramResult !== undefined) {
          this.selectedApartment = paramResult
        } else {
          this.notify(
            'error',
            'Fehler beim Abrufen des Apartments ' + this.$route.params.id,
            'Apartment mit dieser Id nicht vorhanden'
          )
        }
      }
    },
    methods: {
      selectWohnung(apartment: Apartment): void {
        if (
          this.selectedApartment !== undefined &&
          this.selectedApartment.id === apartment.id
        ) {
          this.selectedApartment = undefined
        } else {
          this.selectedApartment = apartment
        }
      },
      removeTenantOfSelectedApartment() {
        if (this.selectedApartment !== undefined) {
          this.selectedApartment.tenant = null
        }
      },
      addTenantToSelectedApartment(tenantId) {
        if (this.selectedApartment !== undefined) {
          this.selectedApartment.tenant = tenantId
        }
      },
      removePotentialTenantOfSelectedApartment(potentialTenantId) {
        if (this.selectedApartment !== undefined) {
          this.selectedApartment.potential_tenants =
            this.selectedApartment.potential_tenants.filter(
              (i) => i !== potentialTenantId
            )
        }
      },
      addPotentialTenantToSelectedApartment(potentialTenantId) {
        if (this.selectedApartment !== undefined) {
          this.selectedApartment.potential_tenants.push(potentialTenantId)
        }
      },
      updateApartment(apt) {
        Object.assign(this.selectedApartment, apt)
      },
      openCreateApartmentDialog() {
        this.$refs.apartmentcreatedialog.open = true
      },
      createNewApartment(apartment) {
        const result = createApartment(apartment, true)
        if (!result.isError()) {
          this.apartments.push(result.data)
          this.selectedApartment = result.data
        } else {
          this.notify(
            'error',
            'Fehler beim Erstellen der Wohnungen',
            result.error
          )
        }
      },
      removeApartment(apartmentId) {
        this.selectedApartment = undefined
        this.apartments = this.apartments.filter((a) => a.id !== apartmentId)
      },
      search() {
        this.filteredApartments = this.apartments.filter((a) => {
          return (
            a.street.includes(this.searchString) ||
            a.street_number.includes(this.searchString) ||
            a.city.includes(this.searchString) ||
            a.postcode.includes(this.searchString)
          )
        })
      },
      filterPotentialTenant(potentialTenantId) {
        if (potentialTenantId === 0) {
          this.filteredApartments = this.apartments
          this.searchString = ''
          this.potentialTenantFilter = false
        } else {
          const result = filterForPotentialTenant(potentialTenantId)
          if (!result.isError()) {
            this.filteredApartments = result.data
            this.searchString = ''
            this.potentialTenantFilter = true
          } else {
            this.notify(
              'error',
              'Fehler beim Filtern der Wohnungen',
              result.error
            )
          }
        }
      },
    },
  })
</script>
