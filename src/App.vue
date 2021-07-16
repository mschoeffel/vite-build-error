<template>
  <NotificationComponent ref="notification"></NotificationComponent>
  <router-view />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import NotificationComponent from './components/Notification/NotificationComponent.vue'

  export default defineComponent({
    name: 'App',
    components: { NotificationComponent },
    provide() {
      return {
        notify: (notificationType, notificationHeading, notificationText) =>
          this.showNoification(
            notificationType,
            notificationHeading,
            notificationText
          ),
      }
    },
    methods: {
      showNoification(notificationType, notificationHeading, notificationText) {
        this.$refs.notification.notificationType = notificationType
        this.$refs.notification.notificationHeading = notificationHeading
        this.$refs.notification.notificationText = notificationText
        this.$refs.notification.show = true
      },
    },
  })
</script>
