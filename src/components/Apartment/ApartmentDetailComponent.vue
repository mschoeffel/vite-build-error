<template>
  <div>
    <!-- Profile header -->
    <div>
      <div>
        <img
          class="h-32 w-full object-cover lg:h-48"
          :src="apartment.cover_image"
          alt=""
        />
      </div>
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div class="flex">
            <img
              class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              :src="apartment.profile_image"
              alt=""
            />
          </div>
          <div
            class="
              mt-6
              sm:flex-1
              sm:min-w-0
              sm:flex
              sm:items-center
              sm:justify-end
              sm:space-x-6
              sm:pb-1
            "
          >
            <div class="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
              <!--<h1 class="text-2xl font-bold text-gray-900 truncate">
              {{ apartment.strasse }} {{apartment.hausnummer}}
            </h1>-->
              <h1 class="text-2xl font-bold text-gray-900 truncate">
                {{ apartment.street }}
                {{ apartment.street_number }}
              </h1>
              <p class="text-sm text-gray-500 truncate">
                {{ apartment.postcode }} {{ apartment.city }}
              </p>
            </div>
            <div
              v-if="!edit"
              class="
                mt-6
                flex flex-col
                justify-stretch
                space-y-3
                sm:flex-row sm:space-y-0 sm:space-x-4
              "
            >
              <button
                type="button"
                class="
                  inline-flex
                  justify-center
                  px-4
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
                @click="startEdit"
              >
                <PencilIcon
                  class="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Bearbeiten</span>
              </button>
              <button
                type="button"
                class="
                  inline-flex
                  justify-center
                  px-4
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
                @click="deleteApartment"
              >
                <TrashIcon
                  class="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Löschen</span>
              </button>
            </div>
            <div
              v-else
              class="
                mt-6
                flex flex-col
                justify-stretch
                space-y-3
                sm:flex-row sm:space-y-0 sm:space-x-4
              "
            >
              <button
                type="button"
                class="
                  inline-flex
                  justify-center
                  px-4
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
                @click="saveApartment"
              >
                <SaveIcon
                  class="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Speichern</span>
              </button>
              <button
                type="button"
                class="
                  inline-flex
                  justify-center
                  px-4
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
                @click="cancelEdit"
              >
                <XIcon
                  class="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Verwerfen</span>
              </button>
            </div>
          </div>
        </div>
        <div class="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
          <h1 class="text-2xl font-bold text-gray-900 truncate"> TEST TEST </h1>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="mt-6 sm:mt-2 2xl:mt-5">
      <div class="border-b border-gray-200">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <a
              key="Daten"
              href="#"
              class="
                border-indigo-500
                text-gray-900
                whitespace-nowrap
                py-4
                px-1
                border-b-2
                font-medium
                text-sm
              "
              aria-current="page"
            >
              Daten
            </a>
          </nav>
        </div>
      </div>
    </div>

    <!-- Description list -->
    <div v-if="!edit" class="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <dl class="grid grid-cols-2 gap-x-4 gap-y-8">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Status</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ apartment.tenant === null ? 'Frei' : 'Belegt' }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <TextInfoComponent
            id="areaInfo"
            :value="apartment.area"
            label="Gebiet"
          ></TextInfoComponent>
        </div>
        <div class="sm:col-span-1">
          <TextInfoComponent
            id="priceInfo"
            :value="apartment.price"
            label="Preis"
            appendix="€"
          ></TextInfoComponent>
        </div>
        <div class="sm:col-span-1">
          <TextInfoComponent
            id="room_countInfo"
            :value="apartment.room_count"
            label="Raumanzahl"
          ></TextInfoComponent>
        </div>
        <div class="sm:col-span-1">
          <TextInfoComponent
            id="sizeInfo"
            :value="apartment.size"
            label="Größe"
            appendix="m²"
          ></TextInfoComponent>
        </div>
        <div class="sm:col-span-1">
          <TextInfoComponent
            id="levelInfo"
            :value="apartment.level"
            label="Etage"
          ></TextInfoComponent>
        </div>
        <div class="sm:col-span-1">
          <BooleanInfoComponent
            id="bathtubInfo"
            :value="apartment.bathtub"
            label="Badewanne"
          ></BooleanInfoComponent>
        </div>
        <div class="sm:col-span-1">
          <BooleanInfoComponent
            id="showerInfo"
            :value="apartment.shower"
            label="Dusche"
          ></BooleanInfoComponent>
        </div>
        <div class="sm:col-span-1">
          <BooleanInfoComponent
            id="bathroom_windowInfo"
            :value="apartment.bathroom_window"
            label="Badfenster"
          ></BooleanInfoComponent>
        </div>
        <div class="sm:col-span-1">
          <BooleanInfoComponent
            id="kitchenInfo"
            :value="apartment.kitchen"
            label="Küche"
          ></BooleanInfoComponent>
        </div>
        <div class="sm:col-span-1">
          <BooleanInfoComponent
            id="balconyInfo"
            :value="apartment.balcony"
            label="Balkon"
          ></BooleanInfoComponent>
        </div>
        <div class="sm:col-span-1">
          <BooleanInfoComponent
            id="terraceInfo"
            :value="apartment.terrace"
            label="Terasse"
          ></BooleanInfoComponent>
        </div>
        <div class="sm:col-span-1">
          <BooleanInfoComponent
            id="basementInfo"
            :value="apartment.basement"
            label="Keller"
          ></BooleanInfoComponent>
        </div>
        <div class="col-span-2">
          <TextInfoComponent
            id="descriptionInfo"
            :value="apartment.description"
            label="Beschreibung"
          ></TextInfoComponent>
        </div>
      </dl>
    </div>
    <div v-else class="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <dl class="grid grid-cols-2 gap-x-4 gap-y-8">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Status</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ apartment.tenant == null ? 'Frei' : 'Belegt' }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <TextInputComponent
            id="areaInput"
            v-model="apartmentTemp.area"
            label="Gebiet"
          ></TextInputComponent>
        </div>
        <div class="sm:col-span-1">
          <NumberInputComponent
            id="priceInput"
            v-model.number="apartmentTemp.price"
            label="Preis"
            appendix="€"
          ></NumberInputComponent>
        </div>
        <div class="sm:col-span-1">
          <NumberInputComponent
            id="room_countInput"
            v-model.number="apartmentTemp.room_count"
            label="Raumanzahl"
          ></NumberInputComponent>
        </div>
        <div class="sm:col-span-1">
          <NumberInputComponent
            id="sizeInput"
            v-model.number="apartmentTemp.size"
            label="Größe"
            appendix="m²"
          ></NumberInputComponent>
        </div>
        <div class="sm:col-span-1">
          <NumberInputComponent
            id="levelInput"
            v-model.number="apartmentTemp.level"
            label="Etage"
          ></NumberInputComponent>
        </div>
        <div class="sm:col-span-1">
          <BooleanInputComponent
            id="bathtubInput"
            v-model="apartmentTemp.bathtub"
            label="Badewanne"
          ></BooleanInputComponent>
        </div>
        <div class="sm:col-span-1">
          <BooleanInputComponent
            id="showerInput"
            v-model="apartmentTemp.shower"
            label="Dusche"
          ></BooleanInputComponent>
        </div>
        <div class="sm:col-span-1">
          <BooleanInputComponent
            id="bathroom_windowInput"
            v-model="apartmentTemp.bathroom_window"
            label="Badfenster"
          ></BooleanInputComponent>
        </div>
        <div class="sm:col-span-1">
          <BooleanInputComponent
            id="kitchenInput"
            v-model="apartmentTemp.kitchen"
            label="Küche"
          ></BooleanInputComponent>
        </div>
        <div class="sm:col-span-1">
          <BooleanInputComponent
            id="balconyInput"
            v-model="apartmentTemp.balcony"
            label="Balkon"
          ></BooleanInputComponent>
        </div>
        <div class="sm:col-span-1">
          <BooleanInputComponent
            id="terraceInput"
            v-model="apartmentTemp.terrace"
            label="Terasse"
          ></BooleanInputComponent>
        </div>
        <div class="sm:col-span-1">
          <BooleanInputComponent
            id="basementInput"
            v-model="apartmentTemp.basement"
            label="Keller"
          ></BooleanInputComponent>
        </div>
        <div class="col-span-2">
          <dt class="text-sm font-medium text-gray-500"> Beschreibung</dt>
          <dd class="mt-1 text-sm text-gray-900 space-y-5">
            <textarea
              id="descriptionInput"
              v-model="apartmentTemp.description"
              name="about"
              rows="3"
              class="
                shadow-sm
                focus:ring-indigo-500 focus:border-indigo-500
                block
                w-full
                sm:text-sm
                border border-gray-300
                rounded-md
              "
            />
          </dd>
        </div>
      </dl>
    </div>

    <div class="mt-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-sm font-medium text-gray-500">Mieter/in</h2>
      <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MieterByIdCardComponent
          v-if="apartment.tenant !== null"
          :id="apartment.tenant"
          :edit="edit"
          @removeMieter="removeMieter"
        ></MieterByIdCardComponent>
        <AddMieterCardComponent
          v-if="apartment.tenant === null && edit"
          @addMieter="addMieter"
        ></AddMieterCardComponent>
      </div>
    </div>

    <!-- Team member list -->

    <div class="mt-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-sm font-medium text-gray-500"> Interessent/innen </h2>
      <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InteresenntByIdCardComponent
          v-for="potentialTenant in apartment.potential_tenants"
          :id="potentialTenant"
          :key="potentialTenant"
          :edit="edit"
          @removeInteresennt="removeInteresennt"
        ></InteresenntByIdCardComponent>
        <AddInteresenntCardComponent
          v-if="edit"
          @addInteresennt="addInteresennt"
        ></AddInteresenntCardComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Apartment, {
    addPotentialTenantToApartment,
    addTenantToApartment,
    deleteApartment,
    removePotentialTenantFromApartment,
    removeTenantFromApartment,
    updateApartment,
  } from '../../api/model/apartment'
  import { PencilIcon, TrashIcon, XIcon, SaveIcon } from '@heroicons/vue/solid'
  import Person from '../../api/model/person'
  import { defineComponent } from 'vue'
  import AddInteresenntCardComponent from '../PersonCard/AddInteresenntCardComponent.vue'
  import InteresenntByIdCardComponent from '../PersonCard/InteresenntByIdCardComponent.vue'
  import AddMieterCardComponent from '../PersonCard/AddMieterCardComponent.vue'
  import MieterByIdCardComponent from '../PersonCard/MieterByIdCardComponent.vue'
  import { copyObjectByValues } from '../../api/util/utils'
  import NumberInputComponent from '../Input/NumberInputComponent.vue'
  import TextInputComponent from '../Input/TextInputComponent.vue'
  import BooleanInputComponent from '../Input/BooleanInputComponent.vue'
  import BooleanInfoComponent from '../Info/BooleanInfoComponent.vue'
  import TextInfoComponent from '../Info/TextInfoComponent.vue'

  export default defineComponent({
    name: 'ApartmentDetailComponent',
    components: {
      TextInfoComponent,
      BooleanInfoComponent,
      BooleanInputComponent,
      NumberInputComponent,
      TrashIcon,
      SaveIcon,
      PencilIcon,
      XIcon,
      AddInteresenntCardComponent,
      InteresenntByIdCardComponent,
      AddMieterCardComponent,
      MieterByIdCardComponent,
      TextInputComponent,
    },
    inject: ['notify'],
    props: {
      apartment: {
        type: Object as () => Apartment,
        default: {} as Apartment,
      },
    },
    emits: [
      'removeTenant',
      'addTenant',
      'removePotentialTenant',
      'addPotentialTenant',
      'updateApartment',
      'removeApartment',
    ],
    data() {
      return {
        edit: false,
        apartmentTemp: {} as Apartment,
      }
    },
    watch: {
      apartment: function () {
        this.cancelEdit()
      },
    },
    methods: {
      saveApartment() {
        const result = updateApartment(this.apartmentTemp, true)
        if (!result.isError()) {
          this.edit = false
          this.$emit('updateApartment', this.apartmentTemp)
        } else {
          this.notify(
            'error',
            'Fehler beim Aktualisieren der Wohnung',
            result.error
          )
        }
        this.edit = false
      },
      startEdit() {
        this.apartmentTemp = copyObjectByValues(this.apartment) as Apartment
        this.edit = true
      },
      cancelEdit() {
        this.apartmentTemp = copyObjectByValues(this.apartment) as Apartment
        this.edit = false
      },
      removeMieter() {
        const result = removeTenantFromApartment(this.apartment.id, true)
        if (!result.isError()) {
          this.edit = false
          this.$emit('removeTenant')
        } else {
          this.notify(
            'error',
            'Fehler beim Entfernen des Mieters von der Wohnung',
            result.error
          )
        }
      },
      addMieter(mieter: number): void {
        const result = addTenantToApartment(this.apartment.id, mieter, true)
        if (!result.isError()) {
          this.edit = false
          this.$emit('addTenant', result.data.tenant)
        } else {
          this.notify(
            'error',
            'Fehler beim Hinzufügen des Mieters ' + mieter + ' zu der Wohnung',
            result.error
          )
        }
      },
      removeInteresennt(interesennt: Person) {
        const result = removePotentialTenantFromApartment(
          this.apartment.id,
          interesennt.id,
          true
        )
        if (!result.isError()) {
          this.edit = false
          this.$emit('removePotentialTenant', interesennt.id)
        } else {
          this.notify(
            'error',
            'Fehler beim Entfernen des Interessenten ' +
              interesennt +
              ' der Wohnung',
            result.error
          )
        }
      },
      addInteresennt(interesennt: number) {
        const result = addPotentialTenantToApartment(
          this.apartment.id,
          interesennt,
          true
        )
        if (!result.isError()) {
          this.edit = false
          this.$emit('addPotentialTenant', interesennt)
        } else {
          this.notify(
            'error',
            'Fehler beim Hinzufügen des Interessenten ' +
              interesennt +
              ' zur Wohnung',
            result.error
          )
        }
      },
      deleteApartment() {
        const result = deleteApartment(this.apartment.id, true)
        if (!result.isError() && result.data) {
          this.$emit('removeApartment', this.apartment.id)
        } else {
          this.notify('error', 'Fehler beim Löschen der Wohnung', result.error)
        }
      },
    },
  })
</script>

<style scoped></style>
