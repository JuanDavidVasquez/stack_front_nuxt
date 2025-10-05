<!-- layouts/default.vue -->
<template>
  <div class="app-layout">
    <!-- Sidebar -->
    <div v-if="sidebarVisible" class="sidebar">
      <div class="sidebar-header">
        <h3>Menú</h3>
        <button @click="sidebarVisible = false" class="close-btn">
          <i class="pi pi-times"></i>
        </button>
      </div>

      <nav class="sidebar-nav">
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.route"
          :to="item.route" 
          class="nav-item"
          @click="handleRouteClick"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <div class="sidebar-footer">
        <button 
          v-if="isAuthenticated"
          @click="handleLogout" 
          class="logout-btn"
        >
          <i class="pi pi-sign-out"></i>
          <span>Cerrar Sesión</span>
        </button>
      </div>

         <!-- Footer -->
      <footer class="app-footer">
        <p>&copy; 2025 Mi Aplicación</p>
      </footer>
    </div> 
  </div>
</template>

<script setup lang="ts">
const { logout, isAuthenticated } = useAuth();
const route = useRoute();
const mainStore = useMainStore()

const sidebarVisible = ref(true);

const menuItems = [
  {
    label: "Inicio",
    icon: "pi pi-home",
    route: "/home",
  },
  {
    label: "Admin",
    icon: "pi pi-users",
    route: "/admin",
  },
];


const handleLogout = async () => {
  try {
    mainStore.loading = true
    
    // Ejecuta logout y espera mínimo 1 segundo
    await Promise.all([
      logout(),
      new Promise(resolve => setTimeout(resolve, 1000))
    ])
    navigateTo('/')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  } finally {
    mainStore.loading = false
  }
}

const handleRouteClick = () => {
  if (process.client && window.innerWidth < 768) {
    sidebarVisible.value = false;
  }
};

// Cerrar sidebar en mobile al cambiar de ruta
watch(
  () => route.path,
  () => {
    if (process.client && window.innerWidth < 768) {
      sidebarVisible.value = false;
    }
  }
);
</script>
