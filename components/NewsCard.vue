<template>
  <div class="news-card h-full">
    <div class="relative">
      <img :src="article.image" :alt="article.title" class="w-full h-48 object-cover" />
      <span class="category-tag absolute top-2 right-2">{{ article.category }}</span>
    </div>
    <div class="p-4">
      <h3 class="font-bold text-lg mb-2 line-clamp-2 hover:text-primary-700">
        <NuxtLink :to="`/article/${article._id}`">{{ article.title }}</NuxtLink>
      </h3>
      <p class="text-gray-600 text-sm mb-3 line-clamp-3">{{ article.excerpt }}</p>
      <div class="flex justify-between items-center text-xs text-gray-500">
        <span>{{ formatDate(article.publishedAt) }}</span>
        <span class="flex items-center">
          <UIcon name="i-heroicons-eye" class="w-4 h-4 mr-1" />
          {{ article.views }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
});

function formatDate(date) {
  return dayjs(date).format('DD MMM YYYY');
}
</script>