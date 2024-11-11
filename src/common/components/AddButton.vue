<template>
  <q-btn no-caps color="primary" :label="label" @click="$emit('click')"/>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true
  }
});
</script>
