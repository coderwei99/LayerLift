<script setup lang="ts">
import { reactive } from 'vue';
import Modal1 from './components/modal1/index.vue';
import { useModal } from './packages/tt-modal';

const modal  = useModal();
const handleOpenModal = async () => {
  const formData = reactive({
    name: '',
    age: '',
  });

  const ret = await modal.open(Modal1, formData, { title: 'Modal 1' });
  console.log('ret', ret);
};
</script>
<template>
  <h1>Hello World</h1>
  <button @click="handleOpenModal">open modal 1</button>
</template>
