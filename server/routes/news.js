const express = require("express");
const axios = require("axios");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

// Add CORS headers middleware
router.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://news-app-eta-six-52.vercel.app/', // Replace with your actual frontend domain
    process.env.FRONTEND_URL
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

router.get("/", async (req, res) => {
  console.log("📡 News API called with topic:", req.query.topic);
  
  try {
    const topic = req.query.topic || "latest";
    
    if (!GNEWS_API_KEY) {
      return res.status(500).json({ 
        success: false,
        error: "API key not configured",
        articles: [] 
      });
    }

    const apiUrl = `https://gnews.io/api/v4/search?q=${topic}&lang=en&country=in&max=10&apikey=${GNEWS_API_KEY}`;
    
    const response = await axios.get(apiUrl);
    const data = response.data;
    
    if (data.articles) {
      res.json({
        success: true,
        articles: data.articles,
        totalArticles: data.totalArticles || data.articles.length
      });
    } else {
      res.json({
        success: true,
        articles: [],
        totalArticles: 0,
        message: "No articles found"
      });
    }
    
  } catch (error) {
    console.error("💥 Error fetching GNews data:", error.message);
    res.status(500).json({ 
      success: false,
      error: error.message,
      articles: [] 
    });
  }
});

module.exports = router;