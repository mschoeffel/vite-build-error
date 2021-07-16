<template>
  <AddPersonCardComponent
    text="Interesennt/in hinzufügen"
    @add="addInteresennt"
  ></AddPersonCardComponent>
</template>

<script lang="ts">
  import AddPersonCardComponent from './AddPersonCardComponent.vue'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'AddInteresenntCardComponent',
    components: {
      AddPersonCardComponent,
    },
    emits: ['addInteresennt'],
    methods: {
      addInteresennt(personId) {
        this.$emit('addInteresennt', personId)
      },
    },
  })
</script>

<style scoped></style>
