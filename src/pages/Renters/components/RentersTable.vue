<template>
  <q-table
    class="custom-table"
    :rows="formattedRenters"
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

const props = defineProps<{
  renters: RentersObject[];
  onEdit: (renter: RentersObject) => void;
  onDelete: (id: number) => void;
}>();

const formattedRenters = computed(() =>
  props.renters.map((renter) => ({
    ...renter,
    address: `${renter.street}, ${renter.number}, ${renter.neighborhood}, ${renter.city}, ${renter.uf}`,
  }))
);

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
    name: 'address',
    label: 'Endereço',
    field: 'address',
    align: 'center',
  },
  {
    name: 'cpf',
    label: 'CPF',
    field: 'cpf',
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
