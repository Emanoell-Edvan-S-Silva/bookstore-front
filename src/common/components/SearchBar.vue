<template>
  <div class="q-mb-md">
    <q-input
      outlined
      dense
      placeholder="Buscar..."
      v-model="searchTerm"
      @input="onSearch"
      clearable
      @clear="onClear"
      @keyup.enter="onSearch"
    >
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['search']);
const searchTerm = ref('');

function onSearch() {
  emit('search', searchTerm.value);
}

function onClear() {
  searchTerm.value = '';
  emit('search', '');
}
</script>
