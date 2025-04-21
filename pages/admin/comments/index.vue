```vue
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">التعليقات</h1>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <!-- Filters -->
      <div class="mb-6 flex gap-4">
        <select
          v-model="filter.status"
          class="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
        >
          <option value="all">جميع التعليقات</option>
          <option value="pending">قيد المراجعة</option>
          <option value="approved">معتمد</option>
          <option value="spam">سبام</option>
        </select>

        <input
          v-model="filter.search"
          type="text"
          placeholder="بحث..."
          class="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
        />
      </div>

      <!-- Comments List -->
      <div class="space-y-4">
        <div v-for="comment in comments" :key="comment.id" class="border rounded-lg p-4">
          <div class="flex justify-between items-start mb-2">
            <div>
              <div class="font-bold">{{ comment.author }}</div>
              <div class="text-sm text-gray-500">{{ comment.email }}</div>
            </div>
            <UBadge :color="getStatusColor(comment.status)">
              {{ comment.status }}
            </UBadge>
          </div>
          
          <div class="text-gray-600 mb-2">{{ comment.content }}</div>
          
          <div class="text-sm text-gray-500 mb-2">
            على مقال: <a :href="`/article/${comment.articleSlug}`" class="text-primary-600 hover:underline">{{ comment.articleTitle }}</a>
          </div>
          
          <div class="text-sm text-gray-500 mb-4">
            {{ formatDate(comment.createdAt) }}
          </div>
          
          <div class="flex space-x-2">
            <UButton
              v-if="comment.status === 'pending'"
              color="green"
              variant="ghost"
              size="sm"
              @click="approveComment(comment.id)"
            >
              اعتماد
            </UButton>
            <UButton
              v-if="comment.status === 'pending'"
              color="red"
              variant="ghost"
              size="sm"
              @click="markAsSpam(comment.id)"
            >
              سبام
            </UButton>
            <UButton
              color="red"
              variant="ghost"
              size="sm"
              @click="confirmDelete(comment)"
            >
              حذف
            </UButton>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-6 flex justify-center">
        <UPagination
          v-model="currentPage"
          :total="totalComments"
          :per-page="perPage"
        />
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal">
      <div class="p-4">
        <h3 class="text-lg font-bold mb-4">تأكيد الحذف</h3>
        <p>هل أنت متأكد من حذف هذا التعليق؟</p>
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
            @click="deleteComment"
          >
            حذف
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';

const loading = ref(false);
const deleting = ref(false);
const showDeleteModal = ref(false);
const selectedComment = ref(null);
const currentPage = ref(1);
const perPage = ref(10);
const totalComments = ref(100);

const filter = ref({
  status: 'all',
  search: '',
});

const comments = ref([
  {
    id: 1,
    author: 'أحمد محمود',
    email: 'ahmed@example.com',
    content: 'تعليق جيد على المقال، شكراً للكاتب',
    status: 'pending',
    articleTitle: 'عنوان المقال الأول',
    articleSlug: 'article-1',
    createdAt: '2025-04-15T10:30:00',
  },
  {
    id: 2,
    author: 'محمد علي',
    email: 'mohamed@example.com',
    content: 'معلومات مفيدة جداً',
    status: 'approved',
    articleTitle: 'عنوان المقال الثاني',
    articleSlug: 'article-2',
    createdAt: '2025-04-15T09:15:00',
  },
  {
    id: 3,
    author: 'سارة أحمد',
    email: 'sara@example.com',
    content: 'أتفق مع الكاتب تماماً',
    status: 'spam',
    articleTitle: 'عنوان المقال الثالث',
    articleSlug: 'article-3',
    createdAt: '2025-04-14T16:45:00',
  },
]);

function getStatusColor(status) {
  switch (status) {
    case 'approved':
      return 'green';
    case 'pending':
      return 'yellow';
    case 'spam':
      return 'red';
    default:
      return 'gray';
  }
}

function formatDate(date) {
  return dayjs(date).format('DD MMM YYYY, HH:mm');
}

async function approveComment(id) {
  // Approve comment logic
}

async function markAsSpam(id) {
  // Mark as spam logic
}

function confirmDelete(comment) {
  selectedComment.value = comment;
  showDeleteModal.value = true;
}

async function deleteComment() {
  try {
    deleting.value = true;
    // Delete comment logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    comments.value = comments.value.filter(c => c.id !== selectedComment.value.id);
    showDeleteModal.value = false;
  } catch (error) {
    console.error('Failed to delete comment:', error);
  } finally {
    deleting.value = false;
  }
}

// Watch filters and pagination
watch([filter, currentPage], async () => {
  loading.value = true;
  try {
    // Fetch filtered comments
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  } catch (error) {
    console.error('Failed to fetch comments:', error);
  } finally {
    loading.value = false;
  }
});
</script>
```