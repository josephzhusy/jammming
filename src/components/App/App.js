import React, { useState }from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.module.css';

function App() {
  const [searchResults, setSearchResults] = useState([
    {id: 1, name: "Song 1", artist: "Artist 1", album: "Album 1"},
    {id: 2, name: "Song 2", artist: "Artist 2", album: "Album 2"},
    {id: 3, name: "Song 3", artist: "Artist 3", album: "Album 3"}
  ])
  const [playlistName, setPlaylistName] = useState('New Playlist')
  const [playlistTracks, setPlaylistTracks] = useState([
    {id: 4, name: "Playlist Song 1", artist: "Playlist Artist 1", album: "Playlist Album 1" },
    {id: 5, name: "Playlist Song 2", artist: "Playlist Artist 2", album: "Playlist Album 2" }
  ])
  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar />
      <div className='App-main'>
        <SearchResults searchResults={searchResults} />
        <Playlist 
          playlistName={playlistName} 
          playlistTracks={playlistTracks}
          />
      </div>
    </div>
  );
}
export default App;
