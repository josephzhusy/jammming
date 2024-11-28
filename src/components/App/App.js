import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.module.css';

function App() {
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState('New Playlist')
  const [playlistTracks, setPlaylistTracks] = useState([])

  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return
    }
    setPlaylistTracks([...playlistTracks, track]);
  }

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id));
  }

  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  const savePlaylist = async () => {
    
    const trackUris = playlistTracks.map(track => track.uri)
    try {
      await Spotify.savePlaylist(playlistName, trackUris);
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    } catch (error) {
      console.log('Failed to save playlist')
    }
  }

  const searchSpotify = (term) => {
    Spotify.search(term).then(tracks => setSearchResults(tracks));
  }




  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar onSearch={searchSpotify} />
      <div className='App-main'>
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onSave={savePlaylist}
          onNameChange={setPlaylistName}
        />
      </div>
    </div>
  );
}
export default App;
