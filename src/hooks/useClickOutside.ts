import { useEffect } from 'react'

/**
 * Hook to invoke callback function if click outside provided element or not
 * @param ref Element to track
 * @param handler Callback function
 */
export default function useOnClickOutside(ref?: HTMLElement, handler?: any) {
  useEffect(
    () => {
      const listener = (event?: any) => {
        /**
         * Check if current target is in track element or not
         * if yes - ignore
         * if no - invoke callback
         */
        if (!ref || ref.contains(event.target)) {
          return
        }
        handler(event)
      }

      /**
       * Add listener to document
       */
      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      return () => {
        /**
         * Remove listener from document when unmounted
         */
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    [ref, handler],
  )
}
