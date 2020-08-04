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
    count: 24
  };

  flipHandler = index => {
    if (this.state.firstFlip == null) {
      this.decreaseCount();
      let newCards = this.state.cards;
      newCards[index].flipped = true;
      this.setState({ cards: newCards, firstFlip: index });
    } else if (this.state.secondFlip == null) {
      this.decreaseCount();
      let newCards = this.state.cards;
      newCards[index].flipped = true;
      this.setState({ cards: newCards, secondFlip: index });
    }
    this.checkGameWon();
  };

  componentDidUpdate() {
    const { firstFlip, secondFlip, cards } = this.state;

    if (firstFlip != null && secondFlip != null) {
      if (cards[firstFlip].image === cards[secondFlip].image) {
        this.increaseScore();
        this.setState({ firstFlip: null, secondFlip: null });
      } else if (cards[firstFlip].image !== cards[secondFlip].image) {
        let newCards = this.state.cards;
        this.secondFlipShown(newCards);
      }
    }
    this.checkGameLost();
  }

  secondFlipShown = (newCards) => {
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

<<<<<<< HEAD
  isCardMatch = (card1, card2, card1Id, card2Id) => {
    if (card1 === card2) {
      const hideCard = this.state.shuffledCard.slice();
      hideCard[card1Id] = -1;
      hideCard[card2Id] = -1;
      setTimeout(() => {
        this.setState(prevState => ({
          shuffledCard: hideCard
        }))
      }, 1000);
    } else {
      const flipBack = this.state.isFlipped.slice();
      flipBack[card1Id] = false;
      flipBack[card2Id] = false;
      setTimeout(() => {
        this.setState(prevState => ({ isFlipped: flipBack }));
      }, 1000);
    }
  };

=======
  increaseScore = () => {
    this.setState({ score: this.state.score + 1 });
  };

  decreaseCount = () => {
    this.setState({ count: this.state.count - 1 });
    console.log(this.state.count)
  };

  checkGameLost = () => {
    if (this.state.count === 0) {
      this.setState({ firstFlip: null, secondFlip: null })
      this.gameOverLogic();
    }
  }

  checkGameWon = () => {
    const checker = this.state.cards.every(cards => cards.flipped === true);
    if (checker === true) {
      this.winningLogic();
    }
  }
>>>>>>> 1048b88d21945692ebad0c37d7ee39fc1b9d6744

  winningLogic = () => {
    prompt('You Win!')
    this.restartHandler();
  };

  gameOverLogic = () => {
    prompt("YOU LOST")
    this.restartHandler();
  }

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
    this.setState({ count: 24, score: 0 })
  };

  render() {
    return (
      <div className="board">
        <Score score={this.state.score} count={this.state.count} />
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
        <p> {this.state.message} </p>
        <button onClick={this.restartHandler}>RESTART</button>
      </div>
    );
  }
}

export default App;
