<template>
  <q-select
    outlined
    v-model="localModelValue"
    :options="options"
    emit-value
    map-options
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';  

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  }
});

const emit = defineEmits(['update:modelValue']);

const localModelValue = ref(props.modelValue);

watch(localModelValue, (newVal: string) => {
  emit('update:modelValue', newVal);
});
</script>
