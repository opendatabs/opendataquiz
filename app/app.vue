<template>
    <NuxtPage />
</template>

<style>
:root{
    --bg: rgb(224,235,223);
    --question: rgb(73,129,80);
    --answer-btn-bg: #ffffff;
    --answer-btn-text: rgb(40,68,85);
    --answer-btn-hover-bg: rgb(73,129,80);
    --answer-btn-hover-text: #ffffff;
    --next-btn-bg: rgb(40,68,85);
    --next-btn-text: #ffffff;
    --border: #cfd6cf;
    --muted: rgba(0,0,0,.2);
}
html, body, #__nuxt { height: 100%; }
body {
    background: var(--bg);
    margin: 0;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial, "Noto Sans";
    font-size: 18px;
    color: #0b1d12;
}
h1 {
    margin: 0 0 1rem 0;
    font-size: 36px;
    color: var(--question);
}
button { background: transparent; border: 1px solid var(--border); border-radius: .5rem; cursor: pointer; }
button[disabled]{ opacity:.5; cursor:not-allowed; }
</style>
