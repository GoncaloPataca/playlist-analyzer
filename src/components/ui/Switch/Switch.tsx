import { Switch as HeadlessUISwitch } from "@headlessui/react";

export function Switch({
  checked,
  onChange,
  disabled,
}: Readonly<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}>) {
  return (
    <HeadlessUISwitch
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={`
        group inline-flex h-5 w-9 items-center rounded-full border transition
        ${
          disabled
            ? "cursor-not-allowed bg-gray-200 border-gray-200"
            : " cursor-pointer bg-gray-100 border-gray-300 hover:bg-gray-200 data-checked:bg-blue-400 data-checked:hover:bg-blue-500"
        }
      `}
    >
      <span className="size-3 translate-x-0.5 rounded-full bg-white border border-gray-300 transition group-data-checked:translate-x-5" />
    </HeadlessUISwitch>
  );
}
