
/**
 * Debounce function
 * @param fc Function that will be evoke after config time
 * @param time Time delay before invoke provided function
 * @returns Function that will invoke after configure time from last invoke
 */
export const debounce = function (fc: (...args: any) => unknown, time: number) {
  let timeout: number;

  return (...args: any) => {
    /**
     * Clear timeout when return func invoked another time before timeout
     */
    if (timeout) {
      clearTimeout(timeout)
    }

    /**
     * Invoke function after several number ms
     */
    timeout = setTimeout(() => {
      fc(...args)
    }, time);
  }
}
