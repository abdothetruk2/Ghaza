```vue
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold">الأقسام</h1>
      <UButton
        to="/admin/categories/new"
        color="primary"
        icon="i-heroicons-plus"
      >
        قسم جديد
      </UButton>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <UTable 
        :columns="columns" 
        :rows="categories"
        :loading="loading"
      >
        <template #status-data="{ row }">
          <UBadge :color="row.active ? 'green' : 'gray'">
            {{ row.active ? 'نشط' : 'غير نشط' }}
          </UBadge>
        </template>
        <template #actions-data="{ row }">
          <div class="flex space-x-2">
            <UButton
              color="primary"
              variant="ghost"
              icon="i-heroicons-pencil-square"
              :to="`/admin/categories/${row.id}/edit`"
            />
            <UButton
              color="red"
              variant="ghost"
              icon="i-heroicons-trash"
              @click="confirmDelete(row)"
            />
          </div>
        </template>
      </UTable>
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal">
      <div class="p-4">
        <h3 class="text-lg font-bold mb-4">تأكيد الحذف</h3>
        <p>هل أنت متأكد من حذف القسم "{{ selectedCategory?.name }}"؟</p>
        <div class="mt-6 flex justify-end space-x-2">
          <UButton
            color="gray"
            @click="showDeleteModal = false"
          >
            إلغاء
          </UButton>
          <UButton
            color="red"
            :loading="deleting"
            @click="deleteCategory"
          >
            حذف
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const loading = ref(false);
const deleting = ref(false);
const showDeleteModal = ref(false);
const selectedCategory = ref(null);

const columns = [
  {
    key: 'name',
    label: 'اسم القسم',
  },
  {
    key: 'slug',
    label: 'الرابط',
  },
  {
    key: 'articlesCount',
    label: 'عدد المقالات',
  },
  {
    key: 'status',
    label: 'الحالة',
  },
  {
    key: 'actions',
    label: 'الإجراءات',
  },
];

const categories = ref([
  {
    id: 1,
    name: 'سياسة',
    slug: 'politics',
    articlesCount: 156,
    active: true,
  },
  {
    id: 2,
    name: 'رياضة',
    slug: 'sports',
    articlesCount: 243,
    active: true,
  },
  {
    id: 3,
    name: 'اقتصاد',
    slug: 'economy',
    articlesCount: 89,
    active: true,
  },
  {
    id: 4,
    name: 'فن',
    slug: 'arts',
    articlesCount: 112,
    active: true,
  },
]);

function confirmDelete(category) {
  selectedCategory.value = category;
  showDeleteModal.value = true;
}



async function deleteCategory() {
  try {
    deleting.value = true;
    // Delete category logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    categories.value = categories.value.filter(c => c.id !== selectedCategory.value.id);
    showDeleteModal.value = false;
  } catch (error) {
    console.error('Failed to delete category:', error);
  } finally {
    deleting.value = false;
  }
}


onMounted(() => {
  loading.value = true;
  // Fetch categories from API
  axios.get('/api/categories')
    .then(response => {
      categories.value = response.data;
    })
    .catch(error => {
      console.error('Failed to fetch categories:', error);
    })
    .finally(() => {
      loading.value = false;
    });
});

</script>
```