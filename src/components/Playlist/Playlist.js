import React, { useState } from "react";
import Tracklist from '../Tracklist/Tracklist'
import './Playlist.module.css'

function Playlist({ playlistName, playlistTracks, onRemove, onSave}) {
    const [name, setName] = useState(playlistName);
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleNameBlur = () => {

    }
    return (
        <div className="Playlist">
            <h2>My Playlist</h2>
            <input
                className="Playlist-name"
                type="text"
                value={name}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
            />
            <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
            <button className="Playlist-save" onClick={onSave}>Save to Spotify</button>
        </div>
    )
}

export default Playlist;