"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Progress } from './ui/progress'
import owlImage from '../../src/assets/images/owl.png'
import { useNavigate } from 'react-router-dom'

const TOTAL_QUESTIONS = 16

// Define the type for questions with response
type QuestionWithResponse = {
  question: string
  response: string
}

const baseQuestions: string[] = [
  "Tell me about yourself.",
  "What are your aspirations after highschool?",
  "Do you participate in any extracurricular activities? Tell me about them.",
  "What do you intend to major in?"
]

export default function Orientation() {
  const [questions, setQuestions] = useState<string[]>(baseQuestions)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [displayedQuestion, setDisplayedQuestion] = useState('')
  const [continueAsking, setContinueAsking] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      const docHeight = document.documentElement.scrollHeight

      const isNearBottom = true; //scrollTop + windowHeight >= docHeight - 10000

      if (isNearBottom) {
        window.scrollTo({
          top: docHeight,
          behavior: 'smooth',
        })
      }
    }

    handleScroll()
  }, [answers])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentQuestionIndex])

  useEffect(() => {
    setProgress((currentQuestionIndex / TOTAL_QUESTIONS) * 100)
  }, [currentQuestionIndex])

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= questions[currentQuestionIndex].length) {
        setDisplayedQuestion(questions[currentQuestionIndex].slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 25)

    return () => clearInterval(interval)
  }, [currentQuestionIndex, questions])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() === '') return

    setAnswers([...answers, inputValue])
    setInputValue('')

    const nextIndex = currentQuestionIndex + 1

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex)
    } else if (continueAsking && !isFetching) {
      await fetchNextQuestion()
    }
  }

  const fetchNextQuestion = async () => {
    setIsFetching(true)
    try {
      const list_of_questions: QuestionWithResponse[] = answers.map((answer, index) => ({
        question: questions[index] ?? 'Question?',
        response: answer,
      }))
      const response = await fetch('/generate_question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ list_of_questions }),
      })

      if (!response.ok) {
        console.error('Failed to fetch next question')
        setIsFetching(false)
        return
      }

      const data = await response.json()

      if (data.continue && data.question) {
        setQuestions((prev) => [...prev, data.question])
        setCurrentQuestionIndex((prev) => prev + 1)
      } else {
        setContinueAsking(false)
      }
    } catch (error) {
      console.error('Error fetching next question:', error)
    } finally {
      setTimeout(() => setIsFetching(false), 40)
    }
  }

  // Check if the current question is enclosed in curly braces
  const isFinalMessage = questions[currentQuestionIndex]?.trim().startsWith('{')
  const finalMessage = isFinalMessage
    ? questions[currentQuestionIndex].match(/\{(.+?)\}/)?.[1] || ''
    : ''

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-lg shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">
          College Essay Quickstart
        </h2>
        <p className="text-gray-600 mb-8">
          Welcome to our college essay writing orientation! This process will help us understand your background and goals.
        </p>
        <div className="mb-8">
          <Progress value={progress} className="w-full" />
        </div>
        <div className="space-y-6 mb-8">
          <AnimatePresence>
            {answers.map((answer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-purple-50 p-4 rounded-lg"
              >
                <p className="font-semibold text-purple-700 mb-2">
                  {questions[index]}
                </p>
                <p className="text-gray-700">{answer}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {isFinalMessage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-2xl font-bold text-gray-800 mb-6">{finalMessage}</p>
            <button
              onClick={() => navigate('/essay-editor')}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Start Writing
            </button>
          </motion.div>
        ) : currentQuestionIndex < questions.length ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-3">
              <div className="flex-shrink-0 mr-2">
                <img src={owlImage} alt="Custom Icon" className="h-9 w-9" />
              </div>
              <p className="font-semibold text-gray-800 text-lg">
                {isFetching ? '...' : displayedQuestion}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
                className="w-full px-4 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px] resize-y bg-purple-50 text-gray-900 placeholder-gray-400 transition duration-300 ease-in-out"
                placeholder="Type your answer here..."
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
              >
                <span>Next</span>
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <p className="text-green-600 font-semibold text-lg mb-4">
              Thank you for completing the orientation!
            </p>
            <button
              onClick={() => {
                setCurrentQuestionIndex(0)
                setAnswers([])
                setQuestions(baseQuestions)
                setContinueAsking(true)
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Start Over
            </button>
          </motion.div>
        )}

        {isFetching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-4"
          >
            <p className="text-gray-700">Loading next question...</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
