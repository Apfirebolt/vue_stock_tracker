<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded shadow h-128 overflow-y-auto">
    <h2 class="text-xl font-semibold mb-4 text-center">Watchlists</h2>
    <div v-if="watchlists && watchlists.length">
      <div v-for="watchlist in watchlists" :key="watchlist._id" class="border rounded p-4 mb-3 flex flex-col">
        <label class="flex items-center space-x-2">
          <input type="checkbox" :value="watchlist._id" v-model="selectedWatchlists" />
          <span class="font-semibold text-lg">{{ watchlist.name }}</span>
        </label>

        <div class="mt-2 text-sm text-gray-600">
          <p>
            Created At: {{ new Date(watchlist.created_at).toLocaleDateString() }}
          </p>
        </div>
      </div>

      <div class="flex justify-center mt-3">
        <button @click="updateWatchListUtil"
          class="bg-secondary text-white px-4 py-2 rounded hover:bg-emerald-700 transition flex items-center justify-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15.232 5.232l3.536 3.536M9 13l6.232-6.232a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm-6 6v-3a2 2 0 012-2h3" />
          </svg>
          <span>Update Watchlist</span>
        </button>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">No watchlists available.</div>
    <div v-if="errorMessage" class="mt-4 text-danger text-center">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  watchlists: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emits = defineEmits(["update-watchlist-action", "close-modal"]);

const selectedWatchlists = ref([]);
const errorMessage = ref("");

const updateWatchListUtil = () => {
  if (!selectedWatchlists.value.length) {
    errorMessage.value = "Please select at least one watchlist.";
    return;
  }
  emits("update-watchlist-action", selectedWatchlists.value);
};
</script>
