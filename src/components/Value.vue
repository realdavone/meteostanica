<template>
  <div class="value">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <div class="value">
      <slot name="value"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
div.value {
  background-color: rgba(0,0,0,0.15);
  border-radius: 16px;
  font-size: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
  overflow: hidden;
  padding-right: 6px;
}
div.icon{
  background-color:rgba(220, 20, 60, 0.5);
  height: 30px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
div.value{
  font-weight: 700;
}
</style>