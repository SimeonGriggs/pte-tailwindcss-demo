import * as selectors from "@portabletext/editor/selectors";
import {
  SchemaDefinition,
  useEditor,
  useEditorSelector,
} from "@portabletext/editor";
import { MenuItem } from "@headlessui/react";

type StyleButtonProps = {
  style: NonNullable<SchemaDefinition["styles"]>[number];
};

export function StyleButton({ style }: StyleButtonProps) {
  const editor = useEditor();
  const active = useEditorSelector(editor, selectors.isActiveStyle(style.name));

  return (
    <MenuItem>
      <button
        className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[active='true']:bg-indigo-50 data-[focus]:bg-gray-100 data-[active='true']:font-semibold data-[active='true']:text-indigo-700 data-[focus]:text-gray-900 data-[focus]:outline-none"
        data-active={active}
        onClick={() => {
          editor.send({
            type: "style.toggle",
            style: style.name,
          });
          editor.send({
            type: "focus",
          });
        }}
      >
        {style.title || style.name}
      </button>
    </MenuItem>
  );
}
