<template>
  <div class="min-h-screen bg-info flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg py-8 px-6 w-full max-w-md">
      <img :src="trackerSvg" alt="Tracker" class="w-36 h-36 mx-auto" />
      <h1
        class="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-500 to-teal-500 text-center py-2 rounded flex items-center justify-center gap-2"
      >
        <font-awesome-icon :icon="['fas', 'sign-in-alt']" />
        Login
      </h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-gray-700 mb-1" for="email">Email</label>
          <div class="relative">
            <span class="absolute left-3 top-2.5 text-gray-400">
              <font-awesome-icon :icon="['fas', 'envelope']" />
            </span>
            <input
              id="email"
              v-model="email"
              type="email"
              class="w-full pl-10 px-3 py-2 border rounded focus:outline-none focus:ring"
              required
            />
          </div>
        </div>
        <div>
          <label class="block text-gray-700 mb-1" for="password"
            >Password</label
          >
          <div class="relative">
            <span class="absolute left-3 top-2.5 text-gray-400">
              <font-awesome-icon :icon="['fas', 'lock']" />
            </span>
            <input
              id="password"
              v-model="password"
              type="password"
              class="w-full pl-10 px-3 py-2 border rounded focus:outline-none focus:ring"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-secondary text-white py-2 rounded font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2"
          :disabled="loading"
        >
          <font-awesome-icon :icon="['fas', 'sign-in-alt']" v-if="!loading" />
          <font-awesome-icon :icon="['fas', 'spinner']" spin v-if="loading" />
          {{ loading ? "Logging in..." : "Login" }}
        </button>
        <div v-if="error" class="text-red-500 text-center mt-2">
          {{ error }}
        </div>

        <div class="text-center mt-4">
          <router-link to="/register" class="text-blue-500 hover:underline">
            Don't have an account? Register
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { httpClient } from "../plugins/interceptor";
import { useAuth } from "../stores/auth";
import trackerSvg from "../assets/tracker.svg";

// FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock, faSignInAlt, faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faEnvelope, faLock, faSignInAlt, faSpinner);

const auth = useAuth();
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref(null);

async function handleLogin() {
  loading.value = true;
  error.value = null;
  try {
    await auth.loginAction({ email: email.value, password: password.value })
  } catch (err) {
    error.value = "Invalid email or password";
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>

<script>
export default {
  components: {
    FontAwesomeIcon
  }
}
</script>

<style scoped></style>
