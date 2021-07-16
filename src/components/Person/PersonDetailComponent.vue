<template>
  <div>
    <!-- Profile header -->
    <div>
      <div
        class="
          h-32
          w-full
          object-cover
          lg:h-48
          bg-gradient-to-t
          from-indigo-500
          to-white
        "
      >
      </div>
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div class="flex">
            <img
              class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              :src="person.profile_image"
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
                {{ person.firstname }}
                {{ person.lastname }}
              </h1>
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
                @click="deletePerson"
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
                @click="savePerson"
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
              :class="
                currentTab === 'data' ? 'border-b-2 border-indigo-500' : ''
              "
              class="
                text-gray-900
                whitespace-nowrap
                py-4
                px-1
                font-medium
                text-sm
              "
              aria-current="page"
              @click="currentTab = 'data'"
            >
              Daten
            </a>
            <a
              key="Interessen"
              href="#"
              :class="
                currentTab === 'interests' ? 'border-b-2 border-indigo-500' : ''
              "
              class="
                text-gray-900
                whitespace-nowrap
                py-4
                px-1
                font-medium
                text-sm
              "
              aria-current="page"
              @click="currentTab = 'interests'"
            >
              Interessen
            </a>
          </nav>
        </div>
      </div>
    </div>

    <!-- Description list -->
    <div v-if="currentTab === 'data'">
      <div v-if="!edit" class="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl class="grid grid-cols-2 gap-x-4 gap-y-8">
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="emailInfo"
              :value="person.email"
              label="Email"
            ></TextInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="telefonInfo"
              :value="person.phone"
              label="Telefon"
            ></TextInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="streetInfo"
              :value="person.street"
              label="Straße"
            ></TextInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="street_numberInfo"
              :value="person.street_number"
              label="Hausnummer"
            ></TextInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="postcodeInfo"
              :value="person.postcode"
              label="Postleitzahl"
            ></TextInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="cityInfo"
              :value="person.city"
              label="Ort"
            ></TextInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="mietbeginnInfo"
              :value="person.rental_start"
              label="Mietbeginn"
            ></TextInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="mietendeInfo"
              :value="person.rental_end"
              label="Mietende"
            ></TextInfoComponent>
          </div>
        </dl>
      </div>
      <div v-else class="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl class="grid grid-cols-2 gap-x-4 gap-y-8">
          <div class="sm:col-span-1">
            <TextInputComponent
              id="emailInput"
              v-model="personTemp.email"
              label="E-Mail"
            ></TextInputComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInputComponent
              id="telefonInput"
              v-model="personTemp.phone"
              label="Telefon"
            ></TextInputComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInputComponent
              id="streetInput"
              v-model="personTemp.street"
              label="Straße"
            ></TextInputComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInputComponent
              id="street_numberInput"
              v-model="personTemp.street_number"
              label="Hausnummer"
            ></TextInputComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInputComponent
              id="postcodeInput"
              v-model="personTemp.postcode"
              label="Postleitzahl"
            ></TextInputComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInputComponent
              id="cityInput"
              v-model="personTemp.city"
              label="Ort"
            ></TextInputComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInputComponent
              id="mietbeginnInput"
              v-model="personTemp.rental_start"
              label="Mietbeginn"
            ></TextInputComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInputComponent
              id="mietendeInput"
              v-model="personTemp.rental_end"
              label="Mietende"
            ></TextInputComponent>
          </div>
        </dl>
      </div>
    </div>
    <div v-else-if="currentTab === 'interests'">
      <div v-if="!edit" class="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl class="grid grid-cols-2 gap-x-4 gap-y-8">
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="interest_city_postcodeInfo"
              :value="person.interest_city_postcode"
              label="Postleitzahl"
            ></TextInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="interest_cityInfo"
              :value="person.interest_city"
              label="Ort"
            ></TextInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="interest_areaInfo"
              :value="person.interest_area"
              label="Gebiet"
            ></TextInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="interest_levelInfo"
              :value="person.interest_level"
              label="Etage"
            ></TextInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="interest_room_count_minInfo"
              :value="person.interest_room_count_min"
              label="Raumanzahl Min"
            ></TextInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="interest_room_count_maxInfo"
              :value="person.interest_room_count_max"
              label="Raumanzahl Max"
            ></TextInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="interest_size_minInfo"
              :value="person.interest_size_min"
              label="Größe Min"
              appendix="m²"
            ></TextInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="interest_size_maxInfo"
              :value="person.interest_size_max"
              label="Größe Max"
              appendix="m²"
            ></TextInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="interest_price_minInfo"
              :value="person.interest_price_min"
              label="Preis Min"
              appendix="€"
            ></TextInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInfoComponent
              id="interest_price_maxInfo"
              :value="person.interest_price_max"
              label="Preis Max"
              appendix="€"
            ></TextInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <BooleanInfoComponent
              id="interest_bathtubInfo"
              :value="person.interest_bathtub"
              label="Badewanne"
            ></BooleanInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <BooleanInfoComponent
              id="interest_showerInfo"
              :value="person.interest_shower"
              label="Dusche"
            ></BooleanInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <BooleanInfoComponent
              id="interest_bathroom_windowInfo"
              :value="person.interest_bathroom_window"
              label="Badfenster"
            ></BooleanInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <BooleanInfoComponent
              id="interest_kitchenInfo"
              :value="person.interest_kitchen"
              label="Küche"
            ></BooleanInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <BooleanInfoComponent
              id="interest_balconyInfo"
              :value="person.interest_balcony"
              label="Balkon"
            ></BooleanInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <BooleanInfoComponent
              id="interest_terraceInfo"
              :value="person.interest_terrace"
              label="Terasse"
            ></BooleanInfoComponent>
          </div>
          <div class="sm:col-span-1">
            <BooleanInfoComponent
              id="interest_basementInfo"
              :value="person.interest_basement"
              label="Keller"
            ></BooleanInfoComponent>
          </div>
        </dl>
      </div>
      <div v-else class="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl class="grid grid-cols-2 gap-x-4 gap-y-8">
          <div class="sm:col-span-1">
            <TextInputComponent
              id="interest_city_postcodeInput"
              v-model="personTemp.interest_city_postcode"
              label="Postleitzahl"
            ></TextInputComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInputComponent
              id="interest_cityInput"
              v-model="personTemp.interest_city"
              label="Ort"
            ></TextInputComponent>
          </div>
          <div class="sm:col-span-1">
            <TextInputComponent
              id="interest_areaInput"
              v-model="personTemp.interest_area"
              label="Gebiet"
            ></TextInputComponent>
          </div>
          <div class="sm:col-span-1">
            <NumberInputComponent
              id="interest_levelInput"
              v-model.number="personTemp.interest_level"
              label="Etage"
            ></NumberInputComponent>
          </div>
          <div class="sm:col-span-1">
            <NumberInputComponent
              id="interest_room_count_minInput"
              v-model.number="personTemp.interest_room_count_min"
              label="Raumanzahl Min"
            ></NumberInputComponent>
          </div>
          <div class="sm:col-span-1">
            <NumberInputComponent
              id="interest_room_count_maxInput"
              v-model.number="personTemp.interest_room_count_max"
              label="Raumanzahl Max"
            ></NumberInputComponent>
          </div>
          <div class="sm:col-span-1">
            <NumberInputComponent
              id="interest_size_minInput"
              v-model.number="personTemp.interest_size_min"
              label="Größe Min"
              appendix="m²"
            ></NumberInputComponent>
          </div>
          <div class="sm:col-span-1">
            <NumberInputComponent
              id="interest_size_maxInput"
              v-model.number="personTemp.interest_size_max"
              label="Größe Max"
              appendix="m²"
            ></NumberInputComponent>
          </div>
          <div class="sm:col-span-1">
            <NumberInputComponent
              id="interest_price_minInput"
              v-model.number="personTemp.interest_price_min"
              label="Preis Min"
              appendix="€"
            ></NumberInputComponent>
          </div>
          <div class="sm:col-span-1">
            <NumberInputComponent
              id="interest_price_maxInput"
              v-model.number="personTemp.interest_price_max"
              label="Preis Max"
              appendix="€"
            ></NumberInputComponent>
          </div>
          <div class="sm:col-span-1">
            <BooleanInputComponent
              id="interest_bathtubInput"
              v-model.number="personTemp.interest_bathtub"
              label="Badewanne"
            ></BooleanInputComponent>
          </div>
          <div class="sm:col-span-1">
            <BooleanInputComponent
              id="interest_showerInput"
              v-model.number="personTemp.interest_shower"
              label="Dusche"
            ></BooleanInputComponent>
          </div>
          <div class="sm:col-span-1">
            <BooleanInputComponent
              id="interest_bathroom_windowInput"
              v-model.number="personTemp.interest_bathroom_window"
              label="Badfenster"
            ></BooleanInputComponent>
          </div>
          <div class="sm:col-span-1">
            <BooleanInputComponent
              id="interest_kitchenInput"
              v-model.number="personTemp.interest_kitchen"
              label="Küche"
            ></BooleanInputComponent>
          </div>
          <div class="sm:col-span-1">
            <BooleanInputComponent
              id="interest_balconyInput"
              v-model.number="personTemp.interest_balcony"
              label="Balkon"
            ></BooleanInputComponent>
          </div>
          <div class="sm:col-span-1">
            <BooleanInputComponent
              id="interest_terraceInput"
              v-model.number="personTemp.interest_terrace"
              label="Terasse"
            ></BooleanInputComponent>
          </div>
          <div class="sm:col-span-1">
            <BooleanInputComponent
              id="interest_basementInput"
              v-model.number="personTemp.interest_basement"
              label="Keller"
            ></BooleanInputComponent>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { PencilIcon, TrashIcon, XIcon, SaveIcon } from '@heroicons/vue/solid'
  import Person, { deletePerson, updatePerson } from '../../api/model/person'
  import { defineComponent } from 'vue'
  import { copyObjectByValues } from '../../api/util/utils'
  import TextInputComponent from '../Input/TextInputComponent.vue'
  import TextInfoComponent from '../Info/TextInfoComponent.vue'
  import NumberInputComponent from '../Input/NumberInputComponent.vue'
  import BooleanInfoComponent from '../Info/BooleanInfoComponent.vue'
  import BooleanInputComponent from '../Input/BooleanInputComponent.vue'

  export default defineComponent({
    name: 'PersonDetailComponent',
    components: {
      BooleanInputComponent,
      BooleanInfoComponent,
      NumberInputComponent,
      TextInfoComponent,
      TrashIcon,
      SaveIcon,
      PencilIcon,
      XIcon,
      TextInputComponent,
    },
    inject: ['notify'],
    props: {
      person: {
        type: Object as () => Person,
        default: {} as Person,
      },
    },
    emits: ['updatePerson', 'removePerson'],
    data() {
      return {
        edit: false,
        personTemp: {} as Person,
        currentTab: 'data',
      }
    },
    watch: {
      person: function () {
        this.cancelEdit()
      },
    },
    methods: {
      savePerson() {
        const result = updatePerson(this.personTemp, true)
        if (!result.isError()) {
          this.edit = false
          this.$emit('updatePerson', this.personTemp)
        } else {
          this.notify(
            'error',
            'Fehler beim Aktualisieren der Person',
            result.error
          )
        }
        this.personTemp = copyObjectByValues(this.person) as Person
        this.edit = false
      },
      startEdit() {
        this.personTemp = copyObjectByValues(this.person) as Person
        this.edit = true
      },
      cancelEdit() {
        this.personTemp = copyObjectByValues(this.person) as Person
        this.edit = false
      },
      deletePerson() {
        const result = deletePerson(this.person.id, true)
        if (!result.isError() && result.data) {
          this.$emit('removePerson', this.person.id)
        } else {
          this.notify('error', 'Fehler beim Löschen der Person', result.error)
        }
      },
    },
  })
</script>

<style scoped></style>
