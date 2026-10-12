import axios from 'axios';

const NEWS_API_KEY = 'pub_f18ceec7491f4afb817b7bbe59e54d79';

export const fetchNews = async (category = 'technology', query = 'Nigeria') => {
  try {
    const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=${query}&category=${category}&language=en`);
    
    return response.data.results.map(article => ({
      title: article.title,
      description: article.description || "No description available.",
      url: article.link,
      urlToImage: article.image_url,
      publishedAt: article.pubDate,
      source: { name: article.source_id || "News Source" }
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    // Return mock data for demo purposes if API key is missing or fails
    return [
      {
        title: "ArewaMind AI Launches in Nigeria",
        description: "A new era of artificial intelligence has begun in Northern Nigeria with the launch of ArewaMind AI.",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        publishedAt: new Date().toISOString(),
        source: { name: "TechNigeria" }
      },
      {
        title: "AI Revolution in Kano & Gombe Tech Hubs",
        description: "How artificial intelligence is transforming the technological landscape in Northern Nigeria.",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
        publishedAt: new Date().toISOString(),
        source: { name: "HausaTimes" }
      }
    ];
  }
};
