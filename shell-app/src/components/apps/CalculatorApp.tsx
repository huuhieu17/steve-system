"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function CalculatorApp() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const clearAll = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
      return
    }

    if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const performOperation = (nextOperator: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      let newValue: number

      switch (operation) {
        case "+":
          newValue = currentValue + inputValue
          break
        case "-":
          newValue = currentValue - inputValue
          break
        case "×":
          newValue = currentValue * inputValue
          break
        case "÷":
          newValue = currentValue / inputValue
          break
        default:
          newValue = inputValue
      }

      setPreviousValue(newValue)
      setDisplay(String(newValue))
    }

    setWaitingForOperand(true)
    setOperation(nextOperator)
  }

  return (
    <div className="h-full flex items-center justify-center bg-gray-100/50">
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden w-64">
        <div className="p-4 bg-gray-900 text-right">
          <div className="text-3xl font-light text-white truncate">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-1 p-1">
          {/* First row */}
          <Button onClick={clearAll} className="bg-gray-700 hover:bg-gray-600 text-white">
            AC
          </Button>
          <Button
            onClick={() => setDisplay(String(-Number.parseFloat(display)))}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            +/-
          </Button>
          <Button
            onClick={() => setDisplay(String(Number.parseFloat(display) / 100))}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            %
          </Button>
          <Button
            onClick={() => performOperation("÷")}
            className={`${operation === "÷" ? "bg-white text-orange-500" : "bg-orange-500 hover:bg-orange-400 text-white"}`}
          >
            ÷
          </Button>

          {/* Second row */}
          <Button onClick={() => inputDigit("7")} className="bg-gray-600 hover:bg-gray-500 text-white">
            7
          </Button>
          <Button onClick={() => inputDigit("8")} className="bg-gray-600 hover:bg-gray-500 text-white">
            8
          </Button>
          <Button onClick={() => inputDigit("9")} className="bg-gray-600 hover:bg-gray-500 text-white">
            9
          </Button>
          <Button
            onClick={() => performOperation("×")}
            className={`${operation === "×" ? "bg-white text-orange-500" : "bg-orange-500 hover:bg-orange-400 text-white"}`}
          >
            ×
          </Button>

          {/* Third row */}
          <Button onClick={() => inputDigit("4")} className="bg-gray-600 hover:bg-gray-500 text-white">
            4
          </Button>
          <Button onClick={() => inputDigit("5")} className="bg-gray-600 hover:bg-gray-500 text-white">
            5
          </Button>
          <Button onClick={() => inputDigit("6")} className="bg-gray-600 hover:bg-gray-500 text-white">
            6
          </Button>
          <Button
            onClick={() => performOperation("-")}
            className={`${operation === "-" ? "bg-white text-orange-500" : "bg-orange-500 hover:bg-orange-400 text-white"}`}
          >
            -
          </Button>

          {/* Fourth row */}
          <Button onClick={() => inputDigit("1")} className="bg-gray-600 hover:bg-gray-500 text-white">
            1
          </Button>
          <Button onClick={() => inputDigit("2")} className="bg-gray-600 hover:bg-gray-500 text-white">
            2
          </Button>
          <Button onClick={() => inputDigit("3")} className="bg-gray-600 hover:bg-gray-500 text-white">
            3
          </Button>
          <Button
            onClick={() => performOperation("+")}
            className={`${operation === "+" ? "bg-white text-orange-500" : "bg-orange-500 hover:bg-orange-400 text-white"}`}
          >
            +
          </Button>

          {/* Fifth row */}
          <Button onClick={() => inputDigit("0")} className="bg-gray-600 hover:bg-gray-500 text-white col-span-2">
            0
          </Button>
          <Button onClick={inputDot} className="bg-gray-600 hover:bg-gray-500 text-white">
            .
          </Button>
          <Button onClick={() => performOperation("=")} className="bg-orange-500 hover:bg-orange-400 text-white">
            =
          </Button>
        </div>
      </div>
    </div>
  )
}
