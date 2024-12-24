import * as selectors from "@portabletext/editor/selectors";
import { useEditor, useEditorSelector } from "@portabletext/editor";
import { Popover, PopoverPanel } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";

import { schemaDefinition } from "../portableText/schemaDefinition";
import { DecoratorButton } from "./DecoratorButton";

export function ToolbarFloating() {
  const editor = useEditor();
  const selectionText = useEditorSelector(editor, selectors.getSelectionText);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const toolbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectionText && toolbarRef.current) {
      const selection = window.getSelection();

      if (selection && selection.rangeCount > 0) {
        setToolbarVisible(true);
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        const absoluteLeft = rect.left + window.scrollX;
        const absoluteTop = rect.top + window.scrollY;

        toolbarRef.current.style.left = `${absoluteLeft}px`;
        toolbarRef.current.style.top = `${absoluteTop}px`;
        toolbarRef.current.style.width = `${rect.width}px`;
        toolbarRef.current.style.height = `${rect.height}px`;
      }
    } else {
      setToolbarVisible(false);
    }
  }, [selectionText]);

  const decoratorButtons = schemaDefinition.decorators.map((decorator) => (
    <DecoratorButton key={decorator.name} decorator={decorator} />
  ));

  return (
    <div
      data-visible={toolbarVisible}
      className="pointer-events-none fixed z-50 border border-orange-500/50 bg-orange-500/20 transition duration-100 data-[visible='false']:opacity-0 data-[visible='true']:opacity-100"
      ref={toolbarRef}
    >
      <Popover className="relative">
        {selectionText ? (
          <PopoverPanel
            static
            className="pointer-events-auto flex translate-y-7 justify-center"
          >
            <div className="flex flex-nowrap justify-center rounded-lg shadow">
              {decoratorButtons}
            </div>
          </PopoverPanel>
        ) : null}
      </Popover>
    </div>
  );
}
