```vue
<template>
  <div class="container mx-auto py-12 px-4">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">سياسة الخصوصية</h1>
      
      <div class="prose prose-lg max-w-none">
        <p class="lead text-xl text-gray-600 mb-8">
          نحن في غزة نيوز نلتزم بحماية خصوصية مستخدمينا ونتعامل مع بياناتهم الشخصية بكل مسؤولية وشفافية.
        </p>

        <h2 class="text-2xl font-bold mb-4">جمع المعلومات</h2>
        <p class="mb-8">
          نقوم بجمع المعلومات التالية عند استخدامك لموقعنا:
        </p>
        <ul class="list-disc list-inside mb-8 space-y-2">
          <li>المعلومات الشخصية التي تقدمها عند التسجيل</li>
          <li>معلومات الجهاز والمتصفح المستخدم</li>
          <li>سجل التصفح والتفاعل مع الموقع</li>
          <li>عنوان IP وموقعك الجغرافي</li>
        </ul>

        <h2 class="text-2xl font-bold mb-4">استخدام المعلومات</h2>
        <p class="mb-8">
          نستخدم المعلومات التي نجمعها للأغراض التالية:
        </p>
        <ul class="list-disc list-inside mb-8 space-y-2">
          <li>تحسين تجربة المستخدم وتخصيص المحتوى</li>
          <li>إرسال التنبيهات والنشرات الإخبارية</li>
          <li>تحليل أداء الموقع وتحسين خدماتنا</li>
          <li>حماية أمن الموقع ومنع الاحتيال</li>
        </ul>

        <h2 class="text-2xl font-bold mb-4">ملفات تعريف الارتباط</h2>
        <p class="mb-8">
          نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربة التصفح وجمع إحصائيات الاستخدام. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال متصفحك.
        </p>

        <h2 class="text-2xl font-bold mb-4">مشاركة المعلومات</h2>
        <p class="mb-8">
          نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلومات غير شخصية لأغراض التحليل والإحصاء.
        </p>

        <h2 class="text-2xl font-bold mb-4">أمن المعلومات</h2>
        <p class="mb-8">
          نتخذ إجراءات أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الإفصاح أو الإتلاف.
        </p>

        <h2 class="text-2xl font-bold mb-4">حقوقك</h2>
        <p class="mb-8">
          لديك الحق في:
        </p>
        <ul class="list-disc list-inside mb-8 space-y-2">
          <li>الوصول إلى معلوماتك الشخصية</li>
          <li>تصحيح معلوماتك غير الدقيقة</li>
          <li>طلب حذف معلوماتك</li>
          <li>الاعتراض على معالجة معلوماتك</li>
        </ul>

        <h2 class="text-2xl font-bold mb-4">تحديثات السياسة</h2>
        <p class="mb-8">
          قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة وإخطار المستخدمين بالتغييرات المهمة.
        </p>

        <div class="bg-gray-100 p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-4">اتصل بنا</h2>
          <p>
            إذا كان لديك أي أسئلة حول سياسة الخصوصية، يمكنك التواصل معنا على:
          </p>
          <p class="mt-2">
            البريد الإلكتروني: privacy@ghazanews.com
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Update page metadata
useHead({
  title: 'سياسة الخصوصية - غزة نيوز',
  meta: [
    { name: 'description', content: 'سياسة الخصوصية وحماية البيانات في موقع غزة نيوز' }
  ]
});
</script>
```