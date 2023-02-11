<template>
  <div class="record">
    <div class="date">
      <span>{{ useRelativeTime(date) }}</span>
    </div>
    <div class="values">
      <Value>
        <template #icon><i class="fa-solid fa-temperature-full"></i></template>
        <template #value><span>{{ Math.floor(Number(temperature)*10) / 10 }}&deg;C</span></template>
      </Value>
      <Value>
        <template #icon><i class="fa-solid fa-droplet"></i></template>
        <template #value><span>{{ humidity }}%</span></template>
      </Value>
      <Value>
        <template #icon><i class="fa-solid fa-cloud-arrow-down"></i></template>
        <template #value><span>{{ pressure }} hPa</span></template>
      </Value>
      <Value>
        <template #icon><i class="fa-solid fa-leaf"></i></template>
        <template #value><span>{{ gasResistance }} K&ohm;</span></template>
      </Value>
    </div>
    <button class="remove" title="Zmazať" @click="remove">&times;</button>
  </div>
</template>

<script setup lang="ts">
import useFetch from '../composables/useFetch'
import useRelativeTime from '../composables/useRelativeTime'

import Value from './Value.vue'

const { date, temperature, pressure, humidity } = defineProps<{
  date: number
  temperature: string
  pressure: string
  humidity: string
  gasResistance: string
}>()

const emit = defineEmits<{
  (e: 'deleted', id: number): void
}>()

const { data, fetchData: removeRecord } = useFetch<{
  success: boolean
  message: string
}>({
  endpoint: 'temp/remove',
  options: {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'access-key': localStorage.getItem('access-key')
    },
    body: JSON.stringify({ id: date })
  }
})

async function remove() {
  await removeRecord()

  if(data.value?.success) emit('deleted', date)
}
</script>

<style scoped>
div.record {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.15);
  padding: 15px 35px 15px 15px;
  border-radius: 15px;
  overflow: hidden;
  min-height: 60px;
  margin-bottom: 10px;
  position: relative;
}
div.record:last-of-type {
  margin-bottom: 0;
}
div.date {
  display: flex;
  gap: 10px;
  align-items: center;
}
div.date{
  opacity: 0.5;
  font-size: 12px;
}
div.values {
  margin-left: auto;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
button.remove {
  background-color: rgba(220, 20, 60);
  color: inherit;
  font-size: 20px;
  min-width: 20px;
  line-height: 1;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
}
@media screen and (max-width: 600px) {
}
</style>