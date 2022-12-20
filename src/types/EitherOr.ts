/**
 * Simulate the not logic gate
 * Which remove all the diff prop from T which mean !T
 */
type Not<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

/**
 * Implement the A!B + AB! from truth table
 * A B EitherOr
 * 1 1 0
 * 1 0 1
 * 0 1 1
 * 0 0 0
 *
 * -> EitherOr = A!B + AB!
 *
 * First check if T,U is object type or not
 * If yes, implement A!B + AB!
 * If no, create an union type for that
 */
export type EitherOr<T, U> = (T | U) extends object ? (Not<T, U> & U) | (Not<U, T> & T) : T | U;
