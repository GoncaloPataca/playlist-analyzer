import { DataButton } from "./DataButton";
import { LoginButton } from "./LoginButton";

export function SidePanel() {
  return (
    <aside className="w-64 bg-gray-200 p-4 border-r border-gray-300">
      <h2 className="text-lg font-bold mb-4">Side Panel</h2>
      <ul className="space-y-2">
        <li className="hover:underline cursor-pointer">Menu Item 1</li>
        <li className="hover:underline cursor-pointer">Menu Item 2</li>
        <li className="hover:underline cursor-pointer">Menu Item 3</li>
      </ul>
      <LoginButton />
      <DataButton />
    </aside>
  );
}
