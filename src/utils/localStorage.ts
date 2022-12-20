enum LOCAL_KEYS {
  COUNTDOWN = "countdownKey"
}

export const getLocalCountdown = () => {
  const valueFromLocal = localStorage.getItem(LOCAL_KEYS.COUNTDOWN)
  return valueFromLocal ? parseInt(valueFromLocal, 10) : 0
}

export const saveLocalCountdown = (value: number) => {
  return localStorage.setItem(LOCAL_KEYS.COUNTDOWN, value.toString())
}
export const deleteLocalCountdown = () => localStorage.removeItem(LOCAL_KEYS.COUNTDOWN)
