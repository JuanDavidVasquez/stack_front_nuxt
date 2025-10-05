export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated.value) {
    return navigateTo('/')
  }
})