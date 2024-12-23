import { RenderStyleFunction } from "@portabletext/editor";

export const renderStyle: RenderStyleFunction = (props) => {
  if (props.schemaType.value === "h1") {
    return <h1>{props.children}</h1>;
  } else if (props.schemaType.value === "h2") {
    return <h2>{props.children}</h2>;
  } else if (props.schemaType.value === "h3") {
    return <h3>{props.children}</h3>;
  } else if (props.schemaType.value === "blockquote") {
    return <blockquote>{props.children}</blockquote>;
  }
  return <>{props.children}</>;
};
