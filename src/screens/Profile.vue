<template>
  <div class="bg-info">
    <div class="bg-white shadow-lg rounded-lg p-8 mt-16">
      <h1 class="text-4xl font-bold text-primary mb-4 text-center">Profile</h1>
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar -->
        <aside
          class="md:w-1/5 w-full bg-white rounded-lg shadow p-6 mb-8 md:mb-0"
        >
          <p class="text-primary text-lg font-semibold mb-2">
            Here you can view and edit your profile information. Use the form
            below to update your details.
          </p>
        </aside>
        <!-- Profile Details -->
        <section class="md:w-4/5 w-full grid grid-cols-1 md:grid-cols-1 gap-8">
          <!-- User Info Widget -->
          <div class="bg-white rounded-lg shadow p-6 mb-2">
            <h3 class="text-2xl font-semibold mb-2 bg-light shadow-md p-2">
              User Information
            </h3>
            <div v-if="authData">
              <p class="font-bold text-primary mb-2">
                {{ authData.firstName }}
              </p>
              <p class="mb-1">Email: {{ authData.email }}</p>
              <p v-if="authData.username">Username: {{ authData.username }}</p>
            </div>
            <div v-else class="text-gray-500">No user data available.</div>
          </div>
          <!-- Edit Profile Form -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-2xl font-semibold mb-2 bg-light shadow-md p-2">
              Edit Profile
            </h3>
            <form @submit.prevent="updateProfile">
              <div class="mb-4 flex flex-col md:flex-row gap-4">
                <div class="w-full md:w-1/2">
                  <label class="block text-gray-700 mb-1" for="firstName">
                    <span class="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      First Name
                    </span>
                  </label>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    class="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div class="w-full md:w-1/2">
                  <label class="block text-gray-700 mb-1" for="lastName">
                    <span class="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Last Name
                    </span>
                  </label>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    class="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
              </div>
              <div class="mb-4 flex flex-col md:flex-row gap-4">
                <div class="w-full md:w-1/2">
                  <label class="block text-gray-700 mb-1" for="email">
                    <span class="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 12H8m8 0a4 4 0 10-8 0 4 4 0 008 0zm2 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2"
                        />
                      </svg>
                      Email
                    </span>
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
              </div>
              <div v-if="errorMessage" class="text-red-500 mb-2">
                {{ errorMessage }}
              </div>
              <button
                type="submit"
                class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Save Changes
              </button>
            </form>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-2xl font-semibold mb-2 bg-light shadow-md p-2">
              Change Password
            </h3>
            <form @submit.prevent="changePassword">
              <div class="mb-4 flex flex-col md:flex-row gap-4">
                <div class="w-full md:w-1/3">
                  <label class="block text-gray-700 mb-1" for="oldPassword"
                    >Old Password</label
                  >
                  <div class="relative">
                    <input
                      id="oldPassword"
                      v-model="passwordForm.oldPassword"
                      type="password"
                      class="w-full border rounded px-3 py-2 pl-10"
                      required
                    />
                    <PasswordIcon />
                  </div>
                </div>
                <div class="w-full md:w-1/3">
                  <label class="block text-gray-700 mb-1" for="newPassword"
                    >New Password</label
                  >
                  <div class="relative">
                    <input
                      id="newPassword"
                      v-model="passwordForm.newPassword"
                      type="password"
                      class="w-full border rounded px-3 py-2 pl-10"
                      required
                    />
                    <PasswordIcon />
                  </div>
                </div>
                <div class="w-full md:w-1/3">
                  <label
                    class="block text-gray-700 mb-1"
                    for="confirmNewPassword"
                    >Confirm New Password</label
                  >
                  <div class="relative">
                    <input
                      id="confirmNewPassword"
                      v-model="passwordForm.confirmNewPassword"
                      type="password"
                      class="w-full border rounded px-3 py-2 pl-10"
                      required
                    />
                    <PasswordIcon />
                  </div>
                </div>
              </div>
              <div v-if="errorMessage" class="text-red-500 mb-2">
                {{ errorMessage }}
              </div>
              <button
                type="submit"
                class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Change Password
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useAccount } from "../stores/account";
import { useStock } from "../stores/stock";
import { useAuth } from "../stores/auth";
import PasswordIcon from "../components/PasswordIcon.vue";
import {
  Dialog,
  TransitionChild,
  TransitionRoot,
  DialogPanel,
} from "@headlessui/vue";

const isOpen = ref(false);
const errorMessage = ref("");
const authStore = useAuth();
const form = ref({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
});

const passwordForm = ref({
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

const authData = computed(() => authStore.authData);
const profileData = computed(() => authStore.profileData);

watch(profileData, (newProfile) => {
  if (newProfile) {
    form.value.firstName = newProfile.firstName || "";
    form.value.lastName = newProfile.lastName || "";
    form.value.email = newProfile.email || "";
  }
});

function closeModal() {
  isOpen.value = false;
  errorMessage.value = "";
}

const updateProfile = async () => {
  errorMessage.value = "";
  try {
    await authStore.updateProfile(form.value);
    isOpen.value = true;
    await getProfile();
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Failed to update profile.";
  }
};

const getProfile = async () => {
  try {
    await authStore.getProfileAction();
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

onMounted(async () => {
  await getProfile();
  if (profileData.value) {
    form.value.firstName = profileData.value.firstName || "";
    form.value.lastName = profileData.value.lastName || "";
    form.value.email = profileData.value.email || "";
  }
});
</script>
