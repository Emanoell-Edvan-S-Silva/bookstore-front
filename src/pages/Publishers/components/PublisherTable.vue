<template>
  <q-table
    class="custom-table"
    :rows="publishers"
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

interface PublisherObject {
  id: number;
  name: string;
  email: string;
  telephone: string;
  site: string;
}

defineProps<{
  publishers: PublisherObject[];
  onEdit: (publisher: PublisherObject) => void;
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
    name: 'email',
    label: 'E-mail',
    field: 'email',
    align: 'center',
  },

  {
    name: 'telephone',
    label: 'Telefone',
    field: 'telephone',
    align: 'center',
  },

  {
    name: 'site',
    label: 'Site',
    field: 'site',
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
