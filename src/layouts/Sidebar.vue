<template>
  <div class="h-screen flex overflow-hidden bg-white">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        static
        class="fixed inset-0 flex z-40 lg:hidden"
        :open="sidebarOpen"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="
              relative
              flex-1 flex flex-col
              max-w-xs
              w-full
              pt-5
              pb-4
              bg-white
            "
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  class="
                    ml-1
                    flex
                    items-center
                    justify-center
                    h-10
                    w-10
                    rounded-full
                    focus:outline-none
                    focus:ring-2
                    focus:ring-inset
                    focus:ring-white
                  "
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex-shrink-0 flex items-center px-4">
              <div class="h-8 w-auto">
                <p class="text-3xl font-bold">
                  <font-awesome-icon
                    class="text-indigo-600 fa-1x"
                    icon="laptop-house"
                  />
                  MiWo
                </p>
              </div>
            </div>
            <div class="mt-5 flex-1 h-0 overflow-y-auto">
              <nav class="px-2">
                <div class="space-y-1">
                  <a
                    v-for="item in navigation"
                    :key="item.name"
                    :href="item.href"
                    :class="[
                      selecteditem === item.name
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                      'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md',
                    ]"
                    :aria-current="
                      selecteditem === item.name ? 'page' : undefined
                    "
                  >
                    <component
                      :is="item.icon"
                      :class="[
                        selecteditem === item.name
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6',
                      ]"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:flex-shrink-0">
      <div
        class="
          flex flex-col
          w-64
          border-r border-gray-200
          pt-5
          pb-4
          bg-gray-100
        "
      >
        <div class="flex items-center flex-shrink-0 px-6">
          <div class="h-8 w-auto">
            <p class="text-3xl font-bold">
              <font-awesome-icon
                class="text-indigo-600 fa-1x"
                icon="laptop-house"
              />
              MiWo
            </p>
          </div>
        </div>
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="h-0 flex-1 flex flex-col overflow-y-auto">
          <!-- User account dropdown -->
          <Menu as="div" class="px-3 mt-6 relative inline-block text-left">
            <div>
              <MenuButton
                class="
                  group
                  w-full
                  bg-gray-100
                  rounded-md
                  px-3.5
                  py-2
                  text-sm text-left
                  font-medium
                  text-gray-700
                  hover:bg-gray-200
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-offset-gray-100
                  focus:ring-purple-500
                "
              >
                <span class="flex w-full justify-between items-center">
                  <span
                    class="flex min-w-0 items-center justify-between space-x-3"
                  >
                    <img
                      class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                      :src="user.profile_image"
                      alt=""
                    />
                    <span class="flex-1 flex flex-col min-w-0">
                      <span class="text-gray-900 text-sm font-medium truncate"
                        >{{ user.vorname }} {{ user.nachname }}</span
                      >
                      <span class="text-gray-500 text-sm truncate">{{
                        user.email
                      }}</span>
                    </span>
                  </span>
                  <SelectorIcon
                    class="
                      flex-shrink-0
                      h-5
                      w-5
                      text-gray-400
                      group-hover:text-gray-500
                    "
                    aria-hidden="true"
                  />
                </span>
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="
                  z-10
                  mx-3
                  origin-top
                  absolute
                  right-0
                  left-0
                  mt-1
                  rounded-md
                  shadow-lg
                  bg-white
                  ring-1 ring-black ring-opacity-5
                  divide-y divide-gray-200
                  focus:outline-none
                "
              >
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      ]"
                      @click="logout"
                      >Logout</a
                    >
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
          <!-- Sidebar Search -->

          <!-- Navigation -->
          <nav class="px-3 mt-6 border-t border-gray-200 pt-4">
            <div class="space-y-1">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  selecteditem === item.name
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                ]"
                :aria-current="selecteditem === item.name ? 'page' : undefined"
              >
                <component
                  :is="item.icon"
                  :class="[
                    selecteditem === item.name
                      ? 'text-gray-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6',
                  ]"
                  aria-hidden="true"
                />
                {{ item.name }}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <!-- Search header -->
      <div
        class="
          relative
          z-10
          flex-shrink-0 flex
          h-16
          bg-white
          border-b border-gray-200
          lg:hidden
        "
      >
        <button
          class="
            px-4
            border-r border-gray-200
            text-gray-500
            focus:outline-none
            focus:ring-2
            focus:ring-inset
            focus:ring-purple-500
            lg:hidden
          "
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <MenuAlt1Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
          <div class="flex-1 flex">
            <div class="relative w-full">
              <div
                class="
                  absolute
                  inset-y-0
                  left-0
                  flex
                  items-center
                  pointer-events-none
                "
              >
                <p class="text-3xl font-bold">
                  <font-awesome-icon
                    class="text-indigo-600 fa-1x"
                    icon="laptop-house"
                  />
                  MiWo
                </p>
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton
                  class="
                    max-w-xs
                    bg-white
                    flex
                    items-center
                    text-sm
                    rounded-full
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-purple-500
                  "
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="
                    origin-top-right
                    absolute
                    right-0
                    mt-2
                    w-48
                    rounded-md
                    shadow-lg
                    bg-white
                    ring-1 ring-black ring-opacity-5
                    divide-y divide-gray-200
                    focus:outline-none
                  "
                >
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        ]"
                        @click="logout"
                        >Logout</a
                      >
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
  import {
    Dialog,
    DialogOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import {
    HomeIcon,
    MenuAlt1Icon,
    OfficeBuildingIcon,
    UserGroupIcon,
    XIcon,
  } from '@heroicons/vue/outline'
  import { SearchIcon, SelectorIcon } from '@heroicons/vue/solid'
  import { defineComponent } from 'vue'
  import NotificationComponent from '../components/Notification/NotificationComponent.vue'
  import User from '../api/model/user'

  export default defineComponent({
    name: 'Sidebar',
    components: {
      NotificationComponent,
      Dialog,
      DialogOverlay,
      Menu,
      MenuButton,
      MenuItem,
      MenuItems,
      TransitionChild,
      TransitionRoot,
      MenuAlt1Icon,
      SearchIcon,
      SelectorIcon,
      UserGroupIcon,
      XIcon,
    },
    inject: ['notify'],
    props: {
      selecteditem: {
        type: String,
        default: 'Home',
      },
    },
    data(): {
      navigation: Array<{ name: string; href: string; icon: unknown }>
      sidebarOpen: boolean
      user: User
    } {
      return {
        navigation: [
          { name: 'Home', href: '/', icon: HomeIcon },
          {
            name: 'Wohnungen',
            href: '/apartments',
            icon: OfficeBuildingIcon,
          },
          {
            name: 'Personen',
            href: '/persons',
            icon: UserGroupIcon,
          },
        ],
        sidebarOpen: false,
        user: {} as User,
      }
    },
    beforeMount(): void {
      if (this.$store.getters.getLoggedInUser === null) {
        this.$router.push('/login')
      } else {
        this.user = this.$store.state.loggedInUser
      }
    },
    methods: {
      logout: function (): void {
        this.$store.commit('logout')
        this.$router.push('/login')
        this.notify('success', 'Erfolgreich abgemeldet')
      },
      route(route: string): void {
        this.$router.push(route)
      },
    },
  })
</script>
<style></style>
