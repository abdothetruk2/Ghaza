<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <h3 class="section-title">أحدث الأخبار</h3>
    
    <ul class="divide-y">
      <li v-for="news in latestNews" :key="news.id" class="py-3">
        <NuxtLink :to="`/article/${news.slug}`" class="block hover:text-primary-700">
          <div class="flex gap-3">
            <img :src="news.image" :alt="news.title" class="w-20 h-20 object-cover rounded" />
            <div>
              <h4 class="font-bold line-clamp-2">{{ news.title }}</h4>
              <div class="text-xs text-gray-500 mt-1">{{ formatDate(news.publishedAt) }}</div>
            </div>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import axios from 'axios';

// Use ref to make latestNews reactive
import { ref, onMounted } from 'vue';

// Initialize with mock data, but make it reactive with ref()
const latestNews = ref([
  {
    id: 1,
    title: 'وزير التعليم يعلن عن خطة لتطوير المناهج الدراسية',
    image: 'https://source.unsplash.com/random/100x100/?education',
    publishedAt: '2025-04-15T09:15:00',
    slug: 'education-minister-announces-curriculum',
  },
  {
    id: 2,
    title: 'ارتفاع أسعار الذهب في السوق المحلية بنسبة 5%',
    image: 'https://source.unsplash.com/random/100x100/?gold',
    publishedAt: '2025-04-15T08:30:00',
    slug: 'gold-prices-rise',
  },
  {
    id: 3,
    title: 'منظمة الصحة العالمية تشيد بجهود مصر في مكافحة فيروس كورونا',
    image: 'https://source.unsplash.com/random/100x100/?health',
    publishedAt: '2025-04-15T07:45:00',
    slug: 'who-praises-egypt-covid',
  },
  {
    id: 4,
    title: 'إطلاق مهرجان القاهرة السينمائي بمشاركة نجوم عالميين',
    image: 'https://source.unsplash.com/random/100x100/?cinema',
    publishedAt: '2025-04-15T06:20:00',
    slug: 'cairo-film-festival',
  },
  {
    id: 5,
    title: 'افتتاح خط مترو جديد يربط وسط القاهرة بالضواحي الشرقية',
    image: 'https://source.unsplash.com/random/100x100/?metro',
    publishedAt: '2025-04-14T23:10:00',
    slug: 'new-metro-line-cairo',
  },
]);

onMounted(() => {
  // Fetch latest news from API
  axios.get('/api/latest')
    .then((response) => {
      // Check if response has articles property based on our API endpoint update
      if (response.data.articles) {
        latestNews.value = response.data.articles;
      } else {
        latestNews.value = response.data;
      }
    })
    .catch((error) => {
      console.error('Error fetching latest news:', error);
    });
});

function formatDate(date) {
  return dayjs(date).format('DD MMM YYYY');
}
</script>