<script setup>
const collection  = ref('')
const openapi = ref('')
const editorOptions = {
  theme: 'vs-dark',
  minimap: {
    enabled: false
  },
}

let timeout
let delay = 1000

async function callApi() {
  const res = await $fetch('/api/postman-to-openapi', {
    method: 'POST',
    body: { collection: collection.value }
  })
  openapi.value = res.data
}

watch(collection, (newValue) => {
  if (newValue.length < 1) {
    // clear
    return
  }
  clearTimeout(timeout)
  timeout = setTimeout(callApi, delay)
})

function copyToClipboard() {
  navigator.clipboard.writeText(openapi.value)
  alert('Copied to clipboard!')
}

</script>

<template>
  <div class="flex h-svh bg-gray-800 p-4 space-x-4 text-white">
    <div class="flex-1 flex flex-col space-y-2">
      <div class="h-8">Postman Collection</div>
      <div class="flex-1 rounded-lg overflow-hidden">
        <MonacoEditor v-model="collection" lang="json" :options="editorOptions" class="h-full w-full" />
      </div>
    </div>
    <div class="flex-1 flex flex-col space-y-2">
      <div class="h-8 flex items-center justify-between">
        <div>OpenAPI</div>
        <div class="flex items-center">
          <button @click="copyToClipboard" class="inline-flex items-center justify-center p-1 transition-colors duration-150 rounded-lg hover:bg-gray-600">
            <Icon name="fluent:copy-16-regular" class="text-xl" />
          </button>
        </div>
      </div>
      <div class="flex-1 rounded-lg overflow-hidden">
        <MonacoEditor v-model="openapi" lang="yaml" :options="editorOptions" class="h-full w-full" />
      </div>
    </div>
  </div>
</template>
