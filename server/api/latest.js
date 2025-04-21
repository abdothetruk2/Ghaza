export default async function getLatestArticles(req, res) {
  try {
    const db = useNitroApp().mongo;
    const collection = db.collection('articles');

    // Query to get the latest 4 articles
    const latestArticles = await collection
      .find({})
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .limit(4)
      .toArray();

    return { 
      articles: latestArticles 
    };
  } catch (error) {
    console.error('Error fetching latest articles:', error);
    return { 
      error: 'Internal Server Error',
      statusCode: 500
    };
  }
}