import React, { useState } from "react";
import './SearchBar.module.css'

function SearchBar({ onSearch }) {
    const [term, setTerm] = useState("")
    const handleTermChange = (event) => {
        setTerm(event.target.value);
    };

    const search = () => {
        onSearch(term);
    }
    
    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album or Artist" onChange={handleTermChange} />
            <button className="SearchButton" onClick={search}>Search</button>
        </div>
    )
}

export default SearchBar;