<script setup>
defineProps({
  percentual: { type: Number, required: true },
  cor: { type: String, default: 'var(--marca)' },
})
</script>

<template>
  <div class="trilho" role="progressbar" :aria-valuenow="percentual" aria-valuemin="0" aria-valuemax="100">
    <div class="preenchido" :style="{ width: `${percentual}%`, background: cor }" />
  </div>
</template>

<style scoped>
.trilho {
  height: 8px;
  border-radius: 999px;
  background: var(--superficie-2);
  overflow: hidden;
}

.preenchido {
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s ease;
}
</style>
