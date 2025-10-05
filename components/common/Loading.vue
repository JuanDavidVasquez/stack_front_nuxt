<template>
  <div v-if="loading" class="viewLoading">
    <img :src="loadingGif" alt="Cargando" />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import loadingGif from "../../public/loading.gif";

/** stores */
const mainStore = useMainStore();

/** variables */
const { loading } = storeToRefs(mainStore);

</script>
<style lang="scss">
.viewLoading {
  position: fixed;
  z-index: 1500;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color-black, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>
