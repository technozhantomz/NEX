import { fireEvent, render } from "@testing-library/react";

import { useCopyButton } from "../useCopyButton";

function DummyComponent() {
  const { copied, handleClick } = useCopyButton();
  return (
    <div>
      <button onClick={() => handleClick("test value")}>copy</button>
      {copied && <p>copied</p>}
    </div>
  );
}

describe("useCopyButton", () => {
  beforeEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: jest.fn(),
      },
      writable: true,
    });
  });

  it("copies text to clipboard and updates copied state when button is clicked", () => {
    const { getByText, queryByText } = render(<DummyComponent />);
    const button = getByText("copy");
    const textCopied = queryByText("copied");
    expect(textCopied).toBeNull();
    fireEvent.click(button);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test value");
    expect(queryByText("copied")).not.toBeNull();
  });
});
