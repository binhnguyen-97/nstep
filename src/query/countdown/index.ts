import { useState, useRef, useEffect } from "react"

import { getLocalCountdown, saveLocalCountdown } from "@/utils/localStorage"

enum CountdownStatus {
  RUN = 'RUN',
  STOP = 'STOP'
}
interface Countdown {
  value: number
  status: CountdownStatus
}

/**
 * Hook for countdown functionality
 * Idea here is create countdown and status following with that countdown
 * Each time counter change, save it into local storage for persistence and also update status if counter to 0
 * Each time a status change, handle of that status will be invoked
 * It prevent miss match data from async update state of React
 * @param defaultCounter Default start counter
 * @returns
 */
export const useCountdown = (defaultCounter = 30) => {
  const [countdown, setCountdown] = useState<Countdown>(() => {
    const countdownFromLocal = getLocalCountdown();
    if (countdownFromLocal) {
      return {
        value: countdownFromLocal,
        status: CountdownStatus.RUN
      }
    }
    return {
      value: defaultCounter,
      status: CountdownStatus.RUN
    }
  })

  const intervalRef = useRef<number>()

  const countDown = (step = 1) => {
    return setCountdown(prev => {
      if (prev.value <= step) {

      }
      return {
        ...prev,
        value: prev.value <= step ? 0 : prev.value - step,
      }
    })
  }

  const toggleCountdown = () => {
    setCountdown(prev => ({
      value: prev.value || defaultCounter,
      status: prev?.status === CountdownStatus.RUN ? CountdownStatus.STOP : CountdownStatus.RUN
    }))
  }

  const handleStart = () => {
    intervalRef.current = setInterval(countDown, 1000)
  }

  const handleStop = () => {
    clearInterval(intervalRef.current)
  }

  const resetCountdown = () => {
    setCountdown(() => ({
      status: CountdownStatus.STOP,
      value: defaultCounter
    }))
  }

  const doubleCountDown = () => {
    setCountdown((prev) => ({
      ...prev,
      value: prev.value * 2
    }))
  }

  const setupCountdownNumber = (value: number) => {
    setCountdown((prev) => ({
      ...prev,
      value: isNaN(value) ? prev?.value : value > 0 ? value : 0
    }))
  }

  /**
   * Clear interval when un mounnt
   */
  useEffect(() => {
    return handleStop
  }, [])

  /**
   * Watch for counter change and update to local storage or update status if needed
   */
  useEffect(() => {
    saveLocalCountdown(countdown.value)
    if (countdown.value <= 0) {
      setCountdown(prev => ({
        ...prev,
        status: CountdownStatus.STOP
      }))
    }
  }, [countdown.value])

  /**
   * Watch for status and process
   */
  useEffect(() => {
    console.info(countdown.status)
    if (countdown.status === CountdownStatus.STOP) {
      handleStop()
    }
    if (countdown.status === CountdownStatus.RUN) {
      handleStart()
    }
  }, [countdown.status])

  return {
    countdown: countdown.value,
    counting: countdown.status === CountdownStatus.RUN,
    toggleCountdown,
    resetCountdown,
    doubleCountDown,
    setupCountdownNumber,
  }
}

export type CountdownHookType = ReturnType<typeof useCountdown>
