import { RenderAnnotationFunction } from "@portabletext/editor";

export const renderAnnotation: RenderAnnotationFunction = (props) => {
  if (props?.schemaType?.name === "link") {
    const href = typeof props.value.url === "string" ? props.value.url : "#";

    return <a href={href}>{props.children}</a>;
  }

  return <>{props.children}</>;
};
