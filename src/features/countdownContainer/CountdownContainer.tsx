import { FC, memo } from 'react';

import { Countdown } from '@/features/countdown/Countdown';
import { CountdownMenu } from '@/features/countdownMenu';

import { useCountdown } from '@/query/countdown';

interface CountdownContainerProps {
  defaultCounter?: number;
}

/**
 * Container for countdown to share same hooks to avoid using unnecessary library like Redux
 */
export const CountdownContainer: FC<CountdownContainerProps> = memo(
  ({ defaultCounter }) => {
    const {
      countdown,
      toggleCountdown,
      counting,
      resetCountdown,
      doubleCountDown,
      setupCountdownNumber,
    } = useCountdown(defaultCounter);

    return (
      <div className="grid gap-4">
        <Countdown
          countdown={countdown}
          toggleCountdown={toggleCountdown}
          counting={counting}
          resetCountdown={resetCountdown}
        />
        <CountdownMenu
          toggleCountdown={toggleCountdown}
          resetCountdown={resetCountdown}
          doubleCountDown={doubleCountDown}
          setupCountdownNumber={setupCountdownNumber}
        />
      </div>
    );
  }
);
