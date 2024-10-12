'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, User } from 'lucide-react'
import { Raleway } from 'next/font/google'

const raleway = Raleway({ subsets: ['latin'] })

const questions = [
  "What's your name?",
  "What's your intended major?",
  "What's your biggest academic achievement?",
  "What's a challenge you've overcome?"
]

export default function Orientation() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentQuestionIndex])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() === '') return

    setAnswers([...answers, inputValue])
    setInputValue('')

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  return (
    <div className={`min-h-screen bg-purple-100 flex flex-col ${raleway.className}`}>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <BookOpen className="h-8 w-8 text-purple-400" />
                <span className="ml-2 text-xl font-bold text-purple-600">EssayPro</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-b-2 border-purple-400 text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Orientation
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-purple-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Resources
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-purple-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  About
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <button className="bg-purple-100 p-1 rounded-full text-purple-400 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400">
                <span className="sr-only">View profile</span>
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">College Essay Writing Orientation</h2>
          <p className="text-gray-600 mb-8">
            Welcome to our college essay writing orientation! This friendly process will help us understand your unique background and goals,
            allowing us to provide personalized guidance for your essay writing journey. Let's get started with a few simple questions.
          </p>
          <div className="space-y-6 mb-8">
            <AnimatePresence>
              {answers.map((answer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-gray-600"
                >
                  <p className="font-semibold text-gray-700">{questions[index]}</p>
                  <p>{answer}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {currentQuestionIndex < questions.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-semibold mb-3 text-gray-800 text-lg">{questions[currentQuestionIndex]}</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[100px] resize-y bg-purple-50 text-gray-900 placeholder-gray-400"
                  placeholder="Type your answer here..."
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-purple-400 text-white rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Next
                </button>
              </form>
            </motion.div>
          )}
          {currentQuestionIndex === questions.length && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 font-semibold text-lg"
            >
              Thank you for completing the orientation! We're excited to guide you through your essay writing process.
            </motion.p>
          )}
        </div>
      </div>
    </div>
  )
}