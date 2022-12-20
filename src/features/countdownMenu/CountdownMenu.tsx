import { FC, memo } from 'react';

import { debounce } from '@/utils/debounce';

import { NstDropdown } from '@/components/Dropdown';
import type { CountdownHookType } from '@/query/countdown';

type CountdownMenuProps = Pick<
  CountdownHookType,
  | 'doubleCountDown'
  | 'toggleCountdown'
  | 'resetCountdown'
  | 'setupCountdownNumber'
>;

/**
 * This dropdown menu should opens up a dropdown with 3 options:
 * - Start/pause the countdown.
 * - Reset the countdown to the default number.
 * - Double the current countdown.
 *
 * It should have all the features of a basic dropdown & allow user to interact meaningfully with the countdown counter.
 *
 * **BONUS POINT 🙌**: Add an input in the dropdown that allows user to set the counter to whatever number they want.
 */
export const CountdownMenu: FC<CountdownMenuProps> = memo(
  ({
    toggleCountdown,
    resetCountdown,
    doubleCountDown,
    setupCountdownNumber,
  }) => {
    return (
      <NstDropdown
        options={[
          {
            label: 'Start/pause',
            onClick: toggleCountdown,
          },
          {
            label: 'Reset',
            onClick: resetCountdown,
          },
          {
            label: 'Double',
            onClick: doubleCountDown,
          },
          {
            label: 'Input',
            renderItem: () => {
              return (
                <input
                  key="input"
                  placeholder="Input countdown"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  onChange={debounce((event) => {
                    setupCountdownNumber(event.target.value);
                  }, 250)}
                />
              );
            },
          },
        ]}
        label="Dropdown menu"
      />
    );
  }
);
