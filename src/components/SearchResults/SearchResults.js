import React from "react";
import Tracklist from '../Tracklist/Tracklist';
import './SearchResults.module.css'

function SearchResults({ searchResults, onAdd }) {
    console.log(searchResults);
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist tracks={searchResults} onAdd={onAdd} isRemoval={false} />
        </div>
    )
}

export default SearchResults;