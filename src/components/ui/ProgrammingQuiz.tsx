'use client';

import React, { useState, useEffect } from 'react';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
    correct: 0
  },
  {
    question: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "JavaScript", "Java", "C++"],
    correct: 1
  },
  {
    question: "What is the purpose of CSS?",
    options: ["To create databases", "To style web pages", "To write server code", "To create animations"],
    correct: 1
  },
  {
    question: "Which of these is NOT a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    correct: 3
  },
  {
    question: "What does API stand for?",
    options: ["Application Programming Interface", "Advanced Programming Interface", "Automated Programming Interface", "Application Process Integration"],
    correct: 0
  }
];

export default function ProgrammingQuiz({ onExit }: { onExit: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.stopPropagation();
      
      if (showResult) {
        if (e.key.toLowerCase() === 'r') {
          resetQuiz();
        } else if (e.key.toLowerCase() === 'q') {
          onExit();
        }
      } else if (e.key.toLowerCase() === 'q') {
        onExit();
      } else if (!isAnswered && !showResult) {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedOption(prev => prev > 0 ? prev - 1 : 3);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedOption(prev => prev < 3 ? prev + 1 : 0);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          handleAnswer(selectedOption);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress, true);
    return () => window.removeEventListener('keydown', handleKeyPress, true);
  }, [showResult, selectedOption, isAnswered, onExit]);

  // Timer effect
  useEffect(() => {
    if (!isAnswered && !showResult && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      // Time's up - mark as unanswered
      setIsAnswered(true);
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          nextQuestion();
        } else {
          setShowResult(true);
        }
      }, 2000);
    }
  }, [timeLeft, isAnswered, showResult, currentQuestion]);

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        nextQuestion();
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const nextQuestion = () => {
    setCurrentQuestion(prev => prev + 1);
    setSelectedAnswer(null);
    setSelectedOption(0);
    setTimeLeft(30);
    setIsAnswered(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setSelectedOption(0);
    setTimeLeft(30);
    setIsAnswered(false);
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center p-4 bg-black bg-opacity-50 rounded-lg">
        <div className="mb-3 text-green-400 font-bold">Quiz Complete!</div>
        <div className="mb-2 text-green-400">
          Score: {score}/{questions.length} ({percentage}%)
        </div>
        <div className="mb-3 text-green-400 text-sm">
          {percentage >= 80 ? "Excellent! You're a coding master! 🎉" :
           percentage >= 60 ? "Good job! Keep learning! 👍" :
           percentage >= 40 ? "Not bad! Practice makes perfect! 💪" :
           "Keep practicing! You'll get better! 💪"}
        </div>
        <div className="text-green-400 text-sm">
          Press R to try again, Q to exit
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="text-center p-4 bg-black bg-opacity-50 rounded-lg">
      <div className="mb-3 text-green-400 font-bold">
        Programming Quiz - Question {currentQuestion + 1}/{questions.length}
      </div>
      
      <div className="mb-2 text-green-400 text-sm">
        Score: {score} | Time: {timeLeft}s
      </div>
      
      <div className="mb-4 text-green-400">
        {question.question}
      </div>
      
      <div className="space-y-1 mb-4">
        {question.options.map((option, index) => (
          <div
            key={index}
            className="w-full text-left text-sm text-green-400"
          >
            <span className="mr-2">
              {selectedOption === index ? '>' : ' '}
            </span>
            {String.fromCharCode(65 + index)}. {option}
          </div>
        ))}
      </div>
      
      <div className="text-green-400 text-sm mb-4">
        Use ↑/↓ arrows to navigate, Enter to submit, Q to exit
      </div>

      {selectedAnswer !== null && (
        <div className="mt-4 p-3 rounded">
          {selectedAnswer === question.correct ? (
            <div className="text-green-400 font-bold">✓ Correct!</div>
          ) : (
            <div className="text-red-400 font-bold">
              ✗ Wrong! Correct answer: {String.fromCharCode(65 + question.correct)}
            </div>
          )}
        </div>
      )}

      {timeLeft === 0 && !isAnswered && (
        <div className="mt-4 p-3 rounded">
          <div className="text-red-400 font-bold">⏰ Time's up!</div>
        </div>
      )}
    </div>
  );
} 