import { fireEvent, render } from "@testing-library/react";

import { useKeyInput } from "../useKeyInput";

function DummyComponent() {
  const { isVisible, toggleVisibility } = useKeyInput();
  return (
    <div>
      <button onClick={toggleVisibility}>Toggle Visibility</button>
      {isVisible && <p>Key Input is visible</p>}
    </div>
  );
}
describe("UseKeyInput", () => {
  it("toggleVisibility changes isVisible state", () => {
    const { getByText, queryByText } = render(<DummyComponent />);
    const button = getByText("Toggle Visibility");
    const keyInputVisible = queryByText("Key Input is visible");
    expect(keyInputVisible).toBeNull();
    fireEvent.click(button);
    expect(queryByText("Key Input is visible")).not.toBeNull();
    fireEvent.click(button);
    expect(queryByText("Key Input is visible")).toBeNull();
  });
});
