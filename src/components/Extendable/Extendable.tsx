import {
  useState,
  forwardRef,
  useMemo,
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  useEffect,
} from 'react';
import { usePopper } from 'react-popper';
import { ResizeObserver } from 'resize-observer';

import useOnClickOutside from '@/hooks/useClickOutside';

import type { Ref, ReactNode } from 'react';
import type { Placement } from '@popperjs/core';

export interface CustomizableExtendableProps {
  placement?: Placement;
  content: ReactNode;
  trigger?: 'click' | 'hover';
  forceHide?: boolean;
  setForceHide?: Function;
}

interface NstExtendableProps extends CustomizableExtendableProps {
  referenceElement: HTMLElement;
  children?: React.ReactElement<ChildProps>;
}

interface ChildProps {
  id: string;
  ref?: number;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const NstExtendable = forwardRef<Ref<unknown>, NstExtendableProps>(
  (
    {
      referenceElement,
      content,
      placement = 'right',
      children,
      trigger = 'hover',
      forceHide,
      setForceHide,
    },
    ref
  ) => {
    const [popperElement, setPopperElement] = useState<HTMLElement>();
    const [visible, setVisible] = useState<boolean>(false);

    const { styles, attributes, forceUpdate } = usePopper(
      referenceElement,
      popperElement,
      {
        placement,
        modifiers: [
          {
            name: 'eventListeners',
            options: {
              resize: true,
            },
          },
        ],
      }
    );

    useOnClickOutside(popperElement, () => setVisible(false));

    /**
     * Add resize Observer to watch any change of trigger element
     * Cal forceUpdate to update popper position
     */
    useEffect(() => {
      const ro = new ResizeObserver(async () => {
        if (!forceUpdate) return;
        await forceUpdate();
      });

      const triggerEle = document.getElementById('trigger-item')!;
      ro.observe(triggerEle);

      return () => ro.unobserve(triggerEle);
    }, []);

    useEffect(() => {
      if (forceHide && visible) {
        setVisible(false);
      }

      return () => setForceHide && setForceHide(false);
    }, [forceHide]);

    const getChildProps = (childProps: any) => {
      const props: ChildProps = {
        ...childProps,
      };

      const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        if (childProps.onMouseEnter) {
          childProps.onMouseEnter(e);
        }
        setVisible(true);
      };

      const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
        if (childProps.onMouseLeave) {
          childProps.onMouseLeave(e);
        }
        setVisible(false);
      };

      const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (childProps.onClick) {
          childProps.onClick(e);
        }
        setVisible((prev) => !prev);
      };

      if (trigger === 'hover') {
        props.onMouseEnter = handleMouseEnter;
        props.onMouseLeave = handleMouseLeave;
      } else if (trigger === 'click') {
        props.onClick = handleClick;
      }

      return props;
    };

    const triggerItem = useMemo(() => {
      if (!children) return null;

      return Children.map(children, (child: ReactElement<ChildProps>) => {
        if (!isValidElement(child)) return child;
        return cloneElement(child, {
          ...child.props,
          ...getChildProps(child.props),
          id: 'trigger-item',
        });
      });
    }, [children]);

    return (
      <>
        {triggerItem}
        {visible && (
          <div
            ref={setPopperElement as Ref<HTMLDivElement>}
            style={styles.popper}
            className="isolate z-[1]"
            {...attributes.popper}
          >
            {content}
          </div>
        )}
      </>
    );
  }
);
