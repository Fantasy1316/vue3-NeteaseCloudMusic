<template>
  <p>{{ msg }}</p>
</template>

<script setup lang="ts">
const props = defineProps({
  msg: String
})
</script>
