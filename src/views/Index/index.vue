<template>
  <h1>Index Page</h1>
  <h2>{{ message }}</h2>
  <hello :msg="hello" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Hello from '../../components/Hello/index.vue'

const message = ref('')
const hello = ref('hello, world....')

const setMessage = () => {
  setTimeout(() => {
    message.value = 'Welcome To Vite + Vue3 + TS Project'
  }, 3000)
}

onMounted(() => {
  setMessage()
})
</script>
