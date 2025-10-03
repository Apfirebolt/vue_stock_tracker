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
        <p>
            Watch lists feature is under development. Please check back later.
        </p>
      </div>
    </div>
    <TransitionRoot as="template" :show="isWatchlistFormOpen">
      <Dialog as="div" class="relative z-10" @close="closeWatchlistForm">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-primary bg-opacity-30" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-lg transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <WatchlistForm
                  @add-watchlist-action="addWatchListUtil"
                  @close-modal="closeWatchlistForm"
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuth } from "../stores/auth";
import { useWatchlist } from "../stores/watchlist";
import { useRoute } from "vue-router";
import { axiosInstance } from "../plugins/interceptor";
import WatchlistForm from "../components/WatchlistForm.vue";
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
const authStore = useAuth();
const watchlistStore = useWatchlist();
const watchlists = computed(() => watchlistStore.getWatchlist);
const isWatchlistFormOpen = ref(false);

const authData = computed(() => authStore.authData);

const closeWatchlistForm = () => {
  isWatchlistFormOpen.value = false;
};
const openWatchlistForm = () => {
  isWatchlistFormOpen.value = true;
};

const addWatchListUtil = async (data) => {
  try {
    await watchlistStore.addWatchlist(data);
    error.value = "";
    closeWatchlistForm();
    await getWatchlists();
  } catch (error) {
    error.value = error.message || "Failed to add watchlist.";
  }
};

const getWatchlists = async () => {
  try {
    await watchlistStore.getWatchlistsAction();
  } catch (error) {
    console.error("Failed to fetch watchlists:", error);
  }
};

onMounted(async () => {
  await getWatchlists();
});
</script>
