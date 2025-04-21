<template>
  <div class="container mx-auto py-6 px-4">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Main Content -->
      <div class="lg:w-3/4">
        <div class="mb-6">
          <h1 class="text-3xl font-bold">{{ categoryName }}</h1>
          <div class="h-1 w-20 bg-primary-700 mt-2"></div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="article in articles" :key="article.id">
            <NewsCard :article="article" />
          </div>
        </div>
        
        <!-- Pagination -->
        <div class="mt-8 flex justify-center">
          <ul class="flex space-x-2">
            <li>
              <button class="px-4 py-2 border rounded hover:bg-gray-100">السابق</button>
            </li>
            <li v-for="page in 5" :key="page">
              <button 
                :class="[
                  'px-4 py-2 border rounded', 
                  page === 1 ? 'bg-primary-700 text-white' : 'hover:bg-gray-100'
                ]"
              >
                {{ page }}
              </button>
            </li>
            <li>
              <button class="px-4 py-2 border rounded hover:bg-gray-100">التالي</button>
            </li>
          </ul>
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
const route = useRoute();
const slug = route.params.slug;

// Map category slugs to names
const categoryMap = {
  'politics': 'سياسة',
  'sports': 'رياضة',
  'economy': 'اقتصاد',
  'arts': 'فن',
  'technology': 'تكنولوجيا',
  'health': 'صحة',
  'incidents': 'حوادث',
  'world': 'عالم',
  'governorates': 'محافظات',
};

const categoryName = categoryMap[slug] || slug;

// Mock articles data - in a real app, this would come from an API based on the category
const articlesData = {
  'politics': [
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
    {
      id: 2,
      title: 'وزير الخارجية يجري محادثات مع نظيره الصيني حول التعاون الاقتصادي',
      excerpt: 'تناولت المباحثات سبل تعزيز العلاقات التجارية والاستثمارية بين البلدين',
      category: 'سياسة',
      image: 'https://source.unsplash.com/random/600x400/?diplomacy',
      publishedAt: '2025-04-13T14:20:00',
      views: 875,
      slug: 'foreign-minister-meets-chinese-counterpart',
    },
    // Add more politics articles...
  ],
  'sports': [
    {
      id: 3,
      title: 'الأهلي يفوز على الزمالك في ديربي القاهرة بثلاثية نظيفة',
      excerpt: 'أحرز المهاجم الجديد هدفين وصنع الثالث في مباراة القمة التي أقيمت على استاد القاهرة',
      category: 'رياضة',
      image: 'https://source.unsplash.com/random/600x400/?football,stadium',
      publishedAt: '2025-04-15T23:10:00',
      views: 4320,
      slug: 'ahly-zamalek-derby',
    },
    {
      id: 4,
      title: 'المنتخب المصري لكرة اليد يتأهل لربع نهائي بطولة العالم',
      excerpt: 'حقق الفراعنة فوزًا مثيرًا على المنتخب النرويجي في الثواني الأخيرة من المباراة',
      category: 'رياضة',
      image: 'https://source.unsplash.com/random/600x400/?handball',
      publishedAt: '2025-04-14T18:30:00',
      views: 2150,
      slug: 'handball-team-qualifies-world-cup',
    },
    // Add more sports articles...
  ],
  // Add other categories...
};

// Get articles for the current category or default to empty array
const articles = articlesData[slug] || [];

// Update page metadata
useHead({
  title: categoryName + ' - اليوم السابع',
  meta: [
    { name: 'description', content: `آخر أخبار ${categoryName} - اليوم السابع` }
  ]
})
</script>