import { usePopper } from "react-popper";

/**
 * Popovers & Dropdowns are in a family of dynamic components whose position depends on the elements that *trigger* them,
 * since they are usually absolutely/fixed positioned *right next* to where the user just interacts 🎆.
 *
 * Positioning these dynamic elements is not trivial. Luckily, [popperJS](https://popper.js.org) takes care of that for you
 * quite easily 👍.
 *
 * Let's make a reusable component called Extendable that will takes care of popper-js integrations that will be the
 * atom for both Popover & Dropdown to build on top of 🎩.
 * 
 * Requirements:
 * - It could be attached to any element.
 * - It stays on top of all other elements on the page to ensure that its content is visible.
 * 
 * **BONUS POINT 💤**: Don't use z-index, z-index war is no fun for anyone.
 * 
 * **BONUS BONUS POINT 💗**: Popper-js already takes care of 90% of a11y & responsiveness for you, except for one case:
 * - If the size of the trigger changes, what happens?
 */
export const NstExtendable = () => {
  return <></>;
};
