import type { PropsWithChildren, ButtonHTMLAttributes } from "react";

export const Button = ({
  children,
  disabled,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
  <button
    className={`px-4 py-2 rounded font-semibold transition
      ${
        disabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500"
          : "bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 hover:cursor-pointer"
      }`}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);
