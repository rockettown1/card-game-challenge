import React, { Component } from "react";
import Card from "./components/Card";
import "./App.css";
import Bowser from "./images/bowser.jpg";
import BabyMario from "./images/babymario.jpg";
import Confetti from "./components/Confetti";
import Score from "./components/Score";

class App extends Component {
  state = {
    message: "Match the cards to win the game",
    cards: [
      { flipped: false, image: Bowser },
      { flipped: false, image: BabyMario },
      { flipped: false, image: Bowser },
      { flipped: false, image: BabyMario },
      { flipped: false, image: Bowser },
      { flipped: false, image: BabyMario },
      { flipped: false, image: Bowser },
      { flipped: false, image: BabyMario },
      { flipped: false, image: Bowser },
      { flipped: false, image: BabyMario },
      { flipped: false, image: Bowser },
      { flipped: false, image: BabyMario },
      { flipped: false, image: Bowser },
      { flipped: false, image: BabyMario },
      { flipped: false, image: Bowser },
      { flipped: false, image: BabyMario },
    ],
    firstFlip: null,
    secondFlip: null,
    score: 0,
    count: 24,
    timer: 20,
  };

  intervalID = 0;

  startGame = () => {
    this.intervalID = setInterval(() => {
      this.setState({ timer: this.state.timer - 1 });
    }, 1000);
  };

  flipHandler = (index) => {
    const { firstFlip, secondFlip } = this.state;
    if (firstFlip == null) {
      this.decreaseCount();
      let newCards = this.state.cards;
      newCards[index].flipped = true;
      this.setState({ cards: newCards, firstFlip: index });
    } else if (secondFlip == null) {
      this.decreaseCount();
      let newCards = this.state.cards;
      newCards[index].flipped = true;
      this.setState({ cards: newCards, secondFlip: index });
    }
    this.checkGameWon();
  };

  componentDidUpdate() {
    this.checkGameLost();
    const { firstFlip, secondFlip, cards } = this.state;
    if (firstFlip != null && secondFlip != null) {
      if (cards[firstFlip].image === cards[secondFlip].image) {
        this.increaseScore();
        this.setState({ firstFlip: null, secondFlip: null });
      } else if (cards[firstFlip].image !== cards[secondFlip].image) {
        setTimeout(() => {
          let newCards = this.state.cards;
          cards[firstFlip].flipped = false;
          cards[secondFlip].flipped = false;
          this.setState({ cards: newCards, firstFlip: null, secondFlip: null });
        }, 1000);
      }
    }
  }

  increaseScore = () => {
    this.setState({ score: this.state.score + 1 });
  };

  decreaseCount = () => {
    this.setState({ count: this.state.count - 1 });
    console.log(this.state.count);
  };

  checkGameLost = () => {
    if (this.state.count === 0 || this.state.timer === 0) {
      this.gameOverLogic();
    }
  };

  checkGameWon = () => {
    const checker = this.state.cards.every((cards) => cards.flipped === true);
    if (checker === true) {
      this.winningLogic();
    }
  };

  winningLogic = () => {
    alert("You Win!");
    this.restartHandler();
  };

  gameOverLogic = () => {
    alert("YOU LOST");
    this.restartHandler();
  };

  restartHandler = () => {
    for (let i = 0; i < this.state.cards.length; i++) {
      this.setState((state) => {
        let newState = JSON.parse(JSON.stringify(state));
        newState.cards[i].flipped = false;
        return {
          cards: newState.cards,
        };
      });
    }
    this.setState({
      count: 24,
      score: 0,
      firstFlip: null,
      secondFlip: null,
      timer: 20,
    });
    clearInterval(this.intervalID);
  };

  render() {
    const { score, count, timer, cards, message } = this.state;
    return (
      <div className="board">
        <div className="header">
          <div className="title">
            <h1>MEMORY GAME</h1>
          </div>
          <div className="messages">
            <Score score={score} count={count} timer={timer} />
          </div>
          <button onClick={this.startGame}>START GAME</button>
        </div>
        <div className="mainBody">
          {cards.map((card, index) => {
            return (
              <Card
                key={index}
                image={card.image}
                flipped={card.flipped}
                click={() => this.flipHandler(index)}
              />
            );
          })}
        </div>
        <p> {message} </p>
        <button className="restartButton" onClick={this.restartHandler}>
          RESTART
        </button>
      </div>
    );
  }
}

export default App;
