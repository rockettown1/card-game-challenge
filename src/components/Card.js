import React from "react";
import ReactCardFlip from "react-card-flip";
import "../styles/card.css";

const Card = props => {
  return (
    //ReactCardFlip is a component imported from a third party module.
    //Check out https://www.npmjs.com/package/react-card-flip if you need more info on usage
    <ReactCardFlip isFlipped={props.flipped} flipDirection="horizontal">
      <div className="card-front" onClick={props.click}>
        {/* <p>click to turn</p> */}
      </div>

      <div className="card-back">
        <img className="card-image" src={props.image} />
      </div>
    </ReactCardFlip>
  );
};

export default Card;
