<template>
  <div class="relative">
    <input
      v-model="searchQuery"
      type="text"
      class="w-full p-2 border rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-primary-700"
      placeholder="ابحث..."
      @focus="isSearchFocused = true"
      @blur="handleBlur"
    />
    <UIcon name="i-heroicons-magnifying-glass" class="absolute left-3 top-3 text-gray-500" />
    
    <Transition name="fade">
      <div 
        v-if="isSearchFocused && searchQuery.length > 2" 
        class="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border"
      >
        <div v-if="searchResults.length > 0" class="p-2">
          <div 
            v-for="result in searchResults" 
            :key="result.id"
            class="p-2 hover:bg-gray-100 cursor-pointer rounded"
            @mousedown="goToResult(result)"
          >
            <div class="font-bold">{{ result.title }}</div>
            <div class="text-sm text-gray-600">{{ result.category }}</div>
          </div>
        </div>
        <div v-else class="p-4 text-center text-gray-600">
          لا توجد نتائج
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');
const isSearchFocused = ref(false);

// Mock search results - in a real app, this would come from an API
const mockResults = [
  { id: 1, title: 'مصر تستضيف مؤتمر المناخ الدولي', category: 'سياسة', slug: 'egypt-climate-conference' },
  { id: 2, title: 'الأهلي يفوز على الزمالك في مباراة القمة', category: 'رياضة', slug: 'ahly-zamalek-match' },
  { id: 3, title: 'سعر الدولار يستقر في البنوك المصرية', category: 'اقتصاد', slug: 'dollar-price-stable' },
  { id: 4, title: 'افتتاح معرض القاهرة للكتاب', category: 'ثقافة', slug: 'cairo-book-fair' },
];

const searchResults = computed(() => {
  if (searchQuery.value.length < 3) return [];
  return mockResults.filter(result => 
    result.title.includes(searchQuery.value) || 
    result.category.includes(searchQuery.value)
  );
});

function handleBlur() {
  // Small delay to allow click on results
  setTimeout(() => {
    isSearchFocused.value = false;
  }, 200);
}

function goToResult(result) {
  searchQuery.value = '';
  isSearchFocused.value = false;
  router.push(`/article/${result.slug}`);
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>