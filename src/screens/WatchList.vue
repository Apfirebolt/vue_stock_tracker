<template>
  <div class="bg-info">
    <div class="bg-white shadow-lg rounded-lg p-8 mt-16">
      <h1 class="text-4xl font-bold text-primary mb-4 text-center">
        Watch List
      </h1>
      <div class="flex justify-center mb-6">
        <button
          @click="openWatchlistForm"
          class="bg-secondary text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Create New Watchlist
        </button>
      </div>
      <div v-if="error" class="text-red-500 text-center mb-4">{{ error }}</div>
      <div v-if="loading" class="text-center">Loading watchlists...</div>
      <div v-else>
        <div v-if="watchlists && watchlists.length">
          <ul class="divide-y divide-gray-200">
            <li
              v-for="watchlist in watchlists"
              :key="watchlist._id"
              class="py-4 flex items-center justify-between"
            >
              <div>
                <span class="font-semibold text-lg text-primary">{{
                  watchlist.name
                }}</span>
                <span class="text-xs text-gray-400 ml-4">
                  Created: {{ new Date(watchlist.created_at).toLocaleString() }}
                </span>
                <span class="text-xs text-gray-400 ml-2">
                  Updated: {{ new Date(watchlist.updated_at).toLocaleString() }}
                </span>
              </div>
              <div>
                <span class="text-sm text-gray-500"
                  >Stocks: {{ watchlist.stocks.length }}</span
                >
                <div class="flex space-x-2 my-2">
                  <button
                    @click="openWatchlistForm"
                    class="text-primary hover:text-blue-700"
                    title="Edit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm0 0V17h4"
                      />
                    </svg>
                  </button>
                  <button
                    @click="watchlistStore.deleteWatchlistAction(watchlist._id)"
                    class="text-danger hover:text-red-700"
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-else class="text-center text-gray-500">No watchlists found.</div>
      </div>
      <Pagination
        v-if="watchlists && watchlists.length"
        :currentPage="currentPage"
        :lastPage="watchlistLastPage"
        :total="total"
        :perPage="5"
        class="mt-4"
        @update="updatePage"
      />
    </div>

    <TransitionRoot appear :show="isWatchlistFormOpen" as="template">
      <Dialog as="div" @close="closeWatchlistForm" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <div class="mt-2">
                  <WatchlistForm
                    @add-watchlist-action="addWatchListUtil"
                    @close-modal="closeWatchlistForm"
                  />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useAuth } from "../stores/auth";
import { useWatchlist } from "../stores/watchlist";
import { useRoute } from "vue-router";
import { axiosInstance } from "../plugins/interceptor";
import WatchlistForm from "../components/WatchlistForm.vue";
import Pagination from "../components/Pagination.vue";
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
  DialogTitle,
  DialogPanel,
} from "@headlessui/vue";

const route = useRoute();
const loading = ref(false);
const error = ref(null);
const search = ref("");
const currentPage = ref(1);
const totalPages = ref(1);
const authStore = useAuth();
const watchlistStore = useWatchlist();
const watchlists = computed(() => watchlistStore.getWatchlist);
const isWatchlistFormOpen = ref(false);

const authData = computed(() => authStore.authData);
const total = computed(() => watchlistStore.getTotal);
const watchlistItemsPerPage = computed(() => watchlistStore.getItemsPerPage);
const watchlistLastPage = computed(() => watchlistStore.getLastPage);

watch(currentPage, (newPage) => {
  getWatchlists(newPage);
});

const updatePage = (page) => {
  currentPage.value = page;
};

const closeWatchlistForm = () => {
  isWatchlistFormOpen.value = false;
};
const openWatchlistForm = () => {
  isWatchlistFormOpen.value = true;
};

const addWatchListUtil = async (data) => {
  try {
    await watchlistStore.addToWatchlistAction(data);
    error.value = "";
    closeWatchlistForm();
    await getWatchlists();
  } catch (error) {
    error.value = error.message || "Failed to add watchlist.";
  }
};

const getWatchlists = async (page = 1) => {
  try {
    await watchlistStore.getWatchlistsAction(page);
  } catch (error) {
    console.error("Failed to fetch watchlists:", error);
  }
};

onMounted(async () => {
  await getWatchlists();
});
</script>
