```vue
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">إعدادات الموقع</h1>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <form @submit.prevent="saveSettings">
        <!-- General Settings -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4">إعدادات عامة</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">اسم الموقع</label>
              <input
                v-model="settings.siteName"
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">وصف الموقع</label>
              <input
                v-model="settings.siteDescription"
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني للموقع</label>
              <input
                v-model="settings.siteEmail"
                type="email"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">اللغة الافتراضية</label>
              <select
                v-model="settings.defaultLanguage"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Social Media Settings -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4">وسائل التواصل الاجتماعي</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">فيسبوك</label>
              <input
                v-model="settings.social.facebook"
                type="url"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">تويتر</label>
              <input
                v-model="settings.social.twitter"
                type="url"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">انستغرام</label>
              <input
                v-model="settings.social.instagram"
                type="url"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">يوتيوب</label>
              <input
                v-model="settings.social.youtube"
                type="url"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        <!-- Comments Settings -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4">إعدادات التعليقات</h2>
          <div class="space-y-4">
            <label class="flex items-center">
              <input
                v-model="settings.comments.enabled"
                type="checkbox"
                class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
              />
              <span class="mr-2">تفعيل التعليقات</span>
            </label>

            <label class="flex items-center">
              <input
                v-model="settings.comments.requireApproval"
                type="checkbox"
                class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
              />
              <span class="mr-2">مراجعة التعليقات قبل النشر</span>
            </label>

            <label class="flex items-center">
              <input
                v-model="settings.comments.allowGuests"
                type="checkbox"
                class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
              />
              <span class="mr-2">السماح بتعليقات الزوار</span>
            </label>
          </div>
        </div>

        <!-- Analytics Settings -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4">إعدادات التحليلات</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">كود Google Analytics</label>
              <textarea
                v-model="settings.analytics.googleAnalytics"
                rows="3"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-2">
          <UButton
            type="button"
            color="gray"
            @click="resetSettings"
          >
            إعادة تعيين
          </UButton>
          <UButton
            type="submit"
            color="primary"
            :loading="saving"
          >
            حفظ الإعدادات
          </UButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const saving = ref(false);

const settings = ref({
  siteName: 'غزة نيوز',
  siteDescription: 'بوابة إخبارية شاملة',
  siteEmail: 'info@ghazanews.com',
  defaultLanguage: 'ar',
  social: {
    facebook: 'https://facebook.com/ghazanews',
    twitter: 'https://twitter.com/ghazanews',
    instagram: 'https://instagram.com/ghazanews',
    youtube: 'https://youtube.com/ghazanews',
  },
  comments: {
    enabled: true,
    requireApproval: true,
    allowGuests: false,
  },
  analytics: {
    googleAnalytics: '',
  },
});

const originalSettings = { ...settings.value };

async function saveSettings() {
  try {
    saving.value = true;
    // Save settings logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    // Show success message
  } catch (error) {
    console.error('Failed to save settings:', error);
  } finally {
    saving.value = false;
  }
}

function resetSettings() {
  settings.value = { ...originalSettings };
}
</script>
```