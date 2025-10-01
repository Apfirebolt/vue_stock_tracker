<template>
  <div class="min-h-screen bg-info">
    <div class="bg-white shadow-lg rounded-lg p-8 mt-16">
      <h1 class="text-4xl font-bold text-primary mb-4 text-center">Symbols</h1>
      <p class="text-gray-600 mb-4 text-center">
        Find the stock symbol you're looking for.
      </p>

      <div class="mb-6 flex items-center space-x-2">
        <input
          v-model="search"
          type="text"
          placeholder="Search for a stock symbol..."
          class="border rounded px-4 py-2 w-full"
        />
        <button
          @click="refresh"
          class="bg-primary text-white px-4 py-2 rounded flex items-center"
          :disabled="loading"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
            />
            <line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
          Search
        </button>
      </div>
      <div v-if="loading" class="text-gray-500">Loading...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <div v-else-if="stockData" class="space-y-4">
        <div
          v-for="item in stockData.result"
          :key="item.symbol"
          class="p-4 border rounded hover:shadow-lg transition"
        >
          <div class="flex items-center space-x-4">
            <div>
              <h2 class="text-2xl font-semibold">{{ item.description }}</h2>
              <p class="text-gray-600">
                {{ item.displaySymbol }} &mdash; {{ item.type }}
              </p>
              <button
                @click="navigateToDetails(item.symbol)"
                class="mt-2 bg-secondary text-white px-3 py-1 rounded flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                  />
                  <path
                    d="M2 12c2-5 8-9 20 0"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                  />
                </svg>
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-gray-500">No data available.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { axiosInstance } from "../plugins/interceptor";

const search = ref("Goog");
const router = useRouter();
const loading = ref(false);
const error = ref(null);
const stockData = ref(null);

async function fetchData() {
  loading.value = true;
  error.value = null;
  try {
    const response = await axiosInstance.get(
      `/search?q=${search.value}&exchange=US`
    );
    stockData.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch data";
    console.error(err);
  } finally {
    loading.value = false;
  }
}

const navigateToDetails = (symbol) => {
  // Navigate to the StockDetail page with the selected symbol
  router.push({ name: "StockDetail", params: { symbol } });
};

function refresh() {
  fetchData();
}

onMounted(() => {
  fetchData();
});
</script>
