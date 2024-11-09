import React from "react";
import Tracklist from '../Tracklist/Tracklist'
import './Playlist.module.css'

function Playlist ({playlistName, playlistTracks}) {
    return (
        <div className="Playlist">
            <h2>My Playlist</h2>
            <input value={playlistName} readOnly />
            <Tracklist tracks={playlistTracks}/>
            <button>Save to Spotify</button>
        </div>
    )
}

export default Playlist;