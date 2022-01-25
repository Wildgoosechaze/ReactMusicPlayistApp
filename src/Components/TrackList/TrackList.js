import React from "react";
import './TrackList.css'

export class TrackList extends React.Component {
    render() {
        return <div className="TrackList">
        {this.props.tracks.map((el,ind,arr)=>{
            return el;
        })}
        <h4>Big Fish</h4>
        <h3>Bigger Fish</h3>
        <h1>Biggest Fishhh</h1>
    </div>
    }
}



