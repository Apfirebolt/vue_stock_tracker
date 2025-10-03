<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded shadow">
    <h2 class="text-xl font-semibold mb-4 text-center">Watchlists</h2>
    <div v-if="watchlists && watchlists.length">
      <div
        v-for="watchlist in watchlists"
        :key="watchlist._id"
        class="border rounded p-4 mb-3 flex flex-col"
      >
        <label class="flex items-center space-x-2">
          <input
            type="checkbox"
            :value="watchlist._id"
            v-model="selectedWatchlists"
          />
          <span class="font-semibold text-lg">{{ watchlist.name }}</span>
        </label>

        <div class="mt-2 text-sm text-gray-600">
            <p>
              Created At: {{ new Date(watchlist.created_at).toLocaleDateString() }}
            </p>
        </div>
      </div>

      <button
        class="bg-secondary hover:bg-blue-700 text-white font-bold mx-auto py-2 px-4 rounded mt-4"
        :disabled="!selectedWatchlists.length"
        @click="updateWatchListUtil"
      >
        Update Watchlist
      </button>
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
