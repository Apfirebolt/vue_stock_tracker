<template>
  <form
    @submit.prevent="submitForm"
    class="max-w-md mx-auto flex flex-col gap-4 bg-white p-6 rounded shadow"
  >
    <h2 class="text-xl font-semibold mb-2 text-center">Create Watchlist</h2>
    <div>
      <label for="watchlistName" class="block font-semibold mb-1"
        >Watchlist Name</label
      >
      <input
        id="watchlistName"
        v-model="form.name"
        type="text"
        required
        maxlength="50"
        placeholder="Enter watchlist name"
        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
    <button
      type="submit"
      class="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
    >
      Create Watchlist
    </button>
  </form>
</template>

<script setup>
import { reactive } from "vue";

const emits = defineEmits(["add-watchlist-action", "close-modal"]);

const form = reactive({
  name: "",
});

function submitForm() {
  if (!form.name) {
    alert("Please enter a watchlist name.");
    return;
  }
  if (form.name.length > 50) {
    alert("Watchlist name cannot exceed 50 characters.");
    return;
  }
  emits("add-watchlist-action", { ...form });
}
</script>
