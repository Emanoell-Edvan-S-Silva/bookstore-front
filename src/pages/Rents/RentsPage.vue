<template>
  <div class="q-ma-lg">
    <HeaderComponent title="Aluguéis" icon="bookmark" breadcrumb="Aluguéis">
      <template #button>
        <AddButton
          @click="openModal()"
          :label="'Novo Aluguel'"
          class="add-button"
        />
      </template>
    </HeaderComponent>

    <q-separator class="q-my-md" />

    <SearchBar @search="filterRents" />

    <div class="q-mt-md q-card q-shadow-2 q-border-radius-md">
      <RentsTable
        :rents="filteredRents"
        :onFinalize="finalizeRent"
        :onDelete="openConfirmDeleteModal"
      />
    </div>

    <RentsModal
      :model-value="isModalOpen"
      :title="modalTitle"
      :rent="RentForm"
      @update:modelValue="isModalOpen = $event"
      @save="saveRent"
    />

    <ConfirmDeleteModal
      :model-value="isConfirmModalOpen"
      @onConfirm="deleteRent"
      @update:modelValue="isConfirmModalOpen = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AddButton from '../../common/components/AddButton.vue';
import HeaderComponent from '../../common/components/HeaderComponent.vue';
import RentsTable from './components/RentsTable.vue';
import SearchBar from 'src/common/components/SearchBar.vue';
import ConfirmDeleteModal from '../../common/components/ConfirmDeleteModal.vue';
import RentsModal from './components/RentsModal.vue';

interface RentObject {
  id: number;
  renter: string;
  book: string;
  expectedReturnDate: string;
  returnDate: string | null;
  status: string;
}

const rents = ref<RentObject[]>([
  {
    id: 1,
    renter: 'Gabriel',
    book: 'O Morro dos Ventos Uivantes',
    expectedReturnDate: '2024-11-06',
    returnDate: '2024-11-15', 
    status: 'Atrasado',
  },
  {
    id: 2,
    renter: 'Mariana',
    book: 'Cem Anos de Solidão',
    expectedReturnDate: '2024-11-15',
    returnDate: '2024-11-20',
    status: 'Entregue',
  },
  {
    id: 3,
    renter: 'Rafael',
    book: 'O Sol é para Todos',
    expectedReturnDate: '2024-11-25',
    returnDate: null, 
    status: 'Pendente',
  },
  {
    id: 4,
    renter: 'Bianca',
    book: 'A Revolução dos Bichos',
    expectedReturnDate: '2024-11-01',
    returnDate: null, 
    status: 'Pendente',
  },
]);

const isModalOpen = ref(false);
const isConfirmModalOpen = ref(false);
const searchTerm = ref('');
const modalTitle = ref('Adicionar Aluguel');
let nextId = rents.value.length + 1;
let rentToDeleteId: number | null = null;

const RentForm = ref<RentObject>({
  id: nextId,
  renter: '',
  book: '',
  expectedReturnDate: '',
  returnDate: null, 
  status: 'Pendente', 
});

function openModal(rent: RentObject | null = null) {
  if (rent) {
    modalTitle.value = 'Editar Aluguel';
    RentForm.value = { ...rent };
  } else {
    modalTitle.value = 'Adicionar Aluguel';
    RentForm.value = {
      id: nextId,
      renter: '',
      book: '',
      expectedReturnDate: '',
      returnDate: null,
      status: 'Pendente',
    };
  }
  isModalOpen.value = true;
}

function saveRent(rent: RentObject) {
  const id = rents.value.findIndex((u) => u.id === rent.id);

  if (id !== -1) {
    rents.value[id] = { ...rent };
  } else {
    rents.value.push({ ...rent });
    nextId++;
  }
  isModalOpen.value = false;
}

function openConfirmDeleteModal(id: number) {
  rentToDeleteId = id;
  isConfirmModalOpen.value = true;
}

function deleteRent() {
  if (rentToDeleteId !== null) {
    rents.value = rents.value.filter((rent) => rent.id !== rentToDeleteId);
    rentToDeleteId = null;
  }
  isConfirmModalOpen.value = false;
}

function finalizeRent(id: number) {
  const rentIndex = rents.value.findIndex((r) => r.id === id);
  if (rentIndex !== -1) {
    if (rents.value[rentIndex].returnDate) {
      return; 
    }
    
    rents.value[rentIndex].returnDate = new Date().toISOString().split('T')[0]; 
    rents.value[rentIndex].status = determineStatus(rents.value[rentIndex]);
  }
}

function determineStatus(rent: RentObject): string {
  if (rent.returnDate && rent.expectedReturnDate) {
    const returnDate = new Date(rent.returnDate);
    const expectedReturnDate = new Date(rent.expectedReturnDate);
    
    if (returnDate > expectedReturnDate) {
      return 'Atrasado';
    }
  }
  return 'Entregue'; 
}

const filteredRents = computed(() => {
  return rents.value.filter((rent) => {
    const query = searchTerm.value.toLowerCase();
    return (
      rent.renter.toLowerCase().includes(query) ||
      rent.book.toLowerCase().includes(query) ||
      rent.status.toLowerCase().includes(query) ||
      (rent.returnDate && rent.returnDate.toLowerCase().includes(query)) ||
      rent.expectedReturnDate.toLowerCase().includes(query)
    );
  });
});

function filterRents(term: string) {
  searchTerm.value = term;
}
</script>
