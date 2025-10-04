<template>
  <div class="bg-info">
    <div class="bg-light shadow-lg rounded-lg p-8 mt-16">
      <h1 class="text-4xl font-bold text-primary mb-4 text-center">Symbols</h1>
      <div
        v-if="defaultAccount"
        class="mb-6 p-4 bg-gray-100 rounded flex items-center justify-between"
      >
        <div>
          <div class="text-lg font-semibold text-primary">Primary Account</div>
          <div class="text-gray-700">Name: {{ defaultAccount.bankName }}</div>
          <div class="text-gray-700">
            ID: {{ defaultAccount.accountNumber }}
          </div>
          <div class="text-gray-700">
            Balance: ${{ defaultAccount.balance }}
          </div>
        </div>
      </div>
      <div v-if="loading" class="text-gray-500">Loading...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <div v-else-if="stockData" class="space-y-4">
        <div class="flex items-center space-x-4">
          <img :src="stockData.logo" alt="Logo" class="w-16 h-16 rounded" />
          <div>
            <h2 class="text-2xl font-semibold">{{ stockData.name }}</h2>
            <p class="text-gray-600">
              {{ stockData.ticker }} &mdash; {{ stockData.exchange }}
            </p>
          </div>
        </div>
        <div class="bg-neutral-50 rounded-lg p-6 shadow-md">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="mb-2">
                <span class="font-semibold text-primary">Industry:</span>
                <span class="text-gray-700">{{
                  stockData.finnhubIndustry
                }}</span>
              </p>
              <p class="mb-2">
                <span class="font-semibold text-primary">Market Cap:</span>
                <span class="text-gray-700"
                  >${{ stockData.marketCapitalization.toLocaleString() }}M</span
                >
              </p>
              <p class="mb-2">
                <span class="font-semibold text-primary"
                  >Shares Outstanding:</span
                >
                <span class="text-gray-700">{{
                  stockData.shareOutstanding.toLocaleString()
                }}</span>
              </p>
              <p class="mb-2">
                <span class="font-semibold text-primary">IPO Date:</span>
                <span class="text-gray-700">{{ stockData.ipo }}</span>
              </p>
            </div>
            <div>
              <p class="mb-2">
                <span class="font-semibold text-primary">Country:</span>
                <span class="text-gray-700">{{ stockData.country }}</span>
              </p>
              <p class="mb-2">
                <span class="font-semibold text-primary">Currency:</span>
                <span class="text-gray-700">{{ stockData.currency }}</span>
              </p>
              <p class="mb-2">
                <span class="font-semibold text-primary">Phone:</span>
                <span class="text-gray-700">{{ stockData.phone }}</span>
              </p>
              <p class="mb-2">
                <span class="font-semibold text-primary">Website:</span>
                <a
                  :href="stockData.weburl"
                  target="_blank"
                  class="text-blue-600 underline hover:text-blue-800 transition"
                  >{{ stockData.weburl }}</a
                >
              </p>
            </div>
          </div>
        </div>
        <div v-if="defaultAccount" class="mt-8 flex justify-center">
          <div>
            <button
              @click.prevent="openStockForm"
              type="button"
              class="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow hover:scale-105 hover:from-blue-600 hover:to-primary transition-all duration-200"
            >
              <span class="inline-flex items-center">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 8v8m0 0l-4-4m4 4l4-4"
                  ></path>
                </svg>
                Buy Stock
              </span>
            </button>
            <button
              @click.prevent="openWatchListSelectForm"
              type="button"
              class="ml-4 px-6 py-2 bg-gradient-to-r from-secondary to-primary text-white font-semibold rounded-lg shadow hover:scale-105 hover:from-blue-600 hover:to-secondary transition-all duration-200"
            >
              <span class="inline-flex items-center">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Add to Watchlist
              </span>
            </button>
          </div>
        </div>

        <!-- Stock Quote -->
        <div v-if="stockQuote" class="mt-8">
          <h3
            class="text-primary bg-neutral-200 shadow-md p-2 text-center mb-3 text-xl"
          >
            Stock Quote
          </h3>
          <table class="w-full border">
            <thead>
              <tr>
                <th class="border px-2 py-1">Current Price</th>
                <th class="border px-2 py-1">High Price</th>
                <th class="border px-2 py-1">Low Price</th>
                <th class="border px-2 py-1">Open Price</th>
                <th class="border px-2 py-1">Previous Close</th>
                <th class="border px-2 py-1">Change</th>
                <th class="border px-2 py-1">Change %</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-2 py-1 text-center">{{ stockQuote.c }}</td>
                <td class="border px-2 py-1 text-center">{{ stockQuote.h }}</td>
                <td class="border px-2 py-1 text-center">{{ stockQuote.l }}</td>
                <td class="border px-2 py-1 text-center">{{ stockQuote.o }}</td>
                <td class="border px-2 py-1 text-center">{{ stockQuote.pc }}</td>
                <td
                  class="border px-2 py-1 text-center"
                  :class="{
                    'text-green-600': stockQuote.d >= 0,
                    'text-red-600': stockQuote.d < 0,
                  }"
                >
                  {{ stockQuote.d }}
                </td>
                <td
                  class="border px-2 py-1 text-center"
                  :class="{
                    'text-green-600': stockQuote.dp >= 0,
                    'text-red-600': stockQuote.dp < 0,
                  }"
                >
                  {{ stockQuote.dp }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Stock Recommendations -->
        <div v-if="stockRecommendations.length" class="mt-8">
          <h3
            class="text-primary bg-neutral-200 shadow-md p-2 text-center mb-3 text-xl"
          >
            Stock Recommendations
          </h3>
            <table class="w-full border">
            <thead>
              <tr>
              <th class="border px-2 py-1 text-center">Period</th>
              <th class="border px-2 py-1 text-center">Buy</th>
              <th class="border px-2 py-1 text-center">Hold</th>
              <th class="border px-2 py-1 text-center">Sell</th>
              <th class="border px-2 py-1 text-center">Strong Buy</th>
              <th class="border px-2 py-1 text-center">Strong Sell</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rec in stockRecommendations" :key="rec.period">
              <td class="border px-2 py-1 text-center">{{ rec.period }}</td>
              <td class="border px-2 py-1 text-center">{{ rec.buy }}</td>
              <td class="border px-2 py-1 text-center">{{ rec.hold }}</td>
              <td class="border px-2 py-1 text-center">{{ rec.sell }}</td>
              <td class="border px-2 py-1 text-center">{{ rec.strongBuy }}</td>
              <td class="border px-2 py-1 text-center">{{ rec.strongSell }}</td>
              </tr>
            </tbody>
            </table>
        </div>
        <!-- Stock News -->
        <div v-if="stockNews.length" class="mt-8">
          <h3
            class="text-primary bg-neutral-200 shadow-md p-2 text-center mb-3 text-xl"
          >
            Latest News
          </h3>
          <ul class="space-y-2">
            <li
              v-for="news in stockNews"
              :key="news.id || news.url"
              class="border-b pb-2 bg-light text-dark p-2 rounded shadow-md my-2"
            >
              <a
                :href="news.url"
                target="_blank"
                class="text-primary underline font-semibold"
                >{{ news.headline }}</a
              >
              <div class="text-gray-600 text-sm">
                {{ news.source }} &mdash;
                {{ new Date(news.datetime * 1000).toLocaleDateString() }}
              </div>
              <div class="text-gray-700">
                <p>
                  {{
                    news.summary.length > 200
                      ? news.summary.slice(0, 200) + "..."
                      : news.summary
                  }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="text-gray-500">No data available.</div>
    </div>
    <TransitionRoot appear :show="isStockFormOpen" as="template">
      <Dialog as="div" @close="closeStockForm" class="relative z-10">
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
                  <StockForm
                    @add-stock-action="buyStockUtil"
                    @close-modal="closeStockForm"
                    :errorMessage="errorMessage"
                    :stock="stockData"
                    :defaultAccount="defaultAccount"
                    :stockQuote="stockQuote"
                  />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot appear :show="isWatchListSelectFormOpen" as="template">
      <Dialog as="div" @close="closeWatchListSelectForm" class="relative z-10">
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
                  <WatchList
                    @close-modal="closeWatchListSelectForm"
                    @update-watchlist-action="updateWatchListUtil"
                    :watchlists="watchlists"
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
import { ref, onMounted, computed } from "vue";
import { useAuth } from "../stores/auth";
import { useAccount } from "../stores/account";
import { useStock } from "../stores/stock";
import { useWatchlist } from "../stores/watchlist";
import { useRoute } from "vue-router";
import { axiosInstance } from "../plugins/interceptor";
import StockForm from "../components/StockForm.vue";
import WatchList from "../components/WatchList.vue";
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
const stockQuote = ref(null);
const stockData = ref(null);
const stockNews = ref([]);
const stockRecommendations = ref([]);
const search = ref("");
const authStore = useAuth();
const accountStore = useAccount();
const stockStore = useStock();
const watchlistStore = useWatchlist();
const isStockFormOpen = ref(false);
const isWatchListSelectFormOpen = ref(false);

const authData = computed(() => authStore.authData);
const accounts = computed(() => accountStore.accounts);
const watchlists = computed(() => watchlistStore.getWatchlist);
const defaultAccount = computed(() =>
  accounts.value.find((acc) => acc.isDefault)
);

const closeStockForm = () => {
  isStockFormOpen.value = false;
};
const openStockForm = () => {
  isStockFormOpen.value = true;
};

const closeWatchListSelectForm = () => {
  isWatchListSelectFormOpen.value = false;
};
const openWatchListSelectForm = () => {
  isWatchListSelectFormOpen.value = true;
};

async function fetchData() {
  loading.value = true;
  error.value = null;
  try {
    const response = await axiosInstance.get(
      `/stock/profile2?symbol=${search.value}`
    );
    stockData.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch data";
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function fetchNews() {
  loading.value = true;
  error.value = null;
  try {
    // last 3 days news
    const to = new Date().toISOString().split("T")[0];
    const from = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    const response = await axiosInstance.get(
      `/company-news?symbol=${search.value}&from=${from}&to=${to}`
    );
    stockNews.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch news";
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function fetchQuote() {
  loading.value = true;
  error.value = null;
  try {
    const response = await axiosInstance.get(`/quote?symbol=${search.value}`);
    stockQuote.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch quote";
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function fetchRecommendations() {
  loading.value = true;
  error.value = null;
  try {
    const response = await axiosInstance.get(
      `/stock/recommendation?symbol=${search.value}`
    );
    stockRecommendations.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch recommendations";
    console.error(err);
  } finally {
    loading.value = false;
  }
}

const buyStockUtil = async (formData) => {
  try {
    const payload = {
      symbol: stockData.value.ticker,
      buy_price: stockQuote.value.c,
      quantity: Number(formData.quantity),
      account: defaultAccount.value._id,
      comments: formData.comments || "",
    };
    console.log("Buying stock with payload:", payload);
    await stockStore.buyStockAction(payload);
    closeStockForm();
    // refresh accounts to reflect new balance
    await accountStore.getAccountsAction();
    alert(
      `Successfully bought ${payload.quantity} shares of ${payload.symbol}`
    );
  } catch (error) {
    console.error("Failed to buy stock:", error);
    alert("Failed to buy stock: " + (error.message || "Unknown error"));
  }
};

function refresh() {
  fetchData();
  fetchNews();
  // execute fetchQuote after 1 second to avoid rate limit issues
  setTimeout(() => {
    fetchQuote();
  }, 1000);
  fetchRecommendations();
}

const getWatchLists = async (page = 1, limit = 10) => {
  try {
    if (watchlists.value.length === 0) {
      await watchlistStore.getWatchlistsAction(page, limit);
    }
  } catch (error) {
    console.error("Failed to fetch watchlists:", error);
  }
};

const updateWatchListUtil = async (watchlistId) => {
  try {
    const addedStock = {
      name: stockData.value.name,
      ticker: stockData.value.ticker,
      exchange: stockData.value.exchange,
      logo: stockData.value.logo,
    }
    await watchlistStore.updateWatchlistAction(watchlistId, {
      stocks: [addedStock],
    });
    closeWatchListSelectForm();
  } catch (error) {
    console.error("Failed to update watchlist:", error);
    alert("Failed to add stock to watchlist: " + (error.message || "Unknown error"));
  }
};

onMounted(() => {
  const symbol = route.params.symbol;
  if (symbol) {
    search.value = symbol;
    refresh();
  } else {
    error.value = "No symbol provided in route parameters.";
  }
  // fetch accounts if not already fetched
  if (accounts.value.length === 0) {
    accountStore.getAccountsAction();
  }
  // fetch watchlists if not already fetched
  if (watchlists.value.length === 0) {
    getWatchLists();
  }
});
</script>
