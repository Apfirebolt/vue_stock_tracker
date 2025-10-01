<template>
  <div v-if="logs.length > 0" class="bg-white rounded-lg shadow p-6">
    <h3 class="text-2xl font-semibold mb-2 bg-light shadow-md p-2">Audit Logs</h3>
    <ul class="divide-y divide-gray-200">
      <li v-for="log in logs" :key="log._id" class="py-4 flex items-start">
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-primary text-lg">{{ log.action }}</span>
            <span class="text-xs text-gray-500 ml-2">
              {{ new Date(log.timestamp).toLocaleString() }}
            </span>
          </div>
          <p class="mt-1 text-gray-700">{{ log.details }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  logs: {
    type: Array,
    required: true,
  },
});

const { logs } = props;
</script>
