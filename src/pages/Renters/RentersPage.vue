<template>
  <div class="q-ma-lg">
    <HeaderComponent title="Locatários" icon="group" breadcrumb="Locatários">
      <template #button>
        <AddButton
          @click="openModal()"
          :label="'Novo Locatário'"
          class="add-button"
        />
      </template>
    </HeaderComponent>

    <q-separator class="q-my-md" />

    <SearchBar @search="filterRenters" />

    <div class="q-mt-md q-card q-shadow-2 q-border-radius-md">
      <RentersTable
        :renters="filteredRenters"
        :onEdit="openModal"
        :onDelete="openConfirmDeleteModal"
      />
    </div>

    <RentersModal
      :model-value="isModalOpen"
      :title="modalTitle"
      :renter="RentersForm"
      @update:modelValue="isModalOpen = $event"
      @save="filterRenters"
    />

    <ConfirmDeleteModal
      :model-value="isConfirmModalOpen"
      @onConfirm="deleteRenters"
      @update:modelValue="isConfirmModalOpen = $event"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import AddButton from '../../common/components/AddButton.vue';
import HeaderComponent from '../../common/components/HeaderComponent.vue';
import SearchBar from 'src/common/components/SearchBar.vue';
import RentersTable from './components/RentersTable.vue';
import ConfirmDeleteModal from '../../common/components/ConfirmDeleteModal.vue';
import RentersModal from './components/RentersModal.vue';

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

const renters = ref<RentersObject[]>([
  {
    id: 1,
    name: 'Edvan',
    email: 'edvan@gmail.com',
    telephone: '(85) 9 1111-1111',
    cpf: '111.111.111-11',
    street: 'Rua 1',
    number: 'Casa 1',
    neighborhood: 'Jereissati 1',
    city: 'Pacatuba',
    uf: 'CE',
  },
  {
    id: 2,
    name: 'Luana',
    email: 'luana@gmail.com',
    telephone: '(85) 9 2222-2222',
    cpf: '222.222.222-22',
    street: 'Rua 2',
    number: 'Casa 2',
    neighborhood: 'Jereissati 2',
    city: 'Pacatuba',
    uf: 'CE',
  },
  {
    id: 3,
    name: 'Marcelle',
    email: 'marcelle@gmail.com',
    telephone: '(85) 9 3333-3333',
    cpf: '333.333.333-33',
    street: 'Rua 3',
    number: 'Casa 3',
    neighborhood: 'Jereissati 3',
    city: 'Pacatuba',
    uf: 'CE',
  },
]);

const isModalOpen = ref(false);
const isConfirmModalOpen = ref(false);
const searchTerm = ref('');
const modalTitle = ref('Adicionar Locatário');
let nextId = renters.value.length + 1;
let renterToDeleteId: number | null = null;

const RentersForm = ref<RentersObject>({
  id: nextId,
  name: '',
  email: '',
  telephone: '',
  cpf: '',
  street: '',
  number: '',
  neighborhood: '',
  city: '',
  uf: '',
});

function openModal(renter: RentersObject | null = null) {
  if (renter) {
    modalTitle.value = 'Editar Locatário';
    RentersForm.value = { ...renter };
  } else {
    modalTitle.value = 'Adicionar Locatário';
    RentersForm.value = {
      id: nextId,
      name: '',
      email: '',
      telephone: '',
      cpf: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      uf: '',
    };
  }
  isModalOpen.value = true;
}

function openConfirmDeleteModal(id: number) {
  renterToDeleteId = id;
  isConfirmModalOpen.value = true;
}

function deleteRenters() {
  if (renterToDeleteId !== null) {
    renters.value = renters.value.filter(
      (renter) => renter.id !== renterToDeleteId
    );
    renterToDeleteId = null;
  }
  isConfirmModalOpen.value = false;
}

function filterRenters(term: string) {
  searchTerm.value = term;
}

const filteredRenters = computed(() => {
  return renters.value
    .map((renter) => ({
      ...renter,
      fullAddress: `${renter.street}, ${renter.number}, ${renter.neighborhood}, ${renter.city}, ${renter.uf}`,
    }))
    .filter((renter) => {
      const query = searchTerm.value.toLowerCase();
      return (
        renter.name.toLowerCase().includes(query) ||
        renter.email.toLowerCase().includes(query) ||
        renter.telephone.toLowerCase().includes(query) ||
        renter.cpf.toLowerCase().includes(query) ||
        renter.fullAddress.toLowerCase().includes(query)
      );
    });
});
</script>
