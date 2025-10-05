export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()

  // Si ya está autenticado, redirigir a home
  if (isAuthenticated.value) {
    return navigateTo('/home')
  }
})