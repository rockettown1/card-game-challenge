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
        <h1>{props.score}</h1>
    )
}

export default Score;