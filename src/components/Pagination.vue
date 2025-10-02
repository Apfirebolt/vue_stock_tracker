<template>
  <nav
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    aria-label="Pagination"
  >
    <div class="hidden sm:block">
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">{{ startIndex }}</span>
        to
        <span class="font-medium">{{ endIndex }}</span>
        of
        <span class="font-medium">{{ total }}</span>
        results
      </p>
    </div>
    <div class="flex-1 flex justify-between sm:justify-end">
      <button
        @click="goToPreviousPage"
        :disabled="currentPage === 1"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-white bg-secondary hover:bg-primary disabled:opacity-50"
      >
        Previous
      </button>
      <button
        @click="goToNextPage"
        :disabled="currentPage === totalPages"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-white bg-secondary hover:bg-primary disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update"]);

const totalPages = computed(() => Math.ceil(props.total / props.perPage));
const startIndex = computed(() => (props.currentPage - 1) * props.perPage + 1);
const endIndex = computed(() =>
  Math.min(props.currentPage * props.perPage, props.total)
);

function goToPreviousPage() {
  if (props.currentPage > 1) {
    emit("update", props.currentPage - 1);
    console.log("Navigating to previous page:", props.currentPage - 1);
  }
}

function goToNextPage() {
  if (props.currentPage < totalPages.value) {
    console.log("Navigating to next page:", props.currentPage + 1);
    emit("update", props.currentPage + 1);
  }
}
</script>
