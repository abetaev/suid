import clsx from "clsx";
import styled from "../styles/styled";
import { getImageListUtilityClass } from "./imageListClasses";
import ImageListContext from "./ImageListContext";
import createComponentFactory from "@suid/base/createComponentFactory";
import { ImageListTypeMap } from ".";
import createRef from "@suid/system/createRef";
import { createMemo, onMount, splitProps, mergeProps } from "solid-js";
const $ = createComponentFactory<ImageListTypeMap>()({
  name: "MuiImageList",
  selfPropNames: ["children", "classes", "cols", "gap", "rowHeight", "variant"],
  utilityClass: getImageListUtilityClass,
  slotClasses: (ownerState) => ({
    root: ["root", ownerState.variant],
  }),
});

const ImageListRoot = styled("ul", {
  name: "MuiImageList",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, styles[ownerState.variant]];
  },
})(({ ownerState }) => {
  return {
    display: "grid",
    overflowY: "auto",
    listStyle: "none",
    padding: 0,
    // Add iOS momentum scrolling for iOS < 13.0
    WebkitOverflowScrolling: "touch",
    ...(ownerState.variant === "masonry" && {
      display: "block",
    }),
  };
});

/**
 *
 * Demos:
 *
 * - [Image List](https://mui.com/material-ui/react-image-list/)
 *
 * API:
 *
 * - [ImageList API](https://mui.com/material-ui/api/image-list/)
 */
const ImageList = $.defineComponent(function ImageList(inProps) {
  const ref = createRef(inProps);
  const props = $.useThemeProps({ props: inProps });

  const [, other] = splitProps(props, [
    "children",
    "className",
    "cols",
    "component",
    "rowHeight",
    "gap",
    "style",
    "variant",
  ]);

  const baseProps = mergeProps(
    {
      cols: 2,
      component: "ul",
      rowHeight: "auto",
      gap: 4,
      variant: "standard",
    },
    props
  );

  const contextValue = createMemo(() => ({
    rowHeight: baseProps.rowHeight,
    gap: baseProps.gap,
    variant: baseProps.variant,
  }));

  onMount(() => {
    if (process.env.NODE_ENV !== "production") {
      // Detect Internet Explorer 8+
      if (
        document !== undefined &&
        "objectFit" in document.documentElement.style === false
      ) {
        console.error(
          [
            "MUI: ImageList v5+ no longer natively supports Internet Explorer.",
            "Use v4 of this component instead, or polyfill CSS object-fit.",
          ].join("\n")
        );
      }
    }
  });

  const style =
    baseProps.variant === "masonry"
      ? mergeProps(
          {
            get columnCount() {
              return baseProps.cols;
            },
            get columnGap() {
              return baseProps.gap;
            },
          },
          () => props.style
        )
      : mergeProps(
          {
            get gridTemplateColumns() {
              return `repeat(${baseProps.cols}, 1fr)`;
            },
            get gap() {
              return baseProps.gap;
            },
          },
          () => props.style
        );

  const ownerState = mergeProps(props, {
    get component() {
      return baseProps.component;
    },
    get gap() {
      return baseProps.gap;
    },
    get rowHeight() {
      return baseProps.rowHeight;
    },
    get variant() {
      return baseProps.variant;
    },
  });

  const classes = $.useClasses(ownerState);

  return (
    <ImageListRoot
      as={baseProps.component}
      class={clsx(classes.root, classes[baseProps.variant], props.className)}
      ref={ref}
      style={style}
      ownerState={ownerState}
      {...other}
    >
      <ImageListContext.Provider value={contextValue()}>
        {props.children}
      </ImageListContext.Provider>
    </ImageListRoot>
  );
});

export default ImageList;
