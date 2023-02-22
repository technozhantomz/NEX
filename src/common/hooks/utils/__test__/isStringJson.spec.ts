import { isJson } from "../isStringJson";

describe("isJson", () => {
  it("returns true for valid JSON string", () => {
    const jsonString = '{"name": "John Doe", "age": 30}';
    expect(isJson(jsonString)).toBe(true);
  });

  it("returns false for invalid JSON string", () => {
    const invalidJsonString = '{name: "John Doe", "age": 30}';
    expect(isJson(invalidJsonString)).toBe(false);
  });

  it("returns false for non-string input", () => {
    const nonStringInput = '{ name: "John Doe", age: 30 }';
    expect(isJson(nonStringInput)).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isJson("")).toBe(false);
  });
});
