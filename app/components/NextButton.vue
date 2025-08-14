<script setup lang="ts">
defineProps<{ disabled?: boolean }>();
</script>

<template>
    <button class="next" :disabled="disabled">
        <slot />
    </button>
</template>

<style scoped>
.next{
    padding:.75rem 1rem;
    background: var(--next-btn-bg);
    color: var(--next-btn-text);
    border-color: transparent;
    font-weight:600;
    text-decoration: none;
    transition: text-decoration-color .15s ease;
}
.next:hover{
    text-decoration: underline;
    text-decoration-thickness: 2px;
}
</style>
