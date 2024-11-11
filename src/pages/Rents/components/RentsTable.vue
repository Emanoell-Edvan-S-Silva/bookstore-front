<template>
  <q-table
    class="custom-table"
    :rows="rents"
    :columns="columns"
    row-key="id"
    rows-per-page-label="Registros por página:"
  >
    <template v-slot:body-cell-status="props">
      <q-td align="center">
        <div :class="getStatusClass(props.row.status)" class="status-badge">
          {{ props.row.status }}
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td class="flex justify-center">
        <q-btn icon="delete" @click="onDelete(props.row.id)" flat />
        <q-btn icon="check" @click="onFinalize(props.row.id)" flat />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { QTableColumn } from 'quasar';

interface RentObject {
  id: number;
  renter: string;
  book: string; 
  expectedReturnDate: string; 
  returnDate: string | null; 
  status: string; 
}

defineProps<{
  rents: RentObject[];
  onDelete: (id: number) => void;
  onFinalize: (id: number) => void;
}>();

const columns = computed<QTableColumn[]>(() => [
  {
    name: 'renter',
    label: 'Nome do Locatário',
    field: 'renter',
    align: 'center',
  },
  {
    name: 'book',
    label: 'Livro',
    field: 'book',
    align: 'center',
  },
  {
    name: 'expectedReturnDate',
    label: 'Data de Previsão',
    field: 'expectedReturnDate',
    align: 'center',
  },
  {
    name: 'returnDate',
    label: 'Data de Devolução',
    field: 'returnDate',
    align: 'center',
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'center',
  },
  {
    name: 'actions',
    label: 'Ações',
    field: 'actions',
    align: 'center',
  },
]);

function getStatusClass(status: string) {
  switch (status) {
    case 'Atrasado':
      return 'status-red';
    case 'Entregue':
      return 'status-green';
    case 'Pendente':
      return 'status-yellow';
    default:
      return '';
  }
}
</script>

<style lang="scss">
.custom-table .q-table__bottom {
  background-color: $secondary-7;
}

.custom-table thead th {
  background-color: $secondary-7;
  font-weight: bold;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 15px;
  color: white;
  display: inline-block;
}

.status-red {
  background-color: #f44336; 
}

.status-green {
  background-color: #4caf50; 
}

.status-yellow {
  background-color: #ffeb3b; 
  color: black;
}
</style>
