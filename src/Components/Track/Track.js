import React from "react";
import './Track.css'


export class Track extends React.Component {
constructor(props){
  super(props);
  this.addtrack = this.addtrack.bind(this);
  this.removeTrack =this.removeTrack.bind(this);
}

  addtrack() {
    this.props.onAdd(this.props.track)
  }
  
  removeTrack() {
    this.props.onRemove(this.props.track)
  }

renderAction() {
  if(this.props.isRemoval) {
   return <button onClick={this.removeTrack} className="Track-action">remove</button>
  } else if (!this.props.isRemoval) {
    return <button onClick={this.addtrack} className="Track-action">add</button>
  }
}

render() {
 return  <div className="Track">
    <div className="Track-information">
      <h3>{this.props.track.name}</h3>
      <p> {this.props.track.artist} | {this.props.track.album} </p> 
    </div>
    {this.renderAction()}
  </div>
}

};

