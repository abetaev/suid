import Box from ".";
import { screen, render } from "solid-testing-library";
import { describe, expect, it } from "vitest";

describe("Box", () => {
  it("uses mt system prop", () => {
    const { unmount } = render(() => <Box data-testid="e" mt={3} />);
    const e = screen.getByTestId("e");
    expect(window.getComputedStyle(e).marginTop).toBe("24px");
    unmount();
  });
});

export {};
