<template>
  <div class="q-ma-md">
    <div class="q-gutter-md row items-center">
      <q-icon name="dashboard" class="text-grey-9 q-mr-xs q-mb-xs" size="28px" />
      <h2 class="text-grey-9 q-mb-none">Dashboard</h2>
    </div>
    <div class="dashboard-grid">
      <div class="left-column">
        <q-card class="small-card">
          <q-card-section>
            <q-icon name="book" class="text-primary q-mb-sm" size="28px" />
            <div class="card-title">Livros Pendentes</div>
            <div>{{ pendingBooks }}</div>
          </q-card-section>
        </q-card>
        <q-card class="small-card">
          <q-card-section>
            <q-icon name="warning" class="text-negative q-mb-sm" size="28px" />
            <div class="card-title">Livros Atrasados</div>
            <div>{{ overdueBooks }}</div>
          </q-card-section>
        </q-card>
        <q-card class="small-card">
          <q-card-section>
            <q-icon name="person" class="text-info q-mb-sm" size="28px" />
            <div class="card-title">Usuário Que Aluga Mais Livros</div>
            <div>{{ rentedBooksPerUser }}</div>
          </q-card-section>
        </q-card>
        <q-card class="small-card">
          <q-card-section>
            <q-icon name="event_available" class="text-positive q-mb-sm" size="28px" />
            <div class="card-title">Livros Devolvidos Dentro e Fora do Prazo</div>
            <div>Dentro do Prazo: {{ returnedBooksOnTime }}</div>
            <div>Fora do Prazo: {{ returnedBooksLate }}</div>
          </q-card-section>
        </q-card>
        <q-card class="small-card">
          <q-card-section>
            <q-icon name="people" class="text-warning q-mb-sm" size="28px" />
            <div class="card-title">Média de Aluguéis por Usuário</div>
            <div>{{ rentalsPerUser }}</div>
          </q-card-section>
        </q-card>
        <q-card class="small-card">
          <q-card-section>
            <q-icon name="star" class="text-accent q-mb-sm" size="28px" />
            <div class="card-title">Livro Mais Alugado</div>
            <div>{{ mostRentedBook }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="right-column">
        <q-card class="chart-card">
          <q-card-section>
            <div class="chart-title">Aluguéis por Usuário (Gráfico)</div>
            <BarChart :data="chartData" :options="chartOptions" class="chart" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { TooltipItem } from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const pendingBooks = ref(generateRandomNumber(0, 50));
const overdueBooks = ref(generateRandomNumber(0, 50));
const rentedBooksPerUser = ref('Ashley Darwin');
const returnedBooksOnTime = ref(generateRandomNumber(0, 50));
const returnedBooksLate = ref(generateRandomNumber(0, 50));
const rentalsPerUser = ref(generateRandomNumber(0, 10));
const mostRentedBook = ref('Imperador das Trevas');

const chartData = ref({
  labels: ['Ana Silva', 'Carlos Souza', 'Mariana Oliveira', 'Paulo Costa', 'Renata Almeida'],
  datasets: [
    {
      label: 'Aluguéis',
      data: [
        generateRandomNumber(0, 10),
        generateRandomNumber(0, 10),
        generateRandomNumber(0, 10),
        generateRandomNumber(0, 10),
        generateRandomNumber(0, 10),
      ],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Aluguéis por Usuário',
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem: TooltipItem<'bar'>) => {
          return `${tooltipItem.raw} aluguéis`;
        },
      },
    },
  },
});

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const BarChart = Bar;
</script>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 5px;
}

.left-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.right-column {
  display: flex;
  justify-content: flex-end;
}

.chart-card {
  width: fit-content;
}

.chart {
  height: 200px;
  width: 590px;
}

.small-card {
  height: 130px;
  width: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.chart-title {
  margin-bottom: 10px;
  font-weight: bold;
  text-align: center;
}

.card-title {
  font-weight: bold;
}
</style>
