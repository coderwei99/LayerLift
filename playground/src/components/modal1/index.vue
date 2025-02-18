<script setup lang="ts">
import Modal2 from '../modal2/index.vue';
import { useModal } from '../../packages/tt-modal';

defineProps<{
  model: Record<string, any>
  onSubmit: () => void
  onClose: () => void
}>()

const modal  = useModal();
const handleOpenModal = async () => {
  const ret = await modal.open(Modal2, { title: 'Modal 2' });
  console.log('ret', ret);
};

</script>


<template>
  <div>
    <h1>demo 1</h1>
    <a-form :model="model">
      <a-form-item label="name" name="name">
        <a-input v-model="model.name" />
      </a-form-item>
      <a-form-item label="age" name="age">
        <a-input v-model="model.age" />
      </a-form-item>
    </a-form>
    <button @click="handleOpenModal">open modal 2</button>
  </div>
</template>