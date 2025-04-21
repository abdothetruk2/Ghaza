```vue
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">إضافة مستخدم جديد</h1>
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
          <label class="block text-sm font-medium text-gray-700 mb-2">كلمة المرور</label>
          <input
            v-model="user.password"
            type="password"
            required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">تأكيد كلمة المرور</label>
          <input
            v-model="user.confirmPassword"
            type="password"
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
          حفظ
        </UButton>
      </div>
    </form>
  </div>
</template>

<script setup>
const saving = ref(false);
const user = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'writer',
  active: true,
});

async function handleSubmit() {
  try {
    saving.value = true;
    // Validate passwords match
    if (user.value.password !== user.value.confirmPassword) {
      throw new Error('كلمات المرور غير متطابقة');
    }
       var response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user.value)
    });
    
    if (!response.ok) {
      throw new Error('Failed to save user');
    }
    // Save user logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    navigateTo('/admin/users');
  } catch (error) {
    console.error('Failed to save user:', error);
  } finally {
   

    
    saving.value = false;
  }
}
</script>
```