'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ChevronRight } from 'lucide-react';
import { getProjects } from '@/lib/data';
import SnakeGame from './SnakeGame';
import ProgrammingQuiz from './ProgrammingQuiz';
import { useTheme } from '@/contexts/ThemeContext';

interface ConsoleCommand {
  command: string;
  output: string;
  timestamp: Date;
}

export default function DeveloperConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<ConsoleCommand[]>([]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [previousCommands, setPreviousCommands] = useState<string[]>([]);
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [consoleTheme, setConsoleTheme] = useState<'terminal' | 'retro'>('terminal');
  const inputRef = useRef<HTMLInputElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const projects = getProjects();
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Keyboard shortcut detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+D (Windows/Linux) or Cmd+Shift+D (Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }

      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when console opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const getSystemInfo = () => {
    const userAgent = navigator.userAgent;
    const browser = userAgent.includes('Chrome') ? 'Chrome' : 
                   userAgent.includes('Firefox') ? 'Firefox' : 
                   userAgent.includes('Safari') ? 'Safari' : 'Unknown';
    
    return {
      os: navigator.platform,
      browser,
      screen: `${window.screen.width}x${window.screen.height}`,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      time: new Date().toLocaleTimeString(),
      uptime: Math.floor((Date.now() - performance.timing.navigationStart) / 1000)
    };
  };

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim();
    const cmd = trimmedCommand.toLowerCase();
    let output = '';

    switch (cmd) {
      case 'help':
        output = `Available Commands:
• help     - Show this help message
• whoami   - Display information about me
• ls       - List projects
• cat [project] - Show project details
• clear    - Clear console
• exit     - Close console (or exit game)
• date     - Show current date
• joke     - Tell a programming joke
• fortune  - Show a random fortune
• theme [console|website] [terminal|retro|light|dark|system] - Change themes
• snake    - Play Snake game
• quiz     - Programming quiz`;
        break;

      case 'whoami':
        output = `Kritagya Khandelwal
Software Engineer at Yubi (Indian Fintech Unicorn)
Passionate about AI, Backend Development, and Gaming
"Evolution is randomness seeking betterment" - My self-written quote
Currently exploring Agentic AI and building cool stuff!`;
        break;

      case 'ls':
        output = projects.map(p => `${p.id}/ - ${p.title}`).join('\n');
        break;

      case 'date':
        output = new Date().toString();
        break;

      case 'joke':
        const jokes = [
          'Why do programmers prefer dark mode? Because light attracts bugs!',
          'How many programmers does it take to change a light bulb? None, that\'s a hardware problem!',
          'Why did the programmer quit his job? Because he didn\'t get arrays!',
          'What do you call a programmer from Finland? Nerdic!',
          'Why do Java developers wear glasses? Because they can\'t C#!'
        ];
        output = jokes[Math.floor(Math.random() * jokes.length)];
        break;

      case 'fortune':
        const fortunes = [
          'A bug in the hand is better than one as yet undetected.',
          'You will soon be promoted to senior developer.',
          'The best code is no code at all.',
          'Your next pull request will be approved without comments.',
          'A clean workspace leads to a clean mind.',
          'You will discover a new framework that changes everything.',
          'The tests will pass on the first try.',
          'Your documentation will be praised by the team.',
          'Today is a good day to refactor.',
          'Your code will be featured in a tech blog.'
        ];
        output = fortunes[Math.floor(Math.random() * fortunes.length)];
        break;

      case 'snake':
        setCurrentGame('snake');
        output = 'Snake game started! Use WASD to move, ESC to exit.\nType "exit" to close the game.';
        break;

      case 'quiz':
        setCurrentGame('quiz');
        output = 'Programming Quiz started! Answer the questions.\nType "exit" to close the quiz.';
        break;

      case 'exit':
        if (currentGame) {
          setCurrentGame(null);
          output = 'Game closed.';
        } else {
          setIsOpen(false);
          return;
        }
        break;

      case 'clear':
        setCommandHistory([]);
        return;

      default:
        if (cmd.startsWith('theme ')) {
          const themeArgs = trimmedCommand.split(' ');
          if (themeArgs.length === 1) {
            // No arguments - show current themes
            output = `Current themes:
Console: ${consoleTheme}
Website: ${theme} (resolved: ${resolvedTheme})

Usage: theme [console|website] [terminal|retro|light|dark|system]`;
          } else if (themeArgs.length === 2) {
            // One argument - cycle through themes
            const target = themeArgs[1].toLowerCase();
            if (target === 'console') {
              const themes = ['terminal', 'retro'];
              const currentIndex = themes.indexOf(consoleTheme);
              const nextTheme = themes[(currentIndex + 1) % themes.length];
              setConsoleTheme(nextTheme as 'terminal' | 'retro');
              output = `Console theme changed to: ${nextTheme}`;
            } else if (target === 'website') {
              const websiteThemes = ['light', 'dark', 'system'];
              const currentIndex = websiteThemes.indexOf(theme);
              const nextTheme = websiteThemes[(currentIndex + 1) % websiteThemes.length];
              setTheme(nextTheme as 'light' | 'dark' | 'system');
              output = `Website theme changed to: ${nextTheme} (resolved: ${resolvedTheme})`;
            } else {
              output = `Error: Invalid target. Use 'console' or 'website'`;
            }
          } else if (themeArgs.length === 3) {
            // Two arguments - set specific theme
            const target = themeArgs[1].toLowerCase();
            const newTheme = themeArgs[2].toLowerCase();
            
            if (target === 'console') {
              if (newTheme === 'terminal' || newTheme === 'retro') {
                setConsoleTheme(newTheme as 'terminal' | 'retro');
                output = `Console theme changed to: ${newTheme}`;
              } else {
                output = `Error: Invalid console theme. Use 'terminal' or 'retro'`;
              }
            } else if (target === 'website') {
              if (newTheme === 'light' || newTheme === 'dark' || newTheme === 'system') {
                setTheme(newTheme as 'light' | 'dark' | 'system');
                output = `Website theme changed to: ${newTheme} (resolved: ${resolvedTheme})`;
              } else {
                output = `Error: Invalid website theme. Use 'light', 'dark', or 'system'`;
              }
            } else {
              output = `Error: Invalid target. Use 'console' or 'website'`;
            }
          } else {
            output = `Error: Too many arguments. Usage: theme [console|website] [terminal|retro|light|dark|system]`;
          }
        } else if (cmd.startsWith('cat ')) {
          const projectId = cmd.substring(4);
          const project = projects.find(p => p.id === projectId);
          if (project) {
            output = `Project: ${project.title}
Subtitle: ${project.subtitle}
Description: ${project.description}
Technologies: ${project.technologies.join(', ')}
Category: ${project.category}
Featured: ${project.featured ? 'Yes' : 'No'}`;
          } else {
            output = `Error: Project '${projectId}' not found. Use 'ls' to see available projects.`;
          }
        } else if (cmd) {
          output = `Command not found: ${command}. Type 'help' for available commands.`;
        }
    }

    if (output) {
      setCommandHistory(prev => [...prev, {
        command,
        output,
        timestamp: new Date()
      }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      executeCommand(inputValue);
      setPreviousCommands(prev => [...prev, inputValue]);
      setInputValue('');
      setCommandIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (previousCommands.length > 0) {
        const newIndex = commandIndex < previousCommands.length - 1 ? commandIndex + 1 : 0;
        setCommandIndex(newIndex);
        setInputValue(previousCommands[previousCommands.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex > 0) {
        const newIndex = commandIndex - 1;
        setCommandIndex(newIndex);
        setInputValue(previousCommands[previousCommands.length - 1 - newIndex]);
      } else if (commandIndex === 0) {
        setCommandIndex(-1);
        setInputValue('');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* <MatrixRain /> */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-end justify-center p-4"
          >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`bg-black border rounded-t-lg w-full max-w-4xl flex flex-col ${
              currentGame ? 'h-[600px]' : 'h-96'
            } ${
              consoleTheme === 'terminal' 
                ? 'border-green-500' 
                : 'border-amber-500'
            }`}
          >
            {/* Console Header */}
            <div className={`flex items-center justify-between p-3 border-b ${
              consoleTheme === 'terminal'
                ? 'border-green-500 bg-green-900 bg-opacity-20'
                : 'border-amber-500 bg-amber-900 bg-opacity-20'
            }`}>
              <div className="flex items-center gap-2">
                <Terminal size={16} className={
                  consoleTheme === 'terminal' ? 'text-green-400' : 'text-amber-400'
                } />
                <span className={`font-mono text-sm ${
                  consoleTheme === 'terminal' ? 'text-green-400' : 'text-amber-400'
                }`}>Kritagya's Portfolio Console</span>
              </div>
              <div className={`text-xs ${
                consoleTheme === 'terminal' ? 'text-green-400' : 'text-amber-400'
              }`}>Press ESC to close</div>
            </div>

                         {/* Console Output */}
             <div 
               ref={consoleRef}
               className={`flex-1 p-3 overflow-y-auto font-mono text-sm ${
                 consoleTheme === 'terminal' ? 'text-green-400' : 'text-amber-400'
               }`}
             >
              {/* Welcome Message */}
              {commandHistory.length === 0 && (
                <div className="mb-4">
                  <div className={`mb-2 ${
                    consoleTheme === 'terminal' ? 'text-green-300' : 'text-amber-300'
                  }`}>
                    ╔══════════════════════════════════════════════════════════════╗
                  </div>
                  <div className={`mb-2 ${
                    consoleTheme === 'terminal' ? 'text-green-300' : 'text-amber-300'
                  }`}>
                    ║                    KRITAGYA'S PORTFOLIO v2.0                ║
                  </div>
                  <div className={`mb-2 ${
                    consoleTheme === 'terminal' ? 'text-green-300' : 'text-amber-300'
                  }`}>
                    ║                    ================================          ║
                  </div>
                  <div className={`mb-2 ${
                    consoleTheme === 'terminal' ? 'text-green-300' : 'text-amber-300'
                  }`}>
                    ║                                                              ║
                  </div>
                  <div className={`mb-2 ${
                    consoleTheme === 'terminal' ? 'text-green-300' : 'text-amber-300'
                  }`}>
                    ║  System Information:                                         ║
                  </div>
                  {(() => {
                    const sysInfo = getSystemInfo();
                    return (
                      <>
                        <div className={`mb-2 ${
                          consoleTheme === 'terminal' ? 'text-green-300' : 'text-amber-300'
                        }`}>
                          ║  • OS: {sysInfo.os}                                     ║
                        </div>
                        <div className={`mb-2 ${
                          consoleTheme === 'terminal' ? 'text-green-300' : 'text-amber-300'
                        }`}>
                          ║  • Browser: {sysInfo.browser}                           ║
                        </div>
                        <div className={`mb-2 ${
                          consoleTheme === 'terminal' ? 'text-green-300' : 'text-amber-300'
                        }`}>
                          ║  • Screen: {sysInfo.screen}                             ║
                        </div>
                        <div className={`mb-2 ${
                          consoleTheme === 'terminal' ? 'text-green-300' : 'text-amber-300'
                        }`}>
                          ║  • Theme: {sysInfo.theme}                               ║
                        </div>
                        <div className={`mb-2 ${
                          consoleTheme === 'terminal' ? 'text-green-300' : 'text-amber-300'
                        }`}>
                          ║  • Time: {sysInfo.time}                                 ║
                        </div>
                        <div className={`mb-2 ${
                          consoleTheme === 'terminal' ? 'text-green-300' : 'text-amber-300'
                        }`}>
                          ║                                                              ║
                        </div>
                        <div className={`mb-2 ${
                          consoleTheme === 'terminal' ? 'text-green-300' : 'text-amber-300'
                        }`}>
                          ║  Available Commands: help, whoami, ls, cat, clear, exit     ║
                        </div>
                        <div className={`mb-2 ${
                          consoleTheme === 'terminal' ? 'text-green-300' : 'text-amber-300'
                        }`}>
                          ║  Navigation: ↑/↓ arrows for command history, ESC to close  ║
                        </div>
                        <div className={`mb-2 ${
                          consoleTheme === 'terminal' ? 'text-green-300' : 'text-amber-300'
                        }`}>
                          ║                                                              ║
                        </div>
                        <div className={`mb-2 ${
                          consoleTheme === 'terminal' ? 'text-green-300' : 'text-amber-300'
                        }`}>
                          ╚══════════════════════════════════════════════════════════════╝
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

                             {/* Command History */}
               {commandHistory.map((cmd, index) => (
                 <div key={index} className="mb-2">
                   <div className="flex items-center gap-2 mb-1">
                     <ChevronRight size={12} className={
                       consoleTheme === 'terminal' ? 'text-green-500' : 'text-amber-500'
                     } />
                     <span className={
                       consoleTheme === 'terminal' ? 'text-green-300' : 'text-amber-300'
                     }>{cmd.command}</span>
                   </div>
                   <div className={`ml-4 whitespace-pre-line ${
                     consoleTheme === 'terminal' ? 'text-green-400' : 'text-amber-400'
                   }`}>
                     {cmd.output}
                   </div>
                 </div>
               ))}

               {/* Games */}
               {currentGame === 'snake' && (
                 <div className="mt-4 flex justify-center">
                   <SnakeGame onExit={() => setCurrentGame(null)} />
                 </div>
               )}

               {currentGame === 'quiz' && (
                 <div className="mt-4">
                   <ProgrammingQuiz onExit={() => setCurrentGame(null)} />
                 </div>
               )}
            </div>

            {/* Console Input */}
            <form onSubmit={handleSubmit} className={`p-3 border-t ${
              consoleTheme === 'terminal' ? 'border-green-500' : 'border-amber-500'
            }`}>
              <div className="flex items-center gap-2">
                <ChevronRight size={16} className={
                  consoleTheme === 'terminal' ? 'text-green-500' : 'text-amber-500'
                } />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`flex-1 bg-transparent font-mono text-sm outline-none ${
                    consoleTheme === 'terminal' ? 'text-green-400' : 'text-amber-400'
                  }`}
                  placeholder="Type a command..."
                  autoComplete="off"
                />
                <div className={`w-2 h-4 animate-pulse ${
                  consoleTheme === 'terminal' ? 'bg-green-400' : 'bg-amber-400'
                }`}></div>
              </div>
            </form>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 