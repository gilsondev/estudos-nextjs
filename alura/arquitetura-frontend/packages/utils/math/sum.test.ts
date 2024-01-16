import { sum } from "./sum";

describe("sum()", () => {
  it("when two numbers are passed, should return their sum", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
