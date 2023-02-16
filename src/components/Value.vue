<template>
  <div class="value">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <div class="data">
      <slot name="value"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
div.value{
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding-right: 5px;
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
div.data{
  font-weight: 700;
  font-size: 12px;
  padding-right: 6px;
}
</style>