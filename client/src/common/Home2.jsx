import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AiToolCard from './AiToolCard';
import './css/Home2.css';

function Home2() {
  const [tools, setTools] = useState([]); // Store all tools
  const [filteredTools, setFilteredTools] = useState([]); // Store filtered tools based on search
  const [showAll, setShowAll] = useState(false); // State to control showing more or less tools
  const [searchQuery, setSearchQuery] = useState(''); // Store the search query

  // Fetch all AI tools from the API
  async function fetchTools() {
    try {
      let res = await axios.get("https://ai-tools-iczi.onrender.com/api/display-aitools");
      if (res.data.success === true) {
        setTools(res.data.data);
        setFilteredTools(res.data.data); // Initially show all tools
      } else {
        setTools([]);  // If the response has an error message, set an empty array
        setFilteredTools([]);
      }
    } catch (error) {
      console.error('Error fetching tools:', error);
      setTools([]); // Handle error, set empty array or fallback
      setFilteredTools([]);
    }
  }

  // Handle search input change and filter tools based on search query
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the tools based on the query
    const filtered = tools.filter((tool) =>
      tool.name.toLowerCase().includes(query)
    );
    setFilteredTools(filtered); // Update the filtered tools
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const toggleViewMore = () => {
    setShowAll(!showAll);  // Toggle between showing 4 or all components
  };

  return (
    <div className='bg-white'>
    <div className='bg-white container '>
    <div className=" bg-white">
      <div className="row">
        {/* Search Bar */}
        <div className="col-12 mb-4 search-container">
  <div className="search-wrapper">
    <input
      type="text"
      className="search-input"
      placeholder="Search AI tools..."
      value={searchQuery}
      onChange={handleSearch}
    />
    <div className="search-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.707 22.293l-5.969-5.969a10.016 10.016 0 1 0-1.414 1.414l5.969 5.969a1 1 0 0 0 1.414-1.414zM10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/>
      </svg>
    </div>
    <div className="search-line"></div>
  </div>
</div>

        {/* Display only the first 4 tools or all based on the showAll state and search */}
        {filteredTools.slice(0, showAll ? filteredTools.length : 4).map((tool) => (
          <div key={tool._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            {/* Make the entire card clickable and navigate to the URL */}
            <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="block">
              <AiToolCard tool={tool} />
            </a>
          </div>
        ))}
      </div>

      {/* Button to toggle between showing more or less */}
      <div className="text-center">
        <button className="btn btn-primary button1 m-auto " onClick={toggleViewMore}>
          {showAll ? "Show Less" : "View More"}
        </button>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Home2;
