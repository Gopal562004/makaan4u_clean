import axios from "axios";

// In-memory cache to prevent exceeding rate limits
let newsCache = {
  data: null,
  lastFetch: null,
};

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export const getRealEstateNews = async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;

    // Check Cache first
    if (
      newsCache.data &&
      newsCache.lastFetch &&
      Date.now() - newsCache.lastFetch < CACHE_DURATION
    ) {
      return res.status(200).json({
        success: true,
        source: "cache",
        data: newsCache.data,
      });
    }

    // If no API key is provided, return a fallback mock data so the app doesn't break
    if (!apiKey || apiKey === "your_api_key_here") {
      console.warn("⚠️ NEWS_API_KEY is missing. Returning fallback news data.");
      const fallbackData = generateFallbackNews();
      return res.status(200).json({
        success: true,
        source: "fallback",
        message: "Using fallback data. Please add NEWS_API_KEY to .env",
        data: fallbackData,
      });
    }

    // Fetch from GNews API (excellent free tier for production)
    // Querying for "real estate India" or "property market"
    const response = await axios.get("https://gnews.io/api/v4/search", {
      params: {
        q: '"real estate" OR property OR housing',
        country: "in", // Focus on Indian news
        lang: "en",
        max: 10,
        apikey: apiKey,
      },
    });

    const articles = response.data.articles.map((article, index) => ({
      id: `news-${Date.now()}-${index}`,
      title: article.title,
      excerpt: article.description,
      content: article.content,
      image: article.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      url: article.url,
      source: article.source.name,
      date: article.publishedAt,
      author: {
        name: article.source.name,
        role: "News Publisher",
        avatar: "https://ui-avatars.com/api/?name=" + encodeURIComponent(article.source.name) + "&background=random"
      },
      category: "market",
      readTime: "5 min read",
      featured: index === 0,
      trending: index > 0 && index < 4,
      tags: ["news", "market", "real estate"],
      views: Math.floor(Math.random() * 1500) + 100,
      comments: Math.floor(Math.random() * 50) + 1,
      likes: Math.floor(Math.random() * 300) + 10,
    }));

    // Update Cache
    newsCache = {
      data: articles,
      lastFetch: Date.now(),
    };

    res.status(200).json({
      success: true,
      source: "api",
      data: articles,
    });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch real estate news",
      error: error.message,
    });
  }
};

// Fallback data generator when API key is missing
function generateFallbackNews() {
  return [
    {
      id: "fallback-1",
      title: "India's Real Estate Market Sees Unprecedented Growth in Q3",
      excerpt: "Housing sales in top 7 cities hit a new high as demand for luxury properties surges post-pandemic.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      url: "#",
      source: "Economic Times",
      date: new Date().toISOString(),
      author: {
        name: "Economic Times",
        role: "News Publisher",
        avatar: "https://ui-avatars.com/api/?name=Economic+Times&background=random"
      },
      category: "market",
      readTime: "4 min read",
      featured: true,
      trending: true,
    },
    {
      id: "fallback-2",
      title: "RBI Keeps Repo Rate Unchanged: What It Means For Homebuyers",
      excerpt: "The central bank's decision brings relief to prospective homebuyers looking for affordable EMI options.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      url: "#",
      source: "Financial Express",
      date: new Date(Date.now() - 86400000).toISOString(),
      author: {
        name: "Financial Express",
        role: "News Publisher",
        avatar: "https://ui-avatars.com/api/?name=Financial+Express&background=random"
      },
      category: "buying",
      readTime: "6 min read",
      featured: false,
      trending: true,
    },
    {
      id: "fallback-3",
      title: "PropTech Startups Revolutionize Property Tours with AI",
      excerpt: "Virtual reality and AI-driven recommendations are changing how millennials buy homes in metropolitan areas.",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
      url: "#",
      source: "TechCrunch",
      date: new Date(Date.now() - 172800000).toISOString(),
      author: {
        name: "TechCrunch",
        role: "News Publisher",
        avatar: "https://ui-avatars.com/api/?name=TechCrunch&background=random"
      },
      category: "technology",
      readTime: "5 min read",
      featured: false,
      trending: true,
    },
    {
      id: "fallback-4",
      title: "Sustainable Living: Eco-Friendly Homes That Save Money",
      excerpt: "Discover how sustainable home features can reduce your carbon footprint and save thousands in utility costs.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      url: "#",
      source: "Green Living",
      date: new Date(Date.now() - 259200000).toISOString(),
      author: {
        name: "Green Living",
        role: "News Publisher",
        avatar: "https://ui-avatars.com/api/?name=Green+Living&background=random"
      },
      category: "design",
      readTime: "7 min read",
      featured: false,
      trending: false,
    }
  ];
}
