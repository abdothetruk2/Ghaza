```vue
<template>
  <div class="container mx-auto py-6 px-4">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Main Content -->
      <div class="lg:w-3/4">
        <h1 class="text-3xl font-bold mb-6">آخر الأخبار</h1>
        
        <!-- News Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="article in articles" :key="article.id">
            <NewsCard :article="article" />
          </div>
        </div>
        
        <!-- Pagination -->
        <div class="mt-8 flex justify-center">
          <UPagination
            v-model="currentPage"
            :total="totalArticles"
            :per-page="perPage"
          />
        </div>
      </div>
      
      <!-- Sidebar -->
      <div class="lg:w-1/4">
        <LatestNewsSidebar />
        
        <!-- Ad Banner -->
        <div class="bg-gray-200 p-4 rounded text-center my-4 h-[250px] flex items-center justify-center">
          <span class="text-gray-500">مساحة إعلانية</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentPage = ref(1);
const perPage = ref(10);
const totalArticles = ref(100);

// Mock articles data
const articles = ref([
  {
    id: 1,
    title: 'الرئيس المصري يلتقي نظيره الفرنسي لبحث قضايا المنطقة',
    excerpt: 'التقى الرئيس المصري بنظيره الفرنسي في قصر الإليزيه لمناقشة العلاقات الثنائية وقضايا المنطقة.',
    category: 'سياسة',
    image: 'https://source.unsplash.com/random/600x400/?politics,meeting',
    publishedAt: '2025-04-15T10:30:00',
    views: 3450,
    slug: 'egyptian-president-meets-french',
  },
  // Add more articles...
]);

// Update page metadata
useHead({
  title: 'آخر الأخبار - غزة نيوز',
  meta: [
    { name: 'description', content: 'تابع آخر الأخبار والمستجدات على مدار الساعة' }
  ]
});
</script>
```