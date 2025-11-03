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
    setSearch(""); // Clear search input after submit
  };

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Use relative path since both frontend and backend are on same domain
        const backendURL = process.env.NODE_ENV === "production" 
          ? "" // Empty string for same domain in production
          : "http://localhost:5000";

        const topic = query || props.category || "latest";
        
        console.log("Fetching news for topic:", topic); // Debug log
        
        const response = await fetch(
          `${backendURL}/api/news?topic=${encodeURIComponent(topic)}`
        );

        // Check if response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Debug log

        // Handle different response structures
        if (data.success === false) {
          throw new Error(data.error || "Failed to fetch news");
        }

        if (data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          // If articles is not an array or doesn't exist
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
            Error: {error}
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