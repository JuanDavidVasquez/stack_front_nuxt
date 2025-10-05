<script setup lang="ts">
import Loading from './components/common/Loading.vue';

</script>

<template>
  <div>
    <Loading />
    <NuxtLayout>
      <NuxtPage />
      <Toast position="bottom-center" />
    </NuxtLayout>
  </div>
</template>
