```vue
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold">مكتبة الوسائط</h1>
      <UButton
        color="primary"
        icon="i-heroicons-plus"
        @click="showUploadModal = true"
      >
        رفع ملف جديد
      </UButton>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div class="flex flex-wrap gap-4">
        <input
          v-model="filters.search"
          type="text"
          placeholder="بحث..."
          class="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
        />

        <select
          v-model="filters.type"
          class="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
        >
          <option value="">جميع الأنواع</option>
          <option value="image">صور</option>
          <option value="video">فيديو</option>
          <option value="document">مستندات</option>
        </select>

        <select
          v-model="filters.date"
          class="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
        >
          <option value="">جميع التواريخ</option>
          <option value="today">اليوم</option>
          <option value="week">هذا الأسبوع</option>
          <option value="month">هذا الشهر</option>
        </select>
      </div>
    </div>

    <!-- Media Grid -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div
          v-for="item in mediaItems"
          :key="item.id"
          class="relative group cursor-pointer"
          @click="selectItem(item)"
        >
          <!-- Image Preview -->
          <div class="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              v-if="item.type === 'image'"
              :src="item.url"
              :alt="item.name"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center text-gray-400"
            >
              <UIcon
                :name="getFileIcon(item.type)"
                class="w-12 h-12"
              />
            </div>
          </div>

          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <div class="flex space-x-2">
              <button
                class="p-2 text-white hover:text-primary-500"
                @click.stop="copyUrl(item.url)"
              >
                <UIcon name="i-heroicons-clipboard" class="w-5 h-5" />
              </button>
              <button
                class="p-2 text-white hover:text-red-500"
                @click.stop="confirmDelete(item)"
              >
                <UIcon name="i-heroicons-trash" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div class="mt-6 text-center">
        <UButton
          v-if="hasMore"
          color="gray"
          :loading="loading"
          @click="loadMore"
        >
          تحميل المزيد
        </UButton>
      </div>
    </div>

    <!-- Upload Modal -->
    <UModal v-model="showUploadModal">
      <div class="p-4">
        <h3 class="text-lg font-bold mb-4">رفع ملف جديد</h3>
        <div
          class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
          @dragover.prevent
          @drop.prevent="handleDrop"
        >
          <UIcon name="i-heroicons-cloud-arrow-up" class="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p class="text-gray-600 mb-2">اسحب الملفات هنا أو</p>
          <UButton
            color="primary"
            @click="$refs.fileInput.click()"
          >
            اختر ملفات
          </UButton>
          <input
            ref="fileInput"
            type="file"
            multiple
            class="hidden"
            @change="handleFileSelect"
          />
        </div>
      </div>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal">
      <div class="p-4">
        <h3 class="text-lg font-bold mb-4">تأكيد الحذف</h3>
        <p>هل أنت متأكد من حذف هذا الملف؟</p>
        <div class="mt-6 flex justify-end space-x-2">
          <UButton
            color="gray"
            @click="showDeleteModal = false"
          >
            إلغاء
          </UButton>
          <UButton
            color="red"
            :loading="deleting"
            @click="deleteItem"
          >
            حذف
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup>
const loading = ref(false);
const deleting = ref(false);
const showUploadModal = ref(false);
const showDeleteModal = ref(false);
const selectedItem = ref(null);
const hasMore = ref(true);

const filters = ref({
  search: '',
  type: '',
  date: '',
});

const mediaItems = ref([
  {
    id: 1,
    name: 'صورة 1',
    type: 'image',
    url: 'https://source.unsplash.com/random/800x800?1',
    size: '1.2MB',
    createdAt: '2025-04-15T10:30:00',
  },
  {
    id: 2,
    name: 'فيديو 1',
    type: 'video',
    url: '#',
    size: '15.8MB',
    createdAt: '2025-04-15T09:15:00',
  },
  {
    id: 3,
    name: 'مستند 1',
    type: 'document',
    url: '#',
    size: '256KB',
    createdAt: '2025-04-14T16:45:00',
  },
  // Add more items...
]);

function getFileIcon(type) {
  switch (type) {
    case 'video':
      return 'i-heroicons-video-camera';
    case 'document':
      return 'i-heroicons-document';
    default:
      return 'i-heroicons-photo';
  }
}

function selectItem(item) {
  selectedItem.value = item;
}

async function copyUrl(url) {
  try {
    await navigator.clipboard.writeText(url);
    // Show success message
  } catch (error) {
    console.error('Failed to copy URL:', error);
  }
}

function confirmDelete(item) {
  selectedItem.value = item;
  showDeleteModal.value = true;
}

async function deleteItem() {
  try {
    deleting.value = true;
    // Delete item logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    mediaItems.value = mediaItems.value.filter(item => item.id !== selectedItem.value.id);
    showDeleteModal.value = false;
  } catch (error) {
    console.error('Failed to delete item:', error);
  } finally {
    deleting.value = false;
  }
}

function handleDrop(event) {
  const files = event.dataTransfer.files;
  handleFiles(files);
}

function handleFileSelect(event) {
  const files = event.target.files;
  handleFiles(files);
}

async function handleFiles(files) {
  // Upload files logic here
  console.log('Uploading files:', files);
}

async function loadMore() {
  try {
    loading.value = true;
    // Load more items logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  } catch (error) {
    console.error('Failed to load more items:', error);
  } finally {
    loading.value = false;
  }
}

// Watch filters
watch(filters, async () => {
  // Filter items logic here
});
</script>
```