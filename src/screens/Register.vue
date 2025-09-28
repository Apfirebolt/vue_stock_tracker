<template>
  <div class="min-h-screen bg-info flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg py-8 px-6 w-full max-w-md">
      <h1
        class="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-500 to-teal-500 text-center py-2 rounded flex items-center justify-center gap-2"
      >
        <font-awesome-icon :icon="['fas', 'user-plus']" />
        Register
      </h1>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-gray-700 mb-1" for="firstName"
            >First Name</label
          >
          <div class="relative">
            <span class="absolute left-3 top-2.5 text-gray-400">
              <font-awesome-icon :icon="['fas', 'user']" />
            </span>
            <input
              id="firstName"
              v-model="firstName"
              type="text"
              class="w-full pl-10 px-3 py-2 border rounded focus:outline-none focus:ring"
              required
            />
          </div>
        </div>
        <div>
          <label class="block text-gray-700 mb-1" for="lastName"
            >Last Name</label
          >
          <div class="relative">
            <span class="absolute left-3 top-2.5 text-gray-400">
              <font-awesome-icon :icon="['fas', 'user']" />
            </span>
            <input
              id="lastName"
              v-model="lastName"
              type="text"
              class="w-full pl-10 px-3 py-2 border rounded focus:outline-none focus:ring"
              required
            />
          </div>
        </div>
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
          <font-awesome-icon :icon="['fas', 'arrow-right-to-bracket']" v-if="!loading" />
          <font-awesome-icon :icon="['fas', 'spinner']" spin v-else />
          {{ loading ? "Registering..." : "Register" }}
        </button>
        <div v-if="error" class="text-red-500 text-center mt-2">
          <font-awesome-icon :icon="['fas', 'exclamation-circle']" class="mr-1" />
          {{ error }}
        </div>
        <div class="text-center mt-4">
          <router-link to="/login" class="text-blue-500 hover:underline">
            Already have an account? Login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { httpClient } from "../plugins/interceptor";
import { computed } from "vue";
import { useAuth } from "../stores/auth";

// FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faEnvelope, faLock, faUserPlus, faArrowRightToBracket, faSpinner, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faEnvelope, faLock, faUserPlus, faArrowRightToBracket, faSpinner, faExclamationCircle);

const auth = useAuth();
const authData = computed(() => auth.getAuthData);
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref(null);

async function handleRegister() {
  loading.value = true;
  error.value = null;
  try {
    await auth.registerAction({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    });
  } catch (err) {
    error.value = "Registration failed. Please try again.";
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
