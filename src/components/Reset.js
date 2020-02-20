import React from "react";
import "../styles/Reset.css"

const Reset = (props) => {
    return (
        <div className = "reset">
            <button onClick = {props.reset}>RESET</button>
        </div>
    )
}

export default Reset;