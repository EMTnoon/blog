<template>
    <div>
        <div class="main">
            <span style="--s:1">E</span>
            <span style="--s:2">m</span>
            <span style="--s:3">i</span>
            <span style="--s:4">l</span>
            <span style="--s:5">i</span>
            <span style="--s:6">a</span>
        </div>
    </div>
</template>
<script setup>
</script>
<style scoped>
.main span {
    font-size: 26px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    animation: light 1.6s linear infinite calc(0.2s * var(--s));
}

@keyframes light {
    50% {
        filter: hue-rotate(360deg) blur(1px);
        color: white;
        text-shadow: 0 0 10px #3498db,
            0 0 20px #3498db,
            0 0 40px #3498db,
            0 0 80px #3498db,
            0 0 160px #3498db,
            0 0 320px #3498db;
    }
}
</style>