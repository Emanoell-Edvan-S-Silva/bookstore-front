<template>
  <q-header
    elevated
    :class="$q.dark.isActive ? 'bg-black' : 'bg-grey-2'"
  >
    <q-toolbar>
      <q-img
        src="../../../assets/images/logo-menu.png"
        class="q-mx-auto"
        style="max-width: 140px; height: auto"
      />


      <q-btn round color="black" icon="account_circle" @click="toggleMenu">
        <q-menu :v-model="menuVisible" anchor="bottom left">
          <q-list>
            <q-item clickable @click="logout">
              <q-item-section>
                Sair
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: 'SidebarHeaderComponent' });

const menuVisible = ref(false);

function toggleMenu() {
  console.log(menuVisible.value)
  menuVisible.value = !menuVisible.value;
  console.log(menuVisible.value)
}

function logout() {
  sessionStorage.removeItem('authToken');
  window.location.href = '/';
}
</script>
