<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">تعديل خبر عاجل</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-sm p-6">
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
        <input
          v-model="news.title"
          type="text"
          required
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
        />
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">الرابط</label>
        <input
          v-model="news.link"
          type="url"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
        />
      </div>

      <div class="mb-6">
        <label class="flex items-center">
          <input
            v-model="news.active"
            type="checkbox"
            class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
          />
          <span class="mr-2">نشط</span>
        </label>
      </div>

      <div class="flex justify-end space-x-2">
        <UButton
          type="button"
          color="gray"
          @click="$router.push('/admin/breaking-news')"
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
const route = useRoute();
const saving = ref(false);
const news = ref({
  title: '',
  link: '',
  active: true,
});

// Fetch breaking news data
onMounted(async () => {
  try {
    // Simulate API call
    const mockNews = {
      id: route.params.id,
      title: 'عاجل: اجتماع طارئ لمجلس الأمن',
      link: 'https://example.com/news/123',
      active: true,
    };
    news.value = mockNews;
  } catch (error) {
    console.error('Failed to fetch breaking news:', error);
  }
});

async function handleSubmit() {
  try {
    saving.value = true;
    // Save breaking news changes
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    navigateTo('/admin/breaking-news');
  } catch (error) {
    console.error('Failed to save breaking news:', error);
  } finally {
    saving.value = false;
  }
}
</script>