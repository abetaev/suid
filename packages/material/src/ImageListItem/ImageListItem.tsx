import clsx from "clsx";
import { isFragment } from "react-is";
import ImageListContext from "../ImageList/ImageListContext";
import styled from "../styles/styled";
import isMuiElement from "@suid/utils/isMuiElement";
import { getImageListItemUtilityClass } from "./imageListItemClasses";
import imageListItemClasses from "./imageListItemClasses";
import createComponentFactory from "@suid/base/createComponentFactory";
import { ImageListItemTypeMap } from ".";
import createRef from "@suid/system/createRef";
import { useContext, splitProps, mergeProps } from "solid-js";
const $ = createComponentFactory<ImageListItemTypeMap>()({
  name: "MuiImageListItem",
  selfPropNames: ["children", "classes", "cols", "rows"],
  utilityClass: getImageListItemUtilityClass,
  slotClasses: (ownerState) => ({
    root: ["root", ownerState.variant],
    img: ["img"],
  }),
});

const ImageListItemRoot = styled("li", {
  name: "MuiImageListItem",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${imageListItemClasses.img}`]: styles.img },
      styles.root,
      styles[ownerState.variant],
    ];
  },
})(({ ownerState }) => ({
  display: "block",
  position: "relative",
  ...(ownerState.variant === "standard" && {
    // For titlebar under list item
    display: "flex",
    flexDirection: "column",
  }),
  ...(ownerState.variant === "woven" && {
    height: "100%",
    alignSelf: "center",
    "&:nth-of-type(even)": {
      height: "70%",
    },
  }),
  [`& .${imageListItemClasses.img}`]: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    display: "block",
    ...(ownerState.variant === "standard" && {
      height: "auto",
      flexGrow: 1,
    }),
  },
}));

/**
 *
 * Demos:
 *
 * - [Image List](https://mui.com/material-ui/react-image-list/)
 *
 * API:
 *
 * - [ImageListItem API](https://mui.com/material-ui/api/image-list-item/)
 */
const ImageListItem = $.defineComponent(function ImageListItem(inProps) {
  const ref = createRef(inProps);
  const props = $.useThemeProps({ props: inProps });

  // TODO: - Use jsdoc @default?: "cols rows default values are for docs only"
  const [, other] = splitProps(props, [
    "children",
    "className",
    "cols",
    "component",
    "rows",
    "style",
  ]);

  const baseProps = mergeProps(
    {
      cols: 1,
      component: "li",
      rows: 1,
    },
    props
  );

  const { rowHeight = "auto", gap, variant } = useContext(ImageListContext);

  let height = "auto";
  if (variant === "woven") {
    height = undefined;
  } else if (rowHeight !== "auto") {
    height = rowHeight * baseProps.rows + gap * (baseProps.rows - 1);
  }

  const ownerState = mergeProps(props, {
    get cols() {
      return baseProps.cols;
    },
    get component() {
      return baseProps.component;
    },
    gap: gap,
    rowHeight: rowHeight,
    get rows() {
      return baseProps.rows;
    },
    variant: variant,
  });

  const classes = $.useClasses(ownerState);

  return (
    <ImageListItemRoot
      as={baseProps.component}
      class={clsx(classes.root, classes[variant], props.className)}
      ref={ref}
      style={mergeProps(
        {
          height: height,
          get gridColumnEnd() {
            return variant !== "masonry" ? `span ${baseProps.cols}` : undefined;
          },
          get gridRowEnd() {
            return variant !== "masonry" ? `span ${baseProps.rows}` : undefined;
          },
          get marginBottom() {
            return variant === "masonry" ? gap : undefined;
          },
        },
        () => props.style
      )}
      ownerState={ownerState}
      {...other}
    >
      {React.Children.map(props.children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        if (process.env.NODE_ENV !== "production") {
          if (isFragment(child)) {
            console.error(
              [
                "MUI: The ImageListItem component doesn't accept a Fragment as a child.",
                "Consider providing an array instead.",
              ].join("\n")
            );
          }
        }

        if (child.type === "img" || isMuiElement(child, ["Image"])) {
          return React.cloneElement(child, {
            get className() {
              return clsx(classes.img, child.props.className);
            },
          });
        }

        return child;
      })}
    </ImageListItemRoot>
  );
});

export default ImageListItem;
