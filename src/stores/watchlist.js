import { defineStore } from "pinia";
import { ref } from "vue";
import { httpClient } from "../plugins/interceptor";
import { useAuth } from "./auth";
import { toast } from "vue3-toastify";

export const useWatchlist = defineStore("watchlist", {
  state: () => ({
    watchlistItem: ref({}),
    watchlist: ref([]),
    total: ref(0),
    itemsPerPage: ref(5),
    lastPage: ref(1),
    loading: ref(false),
  }),

  getters: {
    getWatchlistItem() {
      return this.watchlistItem;
    },
    getWatchlist() {
      return this.watchlist;
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
    async addToWatchlistAction(payload) {
      try {
        const auth = useAuth();
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.post("watchlist", payload, {
          headers,
        });
        if (response.status === 201) {
          toast.success("Added to watchlist!");
        }
        return response.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async getWatchlistsAction(page = 1) {
      try {
        const auth = useAuth();
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.get("watchlist?page=" + page, {
          headers,
        });
        if (response.status === 200) {
          this.watchlist = response.data.data;
          this.total = response.data.total;
          this.itemsPerPage = response.data.itemsPerPage;
          this.lastPage = response.data.lastPage;
        }
      } catch (error) {
        console.log("Some error occurred while fetching watchlist:", error);
        if (error.response && error.response.status === 401) {
          auth.logout();
        }
        return error;
      }
    },

    async updateWatchlistAction(itemId, itemData) {
      try {
        const auth = useAuth();
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.put("watchlist/" + itemId, itemData, {
          headers,
        });
        if (response.status === 200) {
          toast.success("Watchlist item updated!");
        }
        return response.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async deleteWatchlistAction(itemId) {
      try {
        const auth = useAuth();
        const headers = {
          Authorization: `Bearer ${auth.authData.token}`,
        };
        const response = await httpClient.delete("watchlist/" + itemId, {
          headers,
        });
        if (response.status === 200) {
          toast.success("Watchlist item removed!");
        }
        return response.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    resetWatchlistData() {
      this.watchlistItem = {};
      this.watchlist = [];
    },
  },
});
