<script setup lang="ts">
import { reactive } from 'vue';
import Modal1 from './components/modal1/index.vue';
import { useModal } from 'layerlift';

const modal  = useModal();
const updateUserInfo: () => Promise<{ code: number, message: string }> = async () => {
  console.log('updateUserInfo');
  return new Promise((resolve) => {
    const random = Math.random();
    console.log('random', random);
    setTimeout(() => {
      resolve({
        code: random > 0.5 ? 200 : 201,
        message: 'success',
      });
    }, 1000);
  });
};

const handleOpenModal = async () => {
  const formData = reactive({
    name: '',
    age: '',
  });

  const ret = await modal.open(Modal1, formData, async (state, resolve, reject) => {
    const res = await updateUserInfo();
    if(res.code === 200) {
      resolve(state);
      console.log('resolve is finished');
    } else {
      reject();
      console.log('reject is finished');
    }
  }, { title: 'Modal 1' });
  console.log('ret', ret);
};
</script>
<template>
  <button @click="handleOpenModal">open modal 1</button>
</template>
