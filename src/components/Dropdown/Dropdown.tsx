import { useMemo, forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { NstButton } from '../Button';
import { NstPopover } from '../Popover';

import type { EitherOr } from '@/types/EitherOr';
import type { ReactNode } from 'react';
import type { CustomizableExtendableProps } from '@/components/Extendable';

/**
 * Dropdown presents a list of items that users can choose to trigger a specific action with.
 * It is an organism that should be built on top of Popover as a molecule 🧱.
 *
 * Requirements:
 * - It must have all the functionalities of a Popover
 * - It must display a list of similarly-designed items, with each item individually capable of triggering
 * at least its own `onClick` independently
 * - Clicking/tapping on the item closes the dropdown automatically, but make this feature turn-off-able.
 *
 * **BONUS POINT 🍓**: Add a way to make multi-level dropdown, where a dropdown item also shows a dropdown on hover.
 *
 * **BONUS BONUS POINT 🥑**: Make it WCAG compliant.
 * > Good place to start: https://a11y-guidelines.orange.com/en/web/components-examples/dropdown-menu/
 */

type OptionItem = EitherOr<
  {
    onClick: (...args: unknown[]) => unknown;
  },
  {
    renderItem: () => ReactNode;
  }
> & {
  label: string;
};

interface NstDropdownProps
  extends Omit<CustomizableExtendableProps, 'content'> {
  options: OptionItem[];
  closeAfterClick?: boolean;
  label: string;
  contentClassName?: string;
}

export const NstDropdown = forwardRef<unknown, NstDropdownProps>(
  ({
    options,
    placement = 'bottom',
    trigger = 'click',
    closeAfterClick = true,
    label,
    contentClassName,
    ...other
  }) => {
    const [forceHide, setForceHide] = useState<boolean>(false);

    const content = useMemo(() => {
      if (!options.length) return [];
      const listOptions = options.map((option) => {
        const onClick = () => {
          if (closeAfterClick) {
            setForceHide(true);
          }
          if (option.onClick) {
            option.onClick();
          }
        };

        if (option.renderItem) {
          return option.renderItem();
        }

        return (
          <button
            className="w-full text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
            role="menuitem"
            onClick={onClick}
            key={option.label}
          >
            {option.label}
          </button>
        );
      });

      return (
        <div
          aria-orientation="vertical"
          aria-labelledby="drop-downn"
          tabIndex={-1}
          className={twMerge('w-full bg-white shadow-lg', contentClassName)}
        >
          {listOptions}
        </div>
      );
    }, [options]);

    return (
      <NstPopover
        {...other}
        content={content}
        placement={placement}
        trigger={trigger}
        forceHide={forceHide}
        setForceHide={setForceHide}
      >
        <NstButton>{label || 'Countdown menu'}</NstButton>
      </NstPopover>
    );
  }
);
