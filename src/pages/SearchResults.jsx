import React from 'react';
import PropTypes from 'prop-types';

const SearchResults = ({ results }) => {
    return (
        <div className="search-results">
            <h2>Search Results</h2>
            {results.length > 0 ? (
                <ul>
                    {results.map((result, index) => (
                        <li key={index}>
                            <h3>{result.title}</h3>
                            <p>Genre: {result.genre}</p>
                            <p>Actors: {result.actors.join(', ')}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

SearchResults.propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        actors: PropTypes.arrayOf(PropTypes.string).isRequired,
    })).isRequired,
};

export default SearchResults;
