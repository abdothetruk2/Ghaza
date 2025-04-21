<template>
  <div class="mb-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="section-title">{{ title }}</h2>
      <NuxtLink :to="`/category/${categorySlug}`" class="text-primary-700 hover:text-primary-800 text-sm font-bold">
        المزيد من الأخبار
      </NuxtLink>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="article in articles" :key="article.id">
        <NewsCard :article="article" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  categorySlug: {
    type: String,
    required: true
  },
  articles: {
    type: Array,
    required: true
  }
});
</script>