import * as selectors from "@portabletext/editor/selectors";
import {
  SchemaDefinition,
  useEditor,
  useEditorSelector,
} from "@portabletext/editor";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { ChevronRightIcon, LinkIcon } from "@heroicons/react/16/solid";

type AnnotationButtonProps = {
  annotation: NonNullable<SchemaDefinition["annotations"]>[number];
};

export function AnnotationButton({ annotation }: AnnotationButtonProps) {
  const editor = useEditor();
  const active = useEditorSelector(
    editor,
    selectors.isActiveAnnotation(annotation.name),
  );
  const isSelectionCollapsed = useEditorSelector(
    editor,
    selectors.isSelectionCollapsed,
  );

  return (
    <Popover className="group relative">
      {({ open, close }) => (
        <>
          <PopoverButton
            className="relative -ml-px inline-flex items-center bg-white p-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 transition-opacity duration-100 hover:bg-gray-50 focus:z-10 disabled:opacity-50 group-first-of-type:ml-0 group-first-of-type:rounded-l-md group-last-of-type:rounded-r-md data-[active='true']:bg-indigo-50 data-[active='true']:text-indigo-700"
            data-active={active}
            disabled={isSelectionCollapsed}
          >
            <LinkIcon className="size-5" />
            <span className="sr-only">
              {annotation.title || annotation.name}
            </span>
          </PopoverButton>
          <PopoverPanel
            anchor="bottom"
            className="mt-1 flex flex-col rounded-lg bg-white p-1 shadow"
          >
            <Form annotation={annotation} open={open} close={close} />
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}

function Form({
  annotation,
  open,
  close,
}: AnnotationButtonProps & { open: boolean; close: () => void }) {
  const editor = useEditor();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(``);
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  return (
    <form
      className="flex gap-1"
      onSubmit={(e) => {
        e.preventDefault();
        editor.send({
          type: "annotation.toggle",
          annotation: {
            name: annotation.name,
            value: {
              url: inputValue,
            },
          },
        });
        editor.send({
          type: "focus",
        });
        setInputValue(``);
        close();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        name="url"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full flex-1 rounded-md border border-gray-300 p-2"
      />
      <button
        type="submit"
        className="flex items-center rounded-md bg-indigo-500 px-3 text-white"
      >
        <ChevronRightIcon className="size-5" />
      </button>
    </form>
  );
}
