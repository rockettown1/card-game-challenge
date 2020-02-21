import React, { Component } from "react";
import Card from "./components/Card";
import "./App.css";
import Bowser from "./images/bowser.jpg";
import BabyMario from "./images/babymario.jpg";
import DK from "./images/DonkeyKong.jpg";
import Luigi from "./images/luigi.jpg";
import Matt from "./images/matt.jpg";
import Waluigi from "./images/waluigi.jpg";
import Wario from "./images/Wario.jpg";
import Yoshi from "./images/yoshi.jpg";
import Reset from "./images/reset.png";
import loseReset from "./images/looseRestart.png";

class App extends Component {
  state = {
    cards: [
      { flipped: false, image: Bowser },
      { flipped: false, image: Luigi },
      { flipped: false, image: Matt },
      { flipped: false, image: BabyMario },
      { flipped: false, image: Yoshi },
      { flipped: false, image: Waluigi },
      { flipped: false, image: Wario },
      { flipped: false, image: Waluigi },
      { flipped: false, image: DK },
      { flipped: false, image: Matt },
      { flipped: false, image: Luigi },
      { flipped: false, image: Bowser },
      { flipped: false, image: Yoshi },
      { flipped: false, image: BabyMario },
      { flipped: false, image: Wario },
      { flipped: false, image: DK }
      
    ],
    firstFlip: null,
    secondFlip: null,
    moves: 2,
    count: 1,
    lose: true
  };

  flipHandler = index => {
    this.setState({count: this.state.count + 1 })
    if(this.state.count%2 === 0){this.setState({moves: this.state.moves - 1 })}
    if (this.state.firstFlip == null) {
      let newCards = this.state.cards;
      newCards[index].flipped = true;
      this.setState({ cards: newCards, firstFlip: index });
    } else if (this.state.secondFlip == null) {
      let newCards = this.state.cards;
      newCards[index].flipped = true;
      this.setState({ cards: newCards, secondFlip: index });
    }
  };

  //this is a React Lifecycle method - read the docs
  componentDidUpdate() {
    if (this.state.moves === 0) {
      setTimeout(() =>{
        this.setState({lose: !this.state.lose, moves: 7})
      },1000) 
    }
    //object destructuring so I don't have to keep typing this.state.
    const { firstFlip, secondFlip, cards } = this.state;
    if (firstFlip != null && secondFlip != null) {
      if (cards[firstFlip].image === cards[secondFlip].image) {
        console.log("its a match");
        this.setState({moves: this.state.moves + 1 })
          this.setState({ firstFlip: null, secondFlip: null });
      } else if (cards[firstFlip].image !== cards[secondFlip].image) {
        let newCards = this.state.cards;
        newCards[firstFlip].flipped = false;
        newCards[secondFlip].flipped = false;
        setTimeout(() => {
          this.setState({ cards: newCards, firstFlip: null, secondFlip: null });
        }, 1000);
        
      }
    }
    this.winningLogic();
  }

  winningLogic = () => {
    //write a function that determines a winner (every card is turned over)
    //there's an array method called -every- which you might want to look up.
    //you then need to decided where the best place to call this method is.
  };

  restart = () => {
    let card = [...this.state.cards]
    for(let i=0; i< card.length; i++){
      card[i].flipped = false
    }
      this.setState({cards: card, lose: !this.state.lose})
  }

  render() {
    return (
      <div className="container">
        <div className="statsWrap">
          <h1>Memory Game</h1>
          <div className="stats">
            <h3>{this.state.moves} Move(s) left</h3>
            <h3>0 mins 0 secs</h3>
            <img onClick={this.restart} className="reset" src={Reset} alt="restart"></img>
          </div>
        </div>
        <div className="board">

          <div className={this.state.lose ? "lose hide" : "lose"}>
            <h2>Your Memory Sucks</h2>
            <img onClick={this.restart} className="loseReset" src={loseReset} alt="restart"></img>
          </div>

          {this.state.cards.map((card, index) => {
            return <Card key={index} image={card.image} flipped={card.flipped} click={() => this.flipHandler(index)} />;
          })}
        </div>
      </div>
    );
  }
}

export default App;
