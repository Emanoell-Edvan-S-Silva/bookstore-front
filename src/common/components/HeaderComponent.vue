<template>
  <div class="q-mb-md">
    <div class="text-caption text-primary q-mb-xs">
      Principal > {{ breadcrumb }}
    </div>
    <div class="q-gutter-md row items-center">
      <q-icon :name="icon" class="text-grey-9 q-mr-xs q-mb-xs" size="28px" />
      <h2 class="text-grey-9 q-mb-none">{{ title }}</h2>
      <q-space />
      <slot name="button" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  breadcrumb: {
    type: String,
    required: true
  }
});
</script>
