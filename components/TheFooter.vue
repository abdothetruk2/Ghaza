<template>
  <footer class="bg-gray-800 text-white pt-10 pb-6">
    <div class="container mx-auto">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
        <!-- About Site -->
        <div>
          <h3 class="text-xl font-bold mb-4 border-b border-gray-700 pb-2">عن اليوم السابع</h3>
          <p class="text-gray-300 mb-4">
            اليوم السابع هي بوابة إخبارية مصرية رائدة تقدم أحدث الأخبار المحلية والعالمية في السياسة والاقتصاد والرياضة والفن والمزيد.
          </p>
          <div class="flex space-x-4">
            <a v-for="link in socialLinks" :key="link.id" :href="link.url" target="_blank" rel="noopener noreferrer"
              class="text-gray-400 hover:text-white transition-colors duration-200">
              <UIcon :name="link.icon" class="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h3 class="text-xl font-bold mb-4 border-b border-gray-700 pb-2">روابط سريعة</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.id">
              <NuxtLink :to="link.path" class="text-gray-300 hover:text-white transition-colors duration-200">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- Categories -->
        <div>
          <h3 class="text-xl font-bold mb-4 border-b border-gray-700 pb-2">الأقسام</h3>
          <ul class="space-y-2">
            <li v-for="category in categories" :key="category.id">
              <NuxtLink :to="category.path" class="text-gray-300 hover:text-white transition-colors duration-200">
                {{ category.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- Contact -->
        <div>
          <h3 class="text-xl font-bold mb-4 border-b border-gray-700 pb-2">اتصل بنا</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <UIcon name="i-heroicons-map-pin" class="w-5 h-5 mt-1 ml-2 text-primary-500" />
              <span class="text-gray-300">شارع التحرير، القاهرة، مصر</span>
            </li>
            <li class="flex items-center">
              <UIcon name="i-heroicons-phone" class="w-5 h-5 ml-2 text-primary-500" />
              <span class="text-gray-300">+20 2 1234 5678</span>
            </li>
            <li class="flex items-center">
              <UIcon name="i-heroicons-envelope" class="w-5 h-5 ml-2 text-primary-500" />
              <span class="text-gray-300">info@youm7clone.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Copyright -->
      <div class="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        <p>&copy; {{ new Date().getFullYear() }} اليوم السابع (نسخة). جميع الحقوق محفوظة.</p>
        <p class="mt-1">هذا الموقع هو نسخة تعليمية ولا يرتبط بموقع اليوم السابع الرسمي.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const socialLinks = [
  { id: 1, icon: 'i-simple-icons-facebook', url: 'https://facebook.com' },
  { id: 2, icon: 'i-simple-icons-twitter', url: 'https://twitter.com' },
  { id: 3, icon: 'i-simple-icons-instagram', url: 'https://instagram.com' },
  { id: 4, icon: 'i-simple-icons-youtube', url: 'https://youtube.com' },
];

const quickLinks = [
  { id: 1, name: 'الصفحة الرئيسية', path: '/' },
  { id: 2, name: 'آخر الأخبار', path: '/latest-news' },
  { id: 3, name: 'الأكثر قراءة', path: '/most-read' },
  { id: 4, name: 'من نحن', path: '/about' },
  { id: 5, name: 'سياسة الخصوصية', path: '/privacy-policy' },
  { id: 6, name: 'اتصل بنا', path: '/contact' },
];

const categories = [
  { id: 1, name: 'سياسة', path: '/category/politics' },
  { id: 2, name: 'اقتصاد', path: '/category/economy' },
  { id: 3, name: 'رياضة', path: '/category/sports' },
  { id: 4, name: 'فن', path: '/category/arts' },
  { id: 5, name: 'تكنولوجيا', path: '/category/technology' },
  { id: 6, name: 'صحة', path: '/category/health' },
];
</script>