<template>
  <div
    class="
      min-h-screen
      bg-gray-50
      flex flex-col
      justify-center
      py-12
      sm:px-6
      lg:px-8
    "
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <font-awesome-icon
        class="w-full text-center text-indigo-600 fa-10x"
        icon="laptop-house"
        style="width: 100%"
      />
      <h2
        id="heading"
        class="mt-6 text-center text-3xl font-extrabold text-gray-900"
        >MiWo - Anmeldung</h2
      >
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="login">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >E-Mail</label
            >
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="
                  appearance-none
                  block
                  w-full
                  px-3
                  py-2
                  rounded-md
                  focus:outline-none
                  rounded-sm
                  sm:text-sm
                "
                :class="
                  error
                    ? ' border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border border-gray-300 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'
                "
                aria-invalid="true"
                aria-describedby="email-error"
              />
              <div
                v-if="error"
                class="
                  absolute
                  inset-y-0
                  right-0
                  pr-3
                  flex
                  items-center
                  pointer-events-none
                "
              >
                <ExclamationCircleIcon
                  class="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
            </div>
            <p v-if="error" id="email-error" class="mt-2 text-sm text-red-600">
              {{ error }}
            </p>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Passwort</label
            >
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                id="password"
                v-model="password"
                :type="passwordType"
                name="password"
                required
                class="
                  appearance-none
                  block
                  w-full
                  px-3
                  py-2
                  rounded-md
                  focus:outline-none
                  rounded-sm
                  sm:text-sm
                "
                :class="
                  error
                    ? ' border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border border-gray-300 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'
                "
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <EyeIcon
                  v-if="!passwordVisible"
                  class="h-5 w-5 text-gray-300 cursor-pointer"
                  aria-hidden="true"
                  @click="showPassword"
                />
                <EyeOffIcon
                  v-if="passwordVisible"
                  class="h-5 w-5 text-gray-300 cursor-pointer"
                  aria-hidden="true"
                  @click="hidePassword"
                />
                <ExclamationCircleIcon
                  v-if="error"
                  class="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
            </div>

            <p
              v-if="error"
              id="password-error"
              class="mt-2 text-sm text-red-600"
            >
              {{ error }}
            </p>
          </div>

          <div>
            <button
              id="submit"
              type="submit"
              class="
                w-full
                flex
                justify-center
                py-2
                px-4
                border border-transparent
                rounded-md
                shadow-sm
                text-sm
                font-medium
                text-white
                bg-indigo-600
                hover:bg-indigo-700
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-indigo-500
              "
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { login } from '../api/backend'
  import BackendResult from '../api/model/result'
  import {
    ExclamationCircleIcon,
    EyeIcon,
    EyeOffIcon,
  } from '@heroicons/vue/solid'
  import User from '../api/model/user'

  export default defineComponent({
    name: 'Login',
    components: {
      ExclamationCircleIcon,
      EyeIcon,
      EyeOffIcon,
    },
    data(): {
      email: string
      password: string
      error: string
      passwordVisible: boolean
      passwordType: string
    } {
      return {
        email: '',
        password: '',
        error: '',
        passwordVisible: false,
        passwordType: 'password',
      }
    },
    methods: {
      login(): void {
        const result: BackendResult<User> = login(this.email, this.password)
        if (result.data) {
          this.$store.commit('login', result.data)
          this.$router.push('/')
        } else {
          this.error = 'Ungültige Eingabe'
        }
      },
      showPassword(): void {
        this.passwordVisible = true
        this.passwordType = 'text'
      },
      hidePassword(): void {
        this.passwordVisible = false
        this.passwordType = 'password'
      },
    },
  })
</script>

<style></style>
