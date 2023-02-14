<template>
  <main>
    <Panel v-if="loggedIn" @logout="loggedIn=false" />
    <Login v-else @login="loggedIn=true" />
  </main>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

import Login from './components/Login.vue'
import Panel from './components/Panel.vue'

const loggedIn = ref<boolean>()

onBeforeMount(() => {
  loggedIn.value = (localStorage.getItem('access-key') === null ? false : true)
})
</script>
