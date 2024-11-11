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
            v-model="localPublisher.name"
            placeholder="Nome da Editora"
            :error="nameError"
            @blur="validateName"
          />
          <div v-if="nameError" class="text-negative">
            {{ nameErrorMessage }}
          </div>
        </div>
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">E-mail</div>
          <q-input
            outlined
            v-model="localPublisher.email"
            placeholder="E-mail da Editora"
            :error="emailError"
            @blur="validateEmail"
          />
          <div v-if="emailError" class="text-negative">
            {{ emailErrorMessage }}
          </div>
        </div>
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">Telefone</div>
          <q-input
            outlined
            v-model="localPublisher.telephone"
            placeholder="(XX) X XXXX-XXXX"
            mask="(##) # ####-####"
            :error="telephoneError"
            @blur="validateTelephone"
          />
          <div v-if="telephoneError" class="text-negative">
            {{ telephoneErrorMessage }}
          </div>
        </div>
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">Site</div>
          <q-input
            outlined
            v-model="localPublisher.site"
            placeholder="Ex: exemplo.com.br"
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
import { ref, watch, defineProps, defineEmits, computed } from 'vue';

interface PublisherObject {
  id: number;
  name: string;
  email: string;
  telephone: string;
  site: string;
}

const props = defineProps<{
  modelValue: boolean;
  title: string;
  publisher: PublisherObject;
}>();

const emits = defineEmits(['update:modelValue', 'save']);

const isOpen = ref(props.modelValue);
const localPublisher = ref<PublisherObject>({ ...props.publisher });

const nameError = ref(false);
const emailError = ref(false);
const telephoneError = ref(false);

const nameErrorMessage = "Campo obrigatório 'Nome' não foi preenchido.";
const emailErrorMessage = "Campo obrigatório 'E-mail' inválido.";
const telephoneErrorMessage = "Campo obrigatório 'Telefone' inválido.";

watch(
  () => props.publisher,
  (newPublisher) => {
    localPublisher.value = { ...newPublisher };
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
  nameError.value = !localPublisher.value.name;
}

function validateEmail() {
  const email = localPublisher.value.email;
  emailError.value = !email || !/\S+@\S+\.\S{2,}/.test(email);
}

function validateTelephone() {
  const phone = localPublisher.value.telephone.replace(/\D/g, '');
  telephoneError.value = phone.length !== 11;
}

const isSaveDisabled = computed(() => {
  return nameError.value || emailError.value || telephoneError.value;
});

function resetValidation() {
  nameError.value = false;
  emailError.value = false;
  telephoneError.value = false;
  localPublisher.value = { ...props.publisher };
}

function save() {
  validateName();
  validateEmail();
  validateTelephone();

  if (!isSaveDisabled.value) {
    emits('save', { ...localPublisher.value });
    closeModal();
  }
}

watch(isOpen, (newVal) => {
  emits('update:modelValue', newVal);
});
</script>
