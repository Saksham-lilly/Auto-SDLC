import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './pages/SearchResults';

const App = () => {
    const [results, setResults] = useState([]);

    const handleSearch = (query) => {
        fetch(`/api/content?q=${query}`)
            .then(response => response.json())
            .then(data => setResults(data))
            .catch(error => console.error('Error fetching search results:', error));
    };

    return (
        <div className="app">
            <h1>Streaming Platform</h1>
            <SearchBar onSearch={handleSearch} />
            <SearchResults results={results} />
        </div>
    );
};

export default App;
