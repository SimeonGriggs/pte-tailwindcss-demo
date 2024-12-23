import { RenderDecoratorFunction } from "@portabletext/editor";

export const renderDecorator: RenderDecoratorFunction = (props) => {
  if (props.value === "strong") {
    return <strong>{props.children}</strong>;
  } else if (props.value === "em") {
    return <em>{props.children}</em>;
  } else if (props.value === "code") {
    return <code>{props.children}</code>;
  }
  return <>{props.children}</>;
};
