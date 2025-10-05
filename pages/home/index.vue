<template>
  <div class="container">
    <h1>Bienvenido {{ user?.fullname }}</h1>
    <p>Esta es tu página principal</p>
  </div>
</template>

<script setup lang="ts">
const { user } = useAuth()
// Definir que requiere autenticación
definePageMeta({
  middleware: 'auth'
})
</script>