<template>
  <div>
    <h4 class="text-lg font-semibold">{{ account.bankName }}</h4>
    <p>Account Number: {{ account.accountNumber }}</p>
    <p>Balance: {{ account.balance }} {{ account.currency }}</p>
    <div v-if="showAddBalance" class="mt-2 flex items-center gap-2">
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
        @click="() => { showAddBalance = false; balance = 0; }"
      >
        Cancel
      </button>
    </div>
    <div class="flex gap-2 mt-2">
      <button
        class="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark transition"
        @click="toggleAddBalance"
      >
        Add Balance
      </button>
      <button
        class="px-3 py-1 bg-secondary text-white rounded hover:bg-gray-300 transition"
        :disabled="account.isDefault"
        @click="setDefault"
      >
        <span v-if="account.isDefault">Default</span>
        <span v-else>Make Default</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  account: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits(['add-balance', 'set-default']);
const balance = ref(0);
const showAddBalance = ref(false);

const toggleAddBalance = () => {
  showAddBalance.value = !showAddBalance.value;
};

const addBalance = () => {
  if (balance.value > 0) {
    emits('add-balance', props.account, balance.value);
    balance.value = 0;
    showAddBalance.value = false;
  }
};

const setDefault = () => {
  emits('set-default', props.account);
};

</script>
