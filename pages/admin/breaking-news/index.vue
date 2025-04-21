```vue
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold">الأخبار العاجلة</h1>
      <UButton
        to="/admin/breaking-news/new"
        color="primary"
        icon="i-heroicons-plus"
      >
        خبر عاجل جديد
      </UButton>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <UTable 
        :columns="columns" 
        :rows="breakingNews"
        :loading="loading"
      >
        <template #status-data="{ row }">
          <UBadge :color="row.active ? 'red' : 'gray'">
            {{ row.active ? 'نشط' : 'غير نشط' }}
          </UBadge>
        </template>
        <template #actions-data="{ row }">
          <div class="flex space-x-2">
            <UButton
              color="primary"
              variant="ghost"
              icon="i-heroicons-pencil-square"
              :to="`/admin/breaking-news/${row.id}/edit`"
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
        <p>هل أنت متأكد من حذف الخبر العاجل "{{ selectedNews?.title }}"؟</p>
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
            @click="deleteNews"
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

const loading = ref(false);
const deleting = ref(false);
const showDeleteModal = ref(false);
const selectedNews = ref(null);

const columns = [
  {
    key: 'title',
    label: 'العنوان',
  },
  {
    key: 'createdAt',
    label: 'تاريخ النشر',
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

const breakingNews = ref([
  {
    id: 1,
    title: 'عاجل: اجتماع طارئ لمجلس الأمن لمناقشة الأوضاع في غزة',
    createdAt: '2025-04-15T10:30:00',
    active: true,
  },
  {
    id: 2,
    title: 'عاجل: وصول قافلة مساعدات إنسانية جديدة إلى غزة',
    createdAt: '2025-04-15T09:15:00',
    active: true,
  },
  {
    id: 3,
    title: 'عاجل: انطلاق مؤتمر المانحين لدعم إعادة إعمار غزة',
    createdAt: '2025-04-14T16:45:00',
    active: false,
  },
]);

function confirmDelete(news) {
  selectedNews.value = news;
  showDeleteModal.value = true;
}



onMounted(async () => {
   try {
    // Fetch articles from API
       var response = await fetch ("/api/breaking-news",{


      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }else{
      breakingNews.value = await response.json();  
    }
  
  
  } catch (error) {
    console.error('Failed to fetch articles:', error);
  } finally {
    loading.value = false;
  }
  });
async function deleteNews() {
  try {
    deleting.value = true;
    // Delete news logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    breakingNews.value = breakingNews.value.filter(n => n.id !== selectedNews.value.id);
    showDeleteModal.value = false;
  } catch (error) {
    console.error('Failed to delete breaking news:', error);
  } finally {
    deleting.value = false;
  }
}
</script>
```