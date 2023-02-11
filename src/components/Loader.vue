<template>
  <div class="loader" :style="{
    borderColor: color ?? 'white',
    borderWidth: borderWidth ?? '3px',
    width: width ?? '15px' }">
  </div>
</template>

<script setup lang="ts">
const { color } = defineProps<{
  color?: string
  width?: string
  borderWidth?: string
}>()
</script>

<style scoped>
div.loader {
  display: inline-block;
  aspect-ratio: 1;
  border-radius: 50%;
  border-style: solid;
  border-top-color: transparent!important;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-name: spin;
  animation-iteration-count: infinite;
}

@keyframes spin{
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>