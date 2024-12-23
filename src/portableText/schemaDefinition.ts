import { defineSchema } from "@portabletext/editor";

export const schemaDefinition = defineSchema({
  // Decorators are simple marks that don't hold any data
  decorators: [{ name: "strong" }, { name: "em" }, { name: "code" }],
  // Styles apply to entire text blocks
  // There's always a 'normal' style that can be considered the paragraph style
  styles: [
    { name: "normal", title: "Paragraph" },
    { name: "h1", title: "Heading 1" },
    { name: "h2", title: "Heading 2" },
    { name: "h3", title: "Heading 3" },
    { name: "blockquote", title: "Blockquote" },
  ],

  // The types below are left empty for this example.
  // See the rendering guide to learn more about each type.

  // Annotations are more complex marks that can hold data (for example, hyperlinks).
  annotations: [
    {
      name: "link",
      title: "Link",
      // fields: [
      //   {
      //     name: "url",
      //     title: "URL",
      //     type: "url",
      //   },
      // ],
    },
  ],
  // Lists apply to entire text blocks as well (for example, bullet, numbered).
  lists: [],
  // Inline objects hold arbitrary data that can be inserted into the text (for example, custom emoji).
  inlineObjects: [],
  // Block objects hold arbitrary data that live side-by-side with text blocks (for example, images, code blocks, and tables).
  blockObjects: [
    {
      name: "image",
      title: "Image",
    },
  ],
});
