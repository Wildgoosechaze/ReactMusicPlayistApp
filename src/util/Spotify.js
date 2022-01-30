
const clientID = '9893717cff9949409acdbf08d2e0755b'
const redirectURI = 'http://localhost:3000/'
let accessToken;



const Spotify = {

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
}

}

export default Spotify;