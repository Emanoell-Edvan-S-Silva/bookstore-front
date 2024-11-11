<template>
  <q-dialog v-model="isOpen" persistent @hide="resetValidation">
    <q-card style="width: 80%; max-width: 600px;">
      <q-card-section>
        <div class="text-h6 q-mb-md">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">Nome</div>
          <q-input
            outlined
            v-model="localRenter.name"
            placeholder="Nome da editora"
            :error="nameError"
            @blur="validateName"
          />
          <div v-if="nameError" class="text-negative">{{ nameErrorMessage }}</div>
        </div>
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">E-mail</div>
          <q-input
            outlined
            v-model="localRenter.email"
            placeholder="E-mail da editora"
            :error="emailError"
            @blur="validateEmail"
          />
          <div v-if="emailError" class="text-negative">{{ emailErrorMessage }}</div>
        </div>
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">Telefone</div>
          <q-input
            outlined
            v-model="localRenter.telephone"
            placeholder="Ex: (XX) X XXXX-XXXX"
          />
        </div>
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">CPF</div>
          <q-input
            outlined
            v-model="localRenter.cpf"
            placeholder="Ex: XXX.XXX.XXX-XX"
          />
        </div>

        <!-- Campos de endereço -->
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">Logradouro</div>
          <q-input
            outlined
            v-model="localRenter.street"
            placeholder="Ex: Rua das Flores"
            :error="streetError"
            @blur="validateStreet"
          />
          <div v-if="streetError" class="text-negative">{{ streetErrorMessage }}</div>
        </div>

        <div class="q-mb-sm row">
          <div class="col">
            <div class="text-bold">Número</div>
            <q-input
              outlined
              v-model="localRenter.number"
              placeholder="Ex: 123"
              :error="numberError"
              @blur="validateNumber"
            />
            <div v-if="numberError" class="text-negative">{{ numberErrorMessage }}</div>
          </div>
          <div class="col">
            <div class="text-bold">Bairro</div>
            <q-input
              outlined
              v-model="localRenter.neighborhood"
              placeholder="Ex: Centro"
              :error="neighborhoodError"
              @blur="validateNeighborhood"
            />
            <div v-if="neighborhoodError" class="text-negative">{{ neighborhoodErrorMessage }}</div>
          </div>
        </div>

        <div class="q-mb-sm row">
          <div class="col">
            <div class="text-bold">Cidade</div>
            <q-input
              outlined
              v-model="localRenter.city"
              placeholder="Ex: São Paulo"
              :error="cityError"
              @blur="validateCity"
            />
            <div v-if="cityError" class="text-negative">{{ cityErrorMessage }}</div>
          </div>
          <div class="col">
            <div class="text-bold">UF</div>
            <q-input
              outlined
              v-model="localRenter.uf"
              placeholder="Ex: SP"
              maxlength="2"
              :error="ufError"
              @blur="validateUF"
            />
            <div v-if="ufError" class="text-negative">{{ ufErrorMessage }}</div>
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

interface RentersObject {
  id: number;
  name: string;
  email: string;
  telephone: string;
  cpf: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  uf: string;
}

const props = defineProps<{
  modelValue: boolean;
  title: string;
  renter: RentersObject;
}>();

const emits = defineEmits(['update:modelValue', 'save']);

const isOpen = ref(props.modelValue);
const localRenter = ref<RentersObject>({ ...props.renter });

const nameError = ref(false);
const emailError = ref(false);
const streetError = ref(false);
const numberError = ref(false);
const neighborhoodError = ref(false);
const cityError = ref(false);
const ufError = ref(false);

const nameErrorMessage = "Campo obrigatório 'Nome' não foi preenchido.";
const emailErrorMessage = "Campo obrigatório 'E-mail' inválido.";
const streetErrorMessage = "Campo obrigatório 'Logradouro' não foi preenchido.";
const numberErrorMessage = "Campo obrigatório 'Número' não foi preenchido.";
const neighborhoodErrorMessage = "Campo obrigatório 'Bairro' não foi preenchido.";
const cityErrorMessage = "Campo obrigatório 'Cidade' não foi preenchido.";
const ufErrorMessage = "Campo obrigatório 'UF' não foi preenchido.";

watch(
  () => props.renter,
  (newRenter) => {
    localRenter.value = { ...newRenter };
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
  nameError.value = !localRenter.value.name;
}

function validateEmail() {
  const email = localRenter.value.email;
  emailError.value = !email || !/\S+@\S+\.\S{2,}/.test(email);
}

function validateStreet() {
  streetError.value = !localRenter.value.street;
}

function validateNumber() {
  numberError.value = !localRenter.value.number;
}

function validateNeighborhood() {
  neighborhoodError.value = !localRenter.value.neighborhood;
}

function validateCity() {
  cityError.value = !localRenter.value.city;
}

function validateUF() {
  ufError.value = !localRenter.value.uf || localRenter.value.uf.length !== 2;
}

const isSaveDisabled = computed(() => {
  return (
    nameError.value ||
    emailError.value ||
    streetError.value ||
    numberError.value ||
    neighborhoodError.value ||
    cityError.value ||
    ufError.value
  );
});

function resetValidation() {
  nameError.value = false;
  emailError.value = false;
  streetError.value = false;
  numberError.value = false;
  neighborhoodError.value = false;
  cityError.value = false;
  ufError.value = false;
  localRenter.value = { ...props.renter };
}

function save() {
  validateName();
  validateEmail();
  validateStreet();
  validateNumber();
  validateNeighborhood();
  validateCity();
  validateUF();

  if (!isSaveDisabled.value) {
    emits('save', { ...localRenter.value });
    closeModal();
  }
}

watch(isOpen, (newVal) => {
  emits('update:modelValue', newVal);
});
</script>
