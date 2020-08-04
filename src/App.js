import React, { Component } from "react";
import Card from "./components/Card";
import "./App.css";
import Bowser from "./images/bowser.jpg";
import BabyMario from "./images/babymario.jpg";
import Score from "./components/Score";

class App extends Component {
  state = {
    message: "match the cards to win the game",
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
      { flipped: false, image: BabyMario }
    ],
    firstFlip: null,
    secondFlip: null,
    score: 0,
    count: 1
  };

  flipHandler = index => {
    if (this.state.firstFlip == null) {
      let newCards = this.state.cards;
      newCards[index].flipped = true;
      this.increaseCount();
      this.setState({ cards: newCards, firstFlip: index });
    } else if (this.state.secondFlip == null) {
      let newCards = this.state.cards;
      newCards[index].flipped = true;
      this.increaseCount();
      this.setState({ cards: newCards, secondFlip: index });
    }
  };

  //this is a React Lifecycle method - read the docs
  componentDidUpdate() {
    //object destructuring so I don't have to keep typing this.state.
    const { firstFlip, secondFlip, cards } = this.state;

    if (firstFlip != null && secondFlip != null) {
      if (cards[firstFlip].image === cards[secondFlip].image) {
        console.log("its a match");
        this.increaseScore();
        this.setState({ firstFlip: null, secondFlip: null });
      } else if (cards[firstFlip].image !== cards[secondFlip].image) {
        let newCards = this.state.cards;
        this.bugFix(newCards);
      }
    }
    this.winningLogic();
  }

  bugFix = (newCards) => {
    setTimeout(() => {
      newCards[this.state.firstFlip].flipped = false;
      newCards[this.state.secondFlip].flipped = false;
      this.setState({
        cards: newCards,
        firstFlip: null,
        secondFlip: null
      });
    }, 1000)
  }

  winningLogic = () => {
    //write a function that determines a winner (every card is turned over)
    //there's an array method called -every- which you might want to look up.
    //you then need to decided where the best place to call this method is.
  };

  restartHandler = () => {
    for (let i = 0; i < this.state.cards.length; i++) {
      this.setState(state => {
        let newState = JSON.parse(JSON.stringify(state));
        newState.cards[i].flipped = false;
        return {
          cards: newState.cards
        };
      });
    }
    this.setState({ count: 1 })
  };

  increaseScore = () => {
    this.setState({ score: this.state.score + 1 });
  };

  increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count)
    if (this.state.count == 5) {
      alert("GAME OVER");
      this.restartHandler();
    }
  };

  render() {
    return (
      <div className="board">
        <Score score={this.state.score} />
        {this.state.cards.map((card, index) => {
          return (
            <Card
              key={index}
              image={card.image}
              flipped={card.flipped}
              click={() => this.flipHandler(index)}
            />
          );
        })}
        <p> {this.state.message}</p>
        <button onClick={this.restartHandler}>RESTART</button>
      </div>
    );
  }
}

export default App;
