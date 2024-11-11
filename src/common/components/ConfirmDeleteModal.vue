<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card class="q-pa-md">
      <q-card-section class="q-pt-none">
        <div class="q-mb-md text-center">
          <q-icon name="warning" size="5em" color="warning" class="q-mt-lg q-mb-lg" />
        </div>

        <div class="q-mb-md text-center text-h6">
          Tem certeza de que deseja excluir?
        </div>

        <div class="q-gutter-md q-mt-lg text-center">
          <q-btn flat @click="closeModal" label="Cancelar" color="primary" />
          <q-btn
            flat
            @click="confirmDelete"
            label="Confirmar"
            color="negative"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emits = defineEmits(['update:modelValue', 'onConfirm']);

// Definir o estado de abertura do modal
const isOpen = ref(props.modelValue);

// Sincronizar a abertura do modal com o valor da prop modelValue
watch(
  () => props.modelValue,
  (newVal) => {
    isOpen.value = newVal;
  }
);

// Função para fechar o modal
function closeModal() {
  isOpen.value = false;
  emits('update:modelValue', false);
}

// Função para confirmar a exclusão
function confirmDelete() {
  emits('onConfirm');
  closeModal();
}
</script>
