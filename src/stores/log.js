import { defineStore } from "pinia";
import { ref } from "vue";
import { httpClient } from "../plugins/interceptor";
import { useAuth } from "./auth";

export const useLog = defineStore("log", {
  state: () => ({
    logs: ref([]),
    loading: ref(false),
  }),

  getters: {
    getLogs() {
      return this.logs;
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
        this.logs = response.data;
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
