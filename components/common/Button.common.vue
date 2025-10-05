<template>
    <button class="btn">{{ label }}</button>
</template>

<script lang="ts" setup>
defineProps<{
    label: string
}>()
</script>