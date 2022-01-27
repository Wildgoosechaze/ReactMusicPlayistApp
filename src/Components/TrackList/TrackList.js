import React from "react";
import { Track } from "../Track/Track";
import './TrackList.css'


export class TrackList extends React.Component {
    render() {
    // console.log(this.props.tracks)
        return(
            <div className="TrackList">
        {
          this.props.tracks.map((track) => {
            return <Track isRemoval={true}
                          onAdd={this.props.onAdd}
                          onRemove={this.props.onRemove} 
                          track={track} 
                          key={track.id} />;
          })}
      </div>
        )
    }
}

export default TrackList;


