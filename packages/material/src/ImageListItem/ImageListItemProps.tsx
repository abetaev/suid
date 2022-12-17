import { SxProps } from "@suid/system";
import { Theme } from "..";
import { ImageListItemClasses } from "./imageListItemClasses";
import * as ST from "@suid/types";
import { JSXElement } from "solid-js";

export type ImageListItemTypeMap<P = {}, D extends ST.ElementType = "li"> = {
  name: "MuiImageListItem";
  defaultPropNames: "cols" | "rows";
  selfProps: {
    /**
     * The content of the component, normally an `<img>`.
     */
    children?: JSXElement;

    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ImageListItemClasses>;

    /**
     * Width of the item in number of grid columns.
     * @default 1
     */
    cols?: number;

    /**
     * Height of the item in number of grid rows.
     * @default 1
     */
    rows?: number;

    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  props: P & ImageListItemTypeMap["selfProps"];
  defaultComponent: D;
};

export type ImageListItemProps<
  D extends ST.ElementType = ImageListItemTypeMap["defaultComponent"],
  P = {}
> = ST.OverrideProps<ImageListItemTypeMap<P, D>, D>;

export default ImageListItemProps;
