import React, { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function Calculator() {
  const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);

  const onDigitClick = (digit) => {
    setDisplay((prevDisplay) => prevDisplay === '0' ? String(digit) : prevDisplay + digit);
  };

  const onDecimalClick = () => {
    setDisplay((prevDisplay) => {
      if (!prevDisplay.includes('.')) {
        return prevDisplay === '0' ? '0.' : prevDisplay + '.';
      }
      return prevDisplay;
    });
  };

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
  };

  const applyFunction = (op) => {
    setPrevValue(parseFloat(display));
    setOperator(op);
    setDisplay('0');
  };

  const calculate = () => {
    if (prevValue != null && operator) {
      const currentValue = parseFloat(display);
      let result;
      switch (operator) {
        case '+':
          result = prevValue + currentValue;
          break;
        case '-':
          result = prevValue - currentValue;
          break;
        case '×':
          result = prevValue * currentValue;
          break;
        case '÷':
          result = prevValue / currentValue;
          break;
        default:
          return;
      }
      setDisplay(String(result));
      setPrevValue(null);
      setOperator(null);
    }
  };

  const calcPercent = () => {
    setDisplay((prevDisplay) => {
      const value = parseFloat(prevDisplay);
      return String(value / 100);
    });
  };

  const numberSign = () => {
    setDisplay((prevDisplay) => {
      const value = parseFloat(prevDisplay);
      return String(-value);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{display}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={clear}><Text style={styles.buttonText}>C</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={numberSign}><Text style={styles.buttonText}>+/-</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={calcPercent}><Text style={styles.buttonText}>%</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operator]} onPress={() => applyFunction('÷')}><Text style={styles.buttonText}>÷</Text></TouchableOpacity>
        </View>
        {numbers.map((num, index) => (
          index % 3 === 0 && (
            <View key={index} style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={() => onDigitClick(numbers[index])}><Text style={styles.buttonText}>{numbers[index]}</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => onDigitClick(numbers[index + 1])}><Text style={styles.buttonText}>{numbers[index + 1]}</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => onDigitClick(numbers[index + 2])}><Text style={styles.buttonText}>{numbers[index + 2]}</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.operator]} onPress={() => applyFunction(['×', '-', '+'][Math.floor(index / 3)])}>
                <Text style={styles.buttonText}>
                  {['×', '-', '+'][Math.floor(index / 3)]}
                </Text>
              </TouchableOpacity>
            </View>
          )
        ))}
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.zeroButton]} onPress={() => onDigitClick(0)}><Text style={styles.buttonText}>0</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onDecimalClick}><Text style={styles.buttonText}>.</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operator]} onPress={calculate}><Text style={styles.buttonText}>=</Text></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#000',
    padding: 15,
    marginTop: -85,
  },
  resultText: {
    color: '#fff',
    fontSize: 40,
    textAlign: 'right',
  },
  buttonsContainer: {
    flex: 2,
    backgroundColor: '#2c3e50',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#34495e',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 20,
    borderRadius: 5,
  },
  zeroButton: {
    flex: 2,
  },
  operator: {
    backgroundColor: '#f39c12',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
