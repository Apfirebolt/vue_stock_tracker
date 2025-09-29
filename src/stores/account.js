import { defineStore } from "pinia";
import { ref } from "vue";
import { httpClient } from "../plugins/interceptor";
import { useAuth } from "./auth";
import { toast } from 'vue3-toastify';

const auth = useAuth();

export const useAccount = defineStore("account", {
  state: () => ({
    account: ref({}),
    accounts: ref([]),
    loading: ref(false),
  }),

  getters: {
    getAccount() {
      return this.account;
    },
    getAccounts() {
      return this.accounts;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async addAccount(accountData) {
      try {
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.post("accounts", accountData, {
          headers,
        });
        toast.success("Account added!");
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async getAccountAction(accountId) {
      try {
        const response = await httpClient.get("accounts/" + accountId);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    async getAccountsAction(page = 1) {
      try {
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.get("accounts?page=" + page, {
          headers,
        });
        this.accounts = response.data;
      } catch (error) {
        // handle 401 error code
        console.log('Some error occurred while fetching accounts:', error);
        if (error.response && error.response.status === 401) {
          auth.logout();
        }
        return error;
      }
    },

    async deleteAccount(accountId) {
      try {
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.delete("accounts/" + accountId, {
          headers,
        });
        toast.success("Account deleted!");
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async setAccountBalance(accountId, balanceData) {
      try {
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.patch(
          `accounts/${accountId}/balance`,
          balanceData,
          { headers }
        );
        if (response.status === 200) {
          toast.success("Balance added successfully!");
          return response.data;
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async setDefaultAccount(accountId) {
      try {
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.patch(
          `accounts/${accountId}/default`,
          {},
          { headers }
        );
        if (response.status === 200) {
          toast.success("Account set as default!");
          return response.data;
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    resetAccountData() {
      this.account = {};
      this.accounts = [];
    },
  },
});
