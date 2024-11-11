<template>
  <div class="q-ma-lg">
    <HeaderComponent title="Usuários" icon="manage_accounts" breadcrumb="Usuários">
      <template #button>
        <AddButton
          @click="openModal()"
          :label="'Novo Usuário'"
          class="add-button"
        />
      </template>
    </HeaderComponent>

    <q-separator class="q-my-md" />

    <SearchBar @search="filterUsers" />

    <div class="q-mt-md q-card q-shadow-2 q-border-radius-md">
      <UserTable
        :users="filteredUsers"
        :onEdit="openModal"
        :onDelete="openConfirmDeleteModal"
      />
    </div>

    <UserModal
      :model-value="isModalOpen"
      :title="modalTitle"
      :user="UserForm"
      @update:modelValue="isModalOpen = $event"
      @save="saveUser"
    />

    <ConfirmDeleteModal
      :model-value="isConfirmModalOpen"
      @onConfirm="deleteUser"
      @update:modelValue="isConfirmModalOpen = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AddButton from '../../common/components/AddButton.vue';
import HeaderComponent from '../../common/components/HeaderComponent.vue';
import UserTable from './components/UserTable.vue';
import SearchBar from 'src/common/components/SearchBar.vue';
import ConfirmDeleteModal from '../../common/components/ConfirmDeleteModal.vue';
import UserModal from './components/UserModal.vue';

interface UserObject {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users = ref<UserObject[]>([
  {
    id: 1,
    name: 'Ashley',
    email: 'ashley@gmail.com',
    role: 'Editor',
  },

  {
    id: 2,
    name: 'Luana',
    email: 'luana@gmail.com',
    role: 'Leitor',
  },
  {
    id: 3,
    name: 'Edvan',
    email: 'edvan@gmail.com',
    role: 'Leitor',
  },
  {
    id: 4,
    name: 'Caio',
    email: 'caio@gmail.com',
    role: 'Leitor',
  },
]);

const isModalOpen = ref(false);
const isConfirmModalOpen = ref(false);
const searchTerm = ref('');
const modalTitle = ref('Adicionar Usuário');
let nextId = users.value.length + 1;
let userToDeleteId: number | null = null;

const UserForm = ref<UserObject>({
  id: nextId,
  name: '',
  email: '',
  role: '',
});

function openModal(user: UserObject | null = null) {
  if (user) {
    modalTitle.value = 'Editar Usuário';
    UserForm.value = { ...user };
  } else {
    modalTitle.value = 'Adicionar Usuário';
    UserForm.value = {
      id: nextId,
      name: '',
      email: '',
      role: '',
    };
  }
  isModalOpen.value = true;
}

function saveUser (user: UserObject) {
  const id = users.value.findIndex((u) => u.id === user.id);

  if (id !== -1) {
    users.value[id] = { ...user };
  } else {
    users.value.push({ ...user });
    nextId++;
  }
  isModalOpen.value = false;
}

function openConfirmDeleteModal(id: number) {
  userToDeleteId = id;
  isConfirmModalOpen.value = true;
}

function deleteUser() {
  if (userToDeleteId !== null) {
    users.value = users.value.filter((user) => user.id !== userToDeleteId);
    userToDeleteId = null;
  }
  isConfirmModalOpen.value = false;
}

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const query = searchTerm.value.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
  });
});

function filterUsers(term: string) {
  searchTerm.value = term;
}
</script>
