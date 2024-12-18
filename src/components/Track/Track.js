import React from "react";
import "./Track.css"

function Track({ track, onAdd, onRemove, isRemoval }) {
    const handleAdd = () => onAdd(track);
    const handleRemove = () => onRemove(track);
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
                {track.previewUrl ? (
                    <audio controls>
                        <source src={track.previewUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                ): (<p className="no-preview">No preview available</p>)}
            </div>
            {isRemoval ? (<button className="Track-action" onClick={handleRemove}>-</button>) :
                (<button className="Track-action" onClick={handleAdd}>+</button>)}
        </div>
    )
}

export default Track;