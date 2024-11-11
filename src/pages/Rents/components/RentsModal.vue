<template>
  <q-dialog v-model="isOpen" persistent @hide="resetValidation">
    <q-card style="width: 80%; max-width: 600px">
      <q-card-section>
        <div class="text-h6 q-mb-md">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">Nome</div>
          <SelectField
            v-model="localRent.renter"
            :options="renterOptions"
            :error="renterError"
            :errorMessage="renterErrorMessage"
            @update:modelValue="validateRenter"
          />
        </div>
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">Livro</div>
          <SelectField
            v-model="localRent.book"
            :options="bookOptions"
            placeholder="Livro"
            :error="bookError"
            :errorMessage="bookErrorMessage"
            @update:modelValue="validateBook"
          />
        </div>
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">Data de Previsão de Devolução</div>
          <DateField
            v-model="localRent.expectedReturnDate"
            placeholder="Selecione a Data"
            :error="expectedReturnDateError"
            :errorMessage="expectedReturnDateErrorMessage"
            @update:modelValue="validateExpectedReturnDate"
          />
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
import { ref, computed, watch, defineProps, defineEmits } from 'vue';
import SelectField from 'src/common/components/SelectField.vue';
import DateField from 'src/common/components/DateField.vue';

const props = defineProps({
  modelValue: Boolean,
  title: String,
  rent: Object,
});

const emits = defineEmits(['update:modelValue', 'save']);

const isOpen = ref(props.modelValue);
const localRent = ref({ ...props.rent });
const renterOptions = ref([
  { label: 'Selecione o Locatário', value: '', disabled: true },
  { label: 'Júnior', value: 'Júnior' },
  { label: 'Jéssica', value: 'Jéssica' },
]);

const bookOptions = ref([
  { label: 'Selecione o Livro', value: '', disabled: true },
  { label: 'Dom Quixote', value: 'Dom Quixote' },
  { label: 'O Pequeno Príncipe', value: 'O Pequeno Príncipe' },
]);

const renterError = ref(false);
const bookError = ref(false);
const expectedReturnDateError = ref(false);
const renterErrorMessage = "Campo obrigatório 'Locatário' não foi selecionado.";
const bookErrorMessage = "Campo obrigatório 'Livro' não foi selecionado.";
const expectedReturnDateErrorMessage =
  "Campo obrigatório 'Data de Previsão de Devolução' não foi preenchido.";

watch(
  () => props.rent,
  (newRent) => {
    localRent.value = { ...newRent };
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

function validateRenter() {
  renterError.value = !localRent.value.renter;
}

function validateBook() {
  bookError.value = !localRent.value.book;
}

function validateExpectedReturnDate() {
  expectedReturnDateError.value = !localRent.value.expectedReturnDate;
}

const isSaveDisabled = computed(() => {
  return renterError.value || bookError.value || expectedReturnDateError.value;
});

function resetValidation() {
  renterError.value = false;
  bookError.value = false;
  expectedReturnDateError.value = false;
  localRent.value = { ...props.rent };
}

function save() {
  validateRenter();
  validateBook();
  validateExpectedReturnDate();

  if (!isSaveDisabled.value) {
    localRent.value.status = 'Pendente';
    emits('save', { ...localRent.value });
    closeModal();
  }
}

watch(isOpen, (newVal) => {
  emits('update:modelValue', newVal);
});
</script>
