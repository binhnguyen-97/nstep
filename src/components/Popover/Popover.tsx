import {
  useState,
  forwardRef,
  useMemo,
  Ref,
  ReactNode,
  Children,
  cloneElement,
  ReactElement,
  isValidElement,
} from 'react';
import {
  NstExtendable,
  CustomizableExtendableProps,
} from '@/components/Extendable';
import { NstButton } from '../Button';

interface NstPopoverProps extends CustomizableExtendableProps {
  children: ReactNode;
}

export const NstPopover = forwardRef<Ref<unknown>, NstPopoverProps>(
  ({ children, ...props }, ref) => {
    const [triggerElement, setTriggerElement] = useState<HTMLElement>();

    const triggerItem = useMemo(() => {
      /**
       * Default trigger item
       */
      if (!children)
        return (
          <NstButton ref={setTriggerElement as Ref<HTMLButtonElement>}>
            Click me
          </NstButton>
        );

      let triggerElement: ReactNode = null;
      /**
       * Only accept 1 child as trigger item
       *  */
      if (Children.count(children) > 1) {
        triggerElement = Children.toArray(children)[0];
      } else {
        triggerElement = children as ReactElement;
      }

      if (!isValidElement(triggerElement))
        return (
          <NstButton ref={setTriggerElement as Ref<HTMLButtonElement>}>
            Click me
          </NstButton>
        );

      return cloneElement(triggerElement, {
        ...triggerElement.props,
        ref: setTriggerElement,
      });
    }, []);

    return (
      <NstExtendable ref={ref} {...props} referenceElement={triggerElement!}>
        {triggerItem}
      </NstExtendable>
    );
  }
);
