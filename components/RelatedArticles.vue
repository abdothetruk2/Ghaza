<template>
  <div class="mb-8">
    <h3 class="section-title mb-4">اقرأ أيضًا</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="article in articles" :key="article.id">
        <NewsCard :article="article" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  articles: {
    type: Array,
    required: true
  }
});
</script>