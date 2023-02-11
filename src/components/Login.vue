<template>
  <section class="login">
    <form @submit.prevent="login">
      <h3 style="margin-bottom:12px;line-height:1;">Prihlásenie</h3>
      <input v-model="username" placeholder="Meno" type="text" required autocomplete="username">
      <input v-model="password" placeholder="Heslo" type="password" required autocomplete="current-password">
      <button :disabled="loading">{{ !loading ? 'Prihlásiť' : 'Prihlasovanie' }}<Loader v-show="loading" color="white"/></button>
    </form>
    <span class="error" :style="{ 'visibility': error ? 'visible' : 'hidden' }">{{ error }}</span>
  </section>
</template>

<script setup lang="ts">
import Loader from './Loader.vue'

import useFetch from '../composables/useFetch'

import { ref } from 'vue'

type AuthResponse = {
  key: string
  message: string
  success: boolean
}

const emit = defineEmits(['login'])

const username = ref('')
const password = ref('')

const { data, error, loading, fetchData } = useFetch<AuthResponse>({
  endpoint: 'auth/login',
  options: { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }
})

async function login(){
  await fetchData({ body: JSON.stringify({ username: username.value, password: password.value }) })

  if(data.value?.success) {
    localStorage.setItem('access-key', data.value?.key)
    emit('login')
  }
}
</script>

<style scoped>
section.login {
  width:100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
form{
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 300px;
  margin-top: 10px;
  background-color: rgba(255,255,255,0.05);
  padding:20px;
  border-radius: 16px;
}
input {
  padding: 10px;
  border-radius: 6px;
  background-color: rgba(0,0,0,0.25);
  color: inherit
}
input:focus {
  outline: 2px solid crimson;
}
button {
  padding: 10px;
  border-radius: 6px;
  background-color: crimson!important;
  color: white!important;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
button:disabled {
  opacity: 0.75
}
span.error{
  color: crimson;
  height: 20px;
  margin-top: 10px;
}
</style>