import { RenderBlockFunction } from "@portabletext/editor";

export const renderBlock: RenderBlockFunction = (props) => {
  if (props.style === "normal") {
    return <p>{props.children}</p>;
  } else if (props.schemaType.name === "image") {
    return (
      <div className="border-l-4 border-red-500 bg-red-50 p-2 pl-4">
        image: <strong>{props.value.url}</strong>
      </div>
    );
  }
  return <div>{props.children}</div>;
};
