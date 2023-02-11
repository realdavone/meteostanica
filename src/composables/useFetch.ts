import { ref } from 'vue'

export default function<T>({
  endpoint,
  options
}: {
  endpoint: string
  options?: Object
}) {
  const data = ref<T | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  const baseURL = 'https://meteostanica.onrender.com'

  async function fetchData(additionalOptions?: Object) {
    loading.value = true
    error.value = null

    return fetch(`${baseURL}/${endpoint}`, { ...options as RequestInit, ...additionalOptions })
      .then(async (response) => {
        if(response.ok) return response.json()
        else return await response.json().then(error => { throw new Error(error.message) })
      })
      .then(parsed => data.value = parsed)
      .catch(err => {
        data.value = null
        error.value = err.message
      })
      .finally(() => loading.value = false)
  }

  return { data, error, loading, fetchData }
}