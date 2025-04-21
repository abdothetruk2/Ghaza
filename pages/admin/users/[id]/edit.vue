<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">تعديل بيانات المستخدم</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-sm p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
          <input
            v-model="user.name"
            type="text"
            required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
          <input
            v-model="user.email"
            type="email"
            required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">الدور</label>
          <select
            v-model="user.role"
            required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
          >
            <option value="admin">مدير</option>
            <option value="editor">محرر</option>
            <option value="writer">كاتب</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">كلمة المرور الجديدة</label>
          <input
            v-model="user.newPassword"
            type="password"
            placeholder="اتركها فارغة إذا لم ترد تغييرها"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
          />
        </div>
      </div>

      <div class="mb-6">
        <label class="flex items-center">
          <input
            v-model="user.active"
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
          @click="$router.push('/admin/users')"
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
const user = ref({
  name: '',
  email: '',
  role: '',
  newPassword: '',
  active: true,
});

// Fetch user data
onMounted(async () => {
  
    
  
  try {
    // Simulate API call
    const mockUser = {
      id: route.params.id,
      name: 'أحمد محمود',
      email: 'ahmed@example.com',
      role: 'editor',
      active: true,
    };
    user.value = { ...mockUser, newPassword: '' };
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
});

async function handleSubmit() {
  try {
    saving.value = true;
    // Save user changes
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    navigateTo('/admin/users');
  } catch (error) {
    console.error('Failed to save user:', error);
  } finally {
    saving.value = false;
  }
}
</script>