```vue
<template>
  <div class="container mx-auto py-6 px-4">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Main Content -->
      <div class="lg:w-3/4">
        <h1 class="text-3xl font-bold mb-6">الأكثر قراءة</h1>
        
        <!-- Time Period Filter -->
        <div class="mb-6">
          <USelect
            v-model="period"
            :options="[
              { label: 'اليوم', value: 'today' },
              { label: 'هذا الأسبوع', value: 'week' },
              { label: 'هذا الشهر', value: 'month' },
            ]"
            class="w-48"
          />
        </div>
        
        <!-- Articles List -->
        <div class="space-y-6">
          <div v-for="(article, index) in articles" :key="article.id"
            class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="flex items-start p-4">
              <div class="flex-shrink-0 w-16 h-16 bg-primary-700 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                {{ index + 1 }}
              </div>
              <div class="ml-4 flex-1">
                <h2 class="text-xl font-bold mb-2">
                  <NuxtLink :to="`/article/${article.slug}`" class="hover:text-primary-700">
                    {{ article.title }}
                  </NuxtLink>
                </h2>
                <p class="text-gray-600 mb-2">{{ article.excerpt }}</p>
                <div class="flex items-center text-sm text-gray-500">
                  <span class="flex items-center">
                    <UIcon name="i-heroicons-eye" class="w-4 h-4 mr-1" />
                    {{ article.views }} مشاهدة
                  </span>
                  <span class="mx-2">•</span>
                  <span>{{ formatDate(article.publishedAt) }}</span>
                </div>
              </div>
            </div>
          </div>
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
import dayjs from 'dayjs';

const period = ref('today');

// Mock articles data
const articles = ref([
  {
    id: 1,
    title: 'الأهلي يفوز على الزمالك في ديربي القاهرة بثلاثية نظيفة',
    excerpt: 'أحرز المهاجم الجديد هدفين وصنع الثالث في مباراة القمة',
    views: 45230,
    publishedAt: '2025-04-15T23:10:00',
    slug: 'ahly-zamalek-derby',
  },
  // Add more articles...
]);

function formatDate(date) {
  return dayjs(date).format('DD MMM YYYY');
}

// Update page metadata
useHead({
  title: 'الأكثر قراءة - غزة نيوز',
  meta: [
    { name: 'description', content: 'اقرأ أكثر المقالات مشاهدة على موقع غزة نيوز' }
  ]
});
</script>
```