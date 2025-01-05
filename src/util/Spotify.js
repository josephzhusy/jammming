const clientId = '30bbd4c29a35431bbda8ee5bd2e53d5a';
const redirectUri = 'http://localhost:3000/';
let accessToken;
let expirationTime;

const Spotify = {
    getAccessToken() {

        if (accessToken && new Date().getTime() < expirationTime) {
            return accessToken;
        }


        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {

            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            expirationTime = new Date().getTime() + expiresIn * 1000;

            window.history.pushState("Access Token", null, "/");
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
            return;
        }
    },

    async search(term) {
        const accessToken = Spotify.getAccessToken();
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;

        try {
            const response = await fetch(endpoint, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch tracks');
            }

            const jsonResponse = await response.json();
            if (!jsonResponse.tracks) {
                return [];
            }

            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                previewUrl: track.preview_url,
            }));

        } catch (error) {
            console.error('Error fetching tracks:', error);
            return [];
        }
    },

    async savePlaylist(playlistName, trackUris) {
        if (!playlistName || !trackUris.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json'
        };

        try {

            const userResponse = await fetch('https://api.spotify.com/v1/me', { headers });

            if (!userResponse.ok) {
                throw new Error('Failed to fetch user ID');
            }

            const userJson = await userResponse.json();
            const userId = userJson.id;


            const createPlaylistResponse = await fetch(
                `https://api.spotify.com/v1/users/${userId}/playlists`,
                {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        name: playlistName,
                        description: 'Playlist created with Jammming!',
                    }),
                }
            );

            if (!createPlaylistResponse.ok) {
                throw new Error('Failed to create a new playlist');
            }

            const playlistJson = await createPlaylistResponse.json();
            const playlistId = playlistJson.id;

            
            const addTracksResponse = await fetch(
                `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({ uris: trackUris }),
                }
            );

            if (!addTracksResponse.ok) {
                throw new Error('Failed to add tracks to the playlist');
            }

            console.log('Playlist saved successfully!');
        } catch (error) {
            console.error('Error saving playlist:', error);
        }
    }
};

export default Spotify;