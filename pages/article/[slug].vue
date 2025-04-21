<template>
  <div class="container mx-auto py-6 px-4">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Main Content -->
      <div class="lg:w-3/4">
        <ArticleContent :article="article" />
        
        <!-- Related Articles -->
        <RelatedArticles :articles="relatedArticles" />
      </div>
      
      <!-- Sidebar -->
      <div class="lg:w-1/4">
        <LatestNewsSidebar />
        
        <!-- Ad Banner -->
        <div class="bg-gray-200 p-4 rounded text-center my-4 h-[250px] flex items-center justify-center">
          <span class="text-gray-500">مساحة إعلانية</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
const route = useRoute();
const slug = route.params.slug;
// Create a reactive article object
const article = ref({
  id: 1,
  title: 'الرئيس المصري يلتقي نظيره الفرنسي لبحث قضايا المنطقة',
  slug: 'egyptian-president-meets-french',
  category: 'سياسة',
  excerpt: 'التقى الرئيس المصري بنظيره الفرنسي في قصر الإليزيه لمناقشة العلاقات الثنائية وقضايا المنطقة والتعاون المشترك في مختلف المجالات.',
  content: `
    <p>باريس - اليوم السابع</p>
    
    <p>التقى الرئيس المصري اليوم الثلاثاء بنظيره الفرنسي في قصر الإليزيه بالعاصمة الفرنسية باريس، وذلك في إطار زيارته الرسمية التي تستمر ليومين.</p>
    
    <p>وصرح المتحدث الرسمي باسم رئاسة الجمهورية بأن اللقاء تناول سبل تعزيز العلاقات الثنائية بين البلدين في مختلف المجالات، خاصةً الاقتصادية والتجارية والعسكرية، بالإضافة إلى مناقشة القضايا الإقليمية والدولية ذات الاهتمام المشترك.</p>
    
    <p>وأضاف المتحدث أن الرئيسين اتفقا على تكثيف الجهود الدبلوماسية لدفع عملية السلام في الشرق الأوسط، وضرورة التوصل إلى حل عادل وشامل للقضية الفلسطينية.</p>
    
    <p>من جانبه، أكد الرئيس الفرنسي حرص بلاده على تعزيز الشراكة الاستراتيجية مع مصر، معتبرًا أن القاهرة تلعب دورًا محوريًا في استقرار المنطقة.</p>
    
    <p>وأشار إلى أن الزيارة تأتي في إطار التشاور المستمر بين البلدين، مشيدًا بالدور المصري في مكافحة الإرهاب والهجرة غير الشرعية.</p>
    
    <p>كما وقع الجانبان عدة اتفاقيات للتعاون في مجالات النقل والطاقة والتعليم، بقيمة إجمالية تقدر بنحو 1.7 مليار يورو.</p>
    
    <p>وسيلتقي الرئيس المصري غدًا عددًا من كبار المسؤولين الفرنسيين ورجال الأعمال لبحث فرص الاستثمار المتاحة في مصر.</p>
  `,
  image: 'https://source.unsplash.com/random/1200x800/?politics,meeting',
  imageCaption: 'الرئيس المصري ونظيره الفرنسي خلال لقائهما في قصر الإليزيه',
  publishedAt: '2025-04-15T10:30:00',
  views: 3450,
  comments: 128,
  author: {
    name: 'أحمد محمود',
    title: 'محرر الشؤون السياسية',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  tags: ['الرئيس المصري', 'فرنسا', 'العلاقات المصرية الفرنسية', 'زيارة رسمية', 'باريس', 'الشرق الأوسط'],
});

// Fetch article data based on slug

onMounted(async () => {
  try {
    const response = await axios.get(`/api/articles/${slug}`);
    return  article.value = response.data;
    console.log(responsoe.data);
  } catch (error) {
    console.error('Error fetching article:', error);
    // Keep the mock data if the API call fails
  }
});

// Mock related articles
const relatedArticles = [
  {
    id: 2,
    title: 'وزير الخارجية يجري محادثات مع نظيره الصيني حول التعاون الاقتصادي',
    excerpt: 'تناولت المباحثات سبل تعزيز العلاقات التجارية والاستثمارية بين البلدين',
    category: 'سياسة',
    image: 'https://source.unsplash.com/random/600x400/?diplomacy',
    publishedAt: '2025-04-13T14:20:00',
    views: 875,
    slug: 'foreign-minister-meets-chinese-counterpart',
  },
  {
    id: 3,
    title: 'مصر تترأس اجتماعًا دوليًا لمكافحة الإرهاب بمشاركة 30 دولة',
    excerpt: 'يشارك في المؤتمر ممثلون عن الأمم المتحدة ومنظمات دولية لمناقشة التحديات الأمنية',
    category: 'سياسة',
    image: 'https://source.unsplash.com/random/600x400/?conference,politics',
    publishedAt: '2025-04-14T16:45:00',
    views: 980,
    slug: 'egypt-international-terrorism-conference',
  },
  {
    id: 4,
    title: 'توقيع اتفاقية استثمارية بقيمة 2 مليار دولار مع الإمارات',
    excerpt: 'تشمل الاتفاقية مشروعات في مجالات الطاقة المتجددة والبنية التحتية والتكنولوجيا',
    category: 'اقتصاد',
    image: 'https://source.unsplash.com/random/600x400/?business,meeting',
    publishedAt: '2025-04-14T11:15:00',
    views: 1280,
    slug: 'uae-investment-agreement',
  },
];

// Update page metadata
useHead({
  title: article.value.title + ' - اليوم السابع',
  meta: [
    { name: 'description', content: article.value.excerpt }
  ]
})
</script>