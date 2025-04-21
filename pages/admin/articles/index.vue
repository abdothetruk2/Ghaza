<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold">إدارة المقالات</h1>
      <UButton
        to="/admin/articles/new"
        color="primary"
        icon="i-heroicons-plus"
      >
        مقال جديد
      </UButton>
    </div>

    <!-- Articles Table -->
    <div class="bg-white rounded-lg shadow-sm p-6">
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
              :to="`/article/${row.title}`"
              target="_blank"
            />
            <UButton
              color="primary"
              variant="ghost"
              icon="i-heroicons-pencil-square"
              :to="`/admin/articles/${row._id}/edit`"
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

      <!-- Pagination -->
      <div class="mt-4 flex justify-center">
        <UPagination
          v-model="currentPage"
          :total="totalArticles"
          :per-page="perPage"
        />
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal">
      <div class="p-4">
        <h3 class="text-lg font-bold mb-4">تأكيد الحذف</h3>
        <p>هل أنت متأكد من حذف المقال "{{ selectedArticle?.title }}"؟</p>
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
            @click="deleteArticle"
          >
            حذف
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup>
const loading = ref(false);
const deleting = ref(false);
const showDeleteModal = ref(false);
const selectedArticle = ref(null);
const currentPage = ref(1);
const perPage = ref(10);
const totalArticles = ref(100); // This would come from your API

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

// Mock data - replace with actual API call
const articles = ref([
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
]);

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

function confirmDelete(article) {
  selectedArticle.value = article;
  showDeleteModal.value = true;
}

async function deleteArticle() {
  try {
    deleting.value = true;
    // TODO: Implement actual delete logic
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    articles.value = articles.value.filter(a => a._id !== selectedArticle.value._id);
    showDeleteModal.value = false;
    // Show success message
  } catch (error) {
    // Handle error
    console.error('Failed to delete article:', error);
  } finally {
    deleting.value = false;
  }
}

// TODO: Implement actual data fetching
onMounted(async () => {
  loading.value = true;
  

  try {
    // Fetch articles from API
       var response = await fetch ("/api/articles",{


      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }else{
      articles.value = await response.json();  
    }
  
  
  } catch (error) {
    console.error('Failed to fetch articles:', error);
  } finally {
    loading.value = false;
  }
});

// Watch page changes
watch(currentPage, async (newPage) => {
  loading.value = true;
  try {
    // Fetch new page data
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  } catch (error) {
    console.error('Failed to fetch page:', error);
  } finally {
    loading.value = false;
  }
});
</script>