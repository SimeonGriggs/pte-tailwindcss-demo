import * as selectors from "@portabletext/editor/selectors";
import { useEditor, useEditorSelector } from "@portabletext/editor";
import { useEffect, useRef } from "react";

import { schemaDefinition } from "../portableText/schemaDefinition";
import { DecoratorButton } from "./DecoratorButton";

export function ToolbarFloating() {
  const editor = useEditor();
  const selectionText = useEditorSelector(editor, selectors.getSelectionText);
  const toolbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectionText && toolbarRef.current) {
      const selection = window.getSelection();

      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        const absoluteLeft = rect.left + window.scrollX;
        const absoluteTop = rect.bottom + window.scrollY;

        toolbarRef.current.style.left = `${absoluteLeft}px`;
        toolbarRef.current.style.top = `${absoluteTop}px`;
      }
    }
  }, [selectionText]);

  const decoratorButtons = schemaDefinition.decorators.map((decorator) => (
    <DecoratorButton key={decorator.name} decorator={decorator} />
  ));

  return (
    <div
      data-selection={!!selectionText}
      className="fixed z-50 transition duration-100 data-[selection='false']:pointer-events-none data-[selection='false']:-translate-y-3 data-[selection='true']:translate-y-1 data-[selection='false']:opacity-0 data-[selection='true']:opacity-100"
      ref={toolbarRef}
    >
      {decoratorButtons}
    </div>
  );
}
