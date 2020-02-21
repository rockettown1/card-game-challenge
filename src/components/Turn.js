import React from "react";
import "../styles/Turn.css"

const Turn = (props) => {
    return (
        <div className = "main">
            <p>Lives Left:{props.turn}   Time Played - Minutes:{props.minutes} Seconds:{props.seconds}</p>
        </div>
    )
}

export default Turn;