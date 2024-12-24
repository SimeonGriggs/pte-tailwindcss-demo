import { useState } from "react";
import {
  EditorEventListener,
  EditorProvider,
  PortableTextEditable,
} from "@portabletext/editor";
import type { PortableTextBlock } from "@portabletext/editor";
import { schemaDefinition } from "./portableText/schemaDefinition";
import { renderStyle } from "./portableText/renderStyle";
import { renderDecorator } from "./portableText/renderDecorator";
import { Toolbar } from "./components/Toolbar";
import { renderBlock } from "./portableText/renderBlock";
import {
  coreBehaviors,
  createLinkBehaviors,
  LinkBehaviorsConfig,
} from "@portabletext/editor/behaviors";
import { renderAnnotation } from "./portableText/renderAnnotation";
import { ToolbarFloating } from "./components/ToolbarFloating";

const DEFAULT_VALUE = [
  {
    _type: "block",
    _key: "f75c718f165f",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "I was bored and tried using some AI apps to add a Santa hat to our cat. It didn't go well.",
        _key: "de92ceb5a21b",
      },
    ],
  },
];

function App() {
  const [value, setValue] = useState<Array<PortableTextBlock> | undefined>(
    DEFAULT_VALUE,
  );

  const linkAnnotationContext: LinkBehaviorsConfig = {
    linkAnnotation: (context) => ({
      name: "link",
      value: { url: context.url },
    }),
  };
  const linkHandlers = createLinkBehaviors(linkAnnotationContext);

  return (
    <main className="flex min-h-screen flex-col gap-4 bg-gray-50 p-6 lg:p-12">
      <EditorProvider
        initialConfig={{
          schemaDefinition,
          initialValue: value,
          behaviors: [...coreBehaviors, ...linkHandlers],
        }}
      >
        <EditorEventListener
          on={(event) => {
            if (event.type === "mutation") {
              setValue(event.snapshot);
            }
          }}
        />
        <Toolbar />
        <ToolbarFloating />
        <PortableTextEditable
          className="prose prose-xl prose-indigo rounded-lg border border-gray-300 bg-white px-6 py-4 shadow-inner"
          renderAnnotation={renderAnnotation}
          renderStyle={renderStyle}
          renderDecorator={renderDecorator}
          renderBlock={renderBlock}
          renderListItem={(props) => <>{props.children}</>}
        />
      </EditorProvider>
      <div className="prose">
        <pre>{value ? JSON.stringify(value, null, 2) : null}</pre>
      </div>
    </main>
  );
}

export default App;
