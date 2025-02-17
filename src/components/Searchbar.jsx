import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = ({ flats }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    const results = query ? flats.filter(flat =>
      flat.roomDescription.toLowerCase().includes(query.toLowerCase()) ||
      flat.address.toLowerCase().includes(query.toLowerCase())
    ) : [];
    
    setSearchResults(results);
  };

  return (
    <div className="w-full px-6 mt-4 relative">
      <input
        type="text"
        placeholder="🔍 Search for rooms..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-96 p-3 border-2 border-gray-200 rounded-xl shadow-sm 
                 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                 transition-all duration-200"
      />

      {/* Search Results Dropdown */}
      {searchResults.length > 0 && (
        <div className="absolute top-full left-6 right-6 mt-2 bg-white 
                       border border-gray-200 rounded-xl shadow-lg z-50
                       max-h-96 overflow-y-auto">
          {searchResults.map((flat) => (
            <Link
              key={flat._id}
              to={`/flat-details/${flat._id}`}
              className="flex items-center p-4 hover:bg-gray-50 transition-colors"
            >
              <img
                src={`http://localhost:3000/${flat.roomImage}`}
                alt="Room"
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{flat.roomDescription}</h3>
                <p className="text-sm text-gray-600">₹{flat.rentPrice}/month</p>
                <p className="text-sm text-gray-500">{flat.address}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;