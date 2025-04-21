```vue
<template>
  <div class="container mx-auto py-12 px-4">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">من نحن</h1>
      
      <div class="prose prose-lg max-w-none">
        <p class="lead text-xl text-gray-600 mb-8">
          غزة نيوز هي بوابة إخبارية رائدة تقدم تغطية شاملة وموضوعية للأحداث المحلية والعالمية، مع تركيز خاص على الأخبار المتعلقة بغزة والقضية الفلسطينية.
        </p>

        <h2 class="text-2xl font-bold mb-4">رؤيتنا</h2>
        <p class="mb-8">
          نسعى لأن نكون المصدر الأول للأخبار الموثوقة والتحليلات المعمقة، مع الحفاظ على أعلى معايير المهنية والمصداقية في نقل الحقيقة.
        </p>

        <h2 class="text-2xl font-bold mb-4">رسالتنا</h2>
        <p class="mb-8">
          تقديم محتوى إخباري متميز يلبي احتياجات القراء ويساهم في تشكيل وعي مجتمعي قائم على المعرفة والفهم العميق للأحداث.
        </p>

        <h2 class="text-2xl font-bold mb-4">قيمنا</h2>
        <ul class="list-disc list-inside mb-8 space-y-2">
          <li>المصداقية والدقة في نقل الأخبار</li>
          <li>الموضوعية والحياد في التغطية الإخبارية</li>
          <li>الشفافية والمهنية في العمل الصحفي</li>
          <li>احترام حق الجمهور في المعرفة</li>
          <li>الالتزام بأخلاقيات المهنة الصحفية</li>
        </ul>

        <h2 class="text-2xl font-bold mb-4">فريقنا</h2>
        <p class="mb-8">
          يضم فريق عمل غزة نيوز نخبة من الصحفيين والمحررين والمراسلين المحترفين، الذين يعملون على مدار الساعة لتقديم تغطية إخبارية شاملة ومتميزة.
        </p>

        <div class="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 class="text-2xl font-bold mb-4">تواصل معنا</h2>
          <div class="space-y-2">
            <p class="flex items-center">
              <UIcon name="i-heroicons-envelope" class="w-5 h-5 ml-2" />
              البريد الإلكتروني: info@ghazanews.com
            </p>
            <p class="flex items-center">
              <UIcon name="i-heroicons-phone" class="w-5 h-5 ml-2" />
              الهاتف: +970 123 456 789
            </p>
            <p class="flex items-center">
              <UIcon name="i-heroicons-map-pin" class="w-5 h-5 ml-2" />
              العنوان: غزة، فلسطين
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Update page metadata
useHead({
  title: 'من نحن - غزة نيوز',
  meta: [
    { name: 'description', content: 'تعرف على غزة نيوز، بوابتك الإخبارية الشاملة' }
  ]
});
</script>
```