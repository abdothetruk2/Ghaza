<template>
  <nav class="bg-primary-700 text-white">
    <div class="container mx-auto">
      <div class="hidden md:flex">
        <ul class="flex">
          <li v-for="item in navigationItems" :key="item.id">
            <NuxtLink 
              :to="item.path" 
              class="block px-4 py-3 hover:bg-primary-800 transition-colors duration-200 font-bold"
            >
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      
      <!-- Mobile Navigation -->
      <div class="md:hidden relative">
        <button @click="isMenuOpen = !isMenuOpen" class="p-3 w-full text-left flex justify-between items-center">
          <span class="font-bold">القائمة</span>
          <span>
            <UIcon v-if="!isMenuOpen" name="i-heroicons-bars-3" class="w-6 h-6" />
            <UIcon v-else name="i-heroicons-x-mark" class="w-6 h-6" />
          </span>
        </button>
        
        <Transition name="slide-down">
          <div v-if="isMenuOpen" class="absolute z-50 w-full bg-white text-gray-800 shadow-lg">
            <ul>
              <li v-for="item in navigationItems" :key="item.id">
                <NuxtLink 
                  :to="item.path" 
                  class="block px-4 py-3 hover:bg-gray-100 border-b border-gray-200"
                  @click="isMenuOpen = false"
                >
                  {{ item.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const navigationItems = [
  { id: 1, name: 'الرئيسية', path: '/' },
  { id: 2, name: 'سياسة', path: '/category/politics' },
  { id: 3, name: 'اقتصاد', path: '/category/economy' },
  { id: 4, name: 'رياضة', path: '/category/sports' },
  { id: 5, name: 'حوادث', path: '/category/incidents' },
  { id: 6, name: 'فن', path: '/category/arts' },
  { id: 7, name: 'تكنولوجيا', path: '/category/technology' },
  { id: 8, name: 'عالم', path: '/category/world' },
  { id: 9, name: 'محافظات', path: '/category/governorates' },
  { id: 10, name: 'صحة', path: '/category/health' }
];
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>