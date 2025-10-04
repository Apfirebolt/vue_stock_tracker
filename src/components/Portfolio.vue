<template>
  <!-- Dashboard Widgets -->
  <section class="w-full grid md:grid-cols-1 gap-8">
    <!-- Stocks List Widget -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-2xl font-semibold mb-2 bg-light shadow-md p-2">Stocks</h3>
      <div v-if="stocks.length === 0" class="text-gray-500">
        No stocks available.
      </div>
      <div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div
            class="flex flex-col items-center bg-neutral-100 rounded-lg p-4 shadow"
          >
            <span class="text-lg font-semibold">Total Stocks</span>
            <span class="text-2xl">{{ stocks.length }}</span>
          </div>
          <div
            class="flex flex-col items-center bg-neutral-100 rounded-lg p-4 shadow"
          >
            <span class="text-lg font-semibold">Total Invested</span>
            <span class="text-2xl">${{ totalInvested.toFixed(2) }}</span>
          </div>
          <div
            class="flex flex-col items-center bg-neutral-100 rounded-lg p-4 shadow"
          >
            <span class="text-lg font-semibold">Current Value</span>
            <span class="text-2xl">${{ computedCurrentValue.toFixed(2) }}</span>
          </div>
        </div>
        <ul v-if="stocks.length > 0" class="space-y-4">
          <li v-for="stock in stocks" :key="stock._id" class="border-b pb-2">
            <StockCard
              :stock="stock"
              :updateStock="updateStockUtil"
              :currentPrice="getCurrentPrice(stock.symbol)"
            />
          </li>
        </ul>
      </div>
    </div>
  </section>
  <Pagination
    :currentPage="currentPage"
    :total="total"
    :perPage="10"
    class="mt-4"
    @update="updatePage"
  />
</template>

<script setup>
import { ref, onMounted, computed, toRefs, watch } from "vue";
import { axiosInstance } from "../plugins/interceptor";
import Pagination from "./Pagination.vue";
import StockCard from "./StockCard.vue";

const props = defineProps({
  stocks: {
    type: Array,
    required: true,
  },
  updateStock: {
    type: Function,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  lastPage: {
    type: Number,
    required: true,
  },
  getStocks: {
    type: Function,
    required: true,
  },
});

const { stocks, updateStock } = toRefs(props);
const errorMessage = ref("");
const currentValue = ref(0);
const currentPage = ref(1);
const showQuantity = ref(false);
const quantityInput = ref(0);
const stockBuyAndCurrentValue = ref({});

const totalInvested = computed(() =>
  stocks.value.reduce(
    (total, stock) => total + stock.buy_price * stock.quantity,
    0
  )
);
const computedCurrentValue = computed(() => currentValue.value);

watch(currentPage, (newPage) => {
  props.getStocks(newPage);
  calculateCurrentValues();
});

// a computed property which returns the current price of the passed symbol
const getCurrentPrice = (symbol) => {
  return stockBuyAndCurrentValue.value[symbol]?.currentPrice || 0;
};

const showQuantityBlock = () => {
  showQuantity.value = !showQuantity.value;
};

// method to go through each stock, check the current price and calculate the current value of invested amount
const calculateCurrentValues = async () => {
  for (const stock of stocks.value) {
    const currentPrice = await calculateCurrentPrice(stock.symbol);
    if (currentPrice) {
      currentValue.value += currentPrice * stock.quantity;
      stockBuyAndCurrentValue.value[stock.symbol] = {
        buyPrice: stock.buy_price,
        currentPrice,
      };
    }
  }
};

const calculateCurrentPrice = async (symbol) => {
  try {
    const response = await axiosInstance.get(`/quote?symbol=${symbol}`);
    return response.data.c;
  } catch (error) {
    console.error(`Failed to fetch current price for ${symbol}:`, error);
    return null;
  }
};

const updateStockUtil = async (stockId, stockData) => {
  await updateStock.value(stockId, stockData);
};

const updatePage = (page) => {
  currentPage.value = page;
};

onMounted(async () => {
  await calculateCurrentValues();
});
</script>
