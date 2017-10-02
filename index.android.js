/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Style from './src/style';
import InputButton from './src/InputButton';
// Define the input button that will be displayed in the calculator

const InputButtons = [
  [1,2,3, '/'],
  [4,5,6, '*'],
  [7,8,9, '-'],
  [0, '.', '=', '+'],
  ['c', 'ce']
];

export default class calculatorApp extends Component {
  
  constructor(props) {
    super(props);

    this.initialState = {
        previousInputValue: 0,
        inputValue: 0,
        selectedSymbol: null
    };

    this.state = this.initialState;
}

  render() {
    return (
      <View style={ Style.rootContainer }>
        <View style={ Style.displayContainer}>
          <Text style={ Style.displayText}>{this.state.inputValue}</Text>
        </View>
        <View style={ Style.inputContainer}>
          {this._renderInputButtons()}
        </View>
      </View>
    );
  }

  _renderInputButtons() {

    let views = [];

    for (var r = 0; r < InputButtons.length; r ++) {
        let row = InputButtons[r];

        let inputRow = [];
        for (var i = 0; i < row.length; i ++) {
            let input = row[i];

            // inputRow.push(
            //     <InputButton value={input}
            //                  onPress={this.onInputButtonPressed.bind(this, input)}
            //                  key={r + "-" + i} />
            // );
            inputRow.push(
              <InputButton
                  value={input}
                  highlight={this.state.selectedSymbol === input }
                  onPress={this._onInputButtonPressed.bind(this, input)}
                  key={r + "-" + i}/>
            );
  
        }
        views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
    }
    return views;
  }

  _onInputButtonPressed(input) {
    //alert(input)
    
    switch (typeof input){
      case 'number':
      //alert(input);
      //alert("this is Number"); 
        //alert(this._handleNumberInput(input));
        return this._handleNumberInput(input)
        
      case 'string':
      //alert("This is String");
        return this._handleNumberInput(input)
    }
  }

  _handleNumberInput(num) {
    let inputValue = (this.state.inputValue * 10) + num;

    this.setState({
        inputValue: inputValue
    });
}

  _handleNumberInput(str){
    switch (str){
      case '/':
      case '*':
      case '+':
      case '-':
        this.setState({
          selectedSymbol: str,
          previousInputValue: this.state.inputValue,
          inputValue: 0
        });
      break;
      case '=':
        let symbol = this.state.selectedSymbol,
            inputValue = this.state.inputValue,
            previousInputValue = this.state.previousInputValue;

        if (!symbol) {
            return;
        }

        this.setState({
            previousInputValue: 0,
            inputValue: eval(previousInputValue + symbol + inputValue),
            selectedSymbol: null
        });
      break;
        case 'ce':
        this.setState(this.initialState);
            break;

    case 'c':
        this.setState({inputValue: 10});
        break;
    }
  }

}


AppRegistry.registerComponent('calculatorApp', () => calculatorApp);
