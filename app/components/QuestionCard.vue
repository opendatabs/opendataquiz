<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
    <h2 style="margin:.5rem 0; color: var(--question)">{{ text }}</h2>
</template>
