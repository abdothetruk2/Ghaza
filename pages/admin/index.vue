
om

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex">
      <!-- Sidebar -->
      <SideBar />
      <!-- Main Content -->
      <div class="flex-1 p-8">
        <!-- Quick Actions -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold mb-4">إجراءات سريعة</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UButton
              to="/admin/articles/new"
              color="primary"
              class="flex items-center justify-center"
            >
              <UIcon name="i-heroicons-document-plus" class="w-5 h-5 mr-2" />
              إضافة مقال جديد
            </UButton>
            <UButton
              to="/admin/media"
              color="gray"
              class="flex items-center justify-center"
            >
              <UIcon name="i-heroicons-photo" class="w-5 h-5 mr-2" />
              إدارة الوسائط
            </UButton>
            <UButton
              to="/admin/breaking-news"
              color="red"
              class="flex items-center justify-center"
            >
              <UIcon name="i-heroicons-bolt" class="w-5 h-5 mr-2" />
              الأخبار العاجلة
            </UButton>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div v-for="stat in stats" :key="stat.label" 
            class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
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

        <!-- Recent Articles -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">آخر المقالات</h3>
            <UButton 
              icon="i-heroicons-plus"
              to="/admin/articles/new"
              color="primary"
            >
              مقال جديد
            </UButton>
          </div>

          <UTable 
            :columns="columns" 
            :rows="articles"
            :loading="loading"
          >
            <template #status-data="{ row }">
              <UBadge :color="getStatusColor(row.status)">
                {{ row.status }}
              </UBadge>
            </template>
            <template #actions-data="{ row }">
              <div class="flex space-x-2">
                <UButton
                  color="primary"
                  variant="ghost"
                  icon="i-heroicons-eye"
                  :to="`/article/${row.slug}`"
                  target="_blank"
                />
                <UButton
                  color="primary"
                  variant="ghost"
                  icon="i-heroicons-pencil-square"
                  :to="`/admin/articles/${row.id}/edit`"
                />
                <UButton
                  color="red"
                  variant="ghost"
                  icon="i-heroicons-trash"
                  @click="deleteArticle(row.id)"
                />
              </div>
            </template>
          </UTable>
        </div>

        <!-- Activity Log -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold mb-4">سجل النشاط</h3>
          <div class="space-y-4">
            <div v-for="activity in activityLog" :key="activity.id" 
              class="flex items-start space-x-4 border-b pb-4">
              <UIcon :name="activity.icon" class="w-6 h-6" :class="activity.iconClass" />
              <div>
                <p class="font-medium">{{ activity.message }}</p>
                <p class="text-sm text-gray-500">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const loading = ref(false);

import SideBar from '~/components/SideBar.vue';

const menuItems = [
  { label: 'لوحة التحكم', path: '/admin', icon: 'i-heroicons-home' },
  { label: 'المقالات', path: '/admin/articles', icon: 'i-heroicons-document-text' },
  { label: 'الأقسام', path: '/admin/categories', icon: 'i-heroicons-tag' },
  { label: 'الأخبار العاجلة', path: '/admin/breaking-news', icon: 'i-heroicons-bolt' },
  { label: 'الوسائط', path: '/admin/media', icon: 'i-heroicons-photo' },
  { label: 'المستخدمين', path: '/admin/users', icon: 'i-heroicons-users' },
  { label: 'التعليقات', path: '/admin/comments', icon: 'i-heroicons-chat-bubble-left' },
  { label: 'الإحصائيات', path: '/admin/analytics', icon: 'i-heroicons-chart-bar' },
  { label: 'الإعدادات', path: '/admin/settings', icon: 'i-heroicons-cog-6-tooth' },
];
const stats = [
  { 
    label: 'إجمالي المقالات',
    value: '234',
    change: '+12% من الشهر الماضي',
    icon: 'i-heroicons-document-text',
    iconClass: 'text-blue-500'
  },
  { 
    label: 'المشاهدات اليوم',
    value: '45.2K',
    change: '+5% من أمس',
    icon: 'i-heroicons-eye',
    iconClass: 'text-green-500'
  },
  { 
    label: 'التعليقات الجديدة',
    value: '182',
    change: '+8% من الأسبوع الماضي',
    icon: 'i-heroicons-chat-bubble-left',
    iconClass: 'text-yellow-500'
  },
  { 
    label: 'المستخدمين النشطين',
    value: '1,234',
    change: '+3% من الشهر الماضي',
    icon: 'i-heroicons-users',
    iconClass: 'text-purple-500'
  },
];

const columns = [
  {
    key: 'title',
    label: 'العنوان',
  },
  {
    key: 'category',
    label: 'القسم',
  },
  {
    key: 'status',
    label: 'الحالة',
  },
  {
    key: 'publishedAt',
    label: 'تاريخ النشر',
  },
  {
    key: 'views',
    label: 'المشاهدات',
  },
  {
    key: 'actions',
    label: 'الإجراءات',
  },
];

const articles = [
  {
    id: 1,
    title: 'تطورات الأوضاع في غزة',
    category: 'أخبار عاجلة',
    status: 'منشور',
    publishedAt: '2025-04-15',
    views: 3450,
    slug: 'gaza-updates',
  },
  {
    id: 2,
    title: 'مساعدات إنسانية جديدة تصل إلى غزة',
    category: 'مساعدات',
    status: 'قيد المراجعة',
    publishedAt: '2025-04-14',
    views: 2180,
    slug: 'humanitarian-aid',
  },
  {
    id: 3,
    title: 'تقرير: الأوضاع الصحية في غزة',
    category: 'تقارير',
    status: 'مسودة',
    publishedAt: '2025-04-13',
    views: 5670,
    slug: 'health-report',
  },
];

const activityLog = [
  {
    id: 1,
    message: 'تم نشر مقال جديد: "تطورات الأوضاع في غزة"',
    time: 'منذ 5 دقائق',
    icon: 'i-heroicons-document-plus',
    iconClass: 'text-green-500',
  },
  {
    id: 2,
    message: 'تم تحديث قسم "مساعدات"',
    time: 'منذ 15 دقيقة',
    icon: 'i-heroicons-tag',
    iconClass: 'text-blue-500',
  },
  {
    id: 3,
    message: 'تعليق جديد يحتاج للمراجعة',
    time: 'منذ 30 دقيقة',
    icon: 'i-heroicons-chat-bubble-left',
    iconClass: 'text-yellow-500',
  },
  {
    id: 4,
    message: 'تم تسجيل مستخدم جديد',
    time: 'منذ ساعة',
    icon: 'i-heroicons-user-plus',
    iconClass: 'text-purple-500',
  },
];

function getStatusColor(status) {
  switch (status) {
    case 'منشور':
      return 'green';
    case 'قيد المراجعة':
      return 'yellow';
    case 'مسودة':
      return 'gray';
    default:
      return 'gray';
  }
}

async function deleteArticle(id) {
  // TODO: Implement article deletion with confirmation
  console.log('Delete article:', id);
}
</script>