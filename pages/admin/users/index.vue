```vue
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold">المستخدمون</h1>
      <UButton
        to="/admin/users/new"
        color="primary"
        icon="i-heroicons-plus"
      >
        مستخدم جديد
      </UButton>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <UTable 
        :columns="columns" 
        :rows="users"
        :loading="loading"
      >
        <template #role-data="{ row }">
          <UBadge :color="getRoleColor(row.role)">
            {{ row.role }}
          </UBadge>
        </template>
        <template #status-data="{ row }">
          <UBadge :color="row.active ? 'green' : 'gray'">
            {{ row.active ? 'نشط' : 'غير نشط' }}
          </UBadge>
        </template>
        <template #actions-data="{ row }">
          <div class="flex space-x-2">
            <UButton
              color="primary"
              variant="ghost"
              icon="i-heroicons-pencil-square"
              :to="`/admin/users/${row._id}/edit`"
            />
            <UButton
              color="red"
              variant="ghost"
              icon="i-heroicons-trash"
              @click="confirmDelete(row)"
            />
          </div>
        </template>
      </UTable>

      <!-- Pagination -->
      <div class="mt-4 flex justify-center">
        <UPagination
          v-model="currentPage"
          :total="totalUsers"
          :per-page="perPage"
        />
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal">
      <div class="p-4">
        <h3 class="text-lg font-bold mb-4">تأكيد الحذف</h3>
        <p>هل أنت متأكد من حذف المستخدم "{{ selectedUser?.name }}"؟</p>
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
            @click="deleteUser"
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
const showDeleteModal = ref(false);
const selectedUser = ref(null);
const currentPage = ref(1);
const perPage = ref(10);
const totalUsers = ref(100);

const columns = [
  {
    key: 'name',
    label: 'الاسم',
  },
  {
    key: 'email',
    label: 'البريد الإلكتروني',
  },
  {
    key: 'role',
    label: 'الدور',
  },
  {
    key: 'status',
    label: 'الحالة',
  },
  {
    key: 'actions',
    label: 'الإجراءات',
  },
];

const users = ref([
  {
    id: 1,
    name: 'أحمد محمود',
    email: 'ahmed@example.com',
    role: 'admin',
    active: true,
  },
  {
    id: 2,
    name: 'محمد علي',
    email: 'mohamed@example.com',
    role: 'editor',
    active: true,
  },
  {
    id: 3,
    name: 'سارة أحمد',
    email: 'sara@example.com',
    role: 'writer',
    active: true,
  },
]);

function getRoleColor(role) {
  switch (role) {
    case 'admin':
      return 'purple';
    case 'editor':
      return 'blue';
    case 'writer':
      return 'green';
    default:
      return 'gray';
  }
}

function confirmDelete(user) {
  selectedUser.value = user;
  showDeleteModal.value = true;
}

async function deleteUser() {
  try {
    deleting.value = true;
    // Delete user logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    users.value = users.value.filter(u => u.id !== selectedUser.value.id);
    showDeleteModal.value = false;
  } catch (error) {
    console.error('Failed to delete user:', error);
  } finally {
    deleting.value = false;
  }
}

// Watch page changes
watch(currentPage, async (newPage) => {
  loading.value = true;
 
  
  try {
    // Simulate API call to fetch users for the new page
 
    // Simulate API call
  } catch (error) {
    console.error('Failed to fetch page:', error);
  } finally {
    loading.value = false;
  }
});

onMounted(async () => {
  var response = await fetch ("/api/users",{


      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }else{
      users.value = await response.json();  
      console.log(users.value);
    }
});
</script>
