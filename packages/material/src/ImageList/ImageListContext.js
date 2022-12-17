import { Context, createContext } from "solid-js";

/**
 * @ignore - internal component.
 * @type {Context<{} | {expanded: boolean, disabled: boolean, toggle: () => void}>}
 */
const ImageListContext = createContext({});

if (process.env.NODE_ENV !== "production") {
  ImageListContext.displayName = "ImageListContext";
}

export default ImageListContext;
