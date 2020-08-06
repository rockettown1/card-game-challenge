import React, { Component } from "react";
import Card from "./components/Card";
import "./App.css";
import Bowser from "./images/bowser.jpg";
import BabyMario from "./images/babymario.jpg";
import Wario from "./images/wario.jpg";
import Yoshi from "./images/yoshi.jpg";
import Toad from "./images/toad.jpg";
import DK from "./images/DK.jpg";
import Luigi from "./images/luigi.jpg";
import Peach from "./images/peach.jpg";
import Score from "./components/Score";
import Confetti from "react-dom-confetti";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

class App extends Component {
  state = {
    message: "Match the cards to win the game",
    cards: [
      { flipped: false, image: Luigi },
      { flipped: false, image: Toad },
      { flipped: false, image: Bowser },
      { flipped: false, image: Yoshi },
      { flipped: false, image: Peach },
      { flipped: false, image: Wario },
      { flipped: false, image: Bowser },
      { flipped: false, image: BabyMario },
      { flipped: false, image: DK },
      { flipped: false, image: BabyMario },
      { flipped: false, image: Yoshi },
      { flipped: false, image: Wario },
      { flipped: false, image: Luigi },
      { flipped: false, image: Peach },
      { flipped: false, image: Toad },
      { flipped: false, image: DK },
    ],
    firstFlip: null,
    secondFlip: null,
    score: 0,
    count: 24,
    timer: 20,
    active: false,
    openWinModal: false,
    openLoseModal: false
  }

  intervalID = 0;

  startGame = () => {
    this.intervalID = setInterval(() => {
      this.setState({ timer: this.state.timer - 1 })
      this.checkGameLost()
    }, 1000)
  }

  flipHandler = index => {
    const { firstFlip, secondFlip } = this.state;
    if (firstFlip == null) {
      this.decreaseCount()
      let newCards = this.state.cards
      newCards[index].flipped = true
      this.setState({ cards: newCards, firstFlip: index });
    } else if (secondFlip == null) {
      this.decreaseCount()
      let newCards = this.state.cards
      newCards[index].flipped = true
      this.setState({ cards: newCards, secondFlip: index })
    }
    this.checkGameWon()
  }

  componentDidUpdate() {
    const { firstFlip, secondFlip, cards } = this.state
    if (firstFlip != null && secondFlip != null) {
      if (cards[firstFlip].image === cards[secondFlip].image) {
        this.increaseScore()
        this.setState({ firstFlip: null, secondFlip: null })
      } else if (cards[firstFlip].image !== cards[secondFlip].image) {
        setTimeout(() => {
          let newCards = this.state.cards
          cards[firstFlip].flipped = false
          cards[secondFlip].flipped = false
          this.setState({ cards: newCards, firstFlip: null, secondFlip: null })
        }, 1000)
      }
    }
  }

  increaseScore = () => {
    this.setState({ score: this.state.score + 1 })
  }

  decreaseCount = () => {
    this.setState({ count: this.state.count - 1 })
    console.log(this.state.count)
  }

  checkGameLost = () => {
    if (this.state.count === 0 || this.state.timer === 0) {
      this.setState({ openLoseModal: true })
      clearInterval(this.intervalID)
    }
  }

  checkGameWon = () => {
    const checker = this.state.cards.every(cards => cards.flipped === true);
    if (checker === true) {
      this.setState({ active: true, openWinModal: true })
      clearInterval(this.intervalID)
    }
  }

  restartHandler = () => {
    for (let i = 0; i < this.state.cards.length; i++) {
      this.setState(state => {
        let newState = JSON.parse(JSON.stringify(state))
        newState.cards[i].flipped = false;
        return {
          cards: newState.cards
        }
      })
    }
    this.setState({ count: 24, score: 0, firstFlip: null, secondFlip: null, timer: 20, openWinModal: false, openLoseModal: false })
    clearInterval(this.intervalID)
  }

  render() {
    const { score, count, timer, cards, message, openWinModal, openLoseModal } = this.state;
    return (
      <div className="board">
        <div className="header">
          <div className="title">
            <h1 className='memory'>MEMORY GAME</h1>
          </div>
          <div className="messages">
            <Confetti active={this.state.active} />
            <Score score={score} count={count} timer={timer} />
          </div>
          <button className="start-button" onClick={this.startGame}>START GAME</button>
        </div>
        <Confetti active={this.state.active} />
        <Modal open={openWinModal} onClose={this.restartHandler} center styles={{
          modal: {
            width: "400px",
            height: "300px",
            borderRadius: "15%",
            fontFamily: "'Lemonada', cursive",
            color: "#fff",
            backgroundImage: "url(https://www.snopes.com/tachyon/2015/07/fireworks.png?resize=836,452)",
            animation: `${
              openWinModal ? 'spinIn' : 'spinOut'
              } 2400ms ease-in-out`,
          },
        }}>
          <h2>Winner Winner</h2>
        </Modal>
        <Modal open={openLoseModal} onClose={this.restartHandler} center styles={{
          modal: {
            width: "400px",
            height: "300px",
            borderRadius: "15%",
            fontFamily: "'Lemonada', cursive",
            backgroundImage: "url(https://media1.giphy.com/media/mcH0upG1TeEak/200.gif)",
            backgroundSize: "100% 100%",
            animation: `${
              openLoseModal ? 'spinIn' : 'spinOut'
              } 2400ms ease-in-out`,
          },
        }}>
        </Modal>
        <div className="mainBody">
          {cards.map((card, index) => {
            return (
              <>
                <Confetti active={this.state.active} />
                <Card
                  key={index}
                  image={card.image}
                  flipped={card.flipped}
                  click={() => this.flipHandler(index)}
                />
              </>
            );
          })}
          <Confetti active={this.state.active} />
        </div>
        <p> {message} </p>
        <button className="restartButton" onClick={this.restartHandler}>RESTART</button>
      </div>
    );
  }
}

export default App;