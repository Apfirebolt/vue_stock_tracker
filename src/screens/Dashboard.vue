<template>
  <div class="bg-info">
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
              <a
                href="#"
                @click.prevent="changeSelectedTab('accounts')"
                class="block bg-gray-100 hover:bg-primary hover:text-white rounded-md px-4 py-2 text-base font-medium text-primary mb-2 transition"
              >
                Accounts
              </a>
            </li>
            <li>
              <a
                href="#"
                @click.prevent="changeSelectedTab('portfolio')"
                class="block bg-gray-100 hover:bg-primary hover:text-white rounded-md px-4 py-2 text-base font-medium text-primary mb-2 transition"
              >
                My Portfolio
              </a>
            </li>
            <li>
              <button
                class="block w-full bg-gray-100 hover:bg-primary hover:text-white rounded-md px-4 py-2 text-base font-medium text-primary mb-2 text-left transition"
                @click="isOpen = true"
              >
                Add Account
              </button>
            </li>
            <li>
              <a
                @click.prevent="changeSelectedTab('logs')"
                class="block bg-gray-100 hover:bg-primary hover:text-white rounded-md px-4 py-2 text-base font-medium text-primary mb-2 transition"
              >
                Audit Logs
              </a>
            </li>
          </ul>
        </aside>
        <!-- Dashboard Widgets -->
        <section class="md:w-4/5 w-full grid md:grid-cols-1 gap-8">
          <!-- Stocks List Widget -->
          <Portfolio v-if="stocks.length > 0 && selectedTab === 'portfolio'" :stocks="stocks" />
          <!-- Market News Widget -->
          <AccountSection v-if="accounts.length > 0 && selectedTab === 'accounts'"
            :accounts="accounts"
            :setAccountBalance="setAccountBalanceUtil"
            :setAccountDefault="setAccountDefaultUtil"
          />
          <AuditLog v-if="logs.length > 0 && selectedTab === 'logs'" :logs="logs" />
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
import { useLog } from "../stores/log";
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
import Portfolio from "../components/Portfolio.vue";
import AccountSection from "../components/AccountSection.vue";
import AuditLog from "../components/AuditLog.vue";

const isOpen = ref(false);
const errorMessage = ref("");
const currentValue = ref(0);
const stockBuyAndCurrentValue = ref({});
const selectedTab = ref("portfolio");
const stockStore = useStock();
const accountStore = useAccount();
const authStore = useAuth();
const logStore = useLog();

const authData = computed(() => authStore.authData);
const accounts = computed(() => accountStore.accounts);
const stocks = computed(() => stockStore.stocks);
const logs = computed(() => logStore.logs);

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

const getAuditLogs = async () => {
  try {
    await logStore.getLogsAction();
  } catch (error) {
    console.error("Failed to fetch audit logs:", error);
  }
};

const changeSelectedTab = (tab) => {
  selectedTab.value = tab;
};

onMounted(async () => {
  await getAccounts();
  await getStocks();
  await getAuditLogs();
});
</script>
