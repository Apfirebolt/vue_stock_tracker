<template>
  <div class="bg-info">
    <div class="bg-white shadow-lg rounded-lg p-8 mt-16">
      <h1 class="text-4xl font-bold text-primary mb-4 text-center">
        Watchlist: {{ watchlist?.name || "Loading..." }}
      </h1>
      <div v-if="loading" class="text-gray-500">Loading...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <div v-else-if="watchlist && watchlist.stocks?.length" class="space-y-4">
        <div
          v-for="stock in watchlist.stocks"
          :key="stock.ticker"
          class="flex items-center space-x-4 bg-neutral-50 rounded-lg p-4 shadow-md"
        >
          <img :src="stock.logo" alt="Logo" class="w-12 h-12 rounded" />
          <div>
            <h2 class="text-xl font-semibold">{{ stock.name }}</h2>
            <p class="text-gray-600">
              {{ stock.ticker }} &mdash; {{ stock.exchange }}
            </p>
          </div>
          <button
            @click="removeStock(stock.ticker)"
            class="ml-auto flex items-center px-4 py-1 bg-danger text-white rounded hover:bg-red-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Remove
          </button>
        </div>
      </div>
      <div v-else class="text-gray-500">No stocks in this watchlist.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useWatchlist } from "../stores/watchlist";

const route = useRoute();
const watchlistStore = useWatchlist();
const loading = ref(false);
const error = ref(null);
const watchlist = ref(null);
const isAddStockFormOpen = ref(false);

async function fetchWatchlist() {
  loading.value = true;
  error.value = null;
  try {
    const id = route.params.id;
    await watchlistStore.getWatchlistsAction(1); // Ensure watchlists are loaded
    watchlist.value = watchlistStore.getWatchlist.find((wl) => wl._id === id);
    if (!watchlist.value) error.value = "Watchlist not found.";
  } catch (err) {
    error.value = "Failed to fetch watchlist";
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function removeStock(ticker) {
  try {
    await watchlistStore.updateWatchlistAction(watchlist.value._id, {
      stocks: watchlist.value.stocks.filter((s) => s.ticker !== ticker),
    });
    watchlist.value.stocks = watchlist.value.stocks.filter(
      (s) => s.ticker !== ticker
    );
  } catch (err) {
    alert("Failed to remove stock: " + (err.message || "Unknown error"));
  }
}

onMounted(() => {
  fetchWatchlist();
});
</script>
