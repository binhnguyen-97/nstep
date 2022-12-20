/**
 * Create new type which contain all uniq key from T,U
 */
type GetDiffKeys<
  T,
  U,
  /**
   * Take all diff key
   */
  T0 = Omit<T, keyof U> & Omit<U, keyof T>,
  /**
   * Extract diff keys abve
   */
  T1 = { [K in keyof T0]: T0[K] }
> = T1

/**
 * Create new type contain all duplicate keys
 */
type GetSameKeys<T, U> = Omit<T | U, keyof GetDiffKeys<T, U>>

type MergeTwoObjects<
  T,
  U,
  /**
   * Diff keys will be keep these status, required or optional
  */
  T0 = GetDiffKeys<T, U>
  /**
   * Call recursively Merge<T,U> to resolve nested object
   */
  & { [K in keyof GetSameKeys<T, U>]: Merge<T[K], U[K]> },
  /**
   * Extract combined keys
   */
  T1 = { [K in keyof T0]: T0[K] }
> = T1

export type Merge<T, U> =
  /**
   * Combine T,U to tuple for which check if T or U is not a object
   * If both are object -> Resolve by calling MergeTwoObjects<T,U>
   * If one of them are not object -> conflict type -> keep U types as requirement
   * Above is base case for our recursive
   */
  [T, U] extends [{ [key: string]: unknown }, { [key: string]: unknown }]
  ? MergeTwoObjects<T, U>
  : U
