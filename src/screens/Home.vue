<template>
  <div class="min-h-screen bg-info flex items-center justify-center">
    <div class="max-w-2xl bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-4xl font-bold text-primary mb-4">
        Welcome to Stock Tracker
      </h1>
      <p class="text-dark leading-relaxed mb-4">
        Discover the fascinating world of dinosaurs! Dive into their history,
        learn about their habitats, and uncover the secrets of their extinction.
      </p>
      <p class="text-dark leading-relaxed mb-4">
        Whether you're a paleontology enthusiast or just curious, this is the
        perfect place to start your journey into the prehistoric era.
      </p>
      <div v-if="logs && logs.length">
        <h2 class="text-2xl font-semibold text-primary mb-2">Your Logs</h2>
        <ul class="list-disc pl-5 mb-4">
          <li v-for="(log, idx) in logs" :key="idx" class="text-dark mb-1">
            <p>
                {{ log.details }}
            </p>
            <p>
                {{ log.action }}
            </p>
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="text-dark italic">No logs found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "../stores/auth";
import { useLog } from "../stores/log";
import { computed, onMounted } from "vue";

const authStore = useAuth();
const logStore = useLog();

const authData = computed(() => authStore.authData);
const logs = computed(() => logStore.logs);

onMounted(async () => {
  if (authData.value && authData.value.token) {
    await logStore.getLogsAction();
    console.log("User Logs:", logs.value);
  }
});
</script>

<style scoped></style>
