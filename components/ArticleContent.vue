<template>
  <div>
    <div class="mb-4">
      <span class="category-tag">{{ article.category }}</span>
      <span class="text-gray-500 text-sm ml-2">{{ formatDate(article.publishedAt) }}</span>
    </div>
    
    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{{ article.title }}</h1>
    
    <div class="text-gray-600 text-lg font-serif mb-6">{{ article.excerpt }}</div>
    
    <div class="flex items-center mb-6">
      <img :src="article.author.avatar" :alt="article.author.name" class="w-12 h-12 rounded-full mr-3" />
      <div>
        <div class="font-bold">{{ article.author.name }}</div>
        <div class="text-sm text-gray-600">{{ article.author.title }}</div>
      </div>
    </div>
    
    <div class="relative mb-6">
      <img :src="article.image" :alt="article.title" class="w-full rounded-lg" />
      <div class="text-sm text-gray-600 mt-2">{{ article.imageCaption }}</div>
    </div>
    
    <div class="article-body mb-8" v-html="article.content"></div>
    
    <div class="flex justify-between items-center mb-8 border-t border-b py-4">
      <div class="flex space-x-4">
        <span class="flex items-center text-gray-600">
          <UIcon name="i-heroicons-eye" class="w-5 h-5 mr-1" />
          {{ article.views }} مشاهدة
        </span>
        <span class="flex items-center text-gray-600">
          <UIcon name="i-heroicons-chat-bubble-left-ellipsis" class="w-5 h-5 mr-1" />
          {{ article.comments }} تعليق
        </span>
      </div>
      
      <div class="flex space-x-3">
        <a href="#" class="text-blue-600 hover:opacity-80">
          <UIcon name="i-simple-icons-facebook" class="w-6 h-6" />
        </a>
        <a href="#" class="text-blue-400 hover:opacity-80">
          <UIcon name="i-simple-icons-twitter" class="w-6 h-6" />
        </a>
        <a href="#" class="text-green-600 hover:opacity-80">
          <UIcon name="i-simple-icons-whatsapp" class="w-6 h-6" />
        </a>
        <a href="#" class="text-blue-800 hover:opacity-80">
          <UIcon name="i-heroicons-envelope" class="w-6 h-6" />
        </a>
      </div>
    </div>
    
    <div class="bg-gray-100 p-4 rounded-lg mb-8">
      <h3 class="font-bold text-lg mb-3">الكلمات المفتاحية</h3>
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="(tag, index) in article.tags" 
          :key="index" 
          class="bg-white px-3 py-1 rounded-full text-sm hover:bg-primary-700 hover:text-white cursor-pointer transition-colors duration-200"
        >
          {{ tag }}
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
  return dayjs(date).format('DD MMM YYYY, HH:mm');
}
</script>