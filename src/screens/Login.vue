<template>
  <div class="min-h-screen bg-info flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg py-8 px-6 w-full max-w-md">
      <h1
        class="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-500 to-teal-500 text-center py-2 rounded"
      >
        Login
      </h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-gray-700 mb-1" for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label class="block text-gray-700 mb-1" for="password"
            >Password</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 transition"
          :disabled="loading"
        >
          {{ loading ? "Logging in..." : "Login" }}
        </button>
        <div v-if="error" class="text-red-500 text-center mt-2">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axiosInstance from "../plugins/interceptor";

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref(null);

async function handleLogin() {
  loading.value = true;
  error.value = null;
  try {
    const response = await axiosInstance.post("/login", {
      email: email.value,
      password: password.value,
    });
    // Handle successful login (e.g., save token, redirect)
    // Example: localStorage.setItem('token', response.data.token);
  } catch (err) {
    error.value = "Invalid email or password";
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
