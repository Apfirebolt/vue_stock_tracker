import { defineStore } from "pinia";
import { ref } from "vue";
import { httpClient } from "../plugins/interceptor";
import { useAuth } from "./auth";

export const useLog = defineStore("log", {
  state: () => ({
    logs: ref([]),
    total: ref(0),
    itemsPerPage: ref(10),
    lastPage: ref(1),
    loading: ref(false),
  }),

  getters: {
    getLogs() {
      return this.logs;
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
    async getLogsAction(page = 1) {
      const auth = useAuth();  
      this.loading = true;
      try {
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.get("logs?page=" + page, {
          headers,
        });
        if (response.status === 200) {
          console.log('Logs now fetched:', response.data.data);
          this.logs = response.data.data;
          this.total = response.data.total;
          this.itemsPerPage = response.data.itemsPerPage;
          this.lastPage = response.data.lastPage;
        }
      } catch (error) {
        console.log("Some error occurred while fetching logs:", error);
        if (error.response && error.response.status === 401) {
          auth.logout();
        }
        return error;
      } finally {
        this.loading = false;
      }
    },

    resetLogData() {
      this.logs = [];
      this.loading = false;
    },
  },
});
