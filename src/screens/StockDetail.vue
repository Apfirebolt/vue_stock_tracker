<template>
  <div class="min-h-screen bg-info">
    <div class="bg-white shadow-lg rounded-lg p-8 mt-16">
      <h1 class="text-4xl font-bold text-primary mb-4 text-center">Symbols</h1>
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
        <div>
          <p><strong>Industry:</strong> {{ stockData.finnhubIndustry }}</p>
          <p>
            <strong>Market Cap:</strong> ${{
              stockData.marketCapitalization.toLocaleString()
            }}M
          </p>
          <p>
            <strong>Shares Outstanding:</strong>
            {{ stockData.shareOutstanding.toLocaleString() }}
          </p>
          <p><strong>IPO Date:</strong> {{ stockData.ipo }}</p>
          <p><strong>Country:</strong> {{ stockData.country }}</p>
          <p><strong>Currency:</strong> {{ stockData.currency }}</p>
          <p><strong>Phone:</strong> {{ stockData.phone }}</p>
          <p>
            <strong>Website:</strong>
            <a
              :href="stockData.weburl"
              target="_blank"
              class="text-primary underline"
              >{{ stockData.weburl }}</a
            >
          </p>
        </div>
        <!-- Stock Quote -->
        <div v-if="stockQuote" class="mt-8">
          <h3 class="text-xl font-bold mb-2">Stock Quote</h3>
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
                <td class="border px-2 py-1">{{ stockQuote.c }}</td>
                <td class="border px-2 py-1">{{ stockQuote.h }}</td>
                <td class="border px-2 py-1">{{ stockQuote.l }}</td>
                <td class="border px-2 py-1">{{ stockQuote.o }}</td>
                <td class="border px-2 py-1">{{ stockQuote.pc }}</td>
                <td
                  class="border px-2 py-1"
                  :class="{ 'text-green-600': stockQuote.d >= 0, 'text-red-600': stockQuote.d < 0 }"
                >
                  {{ stockQuote.d }}
                </td>
                <td
                  class="border px-2 py-1"
                  :class="{ 'text-green-600': stockQuote.dp >= 0, 'text-red-600': stockQuote.dp < 0 }"
                >
                  {{ stockQuote.dp }}% </td>
                </tr>
            </tbody>
          </table>
        </div>
        <!-- Stock Recommendations -->
        <div v-if="stockRecommendations.length" class="mt-8">
          <h3 class="text-xl font-bold mb-2">Stock Recommendations</h3>
          <table class="w-full border">
            <thead>
              <tr>
                <th class="border px-2 py-1">Period</th>
                <th class="border px-2 py-1">Buy</th>
                <th class="border px-2 py-1">Hold</th>
                <th class="border px-2 py-1">Sell</th>
                <th class="border px-2 py-1">Strong Buy</th>
                <th class="border px-2 py-1">Strong Sell</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rec in stockRecommendations" :key="rec.period">
                <td class="border px-2 py-1">{{ rec.period }}</td>
                <td class="border px-2 py-1">{{ rec.buy }}</td>
                <td class="border px-2 py-1">{{ rec.hold }}</td>
                <td class="border px-2 py-1">{{ rec.sell }}</td>
                <td class="border px-2 py-1">{{ rec.strongBuy }}</td>
                <td class="border px-2 py-1">{{ rec.strongSell }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Stock News -->
        <div v-if="stockNews.length" class="mt-8">
          <h3 class="text-xl font-bold mb-2">Latest News</h3>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "../plugins/interceptor";

const route = useRoute();
const loading = ref(false);
const error = ref(null);
const stockQuote = ref(null);
const stockData = ref(null);
const stockNews = ref([]);
const stockRecommendations = ref([]);
const search = ref("");

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
    const response = await axiosInstance.get(
      `/stock/quote?symbol=${search.value}`
    );
    console.log('Response ', response);
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

function refresh() {
  fetchData();
  fetchNews();
  fetchQuote();
  fetchRecommendations();
}

onMounted(() => {
  const symbol = route.params.symbol;
  if (symbol) {
    search.value = symbol;
    refresh();
  } else {
    error.value = "No symbol provided in route parameters.";
  }
});
</script>

<style scoped></style>
