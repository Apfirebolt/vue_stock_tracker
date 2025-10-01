<template>
  <div class="min-h-screen bg-info">
    <div class="bg-white shadow-lg rounded-lg p-8 mt-16">
      <h1 class="text-4xl font-bold text-primary mb-4 text-center">
        Dashboard
      </h1>
      <!-- Sidebar -->
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar -->
        <aside
          class="md:w-1/5 w-full bg-white rounded-lg shadow p-6 mb-8 md:mb-0"
        >
          <h2 class="text-lg font-semibold mb-4">Navigation</h2>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-primary hover:underline">Overview</a>
            </li>
            <li>
              <a href="#" class="text-primary hover:underline">My Portfolio</a>
            </li>
            <li>
              <button
                class="w-full text-left text-primary hover:underline mt-2"
                @click="isOpen = true"
              >
                Add Account
              </button>
            </li>
            <li>
              <a href="#" class="text-primary hover:underline">Settings</a>
            </li>
          </ul>
        </aside>
        <!-- Dashboard Widgets -->
        <section class="md:w-4/5 w-full grid md:grid-cols-1 gap-8">
          <!-- Stocks List Widget -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-semibold mb-2">Stocks</h3>
            <div v-if="stocks.length === 0" class="text-gray-500">
              No stocks available.
            </div>
            <div>
              <p class="mb-2">Total Stocks: {{ stocks.length }}</p>
              <p class="mb-2">
                Total Invested: $
                {{ totalInvested.toFixed(2) }}
              </p>
              <p class="mb-4">
                Current Value: $
                {{ computedCurrentValue.toFixed(2) }}
              </p>
              <ul
                v-if="stocks.length > 0"
                class="space-y-4 max-h-64 overflow-y-auto"
              >
                <li
                  v-for="stock in stocks"
                  :key="stock._id"
                  class="border-b pb-2"
                >
                  <div class="flex flex-col">
                    <span class="font-bold text-primary">{{
                      stock.symbol
                    }}</span>
                    <span>Buy Price: ${{ stock.buy_price }}</span>
                    <span
                      v-if="stockBuyAndCurrentValue[stock.symbol]"
                      :class="stockBuyAndCurrentValue[stock.symbol].currentPrice > stockBuyAndCurrentValue[stock.symbol].buyPrice ? 'text-green-600' : 'text-red-600'"
                    >
                      Current Price: ${{ stockBuyAndCurrentValue[stock.symbol].currentPrice }}
                    </span>
                    <span>Quantity: {{ stock.quantity }}</span>
                    <span v-if="stock.comments" class="text-gray-500 text-sm"
                      >Comments: {{ stock.comments }}</span
                    >
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- Market News Widget -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-semibold mb-2">Accounts</h3>
            <div v-if="accounts.length === 0" class="text-gray-500">
              No accounts available.
            </div>
            <ul v-else class="space-y-4 max-h-64 overflow-y-auto">
              <li
                v-for="account in accounts"
                :key="account._id"
                class="border-b pb-2"
              >
                <AccountCard
                  :account="account"
                  @add-balance="setAccountBalanceUtil"
                  @set-default="setAccountDefaultUtil"
                />
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <div class="mt-2">
                  <AccountForm
                    @add-account-action="addAccountActionUtil"
                    @close-modal="closeModal"
                    :errorMessage="errorMessage"
                  />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useAccount } from "../stores/account";
import { useStock } from "../stores/stock";
import { useAuth } from "../stores/auth";
import { axiosInstance } from "../plugins/interceptor";
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
  DialogTitle,
  DialogPanel,
} from "@headlessui/vue";
import AccountForm from "../components/AccountForm.vue";
import AccountCard from "../components/AccountCard.vue";

const isOpen = ref(false);
const errorMessage = ref("");
const currentValue = ref(0);
const stockBuyAndCurrentValue = ref({});
const stockStore = useStock();
const accountStore = useAccount();
const authStore = useAuth();

const authData = computed(() => authStore.authData);
const accounts = computed(() => accountStore.accounts);
const stocks = computed(() => stockStore.stocks);
const totalInvested = computed(() =>
  stocks.value.reduce(
    (total, stock) => total + stock.buy_price * stock.quantity,
    0
  )
);
const computedCurrentValue = computed(() => currentValue.value);

function closeModal() {
  isOpen.value = false;
  errorMessage.value = "";
}

const addAccountActionUtil = async (accountData) => {
  try {
    await accountStore.addAccount(accountData);
    errorMessage.value = "";
    closeModal();
    await getAccounts();
  } catch (error) {
    errorMessage.value = error.message || "Failed to add account.";
  }
};

const setAccountBalanceUtil = async (account, balance) => {
  try {
    await accountStore.setAccountBalance(account._id, { balance });
    await getAccounts();
  } catch (error) {
    console.error("Failed to set account balance:", error);
  }
};

const setAccountDefaultUtil = async (account) => {
  try {
    await accountStore.setDefaultAccount(account._id);
    await getAccounts();
  } catch (error) {
    console.error("Failed to set default account:", error);
  }
};

const getAccounts = async () => {
  try {
    await accountStore.getAccountsAction();
  } catch (error) {
    console.error("Failed to fetch accounts:", error);
  }
};

const getStocks = async () => {
  try {
    await stockStore.getStocksAction();
  } catch (error) {
    console.error("Failed to fetch stocks:", error);
  }
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
    const response = await axiosInstance.get(
      `/quote?symbol=${symbol}`
    );
    return response.data.c;
  } catch (error) {
    console.error(`Failed to fetch current price for ${symbol}:`, error);
    return null;
  }
};

onMounted(async () => {
  await getAccounts();
  await getStocks();
  await calculateCurrentValues();
});
</script>
