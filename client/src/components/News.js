import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

function News(props) {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const searchQuery = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  // Function to get backend URL based on environment
  const getBackendURL = () => {
    // For production - use relative path since both are on same domain
    if (process.env.NODE_ENV === "production") {
      return ""; // Empty string for same domain
    }
    // For development
    return "https://news-app-khcy.onrender.com";
  };

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const backendURL = getBackendURL();
        const topic = query || props.category || "latest";
        
        console.log("Fetching news for topic:", topic);
        console.log("Backend URL:", backendURL);
        
        const apiUrl = `${backendURL}/api/news?topic=${encodeURIComponent(topic)}`;
        console.log("Full API URL:", apiUrl);

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Remove credentials if not needed, or keep if your API requires auth
          // credentials: 'include'
        });

        // First, get the response as text to check if it's valid JSON
        const responseText = await response.text();
        console.log("Raw response:", responseText.substring(0, 200)); // Log first 200 chars

        // Check if response is HTML (error page)
        if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
          throw new Error("Server returned HTML page instead of JSON. Check backend URL.");
        }

        // Try to parse as JSON
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          throw new Error("Invalid JSON response from server");
        }

        // Check if response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log("Parsed API Response:", data);

        // Handle different response structures
        if (data.success === false) {
          throw new Error(data.error || "Failed to fetch news");
        }

        if (data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          setArticles([]);
          setError("No articles found in response");
        }
        
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(error.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [query, props.category]);

  return (
    <>
      <h1 className="news-title text-center mt-4">
        {query ? `Search Results for "${query}"` : `Top ${props.category || 'Latest'} Stories`}
      </h1>
      
      <div className="container my-3">
        <form className="d-flex" role="search" onSubmit={searchQuery}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search latest topics"
            aria-label="Search"
            value={search}
            onChange={handleSearch}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="container">
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error}
            <br />
            <small>Please check if the backend server is running.</small>
          </div>
        </div>
      )}

      <div className="container-fluid mt-5 flex-wrap d-flex justify-content-evenly">
        {loading ? (
          <div className="d-flex justify-content-center w-100">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : articles.length > 0 ? (
          articles.map((article, index) => (
            <NewsCard
              key={index}
              title={article.title}
              urlToImage={article.image || article.urlToImage}
              url={article.url}
              description={article.description}
              publishedAt={article.publishedAt}
              source={article.source}
            />
          ))
        ) : (
          !error && (
            <div className="text-center mt-5 w-100">
              <p>No news articles found.</p>
              <p>Try searching for a different topic.</p>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default News;