<template>
  <button @click="toggleLanguage" class="flex items-center text-sm text-gray-600 hover:text-primary-700">
    <UIcon name="i-heroicons-language" class="mr-1 w-5 h-5" />
    <span>{{ currentLanguage === 'ar' ? 'English' : 'العربية' }}</span>
  </button>
</template>

<script setup>
import { ref } from 'vue';

const currentLanguage = ref('ar'); // Default to Arabic

function toggleLanguage() {
  currentLanguage.value = currentLanguage.value === 'ar' ? 'en' : 'ar';
  // In a real app, this would trigger language change throughout the app
}
</script>