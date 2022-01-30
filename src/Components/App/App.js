import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {Playlist} from '../Playlist/Playlist';
import {SearchResults} from '../SearchResults/SearchResults';
import React from 'react';
import {Spotify} from '../../util/Spotify';

export class App extends React.Component {
// App constructor and bindings
  constructor(props) {
  super(props);
  
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack =this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);

  this.state = {
    searchResults: [
    {name: 'name1', artist: 'artist1', album: 'album1', id: 1}, 
    {name: 'name2', artist: 'artist2', album: 'album2', id: 2},
    {name: 'name3', artist: 'artist3', album: 'album3', id: 3}
  ],
  playlistName : 'My Playlist',
  playlistTracks : [
    {name: 'playlistName1', artist: 'playlistArtist1', album: 'playlistAlbum1', id: 4}, 
    {name: 'playlistName2', artist: 'playlistArtist2', album: 'playlistAlbum2', id: 5},
    {name: 'playlistName3', artist: 'playlistArtist3', album: 'playlistAlbum3', id: 6}

  ]
}
}
// App Methods

search(term) {
Spotify.search(term).then(searchResults => {
  this.setState({ searchResults: searchResults })
})
}

savePlaylist() {
// alert('button works alert')
  let trackURIs = [];
  trackURIs = this.props.playlistTracks.map(track => track.uri)
  return trackURIs
}

updatePlaylistName(name) {
this.setState({playlistName: name});
}

removeTrack(track) {
  let tracks = this.state.playlistTracks;
  tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)

  this.setState({playlistTracks: tracks})
}

addTrack(track) {
  let tracks = this.state.playlistTracks
  if (tracks.find(savedTrack => savedTrack.id === track.id)) {
    return;
  };

  tracks.push(track);

  this.setState({playlistTracks : tracks });
}

// App render function

render() {
  return    <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch ={this.search} />
    <div className="App-playlist">
      <SearchResults onAdd={this.addTrack}  
                    searchResults={this.state.searchResults} />
      <Playlist playlistTracks={this.state.playlistTracks} 
                playlistName={this.state.playlistName} 
                searchResults={this.state.searchResults}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist} />   
      </div>
  </div>
</div>
    
}


}
export default App;
