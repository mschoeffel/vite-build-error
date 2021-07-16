<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      static
      class="fixed z-10 inset-0 overflow-y-scroll"
      :open="open"
      @close="open = false"
    >
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="
              inline-block
              align-bottom
              bg-white
              rounded-lg
              px-4
              pt-5
              pb-4
              text-left
              overflow-hidden
              shadow-xl
              transform
              transition-all
              sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6
            "
          >
            <div>
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  class="text-lg leading-6 font-medium text-gray-900"
                >
                  Person erstellen
                </DialogTitle>
                <div class="mt-2 text-left">
                  <div
                    class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                  >
                    <div class="sm:col-span-6">
                      <div class="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <dl class="grid grid-cols-2 gap-x-4 gap-y-8">
                          <div class="sm:col-span-6">
                            <TextInputComponent
                              id="profile_imageInput"
                              v-model="person.profile_image"
                              label="Profilbild"
                              @input="checkInput"
                            ></TextInputComponent>
                          </div>
                          <div class="sm:col-span-3">
                            <TextInputComponent
                              id="firstnameInput"
                              v-model="person.firstname"
                              label="Vorname"
                            ></TextInputComponent>
                          </div>
                          <div class="sm:col-span-3">
                            <TextInputComponent
                              id="lastnameInput"
                              v-model="person.lastname"
                              label="Nachname"
                            ></TextInputComponent>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="
                mt-5
                sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense
              "
            >
              <button
                type="button"
                class="
                  w-full
                  inline-flex
                  justify-center
                  rounded-md
                  border border-transparent
                  shadow-sm
                  px-4
                  py-2
                  bg-indigo-600
                  text-base
                  font-medium
                  text-white
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-indigo-500
                  sm:col-start-2 sm:text-sm
                "
                :disabled="formValid === false"
                :class="formValid === false ? 'disabled:opacity-50' : ''"
                @click="confirm"
              >
                Übernehmen
              </button>
              <button
                ref="cancelButtonRef"
                type="button"
                class="
                  mt-3
                  w-full
                  inline-flex
                  justify-center
                  rounded-md
                  border border-gray-300
                  shadow-sm
                  px-4
                  py-2
                  bg-white
                  text-base
                  font-medium
                  text-gray-700
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-indigo-500
                  sm:mt-0 sm:col-start-1 sm:text-sm
                "
                @click="open = false"
              >
                Abrechen
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import TextInputComponent from '../Input/TextInputComponent.vue'
  import Person from '../../api/model/person'

  export default defineComponent({
    name: 'PersonCreateDialog',
    components: {
      TextInputComponent,
      Dialog,
      DialogOverlay,
      DialogTitle,
      TransitionChild,
      TransitionRoot,
    },
    emits: ['createPerson'],
    data(): {
      person: Person
      open: boolean
      formValid: boolean
    } {
      return {
        person: {} as Person,
        open: false,
        formValid: false,
      }
    },
    methods: {
      checkInput() {
        let inputValid = true

        if (this.person.profile_image !== '') {
          this.person.profile_image = this.person.profile_image.replace(
            new RegExp('\\?.*', 'gm'),
            '?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
          )
        }

        this.formValid = inputValid
      },
      confirm(): void {
        if (this.formValid) {
          this.$emit('createPerson', this.person)
          this.open = false
          this.person = {} as Person
        }
      },
    },
  })
</script>
