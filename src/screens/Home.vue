<template>
  <div class="bg-info">
    <div class="bg-white shadow-lg rounded-lg p-8 mt-16">
      <!-- Sidebar -->
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar -->
        <aside
          ref="sidebarRef"
          class="md:w-1/5 w-full bg-white rounded-lg shadow p-6 mb-8 md:mb-0"
        >
          <ul class="space-y-2">
            <li>
              <a
                href="#"
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
              >
                Add Account
              </button>
            </li>
            <li>
              <a
                class="block bg-gray-100 hover:bg-primary hover:text-white rounded-md px-4 py-2 text-base font-medium text-primary mb-2 transition"
              >
                Audit Logs
              </a>
            </li>
          </ul>
        </aside>
        <!-- Dashboard Widgets -->
        <section ref="containerRef" class="w-full grid md:grid-cols-1 gap-8">
          <!-- Stocks List Widget -->
          <div>
            <h2 class="text-2xl font-semibold text-primary mb-4">Features Overview</h2>
            <ul class="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Create and manage multiple accounts to organize your investments.
              </li>
              <li>
                Add stocks to your portfolio and track their performance.
              </li>
              <li>
                View live stock prices fetched directly from the API.
              </li>
              <li>
                Access audit logs to review account and portfolio activity.
              </li>
            </ul>
            <p class="mt-6 text-base text-gray-600">
              Use the sidebar to navigate between accounts, your portfolio, and audit logs.
            </p>
            <p class="mt-6 text-base text-gray-600">
              You can use this to test your trading skills without any real financial risk. Happy investing!
              This has live API integration with US Stock exchange so you can see real time stock prices. You can virtually buy/sell stocks and track your portfolio performance over time.
              Your feedback is welcome to help us improve the app.
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { gsap } from "gsap";

const sidebarRef = ref(null);
const containerRef = ref(null);

onMounted(() => {
  if (sidebarRef.value) {
    gsap.from(sidebarRef.value, {
      duration: 2,
      x: -100,
      opacity: 0,
      ease: "power2.out",
    });
  }

  if (containerRef.value) {
    gsap.from(containerRef.value, {
      duration: 1,
      y: -500, // Starts 50px below
      opacity: 0,
      ease: "power2.out",
    });
  }
});
</script>
