<template>
  <!-- Dashboard Widgets -->
  <section class="md:w-4/5 w-full grid md:grid-cols-1 gap-8">
    <!-- Stocks List Widget -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-2xl font-semibold mb-2 bg-light shadow-md p-2">Stocks</h3>
      <div v-if="stocks.length === 0" class="text-gray-500">
        No stocks available.
      </div>
      <div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div class="flex flex-col items-center bg-neutral-100 rounded-lg p-4 shadow">
                <span class="text-lg font-semibold">Total Stocks</span>
                <span class="text-2xl">{{ stocks.length }}</span>
            </div>
            <div class="flex flex-col items-center bg-neutral-100 rounded-lg p-4 shadow">
                <span class="text-lg font-semibold">Total Invested</span>
                <span class="text-2xl">${{ totalInvested.toFixed(2) }}</span>
            </div>
            <div class="flex flex-col items-center bg-neutral-100 rounded-lg p-4 shadow">
                <span class="text-lg font-semibold">Current Value</span>
                <span class="text-2xl">${{ computedCurrentValue.toFixed(2) }}</span>
            </div>
        </div>
        <ul v-if="stocks.length > 0" class="space-y-4">
          <li v-for="stock in stocks" :key="stock._id" class="border-b pb-2">
            <div class="flex flex-col bg-neutral-100">
              <span
                class="font-bold text-primary bg-neutral-200 shadow-md px-2 py-3 text-center mb-3"
                >{{ stock.symbol }}</span
              >
              <div class="px-4 py-2 flex flex-col">
                <span>Buy Price: ${{ stock.buy_price }}</span>
                <span
                  v-if="stockBuyAndCurrentValue[stock.symbol]"
                  :class="
                    stockBuyAndCurrentValue[stock.symbol].currentPrice >
                    stockBuyAndCurrentValue[stock.symbol].buyPrice
                      ? 'text-green-600'
                      : 'text-red-600'
                  "
                >
                  Current Price: ${{
                    stockBuyAndCurrentValue[stock.symbol].currentPrice
                  }}
                </span>
                <span>Quantity: {{ stock.quantity }}</span>
                <span v-if="stock.comments" class="text-gray-500 text-sm"
                  >Comments: {{ stock.comments }}</span
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { axiosInstance } from "../plugins/interceptor";
const props = defineProps({
  stocks: {
    type: Array,
    required: true,
  },
});

const stocks = props.stocks;
const errorMessage = ref("");
const currentValue = ref(0);
const stockBuyAndCurrentValue = ref({});

const totalInvested = computed(() =>
  stocks.reduce((total, stock) => total + stock.buy_price * stock.quantity, 0)
);
const computedCurrentValue = computed(() => currentValue.value);

// method to go through each stock, check the current price and calculate the current value of invested amount
const calculateCurrentValues = async () => {
  for (const stock of stocks) {
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

onMounted(async () => {
  await calculateCurrentValues();
});
</script>
