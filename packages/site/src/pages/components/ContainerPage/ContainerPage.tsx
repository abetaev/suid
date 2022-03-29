import Container from "@suid/material/Container";
import ComponentInfo from "~/components/ComponentInfo";
import SimpleContainerExample from "./SimpleContainerExample";

export default function ContainerPage() {
  return (
    <ComponentInfo
      name={Container.name}
      examples={[
        {
          bgcolor: "contrasted",
          component: SimpleContainerExample,
        },
      ]}
    />
  );
}
