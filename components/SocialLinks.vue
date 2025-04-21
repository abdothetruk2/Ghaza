<template>
  <div class="flex space-x-3">
    <a v-for="link in socialLinks" :key="link.id" :href="link.url" target="_blank" rel="noopener noreferrer"
      class="text-gray-600 hover:text-primary-700 transition-colors duration-200">
      <UIcon :name="link.icon" class="w-6 h-6" />
    </a>
  </div>
</template>

<script setup>
const socialLinks = [
  { id: 1, name: 'Facebook', icon: 'i-simple-icons-facebook', url: 'https://facebook.com' },
  { id: 2, name: 'Twitter', icon: 'i-simple-icons-twitter', url: 'https://twitter.com' },
  { id: 3, name: 'Instagram', icon: 'i-simple-icons-instagram', url: 'https://instagram.com' },
  { id: 4, name: 'YouTube', icon: 'i-simple-icons-youtube', url: 'https://youtube.com' },
];
</script>