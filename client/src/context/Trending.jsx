import React from "react";
import './Trending.css';

const  Trending= () => {
  return (
    <div className=" bg-black">
      <div className="header">
        <h2 className="title">Latest AI Tools</h2>
        <div className="filters">
          <select className="filter-select">
            <option>All Categories</option>
            <option>Content Generation</option>
            <option>Image Processing</option>
            <option>Development</option>
          </select>
          <select className="filter-select">
            <option>Sort by Latest</option>
            <option>Sort by Popular</option>
            <option>Sort by Rating</option>
          </select>
        </div>
      </div>

      <div className="tools-grid">
        {/* Tool Card 1 */}
        <div className="tool-card">
          <div className="tool-header">
            <div className="tool-icon">
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <span className="badge badge-blue">New</span>
          </div>
          <h3 className="tool-title">GPT-4 Writer</h3>
          <p className="tool-description">
            Advanced AI writing assistant with improved context understanding
          </p>
          <div className="tool-footer">
            <div className="rating">
              <div className="rating-circle">4.9</div>
              <span className="rating-text">(2.3k reviews)</span>
            </div>
            <a href="#" className="learn-more">
              Learn More →
            </a>
          </div>
        </div>

        {/* Tool Card 2 */}
        <div className="tool-card">
          <div className="tool-header">
            <div className="tool-icon">
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <span className="badge badge-green">Popular</span>
          </div>
          <h3 className="tool-title">AI Image Creator</h3>
          <p className="tool-description">
            Generate stunning images from text descriptions
          </p>
          <div className="tool-footer">
            <div className="rating">
              <div className="rating-circle">4.8</div>
              <span className="rating-text">(1.8k reviews)</span>
            </div>
            <a href="#" className="learn-more">
              Learn More →
            </a>
          </div>
        </div>

        {/* Tool Card 3 */}
        <div className="tool-card">
          <div className="tool-header">
            <div className="tool-icon">
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <span className="badge badge-purple">Trending</span>
          </div>
          <h3 className="tool-title">Code Assistant Pro</h3>
          <p className="tool-description">
            AI-powered code completion and debugging
          </p>
          <div className="tool-footer">
            <div className="rating">
              <div className="rating-circle">4.7</div>
              <span className="rating-text">(956 reviews)</span>
            </div>
            <a href="#" className="learn-more">
              Learn More →
            </a>
          </div>
        </div>
      </div>

      <div className="load-more">
        <button className="load-more-btn">Load More Tools</button>
      </div>
    </div>
  );
};

export default Trending;