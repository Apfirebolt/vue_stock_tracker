<template>
  <div class="bg-info">
    <div class="bg-white shadow-lg rounded-lg p-8 mt-16">
      <h1 class="text-4xl font-bold text-primary mb-4 text-center">Watch List</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuth } from "../stores/auth";
import { useRoute } from "vue-router";
import { axiosInstance } from "../plugins/interceptor";
import StockForm from "../components/StockForm.vue";
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
  DialogPanel
} from '@headlessui/vue'

const route = useRoute();
const loading = ref(false);
const error = ref(null);
const search = ref("");
const authStore = useAuth();
const isStockFormOpen = ref(false);

const authData = computed(() => authStore.authData);

const closeStockForm = () => {
  isStockFormOpen.value = false;
};
const openStockForm = () => {
  isStockFormOpen.value = true;
};
</script>
