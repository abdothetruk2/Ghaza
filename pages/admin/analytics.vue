```vue
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">الإحصائيات والتحليلات</h1>
    </div>

    <!-- Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in overviewStats" :key="stat.label" 
        class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">{{ stat.label }}</p>
            <p class="text-2xl font-semibold">{{ stat.value }}</p>
            <p class="text-xs text-gray-400 mt-1">{{ stat.change }}</p>
          </div>
          <UIcon :name="stat.icon" class="w-8 h-8" :class="stat.iconClass" />
        </div>
      </div>
    </div>

    <!-- Traffic Chart -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">حركة الزوار</h3>
        <select v-model="trafficPeriod" class="rounded-md border-gray-300">
          <option value="day">اليوم</option>
          <option value="week">الأسبوع</option>
          <option value="month">الشهر</option>
        </select>
      </div>
      <div class="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
        <span class="text-gray-400">رسم بياني لحركة الزوار</span>
      </div>
    </div>

    <!-- Popular Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Top Articles -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold mb-4">المقالات الأكثر قراءة</h3>
        <div class="space-y-4">
          <div v-for="article in topArticles" :key="article.id" 
            class="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
            <div>
              <p class="font-medium">{{ article.title }}</p>
              <p class="text-sm text-gray-500">{{ article.views }} مشاهدة</p>
            </div>
            <UIcon name="i-heroicons-arrow-trending-up" 
              class="w-5 h-5 text-green-500" />
          </div>
        </div>
      </div>

      <!-- Top Categories -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold mb-4">الأقسام الأكثر تفاعلاً</h3>
        <div class="space-y-4">
          <div v-for="category in topCategories" :key="category.id"
            class="flex items-center justify-between p-2">
            <div class="flex-1">
              <div class="flex justify-between mb-1">
                <span>{{ category.name }}</span>
                <span class="text-sm text-gray-500">{{ category.percentage }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-primary-600 h-2 rounded-full" 
                  :style="{ width: `${category.percentage}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- User Demographics -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h3 class="text-lg font-semibold mb-4">بيانات المستخدمين</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Device Types -->
        <div>
          <h4 class="font-medium mb-3">الأجهزة المستخدمة</h4>
          <div class="space-y-2">
            <div v-for="device in deviceStats" :key="device.type"
              class="flex justify-between items-center">
              <span>{{ device.type }}</span>
              <span class="text-sm text-gray-500">{{ device.percentage }}%</span>
            </div>
          </div>
        </div>

        <!-- Browsers -->
        <div>
          <h4 class="font-medium mb-3">المتصفحات</h4>
          <div class="space-y-2">
            <div v-for="browser in browserStats" :key="browser.name"
              class="flex justify-between items-center">
              <span>{{ browser.name }}</span>
              <span class="text-sm text-gray-500">{{ browser.percentage }}%</span>
            </div>
          </div>
        </div>

        <!-- Countries -->
        <div>
          <h4 class="font-medium mb-3">الدول</h4>
          <div class="space-y-2">
            <div v-for="country in countryStats" :key="country.name"
              class="flex justify-between items-center">
              <span>{{ country.name }}</span>
              <span class="text-sm text-gray-500">{{ country.percentage }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const trafficPeriod = ref('week');

const overviewStats = [
  {
    label: 'إجمالي الزيارات',
    value: '234.5K',
    change: '+12% من الشهر الماضي',
    icon: 'i-heroicons-users',
    iconClass: 'text-blue-500'
  },
  {
    label: 'متوسط وقت التصفح',
    value: '4:23',
    change: '+5% من الأسبوع الماضي',
    icon: 'i-heroicons-clock',
    iconClass: 'text-green-500'
  },
  {
    label: 'معدل الارتداد',
    value: '32%',
    change: '-3% من الشهر الماضي',
    icon: 'i-heroicons-arrow-trending-down',
    iconClass: 'text-red-500'
  },
  {
    label: 'المستخدمون الجدد',
    value: '1,234',
    change: '+8% من الأسبوع الماضي',
    icon: 'i-heroicons-user-plus',
    iconClass: 'text-purple-500'
  }
];

const topArticles = [
  { id: 1, title: 'الأهلي يفوز على الزمالك في ديربي القاهرة', views: 45230 },
  { id: 2, title: 'مصر تستضيف مؤتمر المناخ العالمي', views: 32150 },
  { id: 3, title: 'ارتفاع أسعار الذهب في السوق المحلية', views: 28900 },
  { id: 4, title: 'افتتاح خط مترو جديد في القاهرة', views: 25670 },
  { id: 5, title: 'إطلاق مبادرة جديدة لدعم الشباب', views: 23450 }
];

const topCategories = [
  { id: 1, name: 'رياضة', percentage: 35 },
  { id: 2, name: 'سياسة', percentage: 25 },
  { id: 3, name: 'اقتصاد', percentage: 20 },
  { id: 4, name: 'فن', percentage: 15 },
  { id: 5, name: 'تكنولوجيا', percentage: 5 }
];

const deviceStats = [
  { type: 'موبايل', percentage: 65 },
  { type: 'كمبيوتر', percentage: 25 },
  { type: 'تابلت', percentage: 10 }
];

const browserStats = [
  { name: 'Chrome', percentage: 45 },
  { name: 'Safari', percentage: 25 },
  { name: 'Firefox', percentage: 15 },
  { name: 'Edge', percentage: 15 }
];

const countryStats = [
  { name: 'مصر', percentage: 75 },
  { name: 'السعودية', percentage: 10 },
  { name: 'الإمارات', percentage: 8 },
  { name: 'الكويت', percentage: 7 }
];
</script>
```