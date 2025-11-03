const express = require("express");
const axios = require("axios"); // Changed from node-fetch to axios
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

router.get("/", async (req, res) => {
  console.log("📡 News API called with topic:", req.query.topic);
  console.log("🔑 API Key exists:", !!GNEWS_API_KEY);
  
  try {
    const topic = req.query.topic || "latest";
    
    // Validate API key
    if (!GNEWS_API_KEY) {
      console.error("❌ GNEWS_API_KEY is missing");
      return res.status(500).json({ 
        error: "API key not configured",
        articles: [] 
      });
    }

    const apiUrl = `https://gnews.io/api/v4/search?q=${topic}&lang=en&country=in&max=10&apikey=${GNEWS_API_KEY}`;
    console.log("🌐 Calling GNews API:", apiUrl);

    // Using axios instead of fetch
    const response = await axios.get(apiUrl);
    console.log("📨 GNews API response status:", response.status);

    const data = response.data;
    console.log("✅ GNews API response data:", data);
    
    // GNews API returns articles in the 'articles' property
    if (data.articles) {
      console.log(`📰 Found ${data.articles.length} articles`);
      res.json({
        success: true,
        articles: data.articles,
        totalArticles: data.totalArticles || data.articles.length
      });
    } else {
      console.log("❓ No articles found in response");
      res.json({
        success: true,
        articles: [],
        totalArticles: 0,
        message: "No articles found"
      });
    }
    
  } catch (error) {
    console.error("💥 Error fetching GNews data:", error.message);
    
    // axios error handling
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("❌ GNews API error response:", error.response.status, error.response.data);
      res.status(500).json({ 
        success: false,
        error: `GNews API responded with status: ${error.response.status}`,
        articles: [] 
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error("❌ No response received from GNews API");
      res.status(500).json({ 
        success: false,
        error: "No response received from GNews API",
        articles: [] 
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).json({ 
        success: false,
        error: error.message,
        articles: [] 
      });
    }
  }
});

module.exports = router;