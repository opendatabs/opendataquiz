<script setup lang="ts">
defineProps<{ correct: boolean; explanation?: string; dataset?: string }>()
</script>

<template>
    <p style="margin:.75rem 0; font-weight:600">
        <span v-if="correct">✅ Korrekt!</span>
        <span v-else>❌ Nicht ganz.</span>
    </p>
    <p v-if="explanation" style="margin:.25rem 0 0 0">
        {{ explanation }}
    </p>
    <p v-if="dataset" style="margin:.25rem 0 0 0; font-style:italic;">
        <b>Datensatz</b>: {{ dataset }}
    </p>
</template>
