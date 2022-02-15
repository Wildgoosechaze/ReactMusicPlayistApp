
const clientID = '9893717cff9949409acdbf08d2e0755b'
const redirectURI = 'Isssa-Bop.surge.sh'
let accessToken;



export const Spotify = {

 getAccessToken ()  {
    if(accessToken) {
        return accessToken;
    } 
 
    // check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

    if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
         
        // This clears the paremeters, allows grabbing a new access token when it expires
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken

    } else {
        // redirects user to accessURL
        const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location = accessURL
    }
},

search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        { headers: {
            Authorization: `Bearer ${accessToken}`
        }}).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [] ;
            } 
                return jsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                }))
            }
        )},

        savePlaylist(name,trackURIs) {
        //    checks to make sure both exists
            if(!name || !trackURIs.length ) {
               return;
           } 

//          obtains accessToken
           const accessToken = Spotify.getAccessToken();
           const headers = {
            Authorization: `Bearer ${accessToken}`
           }
           let userID;

//          Create playlist post request
           return fetch('https://api.spotify.com/v1/me', {headers: headers} ) //  GETS user ID
           .then(response =>  
               response.json())
               .then( jsonResponse => {
                   userID = jsonResponse.id
                   return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,     // POST new playlist to user account && Recieves a playlist id for new playlist 
                   {
                       method: 'POST',
                       headers: headers,
                       body: JSON.stringify({name: name}) 
                   })
                   .then(response => response.json())
                    .then(jsonResponse => {
                        const playlistID =jsonResponse.id
                        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,     // POSTs tracks to playlist 
                        {   method: 'POST' ,
                            headers: headers,
                            body: JSON.stringify({
                                uris: trackURIs
                            })
                            

                        }  )
                    })

               
               }
           )
        }
        

            }   //final bracket


        
        
   export default Spotify;     
