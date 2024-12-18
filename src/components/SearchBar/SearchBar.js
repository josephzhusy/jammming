import React, { useState } from "react";
import './SearchBar.css'

function SearchBar({ onSearch }) {
    const [term, setTerm] = useState("")
    const [isKeyPressed, setIsKeyPressed] = useState(false)
    const handleTermChange = (event) => {
        setTerm(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setIsKeyPressed(true)
            onSearch(term)
            setTimeout(() => setIsKeyPressed(false), 200)
        }
    }
    const search = () => {
        onSearch(term);
    }
    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album or Artist" onChange={handleTermChange} onKeyDown={handleKeyDown} />
            <button className={`SearchButton ${isKeyPressed ? 'pressed': ''}`} onClick={search}>Search</button>
        </div>
    )
}

export default SearchBar;