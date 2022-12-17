import { SxProps } from "@suid/system";
import { OverridableStringUnion } from "@suid/types";
import * as ST from "@suid/types";
import { Theme } from "..";
import { ImageListClasses } from "./imageListClasses";
import { JSXElement } from "solid-js";

export interface ImageListPropsVariantOverrides {}
export type ImageListTypeMap<P = {}, D extends ST.ElementType = "ul"> = {
  name: "MuiImageList";
  defaultPropNames: "cols" | "gap" | "rowHeight" | "variant";
  selfProps: {
    /**
     * The content of the component, normally `ImageListItem`s.
     */
    children: NonNullable<JSXElement>;

    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ImageListClasses>;

    /**
     * Number of columns.
     * @default 2
     */
    cols?: number;

    /**
     * The gap between items in px.
     * @default 4
     */
    gap?: number;

    /**
     * The height of one row in px.
     * @default 'auto'
     */
    rowHeight?: number | "auto";

    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;

    /**
     * The variant to use.
     * @default 'standard'
     */
    variant?: OverridableStringUnion<
      "masonry" | "quilted" | "standard" | "woven",
      ImageListPropsVariantOverrides
    >;
  };
  props: P & ImageListTypeMap["selfProps"];
  defaultComponent: D;
};

export type ImageListProps<
  D extends ST.ElementType = ImageListTypeMap["defaultComponent"],
  P = {}
> = ST.OverrideProps<ImageListTypeMap<P, D>, D>;

export default ImageListProps;
