import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CategoryDisplay.css';

// Cost tier metadata
const COST_METADATA = {
  'Free': {
    name: 'Free Tools',
    image: '/free-tier-icon.png',
    color: 'bg-green-600'
  },
  'Freemium': {
    name: 'Freemium Tools',
    image: '/freemium-tier-icon.png',
    color: 'bg-blue-600'
  },
  'Paid': {
    name: 'Premium Tools',
    image: '/paid-tier-icon.png',
    color: 'bg-purple-600'
  },
  'Free Trial': {
    name: 'Free Trial Tools',
    image: '/trial-tier-icon.png',
    color: 'bg-orange-600'
  },
  'Active deal': {
    name: 'Special Deals',
    image: '/deal-tier-icon.png',
    color: 'bg-red-600'
  }
};

const CategoryDisplay = () => {
  const [costGroups, setCostGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://ai-tools-iczi.onrender.com/api/aitools-by-cost");
        setCostGroups(response.data.data.costGroups);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center text-white p-8">Loading pricing tiers...</div>;

  return (
    <div className='new'>
      <div className='ele'>
  <header className="text-center mb-16 he1">
    <h1 className="text-4xl font-bold text-white mb-2 he1">
      AI Tools Pricing Tiers
    </h1>
    <p className="text-gray-300 text-lg">
      Explore {costGroups.reduce((sum, group) => sum + group.count, 0)} tools across pricing models
    </p>
  </header>

  {/* Loop through each cost tier and display in row */}
  <div className="row">
    {Object.keys(COST_METADATA).map((costType) => {
      const group = costGroups.find((g) => g._id === costType) || { tools: [] };
      const meta = COST_METADATA[costType];

      return (
        <div key={costType} className="col-12 mb-8 my-3 bg-dark he1 ">
          {/* Cost Tier Container */}
          <div className="bg-neutral-800 rounded-xl p-6 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-400 transition-all duration-300 shadow-lg">
            {/* Cost Tier Header - Highlighted Title */}
            <div className="card-header">
              <h2>{meta.name}</h2>
              <p className="text-gray-400 text-sm mt-1">
                {group.tools?.length || 0} {group.tools?.length === 1 ? 'tool' : 'tools'}
              </p>
            </div>

            {/* Tools List - in Columns (One tool per column in a row) */}
            <div className="row">
              {group.tools?.map((tool) => (
                <div key={tool._id} className="col-12 col-md-4 col-lg-3 mb-4">
                  <a
                    href={tool.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="tool-card p-4 rounded-lg bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 shadow-md hover:shadow-2xl">
                      <div className="flex items-center space-x-4">
                        <img
                          src={tool.aitoolImage}
                          alt={tool.name}
                          className="w-14 h-14 rounded-lg object-cover shadow-sm"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium  transition-colors text-lg">
                            {tool.name}
                          </h3>
                          <div className="flex items-center mt-2 m-1 mb-4">
            
                            <span className={`category-badge ${meta.color}`} >
                              {costType}
                            </span>

                            {tool.category && (
                              <span className="ml-2 text-gray-400 text-xs mx-3 ">
                                {tool.category.split(', ')[0]}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <a href={tool.websiteUrl} target="_blank" className="group-hover:text-blue-400 text-white">
                        Visit Tool
                      </a>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    })}
  </div>
   </div>
</div>

        
  );
};

export default CategoryDisplay;
