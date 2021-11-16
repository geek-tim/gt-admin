<template>
  <div class="p-4">
    <grow-card :loading="loading" class="enter-y"></grow-card>
  </div>
</template>
<script setup lang="ts">
import GrowCard from './components/GrowCard.vue'

import { ref, computed, defineComponent } from 'vue'

const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 1500)
</script>
<style lang="scss"></style>
'
