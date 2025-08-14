<script setup lang="ts">
defineProps<{ score: number; total: number }>();
</script>

<template>
    <h2>Fertig!</h2>
    <p>Du hattest {{ score }} von {{ total }} Fragen korrekt!</p>
</template>
