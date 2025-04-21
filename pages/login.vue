<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
          <input
            v-model="email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">كلمة المرور</label>
          <input
            v-model="password"
            type="password"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
          />
        </div>

        <UButton
          type="submit"
          color="primary"
          block
          :loading="loading"
        >
          تسجيل الدخول
        </UButton>

        <p v-if="error" class="text-red-500 text-sm text-center mt-2">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
const loading = ref(false);
const error = ref('');
const email = ref('');
const password = ref('');

// Redirect if already logged in
if (user.value) {
  navigateTo('/admin');
}

async function handleLogin() {
  try {
    loading.value = true;
    error.value = '';

    const { error: err } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (err) throw err;

    // Redirect to admin dashboard
    navigateTo('/admin');
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>