import React from "react";
import "./Track.module.css"

function Track ({name, artist, album}) {
    return (
        <div className="Track">
            <p>{name} - {artist} - {album}</p>
            <button>+</button>
        </div>
    )
}

export default Track;