<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">تعديل التعليق</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-sm p-6">
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">المحتوى</label>
        <textarea
          v-model="comment.content"
          rows="4"
          required
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
        ></textarea>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
        <select
          v-model="comment.status"
          required
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
        >
          <option value="pending">قيد المراجعة</option>
          <option value="approved">معتمد</option>
          <option value="spam">سبام</option>
        </select>
      </div>

      <div class="mb-6">
        <h3 class="text-sm font-medium text-gray-700 mb-2">معلومات التعليق</h3>
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-sm text-gray-600">
            <strong>الكاتب:</strong> {{ comment.author }}
          </p>
          <p class="text-sm text-gray-600">
            <strong>البريد الإلكتروني:</strong> {{ comment.email }}
          </p>
          <p class="text-sm text-gray-600">
            <strong>المقال:</strong>
            <a :href="`/article/${comment.articleSlug}`" class="text-primary-600 hover:underline">
              {{ comment.articleTitle }}
            </a>
          </p>
          <p class="text-sm text-gray-600">
            <strong>تاريخ النشر:</strong> {{ formatDate(comment.createdAt) }}
          </p>
        </div>
      </div>

      <div class="flex justify-end space-x-2">
        <UButton
          type="button"
          color="gray"
          @click="$router.push('/admin/comments')"
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
const comment = ref({
  content: '',
  status: '',
  author: '',
  email: '',
  articleTitle: '',
  articleSlug: '',
  createdAt: '',
});

// Fetch comment data
onMounted(async () => {
  try {
    // Simulate API call
    const mockComment = {
      id: route.params.id,
      content: 'تعليق تجريبي على المقال',
      status: 'pending',
      author: 'أحمد محمود',
      email: 'ahmed@example.com',
      articleTitle: 'عنوان المقال التجريبي',
      articleSlug: 'test-article',
      createdAt: '2025-04-15T10:30:00',
    };
    comment.value = mockComment;
  } catch (error) {
    console.error('Failed to fetch comment:', error);
  }
});

function formatDate(date) {
  return dayjs(date).format('DD MMM YYYY, HH:mm');
}

async function handleSubmit() {
  try {
    saving.value = true;
    // Save comment changes
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    navigateTo('/admin/comments');
  } catch (error) {
    console.error('Failed to save comment:', error);
  } finally {
    saving.value = false;
  }
}
</script>