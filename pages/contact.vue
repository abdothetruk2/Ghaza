```vue
<template>
  <div class="container mx-auto py-12 px-4">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">اتصل بنا</h1>
      
      <!-- Contact Information -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white p-6 rounded-lg shadow-sm text-center">
          <UIcon name="i-heroicons-envelope" class="w-12 h-12 mx-auto mb-4 text-primary-700" />
          <h3 class="font-bold mb-2">البريد الإلكتروني</h3>
          <p class="text-gray-600">info@ghazanews.com</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm text-center">
          <UIcon name="i-heroicons-phone" class="w-12 h-12 mx-auto mb-4 text-primary-700" />
          <h3 class="font-bold mb-2">الهاتف</h3>
          <p class="text-gray-600">+970 123 456 789</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm text-center">
          <UIcon name="i-heroicons-map-pin" class="w-12 h-12 mx-auto mb-4 text-primary-700" />
          <h3 class="font-bold mb-2">العنوان</h3>
          <p class="text-gray-600">غزة، فلسطين</p>
        </div>
      </div>
      
      <!-- Contact Form -->
      <div class="bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-2xl font-bold mb-6">راسلنا</h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
            <input
              v-model="form.subject"
              type="text"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
            <textarea
              v-model="form.message"
              rows="6"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
            ></textarea>
          </div>
          
          <div>
            <UButton
              type="submit"
              color="primary"
              :loading="sending"
              block
            >
              إرسال الرسالة
            </UButton>
          </div>
        </form>
      </div>
      
      <!-- Social Media -->
      <div class="mt-12 text-center">
        <h3 class="text-xl font-bold mb-4">تابعنا على مواقع التواصل الاجتماعي</h3>
        <div class="flex justify-center space-x-4">
          <a href="#" class="text-gray-600 hover:text-primary-700">
            <UIcon name="i-simple-icons-facebook" class="w-8 h-8" />
          </a>
          <a href="#" class="text-gray-600 hover:text-primary-700">
            <UIcon name="i-simple-icons-twitter" class="w-8 h-8" />
          </a>
          <a href="#" class="text-gray-600 hover:text-primary-700">
            <UIcon name="i-simple-icons-instagram" class="w-8 h-8" />
          </a>
          <a href="#" class="text-gray-600 hover:text-primary-700">
            <UIcon name="i-simple-icons-youtube" class="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const sending = ref(false);
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

async function handleSubmit() {
  try {
    sending.value = true;
    // Handle form submission
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    // Show success message
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  } catch (error) {
    console.error('Failed to send message:', error);
  } finally {
    sending.value = false;
  }
}

// Update page metadata
useHead({
  title: 'اتصل بنا - غزة نيوز',
  meta: [
    { name: 'description', content: 'تواصل مع فريق غزة نيوز - نحن هنا للإجابة على استفساراتك' }
  ]
});
</script>
```