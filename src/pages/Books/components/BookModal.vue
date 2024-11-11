<template>
  <q-dialog v-model="isOpen" persistent @hide="resetValidation">
    <q-card style="width: 80%; max-width: 600px">
      <q-card-section>
        <div class="text-h6 q-mb-md">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">Nome</div>
          <q-input
            outlined
            v-model="localBook.name"
            placeholder="Nome do Livro"
            :error="nameError"
            @blur="validateName"
          />
          <div v-if="nameError" class="text-negative">
            {{ nameErrorMessage }}
          </div>
        </div>
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">Autor</div>
          <q-input
            outlined
            v-model="localBook.author"
            placeholder="Autor do Livro"
            :error="authorError"
            @blur="validateAuthor"
          />
          <div v-if="authorError" class="text-negative">
            {{ authorErrorMessage }}
          </div>
        </div>
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">Editora</div>
          <SelectField
            v-model="localBook.publisher"
            :options="publisherOptions"
            :error="publisherError"
            :errorMessage="publisherErrorMessage"
            @update:modelValue="validatePublisher"
          />
        </div>
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">Data de Lançamento</div>
          <q-input
            outlined
            v-model="localBook.releaseDate"
            placeholder="Data de Lançamento"
            :error="releaseDateError"
            @blur="validateReleaseDate"
          />
          <div v-if="releaseDateError" class="text-negative">
            {{ releaseDateErrorMessage }}
          </div>
        </div>
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">Estoque</div>
          <q-input
            outlined
            type="number"
            v-model="localBook.stock"
            placeholder="Quantidade em Estoque"
            :error="stockError"
            @blur="validateStock"
          />
          <div v-if="stockError" class="text-negative">
            {{ stockErrorMessage }}
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="q-pt-md justify-end">
        <q-btn flat label="Cancelar" color="negative" @click="closeModal" />
        <q-btn
          flat
          label="Salvar"
          color="primary"
          @click="save"
          :disabled="isSaveDisabled"
          :class="{ 'text-grey-4': isSaveDisabled }"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, computed } from 'vue';
import SelectField from 'src/common/components/SelectField.vue';

interface BookObject {
  id: number;
  name: string;
  author: string;
  publisher: string;
  releaseDate: string;
  stock: number;
}

const props = defineProps<{
  modelValue: boolean;
  title: string;
  book: BookObject;
}>();

const emits = defineEmits(['update:modelValue', 'save']);

const isOpen = ref(props.modelValue);
const localBook = ref<BookObject>({ ...props.book });
const publisherOptions = ref([
  { label: 'Selecione a Editora', value: '', disabled: true },
  { label: 'Ariel', value: 'Ariel' },
  { label: 'Rocco', value: 'Rocco' },
  { label: 'Intrínseca', value: 'Intrínseca' },
]);

const nameError = ref(false);
const authorError = ref(false);
const publisherError = ref(false);
const releaseDateError = ref(false);
const stockError = ref(false);
const nameErrorMessage = "Campo obrigatório 'Nome' não foi preenchido.";
const authorErrorMessage = "Campo obrigatório 'Autor' não foi preenchido.";
const publisherErrorMessage =
  "Campo obrigatório 'Editora' não foi selecionado.";
const releaseDateErrorMessage =
  "Campo obrigatório 'Data de Lançamento' não foi preenchido.";
const stockErrorMessage = "Campo obrigatório 'Estoque' não foi preenchido.";

watch(
  () => props.book,
  (newBook) => {
    localBook.value = { ...newBook };
  },
  { immediate: true }
);

watch(
  () => props.modelValue,
  (newVal) => {
    isOpen.value = newVal;
  }
);

function closeModal() {
  isOpen.value = false;
  emits('update:modelValue', false);
}

function validateName() {
  nameError.value = !localBook.value.name;
}

function validateAuthor() {
  authorError.value = !localBook.value.author;
}

function validatePublisher() {
  publisherError.value = !localBook.value.publisher;
}

function validateReleaseDate() {
  releaseDateError.value = !localBook.value.releaseDate;
}

function validateStock() {
  stockError.value = localBook.value.stock <= 0;
}

const isSaveDisabled = computed(() => {
  return (
    nameError.value ||
    authorError.value ||
    publisherError.value ||
    releaseDateError.value ||
    stockError.value
  );
});

function resetValidation() {
  nameError.value = false;
  authorError.value = false;
  publisherError.value = false;
  releaseDateError.value = false;
  stockError.value = false;
  localBook.value = { ...props.book };
}

function save() {
  localBook.value.stock = parseInt(localBook.value.stock.toString(), 10);

  validateName();
  validateAuthor();
  validatePublisher();
  validateReleaseDate();
  validateStock();

  if (!isSaveDisabled.value) {
    emits('save', { ...localBook.value });
    closeModal();
  }
}

watch(isOpen, (newVal) => {
  emits('update:modelValue', newVal);
});
</script>
