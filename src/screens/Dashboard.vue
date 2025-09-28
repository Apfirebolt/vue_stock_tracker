<template>
  <div class="min-h-screen bg-info">
    <div class="bg-white shadow-lg rounded-lg p-8 mt-16">
      <h1 class="text-4xl font-bold text-primary mb-4 text-center">Dashboard</h1>
       <!-- Sidebar -->
      <aside
        class="w-full md:w-1/4 bg-white rounded-lg shadow p-6 mb-8 md:mb-0"
      >
        <h2 class="text-lg font-semibold mb-4">Navigation</h2>
        <ul class="space-y-2">
          <li><a href="#" class="text-primary hover:underline">Overview</a></li>
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
          <li><a href="#" class="text-primary hover:underline">Settings</a></li>
        </ul>
      </aside>
       <!-- Dashboard Widgets -->
      <section class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Portfolio Summary Widget -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-xl font-semibold mb-2">Portfolio Summary</h3>
          <p class="text-3xl font-bold text-primary mb-2">$12,500</p>
          <p class="text-green-600 font-semibold">+3.5% Today</p>
        </div>
        <!-- Market News Widget -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-xl font-semibold mb-2">Market News</h3>
          <ul class="list-disc pl-5 text-gray-700">
            <li>Stock XYZ hits all-time high</li>
            <li>Market volatility expected this week</li>
            <li>New IPOs launching soon</li>
          </ul>
        </div>
        <!-- Watchlist Widget -->
        <div class="bg-white rounded-lg shadow p-6 col-span-1 md:col-span-2">
          <h3 class="text-xl font-semibold mb-2">Watchlist</h3>
          <table class="w-full text-left">
            <thead>
              <tr>
                <th class="py-2">Symbol</th>
                <th class="py-2">Price</th>
                <th class="py-2">Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>APPL</td>
                <td>$180.50</td>
                <td class="text-green-600">+1.2%</td>
              </tr>
              <tr>
                <td>GOOG</td>
                <td>$2,800.00</td>
                <td class="text-red-600">-0.5%</td>
              </tr>
              <tr>
                <td>TSLA</td>
                <td>$700.00</td>
                <td class="text-green-600">+2.1%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
            leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95">
                <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div class="mt-2">
                    <AccountForm @add-account-action="addAccountActionUtil" @close-modal="closeModal" :errorMessage="errorMessage" />
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
import { ref } from "vue";
import { useAccount } from '../stores/account';
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
import AccountForm from "../components/AccountForm.vue";

const isOpen = ref(false);
const errorMessage = ref("");

function closeModal() {
  isOpen.value = false;
  errorMessage.value = "";
}
</script>
