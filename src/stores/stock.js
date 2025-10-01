import { defineStore } from "pinia";
import { ref } from "vue";
import { httpClient } from "../plugins/interceptor";
import { useAuth } from "./auth";
import { toast } from "vue3-toastify";

export const useStock = defineStore("stock", {
  state: () => ({
    stock: ref({}),
    stocks: ref([]),
    loading: ref(false),
  }),

  getters: {
    getStock() {
      return this.stock;
    },
    getStocks() {
      return this.stocks;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async buyStockAction(payload) {
      try {
        const auth = useAuth();
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.post("stocks", payload, {
          headers,
        });
        if (response.status === 201) {
          toast.success("Stock added!");
        }
        return response.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async getStockAction(stockId) {
      try {
        const auth = useAuth();
        const response = await httpClient.get("stocks/" + stockId);
        this.stock = response.data;
        return response.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async getStocksAction(page = 1) {
      try {
        const auth = useAuth();
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.get("stocks?page=" + page, {
          headers,
        });
        this.stocks = response.data;
        return response.data;
      } catch (error) {
        console.log("Some error occurred while fetching stocks:", error);
        if (error.response && error.response.status === 401) {
          auth.logout();
        }
        return error;
      }
    },

    resetStockData() {
      this.stock = {};
      this.stocks = [];
    },
  },
});
