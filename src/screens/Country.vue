<template>
  <div class="min-h-screen bg-info">
    <div class="bg-white shadow-lg rounded-lg py-6 mt-16">
      <h1 class="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-primary to-secondary text-center py-2">Countries</h1>
      <div v-if="loading" class="text-gray-500">Loading...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <div v-else-if="countries.length" class="space-y-2">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div
                v-for="country in countries"
                :key="country.code3"
                class="bg-gray-50 rounded-lg shadow p-4 flex flex-col"
            >
                <h2 class="text-xl font-semibold text-primary mb-2">{{ country.country }}</h2>
                <div class="text-sm text-gray-700 mb-1">
                    <strong>Code:</strong> {{ country.code2 }} / {{ country.code3 }}
                </div>
                <div class="text-sm text-gray-700 mb-1">
                    <strong>Currency:</strong> {{ country.currency }} ({{ country.currencyCode }})
                </div>
                <div class="text-sm text-gray-700 mb-1">
                    <strong>Region:</strong> {{ country.region }} - {{ country.subRegion }}
                </div>
                <div class="text-sm text-gray-700">
                    <strong>Rating:</strong> {{ country.rating ?? 'N/A' }}
                </div>
            </div>
        </div>
      </div>
      <div v-else class="text-gray-500">No countries available.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { axiosInstance } from "../plugins/interceptor";

const loading = ref(false);
const error = ref(null);
const countries = ref([]);

async function fetchCountries() {
  loading.value = true;
  error.value = null;
  try {
    const response = await axiosInstance.get("/country");
    countries.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch countries";
    console.error(err);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchCountries);
</script>

<style scoped></style>
