<template>
    <div class="min-h-screen bg-info mt-24">
        <div class="bg-white shadow-lg rounded-lg p-8">
            <h1 class="text-4xl font-bold text-primary mb-4">
                Symbol Page
            </h1>
            <div class="mb-6">
                <input
                    v-model="search"
                    type="text"
                    placeholder="Search for a stock symbol..."
                    class="border rounded px-4 py-2 w-full"
                />
                <button
                    @click="refresh"
                    class="mt-2 bg-primary text-white px-4 py-2 rounded"
                    :disabled="loading"
                >
                    Search
                </button>
            </div>
            <div v-if="loading" class="text-gray-500">Loading...</div>
            <div v-else-if="error" class="text-red-500">{{ error }}</div>
            <div v-else-if="stockData" class="space-y-4">
                <div class="flex items-center space-x-4">
                    <img :src="stockData.logo" alt="Logo" class="w-16 h-16 rounded" />
                    <div>
                        <h2 class="text-2xl font-semibold">{{ stockData.name }}</h2>
                        <p class="text-gray-600">{{ stockData.ticker }} &mdash; {{ stockData.exchange }}</p>
                    </div>
                </div>
                <div>
                    <p><strong>Industry:</strong> {{ stockData.finnhubIndustry }}</p>
                    <p><strong>Market Cap:</strong> ${{ stockData.marketCapitalization.toLocaleString() }}M</p>
                    <p><strong>Shares Outstanding:</strong> {{ stockData.shareOutstanding.toLocaleString() }}</p>
                    <p><strong>IPO Date:</strong> {{ stockData.ipo }}</p>
                    <p><strong>Country:</strong> {{ stockData.country }}</p>
                    <p><strong>Currency:</strong> {{ stockData.currency }}</p>
                    <p><strong>Phone:</strong> {{ stockData.phone }}</p>
                    <p>
                        <strong>Website:</strong>
                        <a :href="stockData.weburl" target="_blank" class="text-primary underline">{{ stockData.weburl }}</a>
                    </p>
                </div>
            </div>
            <div v-else class="text-gray-500">No data available.</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '../plugins/interceptor';

const search = ref('');
const loading = ref(false);
const error = ref(null);
const stockData = ref(null);

async function fetchData() {
    loading.value = true;
    error.value = null;
    try {
        const response = await axiosInstance.get(`/stock/profile2?symbol=${search.value}`);
        stockData.value = response.data;
    } catch (err) {
        error.value = 'Failed to fetch data';
        console.error(err);
    } finally {
        loading.value = false;
    }
}

function refresh() {
    fetchData();
}

onMounted(fetchData);
</script>

<style scoped></style>
