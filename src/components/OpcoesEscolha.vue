<script setup>
defineProps({
  opcoes: { type: Array, required: true },
  rotulo: { type: String, required: true },
  grande: { type: Boolean, default: false },
})
const modelo = defineModel({ type: [String, Number, null] })
</script>

<template>
  <fieldset class="grupo">
    <legend class="rotulo-grupo">{{ rotulo }}</legend>
    <div class="opcoes" :class="{ grande }">
      <button
        v-for="opcao in opcoes"
        :key="opcao.valor"
        type="button"
        class="opcao"
        :class="{ escolhida: modelo === opcao.valor }"
        :aria-pressed="modelo === opcao.valor"
        @click="modelo = opcao.valor"
      >
        <span v-if="opcao.emoji" class="emoji" aria-hidden="true">{{ opcao.emoji }}</span>
        {{ opcao.rotulo }}
      </button>
    </div>
  </fieldset>
</template>

<style scoped>
.grupo {
  margin: 0;
  padding: 0;
  border: 0;
}

.rotulo-grupo {
  margin-bottom: 8px;
  color: var(--tinta-2);
  font-size: 14px;
  font-weight: 600;
}

.opcoes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.opcao {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid var(--linha);
  border-radius: 999px;
  background: var(--superficie);
  color: var(--tinta);
  font: inherit;
  font-size: 14px;
  cursor: pointer;
}

.grande .opcao {
  flex: 1;
  flex-direction: column;
  justify-content: center;
  min-width: 56px;
  min-height: 72px;
  padding: 8px 4px;
  border-radius: 14px;
  font-size: 12px;
}

.emoji {
  font-size: 18px;
}

.grande .emoji {
  font-size: 26px;
}

.escolhida {
  border-color: var(--marca);
  background: var(--marca);
  color: #fff;
}

.opcao:focus-visible {
  outline: 2px solid var(--marca);
  outline-offset: 2px;
}
</style>
