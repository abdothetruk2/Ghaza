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
            :key="item.id" 
            class="ticker-item whitespace-nowrap mr-6 text-white"
          >
            {{ item.title }}
          </p>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const breakingNews = [
  { id: 1, title: "Egypt's president meets with foreign delegates to discuss regional peace process" },
  { id: 2, title: "Cairo International Festival announces lineup for 2025 with record participation" },
  { id: 3, title: "Health Ministry launches new vaccination campaign across all governorates" },
  { id: 4, title: "National team qualifies for finals after decisive victory over rivals" },
  { id: 5, title: "Stock market reports significant gains for third consecutive day" },
];

const visibleNews = ref([...breakingNews]);
let interval;

function rotateTicker() {
  visibleNews.value.push(visibleNews.value.shift());
}

onMounted(() => {
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
</style>