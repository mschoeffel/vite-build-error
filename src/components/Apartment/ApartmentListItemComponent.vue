<template>
  <li :key="apartment.id" @click="selectApartment()">
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
          :src="apartment.profile_image"
          alt=""
        />
      </div>
      <div class="flex-1 min-w-0">
        <a href="#" class="focus:outline-none">
          <!-- Extend touch target to entire panel -->
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-sm font-medium text-gray-900">
            {{ apartment.street }} {{ apartment.street_number }}
          </p>
          <p class="text-sm text-gray-500 truncate">
            {{ apartment.postcode }} {{ apartment.city }}
          </p>
        </a>
      </div>
      <div class="flex-1 min-w-0">
        <a href="#" class="focus:outline-none">
          <!-- Extend touch target to entire panel -->
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-sm font-medium text-gray-900">
            {{ apartment.price }}€
          </p>
          <p class="text-sm text-gray-500 truncate"> {{ apartment.size }}m² </p>
        </a>
      </div>
      <div class="flex-1 min-w-0">
        <div
          v-if="apartment.tenant !== null"
          class="flex items-center space-x-2"
        >
          <div class="flex flex-shrink-0 -space-x-1">
            <img
              class="max-w-none h-8 w-8 rounded-full ring-2 ring-white"
              :src="getMieterImage(apartment.tenant)"
              alt="mieterbild"
            />
          </div>
        </div>
      </div>
      <div class="flex-1 min-w-0 items-center space-x-2 hidden md:block">
        <div class="flex flex-shrink-0 -space-x-1">
          <img
            v-for="potential_tenant in apartment.potential_tenants.slice(0, 4)"
            :key="potential_tenant"
            class="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
            :src="getMieterImage(potential_tenant)"
            :alt="potential_tenant"
          />
          <span
            v-if="apartment.potential_tenants.length > 4"
            class="pl-2 text-xs leading-5 font-medium"
            >+{{ apartment.potential_tenants.length - 4 }}</span
          >
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
  import Apartment from '../../api/model/apartment'
  import { defineComponent } from 'vue'
  import { getPersonById } from '../../api/model/person'

  export default defineComponent({
    name: 'ApartmentListItemComponent',
    props: {
      apartment: {
        type: Object as () => Apartment,
        default: null,
      },
      selected: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['selectApartment'],
    /*computed: {
      getMieterImage(id): string {
        return this.apartment.tenant === null
          ? ''
          : getPersonById(id, true).data.profile_image
      },
    },*/
    methods: {
      selectApartment(): void {
        this.$emit('selectApartment')
      },
      getMieterImage(id): string {
        return id === null ? '' : getPersonById(id, true).data.profile_image
      },
    },
  })
</script>

<style scoped></style>
