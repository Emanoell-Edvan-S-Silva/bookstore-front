<template>
  <q-table
    class="custom-table"
    :rows="books"
    :columns="columns"
    row-key="id"
    rows-per-page-label="Registros por página:"
  >
    <template v-slot:body-cell-actions="props">
      <q-td class="flex justify-center">
        <q-btn icon="edit" @click="onEdit(props.row)" flat />
        <q-btn icon="delete" @click="onDelete(props.row.id)" flat />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { QTableColumn } from 'quasar';

interface BookObject {
  id: number;
  name: string;
  author: string;
  publisher: string;
  releaseDate: string;
  stock: number;
}

defineProps<{
  books: BookObject[];
  onEdit: (book: BookObject) => void;
  onDelete: (id: number) => void;
}>();

const columns = computed<QTableColumn[]>(() => [
  {
    name: 'name',
    label: 'Nome',
    field: 'name',
    align: 'center',
  },
  {
    name: 'author',
    label: 'Autor',
    field: 'author',
    align: 'center',
  },
  {
    name: 'publisher',
    label: 'Editora',
    field: 'publisher',
    align: 'center',
  },
  {
    name: 'releaseDate',
    label: 'Data de Lançamento',
    field: 'releaseDate',
    align: 'center',
  },
  {
    name: 'stock',
    label: 'Estoque',
    field: 'stock',
    align: 'center',
  },
  {
    name: 'actions',
    label: 'Ações',
    field: 'actions',
    align: 'center',
  },
]);
</script>

<style lang="scss">
.custom-table .q-table__bottom {
  background-color: $secondary-7;
}

.custom-table thead th {
  background-color: $secondary-7;
  font-weight: bold;
}
</style>
