<script setup lang="ts">
defineProps<{
    text: string
    selected?: boolean
    disabled?: boolean
    correct?: boolean
    wrong?: boolean
}>()

const emit = defineEmits<{ (e: 'select'): void }>()
</script>

<template>
    <button
        :disabled="disabled"
        @click="$emit('select')"
        :class="[
      'answer-btn',
      selected && !correct && !wrong ? 'selected' : '',
      correct ? 'correct' : '',
      wrong ? 'wrong' : ''
    ]"
    >
        {{ text }}
    </button>
</template>

<style scoped>
.answer-btn {
    padding: 0.75rem 1rem;
    border: 2px solid #ccc;
    border-radius: 6px;
    background: #fff;
    text-align: left;
    transition: all 0.2s ease;
}
.answer-btn:hover:not(:disabled) {
    background: #f0f0f0;
    cursor: pointer;
}
.answer-btn.selected {
    border-color: #007bff;
    background: #e7f1ff;
}
.answer-btn.correct {
    border-color: #28a745;
    background: #d4edda;
}
.answer-btn.wrong {
    border-color: #dc3545;
    background: #f8d7da;
}
</style>
