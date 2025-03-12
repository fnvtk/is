"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, Square } from "lucide-react"
import { cn } from "@/lib/utils"

interface VoiceInputProps {
  onResult: (transcript: string) => void
  onError?: (error: string) => void
}

export function VoiceInput({ onResult, onError }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "zh-CN" // Default to Chinese

      recognitionRef.current.onstart = () => {
        setIsListening(true)
      }

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex
        const result = event.results[current]
        const transcriptText = result[0].transcript
        setTranscript(transcriptText)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
        if (transcript) {
          onResult(transcript)
          setTranscript("")
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        setIsListening(false)
        if (onError) {
          onError(event.error)
        }
      }
    } else if (onError) {
      onError("Speech recognition not supported in this browser")
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [onError, onResult, transcript])

  useEffect(() => {
    if (transcript) {
      onResult(transcript)
    }
  }, [transcript, onResult])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
    } else {
      try {
        recognitionRef.current?.start()
      } catch (error) {
        console.error("Speech recognition error:", error)
      }
    }
  }

  return (
    <button
      onClick={toggleListening}
      className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center transition-all",
        isListening ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-700 hover:bg-gray-200",
      )}
    >
      {isListening ? <Square size={20} /> : <Mic size={20} />}
    </button>
  )
}

