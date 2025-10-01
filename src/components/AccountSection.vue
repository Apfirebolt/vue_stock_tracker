<template>
  <!-- Dashboard Widgets -->
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-2xl font-semibold mb-2 bg-light shadow-md p-2">Accounts</h3>
    <div v-if="accounts.length === 0" class="text-gray-500">
      No accounts available.
    </div>
    <ul v-else class="space-y-4">
      <li v-for="account in accounts" :key="account._id" class="border-b pb-2">
        <AccountCard
          :account="account"
          @add-balance="setAccountBalanceUtil"
          @set-default="setAccountDefaultUtil"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import AccountCard from "./AccountCard.vue";

const props = defineProps({
  accounts: {
    type: Array,
    required: true,
  },
  setAccountBalance: {
    type: Function,
    required: true,
  },
  setAccountDefault: {
    type: Function,
    required: true,
  },
});

const setAccountBalanceUtil = (accountId, amount) => {
  props.setAccountBalance(accountId, amount);
};

const setAccountDefaultUtil = (accountId) => {
  props.setAccountDefault(accountId);
};

const { accounts, setAccountBalance, setAccountDefault } = props;
const errorMessage = ref("");
const currentValue = ref(0);
</script>
