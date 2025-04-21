<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">تعديل المقال</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-sm p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
          <input
            v-model="article.title"
            type="text"
            required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">القسم</label>
          <select
            v-model="article.category"
            required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
          >
            <option value="">اختر القسم</option>
            <option value="politics">سياسة</option>
            <option value="sports">رياضة</option>
            <option value="economy">اقتصاد</option>
            <option value="arts">فن</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">الصورة الرئيسية</label>
          <div class="flex items-center space-x-4">
            <img :src="article.image" alt="" class="w-20 h-20 object-cover rounded" />
            <input
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="flex-1"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
          <select
            v-model="article.status"
            required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
          >
            <option value="draft">مسودة</option>
            <option value="published">منشور</option>
            <option value="review">قيد المراجعة</option>
          </select>
        </div>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">المقدمة</label>
        <textarea
          v-model="article.excerpt"
          rows="3"
          required
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
        ></textarea>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">المحتوى</label>
        <div class="border rounded-md">
          <textarea
            v-model="article.content"
            rows="10"
            required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
          ></textarea>
        </div>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">الكلمات المفتاحية</label>
        <input
          v-model="article.tags"
          type="text"
          placeholder="افصل بين الكلمات بفاصلة"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
        />
      </div>

      <div class="flex justify-end space-x-2">
        <UButton
          type="button"
          color="gray"
          @click="$router.push('/admin/articles')"
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
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const saving = ref(false);
const article = ref({
  title: '',
  category: '',
  excerpt: '',
  content: '',
  status: '',
  tags: '',
  image: '',
});

// Fetch article data
onMounted(async () => {
  try {
    const response = await axios.get(`/api/articles/${route.params.id}`);
    article.value = response.data;
  } catch (error) {
    console.error('Error fetching article:', error);
  }
});

async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      article.value.image = response.data.url;
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  }
}

async function handleSubmit() {
  try {
    saving.value = true;

    // Create a copy of the article object without the _id field
    const { _id, ...articleData } = article.value;

    const response = await axios.patch(`/api/articles/${route.params.id}`, articleData);
    console.log('Article saved:', response.data);

    // Navigate to articles list
    router.push('/admin/articles');
  } catch (error) {
    console.error('Failed to save article:', error);
  } finally {
    saving.value = false;
  }
}
</script>