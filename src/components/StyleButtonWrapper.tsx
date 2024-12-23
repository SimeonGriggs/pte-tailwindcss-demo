import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export function StyleButtonWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className="relative inline-flex w-56 items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        Styles
      </button>
      <Menu as="div" className="relative -ml-px block">
        <MenuButton className="relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
          <span className="sr-only">Open Styles</span>
          <ChevronDownIcon aria-hidden="true" className="size-5" />
        </MenuButton>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 flex w-64 origin-top-right flex-col rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="flex flex-col items-start py-1 text-left">
            {children}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
