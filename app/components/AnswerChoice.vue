<script setup lang="ts">
const props = defineProps<{
    text: string;
    selected?: boolean;
    disabled?: boolean;
}>();
const emit = defineEmits<(e: "select") => void>();
</script>

<template>
    <button
        class="answer-btn"
        :class="{ selected }"
        :disabled="disabled"
        @click="emit('select')"
    >
        {{ text }}
    </button>
</template>

<style scoped>
.answer-btn{
    padding:.75rem;
    text-align:left;
    background: var(--answer-btn-bg);
    color: var(--answer-btn-text);
    border: 2px solid var(--border);
    border-radius:.5rem;
    transition: background .15s ease, color .15s ease, transform .05s ease, border-color .15s ease, box-shadow .15s ease;
}
.answer-btn:hover{
    background: var(--answer-btn-hover-bg);
    color: var(--answer-btn-hover-text);
}
.answer-btn.selected{
    border-color: var(--question);
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--question) 25%, transparent);
    background: color-mix(in oklab, var(--answer-btn-bg) 88%, var(--question));
    color: #0b1d12;
}
.answer-btn:disabled{
    opacity:.7; cursor:not-allowed;
}
.answer-btn:active{ transform: scale(.99); }
</style>
