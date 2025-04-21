<template>
  <div class="container mx-auto py-6 px-4">
    <!-- Hero Slider -->
    <div class="mb-8">
      <HeroSlider />
    </div>
    
    <!-- Main Content Area -->
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Main Content -->
      <div class="lg:w-3/4">
        <!-- Politics Section -->
        <CategorySection 
          title="سياسة" 
          categorySlug="politics" 
          :articles="politicsArticles" 
        />
        
        <!-- Sports Section -->
        <CategorySection 
          title="رياضة" 
          categorySlug="sports" 
          :articles="sportsArticles" 
        />
        
        <!-- Economy Section -->
        <CategorySection 
          title="اقتصاد" 
          categorySlug="economy" 
          :articles="economyArticles" 
        />
        
        <!-- Arts Section -->
        <CategorySection 
          title="فن" 
          categorySlug="arts" 
          :articles="artsArticles" 
        />
      </div>
      
      <!-- Sidebar -->
      <div class="lg:w-1/4">
        <LatestNewsSidebar />
        
        <!-- Ad Banner -->
        <div class="bg-gray-200 p-4 rounded text-center my-4 h-[250px] flex items-center justify-center">
          <span class="text-gray-500">مساحة إعلانية</span>
        </div>
        
        <!-- Most Read Section -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-4">
          <h3 class="section-title">الأكثر قراءة</h3>
          <ol class="list-decimal list-inside space-y-3 pl-2">
            <li v-for="(article, index) in mostReadArticles" :key="index">
              <NuxtLink :to="`/article/${article.slug}`" class="hover:text-primary-700">
                {{ article.title }}
              </NuxtLink>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


import axios from 'axios';



const po=   await axios.get('/api/landing')
  .then(response => {
    // Handle the response data
   return response.data
  })
  
  .catch(error => {
    // Handle any errors
    console.error('Error fetching articles:', error);
  });





  var politicsArticles = [
  {
    id: 1,
    title: 'الرئيس المصري يلتقي رئيس وزراء إيطاليا لبحث التعاون المشترك',
    excerpt: 'ناقش الرئيس سبل تعزيز العلاقات الثنائية بين البلدين في مختلف المجالات',
    category: 'سياسة',
    image: 'https://source.unsplash.com/random/600x400/?politics,meeting',
    publishedAt: '2025-04-15T10:30:00',
    views: 1250,
    slug: 'egyptian-president-meets-italian-pm',
  },
  {
    id: 2,
    title: 'مصر تترأس اجتماعًا دوليًا لمكافحة الإرهاب بمشاركة 30 دولة',
    excerpt: 'يشارك في المؤتمر ممثلون عن الأمم المتحدة ومنظمات دولية لمناقشة التحديات الأمنية',
    category: 'سياسة',
    image: 'https://source.unsplash.com/random/600x400/?conference,politics',
    publishedAt: '2025-04-14T16:45:00',
    views: 980,
    slug: 'egypt-international-terrorism-conference',
  },
  {
    id: 3,
    title: 'وزير الخارجية يجري محادثات مع نظيره الصيني حول التعاون الاقتصادي',
    excerpt: 'تناولت المباحثات سبل تعزيز العلاقات التجارية والاستثمارية بين البلدين',
    category: 'سياسة',
    image: 'https://source.unsplash.com/random/600x400/?diplomacy',
    publishedAt: '2025-04-13T14:20:00',
    views: 875,
    slug: 'foreign-minister-meets-chinese-counterpart',
  },
];

var sportsArticles = [
  {
    id: 4,
    title: 'الأهلي يفوز على الزمالك في ديربي القاهرة بثلاثية نظيفة',
    excerpt: 'أحرز المهاجم الجديد هدفين وصنع الثالث في مباراة القمة التي أقيمت على استاد القاهرة',
    category: 'رياضة',
    image: 'https://source.unsplash.com/random/600x400/?football,stadium',
    publishedAt: '2025-04-15T23:10:00',
    views: 4320,
    slug: 'ahly-zamalek-derby',
  },
  {
    id: 5,
    title: 'المنتخب المصري لكرة اليد يتأهل لربع نهائي بطولة العالم',
    excerpt: 'حقق الفراعنة فوزًا مثيرًا على المنتخب النرويجي في الثواني الأخيرة من المباراة',
    category: 'رياضة',
    image: 'https://source.unsplash.com/random/600x400/?handball',
    publishedAt: '2025-04-14T18:30:00',
    views: 2150,
    slug: 'handball-team-qualifies-world-cup',
  },
  {
    id: 6,
    title: 'محمد صلاح يتوج بجائزة أفضل لاعب في الدوري الإنجليزي للشهر الثالث',
    excerpt: 'واصل النجم المصري تألقه مع ليفربول وسجل 7 أهداف في 5 مباريات',
    category: 'رياضة',
    image: 'https://source.unsplash.com/random/600x400/?football,player',
    publishedAt: '2025-04-13T09:45:00',
    views: 3650,
    slug: 'salah-wins-player-of-month',
  },
];

var economyArticles = [
  {
    id: 7,
    title: 'البنك المركزي المصري يخفض أسعار الفائدة بنسبة 0.5%',
    excerpt: 'القرار يأتي في ظل تراجع معدلات التضخم واستقرار الجنيه أمام الدولار',
    category: 'اقتصاد',
    image: 'https://source.unsplash.com/random/600x400/?bank,finance',
    publishedAt: '2025-04-15T14:20:00',
    views: 1470,
    slug: 'central-bank-cuts-interest-rates',
  },
  {
    id: 8,
    title: 'توقيع اتفاقية استثمارية بقيمة 2 مليار دولار مع الإمارات',
    excerpt: 'تشمل الاتفاقية مشروعات في مجالات الطاقة المتجددة والبنية التحتية والتكنولوجيا',
    category: 'اقتصاد',
    image: 'https://source.unsplash.com/random/600x400/?business,meeting',
    publishedAt: '2025-04-14T11:15:00',
    views: 1280,
    slug: 'uae-investment-agreement',
  },
  {
    id: 9,
    title: 'ارتفاع صادرات مصر غير البترولية بنسبة 12% خلال الربع الأول',
    excerpt: 'قطاعات الأغذية والمنسوجات والصناعات الهندسية تتصدر قائمة الصادرات',
    category: 'اقتصاد',
    image: 'https://source.unsplash.com/random/600x400/?export,shipping',
    publishedAt: '2025-04-13T10:40:00',
    views: 950,
    slug: 'egypt-exports-increase',
  },
];

var  artsArticles = [
  {
    id: 10,
    title: 'افتتاح مهرجان القاهرة السينمائي بحضور نجوم الفن العربي والعالمي',
    excerpt: 'يشارك في المهرجان أكثر من 150 فيلمًا من 65 دولة وسط إجراءات أمنية مشددة',
    category: 'فن',
    image: 'https://source.unsplash.com/random/600x400/?cinema,festival',
    publishedAt: '2025-04-15T20:30:00',
    views: 2430,
    slug: 'cairo-film-festival-opening',
  },
  {
    id: 11,
    title: 'النجمة المصرية تفوز بجائزة أفضل ممثلة في مهرجان كان السينمائي',
    excerpt: 'حصدت الجائزة عن دورها في فيلم "الطريق" وسط منافسة قوية من نجمات عالميات',
    category: 'فن',
    image: 'https://source.unsplash.com/random/600x400/?actress,award',
    publishedAt: '2025-04-14T15:50:00',
    views: 3210,
    slug: 'egyptian-actress-cannes-award',
  },
  {
    id: 12,
    title: 'المطرب المصري يحيي حفلًا غنائيًا ضخمًا في الأوبرا المصرية',
    excerpt: 'قدم خلال الحفل باقة من أشهر أغانيه الجديدة والقديمة وسط تفاعل كبير من الجمهور',
    category: 'فن',
    image: 'https://source.unsplash.com/random/600x400/?concert,singer',
    publishedAt: '2025-04-13T22:15:00',
    views: 1980,
    slug: 'egyptian-singer-opera-concert',
  },
];

// Most read articles
var mostReadArticles = [
  {
    title: 'الأهلي يفوز على الزمالك في ديربي القاهرة بثلاثية نظيفة',
    slug: 'ahly-zamalek-derby',
  },
  {
    title: 'محمد صلاح يتوج بجائزة أفضل لاعب في الدوري الإنجليزي للشهر الثالث',
    slug: 'salah-wins-player-of-month',
  },
  {
    title: 'افتتاح مهرجان القاهرة السينمائي بحضور نجوم الفن العربي والعالمي',
    slug: 'cairo-film-festival-opening',
  },
  {
    title: 'البنك المركزي المصري يخفض أسعار الفائدة بنسبة 0.5%',
    slug: 'central-bank-cuts-interest-rates',
  },
  {
    title: 'النجمة المصرية تفوز بجائزة أفضل ممثلة في مهرجان كان السينمائي',
    slug: 'egyptian-actress-cannes-award',
  },
];

 politicsArticles = po?.Politics;
 sportsArticles = po?.Sports;
 economyArticles = po?.Economy;
 artsArticles = po?.Arts;

</script>