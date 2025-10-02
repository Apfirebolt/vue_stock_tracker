<template>
  <div class="flex flex-col bg-neutral-100">
    <div
      class="flex items-center justify-between px-4 py-3 bg-white rounded-t shadow"
    >
      <span class="font-bold text-xl text-primary">{{ stock.symbol }}</span>
      <span class="bg-primary text-white px-2 py-1 rounded">
        Quantity: {{ stock.quantity }}
      </span>
    </div>
    <div class="px-4 py-4 bg-neutral-50 rounded-b">
      <div class="flex justify-between mb-2">
        <span class="text-gray-600">Buy Price:</span>
        <span class="font-semibold">${{ stock.buy_price }}</span>
      </div>
      <div class="flex justify-between mb-2">
        <span class="text-gray-600">Current Price:</span>
        <span
          class="font-semibold"
          :class="{
            'text-success': currentPrice > stock.buy_price,
            'text-danger': currentPrice < stock.buy_price,
            'text-gray-800': currentPrice === stock.buy_price,
          }"
        >
          ${{ currentPrice }}
        </span>
      </div>
      <div class="flex justify-between mb-2">
        <span class="text-gray-600">Change:</span>
        <span
          class="font-semibold"
          :class="{
            'text-success': percentChange > 0,
            'text-danger': percentChange < 0,
            'text-gray-800': percentChange === 0,
          }"
        >
          {{ percentChange > 0 ? "+" : "" }}{{ percentChange.toFixed(2) }}%
        </span>
      </div>
      <div
        v-if="stock.comments"
        class="mt-2 text-gray-500 text-sm italic border-t pt-2"
      >
        Comments: {{ stock.comments }}
      </div>
    </div>
    <div v-if="showQuantity" class="mt-2 mx-auto">
      <input
        type="number"
        v-model.number="quantityInput"
        min="1"
        :max="stock.quantity"
        class="border rounded px-2 py-1 w-24 mr-2"
        placeholder="Quantity"
      />
      <button
        class="px-3 py-1 bg-success text-white rounded hover:bg-green-700 transition"
        @click="updateStockUtil(stock)"
      >
        Confirm
      </button>
    </div>
    <button
      class="mt-3 px-4 py-2 bg-primary text-white rounded w-36 mx-auto my-2 hover:bg-blue-900 transition"
      @click="showQuantityBlock"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="inline-block w-4 h-4 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
        />
      </svg>
      Sell Stock
    </button>
  </div>
</template>

<script setup>
import { ref, computed, toRefs } from "vue";
const props = defineProps({
  stock: {
    type: Object,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  updateStock: {
    type: Function,
    required: true,
  },
});

const { stock, currentPrice, updateStock } = toRefs(props);
const errorMessage = ref("");
const showQuantity = ref(false);
const quantityInput = ref(0);

const percentChange = computed(() => {
  if (!stock.value.buy_price) return 0;
  return (
    ((currentPrice.value - stock.value.buy_price) / stock.value.buy_price) * 100
  );
});

const showQuantityBlock = () => {
  showQuantity.value = !showQuantity.value;
};

const updateStockUtil = async (stock) => {
  const payload = {
    sell_price: currentPrice.value,
    quantity: quantityInput.value,
  };
  await updateStock.value(stock._id, payload);
};
</script>
