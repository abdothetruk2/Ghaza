export default defineEventHandler(async () => {
  const db = useNitroApp().mongo

  const fetchArticlesByCategory = async (category) => {
    return await db.collection('articles')
      .find({ category })
      .limit(3)
      .toArray();
  };

  const politicsArticles = await fetchArticlesByCategory('politics');
  const sportsArticles = await fetchArticlesByCategory('sports');
  const economyArticles = await fetchArticlesByCategory('economy');
  const artistArticles = await fetchArticlesByCategory('artist');

  return {Politics:politicsArticles, 
         Sports:sportsArticles, 
         Economy:economyArticles, 
         Artist:artistArticles}
  

    
  
});