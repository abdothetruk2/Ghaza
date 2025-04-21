<template>
  <div class="relative overflow-hidden">
    <div class="swiper-container" ref="swiperContainer">
      <div class="swiper-wrapper">
        <div v-for="slide in slides" :key="slide.id" class="swiper-slide">
          <div class="relative h-[400px]">
            <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover" />
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <span class="category-tag mb-2">{{ slide.category }}</span>
              <h2 class="text-white text-2xl md:text-3xl font-bold mb-2">{{ slide.title }}</h2>
              <p class="text-gray-200 mb-2 hidden md:block">{{ slide.excerpt }}</p>
              <div class="flex justify-between items-center text-white text-sm">
                <span>{{ formatDate(slide.publishedAt) }}</span>
                <NuxtLink :to="`/article/${slide.slug}`" class="bg-primary-700 hover:bg-primary-800 px-4 py-2 rounded text-white">
                  اقرأ المزيد
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import dayjs from 'dayjs';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Register Swiper modules
Swiper.use([Navigation, Pagination, Autoplay]);

const swiperContainer = ref(null);
let swiper = null;

const slides = [
  {
    id: 1,
    title: 'الرئيس المصري يلتقي نظيره الفرنسي لبحث قضايا المنطقة',
    category: 'سياسة',
    image: 'https://source.unsplash.com/random/1200x800/?politics',
    excerpt: 'التقى الرئيس المصري بنظيره الفرنسي في قصر الإليزيه لمناقشة العلاقات الثنائية وقضايا المنطقة.',
    publishedAt: '2025-04-15T10:30:00',
    slug: 'egyptian-president-meets-french',
  },
  {
    id: 2,
    title: 'البورصة المصرية تحقق مكاسب قياسية وسط تفاؤل بالاقتصاد',
    category: 'اقتصاد',
    image: 'https://source.unsplash.com/random/1200x800/?stock-market',
    excerpt: 'سجلت البورصة المصرية ارتفاعات قياسية اليوم وسط تفاؤل المستثمرين بالإصلاحات الاقتصادية الأخيرة.',
    publishedAt: '2025-04-14T14:45:00',
    slug: 'egyptian-stock-market-gains',
  },
  {
    id: 3,
    title: 'المنتخب المصري يتأهل لنهائيات كأس العالم بعد فوز ساحق',
    category: 'رياضة',
    image: 'https://source.unsplash.com/random/1200x800/?football',
    excerpt: 'حقق المنتخب المصري فوزًا ساحقًا أمس ليضمن تأهله لنهائيات كأس العالم القادمة وسط احتفالات جماهيرية.',
    publishedAt: '2025-04-13T22:15:00',
    slug: 'egyptian-team-qualifies-world-cup',
  },
];

function formatDate(date) {
  return dayjs(date).format('DD MMM YYYY');
}

onMounted(() => {
  swiper = new Swiper(swiperContainer.value, {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});

onBeforeUnmount(() => {
  if (swiper) {
    swiper.destroy();
  }
});
</script>

<style scoped>
.swiper-button-next,
.swiper-button-prev {
  color: white;
  background: rgba(0, 0, 0, 0.3);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 18px;
}

.swiper-pagination-bullet {
  background: white;
  opacity: 0.7;
}

.swiper-pagination-bullet-active {
  opacity: 1;
  background: var(--primary);
}
</style>