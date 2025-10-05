<template>
  <div class="app-layout">
    <!-- Sidebar -->
    <div v-if="sidebarVisible" class="sidebar">
      <div class="sidebar-header">
        <h3>{{ t('sideBar.menu') }}</h3>
        <button @click="sidebarVisible = false" class="close-btn" :aria-label="t('sideBar.close')">
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
          <span>{{ t(item.label) }}</span>
        </NuxtLink>
      </nav>

      <div class="sidebar-footer">
        <button 
          v-if="isAuthenticated"
          @click="handleLogout" 
          class="logout-btn"
        >
          <i class="pi pi-sign-out"></i>
          <span>{{ t('sideBar.logout') }}</span>
        </button>
      </div>

      <!-- Footer -->
      <footer class="app-footer">
        <p>{{ t('sideBar.footer.copyright') }}</p>
      </footer>
    </div> 
  </div>
</template>

<script setup lang="ts">
const { logout, isAuthenticated } = useAuth();
const route = useRoute();
const mainStore = useMainStore();
const { t } = useI18n();

const sidebarVisible = ref(true);

const menuItems = [
  {
    label: "sideBar.home",
    icon: "pi pi-home",
    route: "/home",
  },
  {
    label: "sideBar.admin",
    icon: "pi pi-users",
    route: "/admin",
  },
];

const handleLogout = async () => {
  try {
    mainStore.loading = true
    
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

watch(
  () => route.path,
  () => {
    if (process.client && window.innerWidth < 768) {
      sidebarVisible.value = false;
    }
  }
);
</script>