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

  const getBackendURL = () => {
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
        
        const apiUrl = `${backendURL}/api/news?topic=${encodeURIComponent(topic)}`;
        console.log("Full API URL:", apiUrl);

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors' // Explicitly enable CORS
        });

        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          setArticles([]);
          setError("No articles found in response");
        }
        
      } catch (error) {
        console.error("Error fetching news:", error);
        
        // More specific error messages
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          setError("Network error: Cannot connect to backend server. This is likely a CORS issue.");
        } else if (error.message.includes('Unexpected token')) {
          setError("Backend returned HTML instead of JSON. Check if CORS is enabled on the server.");
        } else {
          setError(error.message);
        }
        
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

      {error && (
        <div className="container">
          <div className="alert alert-warning" role="alert">
            <strong>CORS Issue Detected:</strong> {error}
            <br />
            <small>
              Backend needs CORS enabled. The API works in Thunder Client because it doesn't enforce CORS.
            </small>
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