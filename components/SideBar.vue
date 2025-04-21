    <script setup> 
import { ref, onMounted } from 'vue';
import { useRoute  }  from 'vue-router';
const route = useRoute();
const menuItems = [
  { label: 'لوحة التحكم', path: '/admin', icon: 'i-heroicons-home' },
  { label: 'المقالات', path: '/admin/articles', icon: 'i-heroicons-document-text' },
  { label: 'الأقسام', path: '/admin/categories', icon: 'i-heroicons-tag' },
  { label: 'الأخبار العاجلة', path: '/admin/breaking-news', icon: 'i-heroicons-bolt' },
  { label: 'الوسائط', path: '/admin/media', icon: 'i-heroicons-photo' },
  { label: 'المستخدمين', path: '/admin/users', icon: 'i-heroicons-users' },
  { label: 'التعليقات', path: '/admin/comments', icon: 'i-heroicons-chat-bubble-left' },
  { label: 'الإحصائيات', path: '/admin/analytics', icon: 'i-heroicons-chart-bar' },
  { label: 'الإعدادات', path: '/admin/settings', icon: 'i-heroicons-cog-6-tooth' },
];
//     label: 'الحالة',
//     sortable: true,
//   },         
 



 </script> 
     
     <template>
      
      
      <div class="w-64 bg-white shadow-md min-h-screen">
        <div class="p-4 border-b">
          <h2 class="text-xl font-bold">لوحة التحكم</h2>
          <p class="text-sm text-gray-500">مرحباً بك في غزة نيوز</p>
        </div>
        <nav class="p-4">
          <ul class="space-y-2">
            <li v-for="item in menuItems" :key="item.path">
              <NuxtLink 
                :to="item.path"
                class="flex items-center p-2 rounded-lg hover:bg-gray-100"
                :class="{ 'bg-primary-50 text-primary-700': route.path === item.path }"
              >
                <UIcon :name="item.icon" class="w-5 h-5 mr-2" />
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
</template>