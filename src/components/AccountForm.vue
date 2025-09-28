<template>
  <form
    @submit.prevent="submitForm"
    class="max-w-md mx-auto flex flex-col gap-4 bg-white p-6 rounded shadow"
  >
    <h2 class="text-xl font-semibold mb-2 text-center">Account</h2>
    <div>
      <label for="accountNumber" class="block font-semibold mb-1"
        >Account Number</label
      >
      <input
        id="accountNumber"
        v-model="form.accountNumber"
        type="text"
        required
        maxlength="20"
        placeholder="Enter account number"
        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
    <div>
      <label for="bankName" class="block font-semibold mb-1">Bank Name</label>
      <input
        id="bankName"
        v-model="form.bankName"
        type="text"
        required
        maxlength="50"
        placeholder="Enter bank name"
        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
    <div>
      <label for="balance" class="block font-semibold mb-1">Balance</label>
      <input
        id="balance"
        v-model.number="form.balance"
        type="number"
        min="0"
        step="0.01"
        required
        placeholder="Enter balance"
        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
    <div>
      <label for="currency" class="block font-semibold mb-1">Currency</label>
      <select
        id="currency"
        v-model="form.currency"
        required
        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
      >
        <option value="" disabled>Select currency</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
        <!-- Add more currencies as needed -->
      </select>
    </div>
    <button
      type="submit"
      class="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
    >
      Create Account
    </button>
  </form>
</template>

<script setup>
import { reactive } from "vue";

defineProps({
  errorMessage: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["add-account-action", "close-modal"]);

const form = reactive({
  accountNumber: "",
  bankName: "",
  balance: null,
  currency: "",
});

function submitForm() {
    if (!form.accountNumber || !form.bankName || form.balance === null || !form.currency) {
        alert("Please fill in all required fields.");
        return;
    }
    if (form.accountNumber.length > 20) {
        alert("Account Number cannot exceed 20 characters.");
        return;
    }
    if (form.bankName.length > 50) {
        alert("Bank Name cannot exceed 50 characters.");
        return;
    }
    if (form.balance < 0) {
        alert("Balance cannot be negative.");
        return;
    }
    // Emit the form data to the parent component
    emits("add-account-action", { ...form });
}
</script>
