```vue
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">إضافة قسم جديد</h1>
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
        <label class="flex items-center">
          <input
            v-model="category.active"
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
          @click="$router.push('/admin/categories')"
        >
          إلغاء
        </UButton>
        <UButton
          type="submit"
          color="primary"
          :loading="saving"
        >
          حفظ القسم
        </UButton>
      </div>
    </form>
  </div>
</template>

<script setup>
const saving = ref(false);
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const category = ref({
  name: '',
  slug: '',
  description: '',
  active: true,
});

async function handleSubmit() {
  try {
    saving.value = true;

   axios.post('/api/categories', category.value)
      .then(response => {
        console.log('Category saved:', response.data);
        // Redirect to categories list or show success message
        navigateTo('/admin/categories');  
      })
      .catch(error => {
        console.error('Error saving category:', error);
      });
    // Simulate API call


    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    navigateTo('/admin/categories');
  } catch (error) {
    console.error('Failed to save category:', error);
  } finally {
    saving.value = false;
  }
}
</script>
```