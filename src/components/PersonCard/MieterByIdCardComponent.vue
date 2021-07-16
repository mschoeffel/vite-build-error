<template>
  <MieterCardComponent
    :mieter="fetchMieterById(id)"
    :edit="edit"
    @removeMieter="removeMieter"
  ></MieterCardComponent>
</template>

<script lang="ts">
  import MieterCardComponent from './MieterCardComponent.vue'
  import { defineComponent } from 'vue'
  import Person, { getPersonById } from '../../api/model/person'
  export default defineComponent({
    name: 'MieterByIdCardComponent',
    components: { MieterCardComponent },
    props: {
      edit: {
        type: Boolean,
        default: false,
      },
      id: {
        type: Number,
        default: null,
      },
    },
    emits: ['removeMieter'],
    methods: {
      fetchMieterById(id: number): Person | null {
        return getPersonById(id, true).data
      },
      removeMieter() {
        this.$emit('removeMieter')
      },
    },
  })
</script>

<style scoped></style>
