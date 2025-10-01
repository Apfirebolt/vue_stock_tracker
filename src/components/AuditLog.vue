<template>
  <div v-if="logs.length > 0" class="bg-white rounded-lg shadow p-6">
    <h3 class="text-xl font-semibold mb-2 bg-light shadow-2xl">Audit Logs</h3>
    <ul class="space-y-4">
      <li v-for="log in logs" :key="log._id" class="border-b pb-2">
        <div class="flex flex-col">
          <span class="font-bold text-primary">{{ log.action }}</span>
          <p>
            {{ log.details }}
          </p>
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
