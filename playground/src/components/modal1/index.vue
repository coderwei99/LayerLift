<script setup lang="ts">
import Modal2 from '../modal2/index.vue';
import { useModal } from '../../packages/tt-modal';
import { ref } from 'vue';

const { dialog } = useModal();
const inputValue = ref('');
</script>


<template>
  <div>
    <h1>demo 1</h1>
    <input type="text" v-model="inputValue" />
    <button @click="dialog.open(Modal2, { title: 'Modal 2' })">open modal 2</button>
  </div>
</template>