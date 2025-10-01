<template>
  <div class="bg-neutral-100 rounded-lg shadow">
    <div class="p-4">
      <h4
        class="text-primary bg-neutral-200 shadow-md p-2 text-center mb-3 text-xl"
      >
        {{ account.bankName }}
      </h4>
      <p>Account Number: {{ account.accountNumber }}</p>
      <p>Balance: {{ account.balance }} {{ account.currency }}</p>
    </div>
    <div v-if="showAddBalance" class="mt-2 flex items-center gap-2 px-4 rounded">
      <input
        v-model.number="balance"
        type="number"
        min="0"
        class="border rounded px-2 py-1 w-24"
        placeholder="Amount"
      />
      <button
        class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
        @click="addBalance"
      >
        Confirm
      </button>
      <button
        class="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
        @click="
          () => {
            showAddBalance = false;
            balance = 0;
          }
        "
      >
        Cancel
      </button>
    </div>
    <div class="flex gap-2 px-4 py-2">
      <button
        class="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark transition flex items-center gap-1"
        @click="toggleAddBalance"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Add Balance
      </button>
      <button
        class="px-3 py-1 bg-secondary text-white rounded hover:bg-gray-300 transition flex items-center gap-1"
        :disabled="account.isDefault"
        @click="setDefault"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2v2m0 12v2m8-8h-2m-12 0H4m15.07-4.93l-1.41 1.41M6.34 17.66l-1.41 1.41m0-13.07l1.41 1.41M17.66 17.66l1.41 1.41"/>
        </svg>
        <span v-if="account.isDefault">Default</span>
        <span v-else>Make Default</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  account: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits(["add-balance", "set-default"]);
const balance = ref(0);
const showAddBalance = ref(false);

const toggleAddBalance = () => {
  showAddBalance.value = !showAddBalance.value;
};

const addBalance = () => {
  if (balance.value > 0) {
    emits("add-balance", props.account, balance.value);
    balance.value = 0;
    showAddBalance.value = false;
  }
};

const setDefault = () => {
  emits("set-default", props.account);
};
</script>
