<!-- layouts/default.vue -->
<template>
  <div class="app-layout">
    <header>
      <!-- Tu navbar aquí -->
      <nav>
        <!-- <NuxtLink to="/home">Home</NuxtLink> -->
        <button 
          v-if="isAuthenticated"
          @click="handleLogout">
          Logout
        </button>
      </nav>
    </header>
    
    <main>
      <slot />
    </main>
    
    <footer>
      <!-- Tu footer aquí -->
    </footer>
  </div>
</template>

<script setup lang="ts">
const { logout, isAuthenticated } = useAuth()

const handleLogout = async () => {
  await logout()
}
</script>