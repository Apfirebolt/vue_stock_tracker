<template>
  <footer class="py-10 px-8 bg-secondary text-light dark:bg-slate-700 dark:text-white">
    <div class="container mx-auto px-4">
      <!-- First row: 3 columns -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-6">
        <div class="mb-4 md:mb-0 text-center md:text-left w-full md:w-1/3">
          <h3 class="font-semibold mb-2">About</h3>
          <p class="text-sm">Vue Stock Tracker helps you monitor your favorite stocks in real-time.</p>
        </div>
        <div class="mb-4 md:mb-0 text-center w-full md:w-1/3">
          <h3 class="font-semibold mb-2">Links</h3>
          <ul class="text-sm space-y-1">
            <li><a href="https://vuejs.org/" target="_blank" class="hover:underline">Vue.js</a></li>
            <li><a href="https://tailwindcss.com/" target="_blank" class="hover:underline">Tailwind CSS</a></li>
            <li><a href="https://github.com/" target="_blank" class="hover:underline">GitHub</a></li>
          </ul>
        </div>
        <div class="text-center md:text-right w-full md:w-1/3">
          <h3 class="font-semibold mb-2">Contact</h3>
          <p class="text-sm">Email: <a href="mailto:info@vuestocktracker.com" class="hover:underline">info@vuestocktracker.com</a></p>
        </div>
      </div>
      <!-- Second row: copyright -->
      <div>
        <p class="text-center text-sm">
          &copy; {{ currentYear }} Vue Stock Tracker. Built with Vue 3 and Tailwind CSS.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  setup() {
    const currentYear = computed(() => new Date().getFullYear())

    return {
      currentYear,
    }
  },
})
</script>