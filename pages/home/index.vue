<template>
  <div>
    <h1>Bienvenido {{ user }}</h1>
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