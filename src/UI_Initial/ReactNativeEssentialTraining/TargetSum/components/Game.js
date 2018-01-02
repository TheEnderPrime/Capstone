import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet, Button } from 'react-native';
import {shuffle} from 'lodash'

import RandomNumber from './RandomNumber'



class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
  };
  
  state = {
      selectedIds: [], 
      remainingSeconds: this.props.initialSeconds,
  };

  gameStatus = 'PLAYING';

  randomNumbers = Array
            .from({ length: this.props.randomNumberCount })
            .map(() => 1 + Math.floor(10 * Math.random()));
          target = this.randomNumbers
            .slice(0, this.props.randomNumberCount - 2)
            .reduce((acc, curr) => acc + curr, 0);
          shuffledRandomNumbers = shuffle(this.randomNumbers);

  componentDidMount() {
    this.intervalId = setInterval(() => { 
      this.setState((prevState) => {
        return { remainingSeconds : prevState.remainingSeconds -1};
      }, () => {
        if (this.state.remainingSeconds === 0) {
          clearInterval(this.intervalId);
        }
      });
    }, 1000);
  } 
  
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;  
  };

  selectNumber = (numberIndex) => {
    this.setState((prevState) => ({ 
      selectedIds: [...prevState.selectedIds, numberIndex] 
    }));
  }

  componentWillUpdate(nextProps, nextState) {
    if(
        nextState.selectedIds !== this.state.selectedId || 
        nextState.remainingSeconds === 0
    ) {
      this.gameStatus = this.calcGameStatus(nextState); 
      if (this.gameStatus !== 'PLAYING') {
        clearInterval(this.intervalId);
      }
    }
  }

// gameStatus: Playing, Won, Lost
  calcGameStatus = (nextState) => {
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
      return acc + this.shuffledRandomNumbers[curr];
    }, 0);
    if(nextState.remainingSeconds === 0) {
      return 'LOST';
    }
    if(sumSelected < this.target) {
      return 'PLAYING';
    }
    if (sumSelected === this.target) {
      return 'WON';
    }
    if (sumSelected > this.target) {
      return 'LOST';
    }
    //console.warn(sumSelected);
  };

  render() {
    const gameStatus = this.gameStatus;
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this.shuffledRandomNumbers.map((randomNumber, index) => ( 
            <RandomNumber 
              key={index} 
              id={index}
              number={randomNumber} 
              isDisabled = {
                this.isNumberSelected(index) || gameStatus !== 'PLAYING'
              }
              onPress = {this.selectNumber}
            />
          ))}
        </View>
        {this.gameStatus !== 'PLAYING' && (
          <Button title="Play Again"  onPress={this.props.onPlayAgain}/>
        )}
        <Text>{this.state.remainingSeconds}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
  },

  target: {
    fontSize: 50,
    backgroundColor: '#bbb',
    margin: 50,
    textAlign: 'center',
  },

  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  random: {
    backgroundColor: '#999',
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },

  STATUS_PLAYING: {
    backgroundColor: '#bbb',
  },

  STATUS_WON: {
    backgroundColor: 'green',
  },

  STATUS_LOST: {
    backgroundColor: 'red',
  },
});

export default Game;
