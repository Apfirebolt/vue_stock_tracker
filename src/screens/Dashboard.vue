<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Header -->
    <header
      class="bg-primary text-white px-8 py-4 flex items-center justify-between shadow"
    >
      <h1 class="text-2xl font-bold">Stock Tracker Dashboard</h1>
      <div>
        <button
          class="bg-white text-primary px-4 py-2 rounded hover:bg-gray-200 font-semibold"
        >
          Logout
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col md:flex-row p-8 gap-8">
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
            <a href="#" class="text-primary hover:underline">Market Trends</a>
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
    </main>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
};
</script>

<style scoped>
.bg-primary {
  background-color: #22c55e;
}
.text-primary {
  color: #22c55e;
}
</style>
