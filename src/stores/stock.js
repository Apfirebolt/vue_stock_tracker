import { defineStore } from "pinia";
import { ref } from "vue";
import { httpClient } from "../plugins/interceptor";
import { useAuth } from "./auth";
import { toast } from "vue3-toastify";

export const useStock = defineStore("stock", {
  state: () => ({
    stock: ref({}),
    stocks: ref([]),
    total: ref(0),
    itemsPerPage: ref(5),
    lastPage: ref(1),
    loading: ref(false),
  }),

  getters: {
    getStock() {
      return this.stock;
    },
    getStocks() {
      return this.stocks;
    },
    getTotal() {
      return this.total;
    },
    getItemsPerPage() {
      return this.itemsPerPage;
    },
    getLastPage() {
      return this.lastPage;
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

    async getStocksAction(page = 1) {
      try {
        const auth = useAuth();
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.get("stocks?page=" + page, {
          headers,
        });
        if (response.status === 200) {
          this.stocks = response.data.data;
          this.total = response.data.total;
          this.itemsPerPage = response.data.itemsPerPage;
          this.lastPage = response.data.lastPage;
        }
      } catch (error) {
        console.log("Some error occurred while fetching stocks:", error);
        if (error.response && error.response.status === 401) {
          auth.logout();
        }
        return error;
      }
    },

    async updateStockAction(stockId, stockData) {
      try {
        const auth = useAuth();
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.put("stocks/" + stockId, stockData, {
          headers,
        });
        if (response.status === 200) {
          toast.success("Stock updated!");
        }
        return response.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    resetStockData() {
      this.stock = {};
      this.stocks = [];
    },
  },
});
