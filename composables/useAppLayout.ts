import type { MenuItem } from "~/interfaces/menuItem.interface";

export const useAppLayout = () => {
  const route = useRoute();
  const { isAuthenticated } = useAuth();
  const sidebarVisible = ref(true);

  const menuItems = ref<MenuItem[]>([
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
  ]);

  // Auto-cerrar sidebar en mobile al cambiar de ruta
  watch(
    () => route.path,
    () => {
      if (process.client && window.innerWidth < 768) {
        sidebarVisible.value = false;
      }
    }
  );

  const handleLogout = () => {
    // Lógica adicional post-logout si es necesaria
    navigateTo('/login');
  };

  return {
    sidebarVisible,
    menuItems,
    isAuthenticated,
    handleLogout,
  };
};