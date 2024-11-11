<template>
  <div class="q-ma-lg">
    <HeaderComponent title="Livros" icon="book" breadcrumb="Livros">
      <template #button>
        <AddButton
          @click="openModal()"
          :label="'Novo Livro'"
          class="add-button"
        />
      </template>
    </HeaderComponent>

    <q-separator class="q-my-md" />

    <SearchBar @search="filterBooks" />

    <div class="q-mt-md q-card q-shadow-2 q-border-radius-md">
      <BookTable
        :books="filteredBooks"
        :onEdit="openModal"
        :onDelete="openConfirmDeleteModal"
      />
    </div>

    <BookModal
      :model-value="isModalOpen"
      :title="modalTitle"
      :book="bookForm"
      @update:modelValue="isModalOpen = $event"
      @save="saveBook"
    />

    <ConfirmDeleteModal
      :model-value="isConfirmModalOpen"
      @onConfirm="deleteBook"
      @update:modelValue="isConfirmModalOpen = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AddButton from '../../common/components/AddButton.vue';
import HeaderComponent from '../../common/components/HeaderComponent.vue';
import BookTable from './components/BookTable.vue';
import SearchBar from 'src/common/components/SearchBar.vue';
import ConfirmDeleteModal from '../../common/components/ConfirmDeleteModal.vue';
import BookModal from './components/BookModal.vue';

interface BookObject {
  id: number;
  name: string;
  author: string;
  publisher: string;
  releaseDate: string;
  stock: number;
}

const books = ref<BookObject[]>([
  {
    id: 1,
    name: 'O Morro dos Ventos Uivantes',
    author: 'Emily Brontë',
    publisher: 'Editora Martin Claret',
    releaseDate: '1847',
    stock: 15,
  },
  {
    id: 2,
    name: 'Cem Anos de Solidão',
    author: 'Gabriel García Márquez',
    publisher: 'Editora Record',
    releaseDate: '1967',
    stock: 20,
  },
  {
    id: 3,
    name: 'O Sol é para Todos',
    author: 'Harper Lee',
    publisher: 'Editora José Olympio',
    releaseDate: '1960',
    stock: 10,
  },
  {
    id: 4,
    name: 'A Revolução dos Bichos',
    author: 'George Orwell',
    publisher: 'Companhia das Letras',
    releaseDate: '1945',
    stock: 20,
  },
]);

const isModalOpen = ref(false);
const isConfirmModalOpen = ref(false);
const searchTerm = ref('');
const modalTitle = ref('Adicionar Livro');
let nextId = books.value.length + 1;
let bookToDeleteId: number | null = null;

const bookForm = ref<BookObject>({
  id: nextId,
  name: '',
  author: '',
  publisher: '',
  releaseDate: '',
  stock: 0,
});

function openModal(book: BookObject | null = null) {
  if (book) {
    modalTitle.value = 'Editar Livro';
    bookForm.value = { ...book };
  } else {
    modalTitle.value = 'Adicionar Livro';
    bookForm.value = {
      id: nextId,
      name: '',
      author: '',
      publisher: '',
      releaseDate: '',
      stock: 0,
    };
  }
  isModalOpen.value = true;
}

function saveBook(book: BookObject) {
  const index = books.value.findIndex((b) => b.id === book.id);

  if (index !== -1) {
    books.value[index] = { ...book };
  } else {
    books.value.push({ ...book });
    nextId++;
  }
  isModalOpen.value = false;
}

function openConfirmDeleteModal(id: number) {
  bookToDeleteId = id;
  isConfirmModalOpen.value = true;
}

function deleteBook() {
  if (bookToDeleteId !== null) {
    books.value = books.value.filter((book) => book.id !== bookToDeleteId);
    bookToDeleteId = null;
  }
  isConfirmModalOpen.value = false;
}

const filteredBooks = computed(() => {
  return books.value.filter((book) => {
    const query = searchTerm.value.toLowerCase();
    return (
      book.name.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.publisher.toLowerCase().includes(query) ||
      book.releaseDate.toLowerCase().includes(query) 
    );
  });
});

function filterBooks(term: string) {
  searchTerm.value = term;
}
</script>
