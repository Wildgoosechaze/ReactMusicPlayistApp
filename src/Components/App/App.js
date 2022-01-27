import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {Playlist} from '../Playlist/Playlist';
import {SearchResults} from '../SearchResults/SearchResults';
import React from 'react';


export class App extends React.Component {
constructor(props) {
  super(props);
  this.addTrack = this.addTrack.bind(this)
  this.state = {
    searchResults: [
    {name: 'name1', artist: 'artist1', album: 'album1', id: 1}, 
    {name: 'name2', artist: 'artist2', album: 'album2', id: 2},
    {name: 'name3', artist: 'artist3', album: 'album3', id: 3}
  ],
  playlistName : 'Newwish Playlist',
  playlistTracks : [
    {name: 'track1', artist: 'trackArtist1', album: 'trackAlbum1', id: 4}, 
    {name: 'track2', artist: 'trackArtist2', album: 'trackAlbum2', id: 5},
    {name: 'track3', artist: 'trackArtist3', album: 'trackAlbum3', id: 6}

  ]
}
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

render() {
  return    <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar />
    <div className="App-playlist">
      <SearchResults onAdd={this.addTrack}  
                    searchResults={this.state.searchResults} />
      <Playlist playlistTracks={this.state.playlistTracks} 
                playlistName={this.state.playlistName} 
                searchResults={this.state.searchResults}/>   
      </div>
  </div>
</div>
    
}


}
export default App;
