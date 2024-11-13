import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.module.css';

function App() {
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: "Song 1", artist: "Artist 1", album: "Album 1" },
    { id: 2, name: "Song 2", artist: "Artist 2", album: "Album 2" },
    { id: 3, name: "Song 3", artist: "Artist 3", album: "Album 3" }
  ])
  const [playlistName, setPlaylistName] = useState('New Playlist')
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: 4, name: "Playlist Song 1", artist: "Playlist Artist 1", album: "Playlist Album 1", uri: "spotify:track:1" },
    { id: 5, name: "Playlist Song 2", artist: "Playlist Artist 2", album: "Playlist Album 2", uri: "spotify:track:2" }
  ])

  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return
    }
    setPlaylistTracks([...playlistTracks, track]);
  }

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id));
  }
  
  const savePlaylist = () => {
    const trackUris = playlistTracks.map(track => track.uri)
    console.log(`Saving playlist "${playlistName}" with tracks`, trackUris);
    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
  }

  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar />
      <div className='App-main'>
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onSave={savePlaylist}
        />
      </div>
    </div>
  );
}
export default App;
