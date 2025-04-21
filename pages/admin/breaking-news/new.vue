```vue
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">إضافة خبر عاجل</h1>
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
          حفظ
        </UButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const saving = ref(false);
const news = ref({
  title: '',
  link: '',
  active: true,
});

async function handleSubmit() {
  try {
    saving.value = true;
    axios.post('/api/breaking-news', news.value)
      .then(response => {
        console.log('Breaking news saved:', response.data);
      })
      .catch(error => {
        console.error('Error saving breaking news:', error);
      });
    // Simulate API call
    // Replace with actual API call
    // await axios.post('/api/breaking-news', news.value);
    // Simulate a delay
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // Redirect to breaking news list or show success message
    // For example, using Vue Router:
    // const router = useRouter();      
    
    
    // Save breaking news logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    navigateTo('/admin/breaking-news');
  } catch (error) {
    console.error('Failed to save breaking news:', error);
  } finally {
    saving.value = false;
  }
}
</script>
```