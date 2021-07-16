<template>
  <InteresenntCardComponent
    :interesennt="fetchInteresenntById(id)"
    :edit="edit"
    @removeInteresennt="removeInteresennt"
  ></InteresenntCardComponent>
</template>

<script lang="ts">
  import InteresenntCardComponent from './InteresenntCardComponent.vue'
  import { defineComponent } from 'vue'
  import Person, { getPersonById } from '../../api/model/person'
  export default defineComponent({
    name: 'InteresenntByIdCardComponent',
    components: { InteresenntCardComponent },
    props: {
      id: {
        type: Number,
        default: null,
      },
      edit: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['removeInteresennt'],
    methods: {
      fetchInteresenntById(id: number): Person | null {
        return getPersonById(id, true).data
      },
      removeInteresennt(interesennt: Person) {
        this.$emit('removeInteresennt', interesennt)
      },
    },
  })
</script>

<style scoped></style>
