import {
  BoldIcon,
  ItalicIcon,
  CodeBracketIcon,
} from "@heroicons/react/16/solid";
import * as selectors from "@portabletext/editor/selectors";
import {
  SchemaDefinition,
  useEditor,
  useEditorSelector,
} from "@portabletext/editor";

type DecoratorButtonProps = {
  decorator: NonNullable<SchemaDefinition["decorators"]>[number];
};

export function DecoratorButton({ decorator }: DecoratorButtonProps) {
  const editor = useEditor();
  const active = useEditorSelector(
    editor,
    selectors.isActiveDecorator(decorator.name),
  );

  return (
    <button
      className="relative -ml-px inline-flex items-center bg-white p-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 first-of-type:ml-0 first-of-type:rounded-l-md last-of-type:rounded-r-md hover:bg-gray-50 focus:z-10 data-[active='true']:bg-indigo-50 data-[active='true']:text-indigo-700"
      data-active={active}
      onClick={(event) => {
        editor.send({
          type: "decorator.toggle",
          decorator: decorator.name,
        });

        // only re-focus is this was a click and not a keyboard press
        const eventWasFromKeyboard = event.detail === 0;
        if (!eventWasFromKeyboard) {
          editor.send({
            type: "focus",
          });
        }
      }}
    >
      <span className="sr-only">{decorator.name}</span>
      {decorator.name === "strong" && <BoldIcon className="size-5" />}
      {decorator.name === "em" && <ItalicIcon className="size-5" />}
      {decorator.name === "code" && <CodeBracketIcon className="size-5" />}
    </button>
  );
}
