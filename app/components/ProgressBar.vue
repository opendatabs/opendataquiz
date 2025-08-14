<script setup lang="ts">
defineProps<{ value: number; max: number }>();
</script>

<template>
    <div class="wrap" aria-label="Fortschritt" role="progressbar" :aria-valuenow="value" :aria-valuemin="0" :aria-valuemax="max">
        <div class="bar" :style="{ width: ((value / max) * 100) + '%' }"></div>
    </div>
</template>

<style scoped>
.wrap{
    height: 10px;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 999px;
    overflow: hidden;
}
.bar{
    height: 100%;
    background: var(--question);
    transition: width .2s ease;
}
</style>
