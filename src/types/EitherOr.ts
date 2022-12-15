/**
 * Often time you run into a scenario where a you would want either 1 out of 2 options, like an XOR gate.
 * Ref: https://en.wikipedia.org/wiki/XOR_gate (Wikipedia? Shame! 😅)
 *
 * Take this `Message` type for example, where it can either accept a text or an attachment. One is required, but not both.
 * ```ts
 * type Message = {
 *    text: string;
 *    attachment: File;
 *    timestamp?: number;
 * }
 * ```
 * 
 * Let's implement a EitherOr<T,U> utility type that can take care of this XOR logic.
 */
export type EitherOr<T, U> = {};
