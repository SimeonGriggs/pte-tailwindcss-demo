import { schemaDefinition } from "../portableText/schemaDefinition";
import { StyleButton } from "./StyleButton";
import { DecoratorButton } from "./DecoratorButton";
import { AnnotationButton } from "./AnnotationButton";
import { StyleButtonWrapper } from "./StyleButtonWrapper";
import { BlockObjectButton } from "./BlockObjectButton";

export function Toolbar() {
  const styleButtons = schemaDefinition.styles.map((style) => (
    <StyleButton key={style.name} style={style} />
  ));

  const decoratorButtons = schemaDefinition.decorators.map((decorator) => (
    <DecoratorButton key={decorator.name} decorator={decorator} />
  ));

  const annotationButtons = schemaDefinition.annotations.map((annotation) => (
    <AnnotationButton key={annotation.name} annotation={annotation} />
  ));

  const blockOjbectButtons = schemaDefinition.blockObjects.map(
    (blockObject) => (
      <BlockObjectButton key={blockObject.name} blockObject={blockObject} />
    ),
  );

  return (
    <div className="flex gap-x-1">
      <StyleButtonWrapper>{styleButtons}</StyleButtonWrapper>
      <span className="isolate inline-flex rounded-md shadow-sm">
        {decoratorButtons}
      </span>
      <span className="isolate inline-flex rounded-md shadow-sm">
        {annotationButtons}
      </span>
      <span className="isolate inline-flex rounded-md shadow-sm">
        {blockOjbectButtons}
      </span>
    </div>
  );
}
