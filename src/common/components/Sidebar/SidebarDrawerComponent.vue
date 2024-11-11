<template>
  <q-drawer v-model="localDrawer" :mini="miniState" :width="200" :breakpoint="300" bordered dark>
    <q-toolbar>
      <q-btn flat @click="toggleDrawer" round dense icon="menu" color="grey-7" />
    </q-toolbar>

    <q-list>
      <SidebarItem
        v-for="link in linksList"
        :key="link.title"
        :link="link"
        :is-active="isActive(link.link)"
        @navigate="navigateTo(link.link)"
        :mini-state="miniState"
      />
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { useRoute } from 'vue-router';
import SidebarItem from './SidebarItems.vue';

const props = defineProps<{
  drawer: boolean;
  miniState: boolean;
  linksList: Array<{ title: string; icon: string; link: string }>;
}>();

const emit = defineEmits(['toggleDrawer', 'navigate']);
const route = useRoute();
const miniState = ref(props.miniState);
const localDrawer = ref(props.drawer);

watch(() => props.miniState, (newVal) => {
  miniState.value = newVal;
});

function toggleDrawer() {
  emit('toggleDrawer');
}

function navigateTo(link: string) {
  emit('navigate', link);
}

function isActive(link: string) {
  return route.path === link;
}
</script>
