<script setup lang="ts">
import { ref } from 'vue';
import Modal1 from './components/modal1/index.vue';
import { useModal } from './packages/tt-modal';

const { dialog } = useModal();
const loading = ref(false);
const handleOpenModal = async () => {
  const ret = await dialog.open(Modal1, { title: 'Modal 1', okLoading: loading.value });
  loading.value = true;

  console.log('open modal 1', ret);

  setTimeout(() => {
    loading.value = false;
  }, 1000);
};
</script>
<template>
  <h1>Hello World</h1>
  <button @click="handleOpenModal">open modal 1</button>
</template>
