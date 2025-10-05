<template>
  <main>
    <Login />
  </main>
</template>

<script setup lang="ts">
import Login from '~/components/features/Login.vue'
const { getAccessToken } = useAuth()
const { isAuthenticated } = useAuth()
const router = useRouter()

onMounted(async () => {
await getAccessToken()
})

onMounted(() => {
  if (isAuthenticated.value) {
    router.push('/home')
  }
})
</script>