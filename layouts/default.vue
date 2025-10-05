<template>
  <div class="app-layout">
    <Sidebar v-if="isAuthenticated && route.path !== '/login' && route.path !== '/register' && route.path !== '/'" />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "~/components/layouts/SidebarLayout.vue";
const {isAuthenticated } = useAuth();
const route = useRoute();
</script>
