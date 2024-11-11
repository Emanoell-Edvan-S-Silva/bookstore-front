<template>
  <q-item clickable @click="handleClick" :class="{ 'active-item': isActive }">
    <q-item-section avatar>
      <q-icon :name="link.icon" :class="{ 'text-blue': isActive }" />
      <q-tooltip v-if="miniState">{{ link.title }}</q-tooltip>
    </q-item-section>
    <q-item-section v-if="!miniState" :class="{ 'text-blue': isActive }">
      {{ link.title }}
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface LinkItem {
  title: string;
  icon: string;
  link: string;
}

const props = defineProps<{
  link: LinkItem;
  isActive: boolean;
  miniState: boolean;
}>();

const emit = defineEmits(['navigate']);

function handleClick() {
  emit('navigate', props.link.link);
}
</script>
