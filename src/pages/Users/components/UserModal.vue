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
            v-model="localUser.name"
            placeholder="Nome do Usuário"
            :error="nameError"
            @blur="validateName"
          />
          <div v-if="nameError" class="text-negative">{{ nameErrorMessage }}</div>
        </div>
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">E-mail</div>
          <q-input
            outlined
            v-model="localUser.email"
            placeholder="E-mail do Usuário"
            :error="emailError"
            @blur="validateEmail"
          />
          <div v-if="emailError" class="text-negative">{{ emailErrorMessage }}</div>
        </div>
        <div class="q-mb-sm q-mt-none">
          <div class="text-bold">Permissão</div>
          <SelectField
            v-model="localUser.role"
            :options="roleOptions"
            :error="roleError"
            :errorMessage="roleErrorMessage"
            @update:modelValue="validateRole"
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
import SelectField from 'src/common/components/SelectField.vue';

interface UserObject {
  id: number;
  name: string;
  email: string;
  role: string;
}

const props = defineProps<{
  modelValue: boolean;
  title: string;
  user: UserObject;
}>();

const emits = defineEmits(['update:modelValue', 'save']);

const isOpen = ref(props.modelValue);
const localUser = ref<UserObject>({ ...props.user });
const roleOptions = ref([
  { label: 'Selecione a Permissão', value: '', disabled: true },
  { label: 'Leitor', value: 'Leitor' },
  { label: 'Editor', value: 'Editor' }
]);

const nameError = ref(false);
const emailError = ref(false);
const roleError = ref(false);
const nameErrorMessage = "Campo obrigatório 'Nome' não foi preenchido.";
const emailErrorMessage = "Campo obrigatório 'E-mail' inválido.";
const roleErrorMessage = "Campo obrigatório 'Permissão' não foi selecionado.";

watch(
  () => props.user,
  (newUser) => {
    localUser.value = { ...newUser };
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
  nameError.value = !localUser.value.name;
}

function validateEmail() {
  const email = localUser.value.email;
  emailError.value = !email || !/\S+@\S+\.\S{2,}/.test(email);
}

function validateRole() {
  roleError.value = !localUser.value.role;
}

const isSaveDisabled = computed(() => {
  return nameError.value || emailError.value || roleError.value;
});

function resetValidation() {
  nameError.value = false;
  emailError.value = false;
  roleError.value = false;
  localUser.value = { ...props.user };
}

function save() {
  validateName();
  validateEmail();
  validateRole();

  if (!isSaveDisabled.value) {
    emits('save', { ...localUser.value });
    closeModal();
  }
}

watch(isOpen, (newVal) => {
  emits('update:modelValue', newVal);
});
</script>
