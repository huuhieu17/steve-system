"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import IOSApp from "../IOSApp"

interface IOSCalculatorAppProps {
  onClose: () => void
}

export default function IOSCalculatorApp({ onClose }: IOSCalculatorAppProps) {
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
    <IOSApp title="Calculator" onClose={onClose} showBackButton={false}>
      <div className="h-full bg-black flex flex-col">
        {/* Display */}
        <div className="flex-1 flex items-end justify-end p-6">
          <div className="text-white text-6xl font-light text-right truncate">{display}</div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-1 p-1">
          {/* Row 1 */}
          <Button
            onClick={clearAll}
            className="h-20 bg-gray-600 hover:bg-gray-500 text-black text-xl font-medium rounded-full"
          >
            AC
          </Button>
          <Button
            onClick={() => setDisplay(String(-Number.parseFloat(display)))}
            className="h-20 bg-gray-600 hover:bg-gray-500 text-black text-xl font-medium rounded-full"
          >
            +/-
          </Button>
          <Button
            onClick={() => setDisplay(String(Number.parseFloat(display) / 100))}
            className="h-20 bg-gray-600 hover:bg-gray-500 text-black text-xl font-medium rounded-full"
          >
            %
          </Button>
          <Button
            onClick={() => performOperation("÷")}
            className={`h-20 text-white text-2xl font-light rounded-full ${
              operation === "÷" ? "bg-white text-orange-500" : "bg-orange-500 hover:bg-orange-400"
            }`}
          >
            ÷
          </Button>

          {/* Row 2 */}
          <Button
            onClick={() => inputDigit("7")}
            className="h-20 bg-gray-800 hover:bg-gray-700 text-white text-2xl font-light rounded-full"
          >
            7
          </Button>
          <Button
            onClick={() => inputDigit("8")}
            className="h-20 bg-gray-800 hover:bg-gray-700 text-white text-2xl font-light rounded-full"
          >
            8
          </Button>
          <Button
            onClick={() => inputDigit("9")}
            className="h-20 bg-gray-800 hover:bg-gray-700 text-white text-2xl font-light rounded-full"
          >
            9
          </Button>
          <Button
            onClick={() => performOperation("×")}
            className={`h-20 text-white text-2xl font-light rounded-full ${
              operation === "×" ? "bg-white text-orange-500" : "bg-orange-500 hover:bg-orange-400"
            }`}
          >
            ×
          </Button>

          {/* Row 3 */}
          <Button
            onClick={() => inputDigit("4")}
            className="h-20 bg-gray-800 hover:bg-gray-700 text-white text-2xl font-light rounded-full"
          >
            4
          </Button>
          <Button
            onClick={() => inputDigit("5")}
            className="h-20 bg-gray-800 hover:bg-gray-700 text-white text-2xl font-light rounded-full"
          >
            5
          </Button>
          <Button
            onClick={() => inputDigit("6")}
            className="h-20 bg-gray-800 hover:bg-gray-700 text-white text-2xl font-light rounded-full"
          >
            6
          </Button>
          <Button
            onClick={() => performOperation("-")}
            className={`h-20 text-white text-2xl font-light rounded-full ${
              operation === "-" ? "bg-white text-orange-500" : "bg-orange-500 hover:bg-orange-400"
            }`}
          >
            -
          </Button>

          {/* Row 4 */}
          <Button
            onClick={() => inputDigit("1")}
            className="h-20 bg-gray-800 hover:bg-gray-700 text-white text-2xl font-light rounded-full"
          >
            1
          </Button>
          <Button
            onClick={() => inputDigit("2")}
            className="h-20 bg-gray-800 hover:bg-gray-700 text-white text-2xl font-light rounded-full"
          >
            2
          </Button>
          <Button
            onClick={() => inputDigit("3")}
            className="h-20 bg-gray-800 hover:bg-gray-700 text-white text-2xl font-light rounded-full"
          >
            3
          </Button>
          <Button
            onClick={() => performOperation("+")}
            className={`h-20 text-white text-2xl font-light rounded-full ${
              operation === "+" ? "bg-white text-orange-500" : "bg-orange-500 hover:bg-orange-400"
            }`}
          >
            +
          </Button>

          {/* Row 5 */}
          <Button
            onClick={() => inputDigit("0")}
            className="h-20 bg-gray-800 hover:bg-gray-700 text-white text-2xl font-light rounded-full col-span-2"
          >
            0
          </Button>
          <Button
            onClick={inputDot}
            className="h-20 bg-gray-800 hover:bg-gray-700 text-white text-2xl font-light rounded-full"
          >
            .
          </Button>
          <Button
            onClick={() => performOperation("=")}
            className="h-20 bg-orange-500 hover:bg-orange-400 text-white text-2xl font-light rounded-full"
          >
            =
          </Button>
        </div>
      </div>
    </IOSApp>
  )
}
