<template>
  <section class="panel">
    <header>
      <div class="upper-row">
        <h3>Meteostanica</h3>
        <button @click="logout">
          <i class="fa-solid fa-right-from-bracket"></i>
          Odhlásiť
        </button>
      </div>
      <div class="buttons">
        <button @click="removeAll">
          <i class="fa-solid fa-trash-can"></i>
          Zmazať všetky
        </button>
        <button @click="refresh">
          <i class="fa-solid fa-rotate"></i>
          Obnoviť
        </button>
      </div>
    </header>
    <div v-if="loading" style="text-align:center;margin-top:20px;">
      <Loader width="30px" border-width="6px" />
    </div>
    <template v-else>
      <div v-if="error" class="error">{{ error }}</div>
      <template v-else>
        <div v-if="data?.records.length" class="records">
          <Record
          v-for="record in data.records"
          :key="record.timestamp"
          :date="record.timestamp"
          :temperature="record.temperature"
          :humidity="record.humidity"
          :pressure="record.pressure"
          :gasResistance="record.gasResistance"
          @deleted="deletedRecord" />
        </div>
        <div v-else style="padding:20px;">
          <span>Nie sú k dispozícii žiadne namerané hodnoty</span>
        </div>
      </template>
    </template>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'

import Record from './Record.vue'
import Loader from './Loader.vue'

import useFetch from '../composables/useFetch'

const { data, error, loading, fetchData } = useFetch<{
  records: Array<{
    timestamp: number
    temperature: string
    humidity: string
    pressure: string
    gasResistance: string
    _id: string
    __v: number
  }>
}>({
  endpoint: 'temp/all',
  options: {
    method: 'GET',
    headers: { 'access-key': localStorage.getItem('access-key') }
  }
})

const { data: removeAllData, error: removeAllError, loading: removeAllLoading, fetchData: removeAllFn } = useFetch<{
  message: string
  success: boolean
}>({
  endpoint: 'temp/remove/all',
  options: {
    method: 'DELETE',
    headers: { 'access-key': localStorage.getItem('access-key') }
  }
})

const emit = defineEmits<{
  (e: 'logout'): void
}>()

function logout() {
  localStorage.removeItem('access-key')
  emit('logout')
}

function refresh() {
  fetchData()
}

async function removeAll() {
  await removeAllFn()

  if(removeAllData.value?.success === true) data.value!.records = []
}

function deletedRecord(payload: number) {
  if(data.value) data.value.records = data.value?.records.filter(record => record.timestamp !== payload)
}

onBeforeMount(() => fetchData())
</script>

<style scoped>
section.panel {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: rgba(var(--panel-background-color));
}
header{
  height: var(--panel-header-height);
  padding:10px 20px;
  background-color:firebrick;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
div.upper-row{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
div.buttons{
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}
header button{
  background-color: rgba(255,255,255,0.2);
  color: inherit;
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
header button:hover{
  background-color: rgba(255,255,255,0.3);
}
div.records {
  gap: 10px;
  padding: 20px 10px 20px 20px;
  max-height: calc(100vh - var(--panel-header-height));
  overflow-y: scroll;
}
div.records::-webkit-scrollbar {
  width:12px;
}
div.records::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border:4px solid transparent;
  border-radius:10px;
  background-clip:content-box;
}

@media screen and (max-width: 600px) {
  div.records {
    padding-left: 20px;
  }
}
</style>