import React from "react";

// class Score extends Component {
// constructor(props) {
// super(props);
// this.state = {score: 0}
// }

// increaseScore() {
// this.setState({
// score: this.state.score + 1
// });
// }
// render() {
// return (
// <h1>{this.state.score}</h1>
// <button onClick={this.increaseScore}> +1 </button>
// )

// }

// export default Score;

const Score = props => {

    return (
        <div>
            <h1>Score: {props.score}</h1>
            <h1>Turns: {props.count}</h1>
        </div>
    )
}

export default Score;