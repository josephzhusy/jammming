import React, { useState } from "react";
import Tracklist from '../Tracklist/Tracklist'
import './Playlist.module.css'

function Playlist({ playlistName, playlistTracks, onRemove, onSave, onNameChange }) {
    const [name, setName] = useState(playlistName);
    const [message, setMessage] = useState("")
    const handleNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
        onNameChange(newName);
    }

    const handleSave = async () => {
        const trackUris = playlistTracks.map(track => track.uri);
        try {
            await onSave(playlistName, trackUris);
            setMessage("Playlist successfully saved to Spotify!");
            setTimeout(() => {
                setMessage('')
            }, 3000);
        } catch (error) {
            setMessage("Failed to save playlist. Please try again.");
            setTimeout(() => {
                setMessage('')
            }, 3000);
        }
    }

    const handleNameBlur = () => { }
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
            <Tracklist
                tracks={playlistTracks}
                onRemove={onRemove}
                isRemoval={true}
            />
            <button className="Playlist-save" onClick={handleSave}>
                Save to Spotify
            </button>
            {message && (
                <div className="success-message">
                    <p>{message}</p>
                </div>
            )}
        </div>
    )
}

export default Playlist;