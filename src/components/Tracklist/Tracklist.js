import React from "react";
import Track from '../Track/Track';
import "./Tracklist.css"

function Tracklist({ tracks, onAdd, onRemove, isRemoval }) {
    console.log(tracks)
    return (
        <div className="Tracklist">
            {tracks.map((track) => (
                <Track
                    key={track.id}
                    track={track}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    isRemoval={isRemoval}
                />
            ))}
        </div>
    )
}
export default Tracklist;
