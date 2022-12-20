import { FC, useMemo } from 'react';

import { NstButton } from '@/components/Button';
import type { CountdownHookType } from '@/query/countdown';

type CountdownProps = Pick<
  CountdownHookType,
  'countdown' | 'toggleCountdown' | 'counting' | 'resetCountdown'
>;

export const Countdown: FC<CountdownProps> = ({
  toggleCountdown,
  countdown,
  counting,
  resetCountdown,
}) => {
  const buttonTxt = counting ? 'Pause' : 'Start';

  /**
   * Pretending unnecessary rerender
   */
  const ctaGroup = useMemo(() => {
    return (
      <div className="grid grid-cols-2 gap-3">
        <NstButton className="w-full" onClick={toggleCountdown}>
          {buttonTxt}
        </NstButton>
        <NstButton hidden={counting} onClick={resetCountdown}>
          Reset
        </NstButton>
      </div>
    );
  }, [counting]);

  return (
    <div className="grid place-content-center text-center">
      <p className="mt-10 text-lg font-bold">{countdown}</p>
      {ctaGroup}
    </div>
  );
};
