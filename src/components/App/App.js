import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';


function App() {
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState('New Playlist')
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      await Spotify.savePlaylist(playlistName, trackUris);
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    } catch (error) {
      console.log('Failed to save playlist')
    }finally{
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    }
  }

  const searchSpotify = (term) => {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) {
      setErrorMessage('Please enter a search term.')
      return
    }
    setErrorMessage('');
    setShowResults(true);
    Spotify.search(term).then(tracks => {
      const filteredResults = tracks.filter(
        track => !playlistTracks.some(playlistTracks => playlistTracks.id === track.id)
      )
      if(tracks.length !== filteredResults.length){
        setInfoMessage('Some tracks were excluded because they are already in your playlist.')
      }else{
        setInfoMessage('');
      }
      setSearchResults(filteredResults);
    });
  }

  useEffect(() => {
    if (searchResults.length === 0) {
      setShowResults(false);
    }
  }, [searchResults])


  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar onSearch={searchSpotify} />
      {errorMessage && <p className='error-message'> {errorMessage}</p>}
      {infoMessage && <p className="info-message">{infoMessage}</p>}
      {isLoading && <div className='loading-screen'>Saving Playlist...</div>}
      {showResults &&
        <div className='App-main'>
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onSave={savePlaylist}
            onNameChange={setPlaylistName}
          />
        </div>}
    </div>
  );
}
export default App;