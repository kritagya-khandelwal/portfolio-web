'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

export default function SnakeGame({ onExit }: { onExit: () => void }) {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<string>('right');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);

  const GRID_SIZE = 20;
  const CELL_SIZE = 15;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Prevent event bubbling to avoid conflicts with console
      e.stopPropagation();
      
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          setDirection(prev => prev !== 'down' ? 'up' : prev);
          break;
        case 's':
        case 'arrowdown':
          setDirection(prev => prev !== 'up' ? 'down' : prev);
          break;
        case 'a':
        case 'arrowleft':
          setDirection(prev => prev !== 'right' ? 'left' : prev);
          break;
        case 'd':
        case 'arrowright':
          setDirection(prev => prev !== 'left' ? 'right' : prev);
          break;
        case 'escape':
        case 'q':
          e.preventDefault();
          onExit();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress, true); // Use capture phase
    return () => window.removeEventListener('keydown', handleKeyPress, true);
  }, [onExit]);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        switch (direction) {
          case 'up':
            head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'down':
            head.y = (head.y + 1) % GRID_SIZE;
            break;
          case 'left':
            head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'right':
            head.x = (head.x + 1) % GRID_SIZE;
            break;
        }

        // Check collision with self
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);

        // Check if food is eaten
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 10);
          setFood({
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [direction, food, gameOver]);

  return (
    <div className="text-center p-4 bg-black bg-opacity-50 rounded-lg">
      <div className="mb-3 text-green-400 font-bold">Snake Game - Score: {score}</div>
      <div className="mb-3 text-green-400 text-xs">Use WASD to move, ESC to exit, Q to quit</div>
      
      <div 
        ref={gameRef}
        className="border-2 border-green-500 mx-auto mb-3 bg-black"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
          position: 'relative',
          maxWidth: '100%',
          maxHeight: '60vh'
        }}
      >
        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-green-400"
            style={{
              width: CELL_SIZE - 1,
              height: CELL_SIZE - 1,
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE
            }}
          />
        ))}
        
        {/* Food */}
        <div
          className="absolute bg-red-400"
          style={{
            width: CELL_SIZE - 1,
            height: CELL_SIZE - 1,
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE
          }}
        />
      </div>

      {gameOver && (
        <div className="text-red-400 mb-3 font-bold">
          Game Over! Final Score: {score}
        </div>
      )}
      

    </div>
  );
} 