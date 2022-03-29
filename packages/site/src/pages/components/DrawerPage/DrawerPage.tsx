import Drawer from "@suid/material/Drawer";
import ComponentInfo from "~/components/ComponentInfo";
import TemporaryDrawerExample from "./TemporaryDrawerExample";

export default function DrawerPage() {
  return (
    <ComponentInfo
      scope="material"
      name={Drawer.name}
      docsName={"drawers"}
      examples={[TemporaryDrawerExample]}
    />
  );
}
