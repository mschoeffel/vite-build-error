<template>
  <AddPersonCardComponent
    text="Mieter/in hinzufügen"
    @add="addMieter"
  ></AddPersonCardComponent>
</template>

<script lang="ts">
  import AddPersonCardComponent from './AddPersonCardComponent.vue'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'AddMieterCardComponent',
    components: {
      AddPersonCardComponent,
    },
    emits: ['addMieter'],
    methods: {
      addMieter(personId) {
        this.$emit('addMieter', personId)
      },
    },
  })
</script>

<style scoped></style>
