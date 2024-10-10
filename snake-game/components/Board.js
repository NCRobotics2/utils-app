import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';

const Board = () => {
  const CELL_SIZE = 20;
  const BOARD_SIZE = 300;
  const INITIAL_SNAKE_LENGTH = 3;
  const INITIAL_SPEED = 300;

  const [snake, setSnake] = useState([]);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState(genFoodPOS());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [snake, gameStarted, speed]);

  const resetGame = () => {
    setSnake([{ x: Math.floor(BOARD_SIZE / 2), y: Math.floor(BOARD_SIZE / 2) }]);
    setDirection('RIGHT');
    setFood(genFoodPOS());
    setScore(0);
    setGameOver(false);
    setSpeed(INITIAL_SPEED);
    setGameStarted(true);
  };

  const moveSnake = () => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = { ...newSnake[0] };
    switch (direction) {
      case 'UP':
        head.y -= CELL_SIZE;
        break;
      case 'DOWN':
        head.y += CELL_SIZE;
        break;
      case 'LEFT':
        head.x -= CELL_SIZE;
        break;
      case 'RIGHT':
        head.x += CELL_SIZE;
        break;
    }

    if (checkifHit(head)) {
      onGameEND();
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setFood(genFoodPOS());
      setScore(score + 1);
      increaseSpeed();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const increaseSpeed = () => {
    setSpeed(speed > 50 ? speed - 10 : 50);
  };

  const onGameEND = () => {
    setGameOver(true);
    setGameStarted(false);
  };

  const checkifHit = (head) => {
    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
      return true;
    }

    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }

    return false;
  };

  function genFoodPOS() {
    const x = Math.floor(Math.random() * (BOARD_SIZE / CELL_SIZE)) * CELL_SIZE;
    const y = Math.floor(Math.random() * (BOARD_SIZE / CELL_SIZE)) * CELL_SIZE;
    return { x, y };
  }

  const renderBoard = () => {
    return (
      <View style={styles.container}>
        {snake.map((segment, index) => (
          <View
            key={index}
            style={[styles.cell, { left: segment.x, top: segment.y, backgroundColor: '#345c1c' }]}
          />
        ))}
        <View style={[styles.cell, { left: food.x, top: food.y, backgroundColor: '#ff0000' }]} />
        {gameOver && (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>Game Over!</Text>
            <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const directionClick = (newDirection) => {
    if (
      (newDirection === 'UP' && direction !== 'DOWN') ||
      (newDirection === 'DOWN' && direction !== 'UP') ||
      (newDirection === 'LEFT' && direction !== 'RIGHT') ||
      (newDirection === 'RIGHT' && direction !== 'LEFT')
    ) {
      setDirection(newDirection);
      setGameStarted(true);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      {renderBoard()}
      {!gameOver && (
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <TouchableOpacity style={styles.directionButton} onPress={() => directionClick('UP')}>
            <Text style={styles.buttonText}>UP</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'column' }}>
            <TouchableOpacity
              style={styles.directionButton}
              onPress={() => directionClick('LEFT')}
            >
              <Text style={styles.buttonText}>LEFT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.directionButton}
              onPress={() => directionClick('RIGHT')}
            >
              <Text style={styles.buttonText}>RIGHT</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => directionClick('DOWN')}
          >
            <Text style={styles.buttonText}>DOWN</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    position: 'relative',
    backgroundColor: '#6CBB3C',
    borderWidth: 1,
    borderColor: '#0b1c01',
    borderStyle: 'solid',
  },
  cell: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#345c1c',
  },
  directionButton: {
    padding: 10,
    backgroundColor: '#2196F3',
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  gameOverContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  restartButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f44336',
    borderRadius: 5,
    marginTop: 20,
  },
});

export default Board;
