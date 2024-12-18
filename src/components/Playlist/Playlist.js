import React, { useState } from "react";
import Tracklist from '../Tracklist/Tracklist'
import './Playlist.css'

function Playlist({ playlistName, playlistTracks, onRemove, onSave, onNameChange }) {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("")
    const handleNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
        onNameChange(newName);
    }

    const handleSave = async () => {
        if (!name.trim()) {
            setMessage("Please enter a playlist name.");
            setTimeout(() => {
                setMessage('')
            }, 3000);
            return;
        }
        const trackUris = playlistTracks.map(track => track.uri);
        try {
            await onSave(name, trackUris);
            setMessage(`Playlist ${name} successfully saved to Spotify!`);
            setName('');
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
                placeholder="Enter playlist name..."
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