<template>
  <PersonCardComponent
    :id="interesennt.id"
    :image="interesennt.profile_image"
    :edit="edit"
    :main="interesennt.firstname + ' ' + interesennt.lastname"
    :secondary="interesennt.email"
    @removePerson="removeInteresennt"
  ></PersonCardComponent>
</template>

<script lang="ts">
  import PersonCardComponent from './PersonCardComponent.vue'
  import { defineComponent } from 'vue'
  import Person from '../../api/model/person'

  export default defineComponent({
    name: 'InteresenntCardComponent',
    components: {
      PersonCardComponent,
    },
    props: {
      edit: {
        default: false,
        type: Boolean,
      },
      interesennt: {
        default: null,
        type: Object as () => Person,
      },
    },
    emits: ['removeInteresennt'],
    methods: {
      removeInteresennt() {
        this.$emit('removeInteresennt', this.interesennt)
      },
    },
  })
</script>

<style scoped></style>
