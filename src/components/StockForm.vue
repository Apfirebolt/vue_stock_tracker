<template>
  <form @submit.prevent="submitForm" class="flex flex-col gap-4">
    <div>
      <label for="quantity" class="font-bold block mb-1">Quantity:</label>
      <input
        id="quantity"
        type="number"
        v-model.number="form.quantity"
        required
        min="1"
        class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
    <div>
      <label for="comments" class="font-bold block mb-1">Comments:</label>
      <textarea
        id="comments"
        v-model="form.comments"
        placeholder="Add any comments"
        rows="5"
        class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>
    </div>
    <button
      type="submit"
      :disabled="!canBuyStock"
      :class="{'opacity-50 cursor-not-allowed': !canBuyStock}"
      class="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
    >
      Add Stock
    </button>
  </form>
</template>

<script setup>
import { reactive, computed } from "vue";
const props = defineProps({
  stock: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  defaultAccount: {
    type: Object,
    required: false,
    default: null,
  },
  stockQuote: {
    type: Object,
    required: false,
    default: null,
  },
});

const form = reactive({
  symbol: "",
  quantity: 1,
  comments: "",
});

// destructure from props for easier access
const { stock, defaultAccount, stockQuote } = props;

const emit = defineEmits(["add-stock-action"]);

// check default balance and the stock price to disable buy button if balance is less than stock price
const canBuyStock = computed(() => {
  if (!defaultAccount || !stockQuote) return false;
  return defaultAccount.balance >= stockQuote.c * form.quantity;
});

const maxQuantity = computed(() => {
  if (!defaultAccount) return 0;
  return Math.floor(defaultAccount.balance / stockQuote.c);
});

function submitForm() {
  emit("add-stock-action", { ...form });
  form.symbol = "";
  form.quantity = 1;
  form.comments = "";
}
</script>
