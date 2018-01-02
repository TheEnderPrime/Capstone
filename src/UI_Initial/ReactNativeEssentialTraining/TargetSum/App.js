import React, { Component } from 'react';
import Game from './components/Game';

export default class App extends React.Component {
  
  state = {
    gameId: 1,
  };

  resetGame = () => {
    this.setState((prevState) => {
      return {gameId: prevState.gameId +1 };
    });
  };

  render() {
    return (
        <Game 
          key={this.state.gameId} 
          onPlayAgain={this.resetGame}
          randomNumberCount={6} 
          initialSeconds={10} 
        />
    );
  }
}

//TODO
//make the game harder-change these next 2 variables down the line
//keep score
//allow unselect