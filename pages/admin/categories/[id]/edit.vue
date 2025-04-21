<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">تعديل القسم</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-sm p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">اسم القسم</label>
          <input
            v-model="category.name"
            type="text"
            required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">الرابط</label>
          <input
            v-model="category.slug"
            type="text"
            required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
          />
        </div>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
        <textarea
          v-model="category.description"
          rows="3"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
        ></textarea>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">الترتيب</label>
        <input
          v-model="category.order"
          type="number"
          min="1"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
        />
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">القسم الأب</label>
        <select
          v-model="category.parentId"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
        >
          <option value="">لا يوجد</option>
          <option v-for="parent in parentCategories" :key="parent.id" :value="parent.id">
            {{ parent.name }}
          </option>
        </select>
      </div>

      <div class="mb-6">
        <label class="flex items-center">
          <input
            v-model="category.active"
            type="checkbox"
            class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
          />
          <span class="mr-2">نشط</span>
        </label>
      </div>

      <div class="mb-6">
        <label class="flex items-center">
          <input
            v-model="category.showInMenu"
            type="checkbox"
            class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
          />
          <span class="mr-2">إظهار في القائمة الرئيسية</span>
        </label>
      </div>

      <div class="mb-6">
        <h3 class="text-sm font-medium text-gray-700 mb-2">إحصائيات القسم</h3>
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-sm text-gray-600">
            <strong>عدد المقالات:</strong> {{ category.articlesCount }}
          </p>
          <p class="text-sm text-gray-600">
            <strong>آخر تحديث:</strong> {{ formatDate(category.updatedAt) }}
          </p>
        </div>
      </div>

      <div class="flex justify-end space-x-2">
        <UButton
          type="button"
          color="gray"
          @click="$router.push('/admin/categories')"
        >
          إلغاء
        </UButton>
        <UButton
          type="submit"
          color="primary"
          :loading="saving"
        >
          حفظ التغييرات
        </UButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';

const route = useRoute();
const saving = ref(false);
const category = ref({
  name: '',
  slug: '',
  description: '',
  order: 1,
  parentId: '',
  active: true,
  showInMenu: true,
  articlesCount: 0,
  updatedAt: '',
});

// Mock parent categories for the dropdown
const parentCategories = ref([
  { id: 1, name: 'أخبار محلية' },
  { id: 2, name: 'أخبار دولية' },
  { id: 3, name: 'تقارير' },
]);

// Fetch category data
onMounted(async () => {
  try {
    // Simulate API call
    const mockCategory = {
      id: route.params.id,
      name: 'سياسة',
      slug: 'politics',
      description: 'أخبار وتحليلات سياسية',
      order: 1,
      parentId: '',
      active: true,
      showInMenu: true,
      articlesCount: 156,
      updatedAt: '2025-04-15T10:30:00',
    };
    category.value = mockCategory;
  } catch (error) {
    console.error('Failed to fetch category:', error);
  }
});

function formatDate(date) {
  return dayjs(date).format('DD MMM YYYY, HH:mm');
}

async function handleSubmit() {
  try {
    saving.value = true;
    // Save category changes
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    navigateTo('/admin/categories');
  } catch (error) {
    console.error('Failed to save category:', error);
  } finally {
    saving.value = false;
  }
}
</script>