export default defineEventHandler(async (event) => {
  try {
    const db = useNitroApp().mongo;
    const collection = db.collection('breaking_news');

    // Query to get the latest 5 breaking news items
    const breakingNews = await collection
      .find({})
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .limit(5)
      .toArray();

    return { 
      breakingNews: breakingNews 
    };
  } catch (error) {
    console.error('Error fetching breaking news:', error);
    return { 
      error: 'Internal Server Error',
      statusCode: 500
    };
  }
})