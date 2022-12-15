import type { ReactNode } from "react";


export type NstButtonProps = {
  /**
   * Children is required on a button, at least either an icon or text.
   */
  children: ReactNode;
};

/**
 * This is a simple example of a button 🖱. Let's try to make it satisfy all the requirements we stated in the design system.
 * 
 * You likely will run into a classic Tailwind problem here 😑.
 * >Feel free to use 3rd party library like [tailwind-merge](https://github.com/dcastil/tailwind-merge) if you want.
 */
export const NstButton = (props: NstButtonProps) => {
  return <button className="text-white px-4 py-2 bg-rose-500 shadow-sm border-rose-500 rounded-lg" {...props} />;
}
