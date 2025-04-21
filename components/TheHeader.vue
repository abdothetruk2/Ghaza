<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto">
      <!-- Top Bar -->
      <div class="flex justify-between items-center py-2 border-b text-sm">
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">{{ currentDateTime }}</span>
          <WeatherWidget />
        </div>
        <div class="flex items-center space-x-4">
          <a href="#" class="text-gray-600 hover:text-primary-700">Login</a>
          <LanguageSwitcher />
        </div>
      </div>

      <!-- Logo and Search -->
      <div class="flex justify-between items-center py-4">
        <div class="w-1/4">
          <NuxtLink to="/" class="block">
            <h1 class="text-2xl font-bold text-primary-700">غزة نيوز</h1>
          </NuxtLink>
        </div>
        <div class="w-2/4">
          <SearchBar />
        </div>
        <div class="w-1/4 flex justify-end">
          <SocialLinks />
        </div>
      </div>

      <!-- Navigation -->
      <MainNavigation />
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';

const currentDateTime = ref('');

function updateDateTime() {
  currentDateTime.value = dayjs().format('dddd, DD MMMM YYYY, HH:mm');
}

onMounted(() => {
  updateDateTime();
  setInterval(updateDateTime, 60000); // Update every minute
});
</script>