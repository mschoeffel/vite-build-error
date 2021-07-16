<template>
  <PersonCardComponent
    :id="mieter.id"
    :image="mieter.profile_image"
    :edit="edit"
    :main="mieter.firstname + ' ' + mieter.lastname"
    :secondary="mieter.rental_start + ' - ' + mieter.rental_end"
    @removePerson="removeMieter"
  ></PersonCardComponent>
</template>

<script lang="ts">
  import PersonCardComponent from './PersonCardComponent.vue'
  import { defineComponent } from 'vue'
  import Person from '../../api/model/person'

  export default defineComponent({
    name: 'MieterCardComponent',
    components: { PersonCardComponent },
    props: {
      edit: {
        type: Boolean,
        default: false,
      },
      mieter: {
        default: null,
        type: Object as () => Person,
      },
    },
    emits: ['removeMieter'],
    methods: {
      removeMieter() {
        this.$emit('removeMieter')
      },
    },
  })
</script>

<style scoped></style>
