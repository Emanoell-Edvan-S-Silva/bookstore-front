<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <HeaderComponent />
    <DrawerComponent
      :drawer="drawer"
      :mini-state="miniState"
      :links-list="linksList"
      @toggleDrawer="toggleDrawer"
      @navigate="navigateTo"
    />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HeaderComponent from '../components/Sidebar/SidebarHeaderComponent.vue';
import DrawerComponent from '../components/Sidebar/SidebarDrawerComponent.vue';

interface LinkItem {
  title: string;
  icon: string;
  link: string;
}

const linksList: LinkItem[] = [
  { title: 'DashBoard', icon: 'dashboard', link: '/' },
  { title: 'Usuários', icon: 'manage_accounts', link: '/users' },
  { title: 'Editoras', icon: 'business', link: '/publishers' },
  { title: 'Livros', icon: 'book', link: '/books' },
  { title: 'Locatários', icon: 'group', link: '/renters' },
  { title: 'Aluguéis', icon: 'bookmark', link: '/rents' },
];

const drawer = ref(true);
const miniState = ref(true);
const router = useRouter();

function toggleDrawer() {
  miniState.value = !miniState.value;
}

function navigateTo(link: string) {
  if (!miniState.value) {
    router.push(link);
  }
}
</script>
