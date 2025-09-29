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
        class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>
    </div>
    <button
      type="submit"
      class="self-start px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
    >
      Add Stock
    </button>
  </form>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  symbol: "",
  quantity: 1,
  comments: "",
});

const emit = defineEmits(["submit"]);

function submitForm() {
  emit("submit", { ...form });
  form.symbol = "";
  form.quantity = 1;
  form.comments = "";
}
</script>
