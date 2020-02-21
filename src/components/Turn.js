import React from "react";

const Turn = (props) => {
    return (
        <div>
            <p>Lives Left:{props.turn}   Time Played - Minutes:{props.minutes} Seconds:{props.seconds}</p>
        </div>
    )
}

export default Turn;