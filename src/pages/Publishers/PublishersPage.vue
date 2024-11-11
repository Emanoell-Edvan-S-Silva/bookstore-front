<template>
  <div class="q-ma-lg">
    <HeaderComponent title="Editoras" icon="business" breadcrumb="Editoras">
      <template #button>
        <AddButton
          @click="openModal()"
          :label="'Nova Editora'"
          class="add-button"
        />
      </template>
    </HeaderComponent>

    <q-separator class="q-my-md" />

    <SearchBar @search="filterPublishers" />

    <div class="q-mt-md q-card q-shadow-2 q-border-radius-md">
      <PublisherTable
        :publishers="filteredPublishers"
        :onEdit="openModal"
        :onDelete="openConfirmDeleteModal"
      />
    </div>

    <PublisherModal
      :model-value="isModalOpen"
      :title="modalTitle"
      :publisher="PublisherForm"
      @update:modelValue="isModalOpen = $event"
      @save="savePublisher"
    />

    <ConfirmDeleteModal
      :model-value="isConfirmModalOpen"
      @onConfirm="deletePublisher"
      @update:modelValue="isConfirmModalOpen = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AddButton from '../../common/components/AddButton.vue';
import PublisherModal from './components/PublisherModal.vue';
import ConfirmDeleteModal from '../../common/components/ConfirmDeleteModal.vue';
import HeaderComponent from '../../common/components/HeaderComponent.vue';
import PublisherTable from './components/PublisherTable.vue';
import SearchBar from '../../common/components/SearchBar.vue';

interface PublisherObject {
  id: number;
  name: string;
  email: string;
  telephone: string;
  site: string;
}

const publishers = ref<PublisherObject[]>([
  {
    id: 1,
    name: 'Ariel',
    email: 'editoraariel@gmail.com',
    telephone: '(85) 9 1111-1111',
    site: 'editora-ariel.com.br',
  },
  {
    id: 2,
    name: 'Rocco',
    email: 'editorarocco@gmail.com',
    telephone: '(85) 9 2222-2222',
    site: 'editora-rocco.com.br',
  },
  {
    id: 3,
    name: 'Intrínseca',
    email: 'editoraintrinseca@gmail.com',
    telephone: '(85) 9 3333-3333',
    site: 'editora-intrinseca.com.br',
  },
]);

const isModalOpen = ref(false);
const isConfirmModalOpen = ref(false);
const modalTitle = ref('Adicionar Editora');
const searchTerm = ref('');
let nextId = publishers.value.length + 1;
let publisherToDeleteId: number | null = null;

const PublisherForm = ref<PublisherObject>({
  id: nextId,
  name: '',
  email: '',
  telephone: '',
  site: '',
});

function openModal(publisher: PublisherObject | null = null) {
  if (publisher) {
    modalTitle.value = 'Editar Editora';
    PublisherForm.value = { ...publisher };
  } else {
    modalTitle.value = 'Adicionar Editora';
    PublisherForm.value = {
      id: nextId,
      name: '',
      email: '',
      telephone: '',
      site: '',
    };
  }
  isModalOpen.value = true;
}

function savePublisher(publisher: PublisherObject) {
  const id = publishers.value.findIndex((pub) => pub.id === publisher.id);

  if (id !== -1) {
    publishers.value[id] = { ...publisher };
  } else {
    publishers.value.push({ ...publisher });
    nextId++;
  }
  isModalOpen.value = false;
}

function openConfirmDeleteModal(id: number) {
  publisherToDeleteId = id;
  isConfirmModalOpen.value = true;
}

function deletePublisher() {
  if (publisherToDeleteId !== null) {
    publishers.value = publishers.value.filter(
      (publisher) => publisher.id !== publisherToDeleteId
    );
    publisherToDeleteId = null;
  }
  isConfirmModalOpen.value = false;
}

const filteredPublishers = computed(() => {
  return publishers.value.filter(publisher => {
    const query = searchTerm.value.toLowerCase();
    return (
      publisher.name.toLowerCase().includes(query) ||
      publisher.email.toLowerCase().includes(query) ||
      publisher.telephone.toLowerCase().includes(query) ||
      publisher.site.toLowerCase().includes(query)
    );
  });
});

function filterPublishers(term: string) {
  searchTerm.value = term;
}
</script>
