import { useState } from "react";

/** This is kinda ugly, isn't it, maybe make it absolute import? */
import { NstButton } from "../../components";

/**
 * Counter is an example of a simple business logic of a click-up counter.
 * ```
 * Click > increments counter.
 * ```
 * 
 * Requirements:
 * - Make the counter countdown from 30s by default.
 * - The countdown starts/pauses on click.
 * - Persist the current count in local so that it stays after refreshes.
 * - Redesign it in a user-friendly way so that it can reset when paused/finished.
 *
 * **BONUS POINT 🎁**: Make this default countdown customisable.
 * 
 * **BONUS BONUS POINT 🏎**: Add a little animation for the count down, to your liking.
 */
export const Countdown = () => {
  const [count, setCount] = useState(0);

  return (
    /** How to make this button accept all <button />-related props. */
    <NstButton onClick={() => {}}>count is {count}</NstButton>
  );
};
