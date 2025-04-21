<template>
  <div class="bg-primary-700 text-white py-2 overflow-hidden">
    <div class="container mx-auto flex">
      <div class="flex-shrink-0 bg-primary-900 px-3 py-1 font-bold mr-3 whitespace-nowrap">
        Breaking News
      </div>
      <div class="ticker-wrapper overflow-hidden">
        <transition-group name="slide-fade" tag="div" class="flex">
          <p 
            v-for="(item, index) in visibleNews" 
            :key="item._id || item.id" 
            class="ticker-item whitespace-nowrap mr-6 text-white"
          >
            {{ item.title || item.text }}
          </p>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Default breaking news in case API fails
const defaultBreakingNews = [
  { id: 1, title: "Egypt's president meets with foreign delegates to discuss regional peace process" },
  { id: 2, title: "Cairo International Festival announces lineup for 2025 with record participation" },
  { id: 3, title: "Health Ministry launches new vaccination campaign across all governorates" },
  { id: 4, title: "National team qualifies for finals after decisive victory over rivals" },
  { id: 5, title: "Stock market reports significant gains for third consecutive day" },
];

const visibleNews = ref([...defaultBreakingNews]);
let interval;

// Fetch breaking news from API
async function fetchBreakingNews() {
  try {
    const response = await fetch('/api/breaking-news');
    const data = await response.json();
    
    if (data.breakingNews && data.breakingNews.length > 0) {
      // Use API data
      visibleNews.value = [...data.breakingNews];
    } else {
      // Fallback to default data
      visibleNews.value = [...defaultBreakingNews];
    }
  } catch (error) {
    console.error('Error fetching breaking news:', error);
    // Use default data in case of error
    visibleNews.value = [...defaultBreakingNews];
  }
}

function rotateTicker() {
  visibleNews.value.push(visibleNews.value.shift());
}

onMounted(async () => {
  // Fetch breaking news when component mounts
  await fetchBreakingNews();
  
  // Start the ticker rotation
  interval = setInterval(rotateTicker, 5000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.ticker-wrapper {
  position: relative;
  width: 100%;
}

.ticker-item {
  animation: ticker 30s linear infinite;
}

@keyframes ticker {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>