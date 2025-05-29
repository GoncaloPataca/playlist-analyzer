import type { PropsWithChildren, ButtonHTMLAttributes } from "react";

export const Button = ({
  children,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
  <button
    className="px-4 py-2 rounded font-semibold transition
    bg-gray-200 hover:bg-gray-300 text-gray-900
    dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
    {...props}
  >
    {children}
  </button>
);
