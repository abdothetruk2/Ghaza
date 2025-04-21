<template>
  <div class="flex items-center text-sm">
    <UIcon :name="weatherIcon" class="mr-1 text-primary-500 w-5 h-5" />
    <span>{{ temperature }}°C Cairo</span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const temperature = ref(28);
const weatherCondition = ref('sunny');

const weatherIcon = computed(() => {
  switch (weatherCondition.value) {
    case 'sunny':
      return 'i-heroicons-sun';
    case 'cloudy':
      return 'i-heroicons-cloud';
    case 'rainy':
      return 'i-heroicons-cloud-rain';
    default:
      return 'i-heroicons-sun';
  }
});

// In a real app, you would fetch weather data from an API
onMounted(() => {
  // Mock weather data
  const mockWeather = {
    temp: 28,
    condition: 'sunny'
  };
  
  temperature.value = mockWeather.temp;
  weatherCondition.value = mockWeather.condition;
});
</script>