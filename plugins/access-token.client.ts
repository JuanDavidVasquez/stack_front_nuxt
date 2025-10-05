export default defineNuxtPlugin(async () => {
  const { getAccessToken } = useAuth()
  
  await getAccessToken()
})