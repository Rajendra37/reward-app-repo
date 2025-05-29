import { calculateRewardPoints } from "./calculateRewardPoints";

describe("calculateRewardPoints", () => {
  // Positive test cases
  it("returns 0 points for $50 or less", () => {
    expect(calculateRewardPoints(50)).toBe(0);
    expect(calculateRewardPoints(0)).toBe(0);
    expect(calculateRewardPoints(10)).toBe(0);
  });

  it("returns correct points for amounts between $51 and $100", () => {
    expect(calculateRewardPoints(51)).toBe(1);
    expect(calculateRewardPoints(75)).toBe(25);
    expect(calculateRewardPoints(100)).toBe(50);
  });

  it("returns correct points for amounts over $100", () => {
    expect(calculateRewardPoints(120)).toBe(90);
    expect(calculateRewardPoints(150)).toBe(150);
  });

  // Fractional amounts
  it("handles fractional amounts correctly (should floor the result)", () => {
    
    expect(calculateRewardPoints(51.7)).toBe(1); 
    expect(calculateRewardPoints(100.9)).toBe(51);  
    expect(calculateRewardPoints(120.5)).toBe(91);  
    expect(calculateRewardPoints(99.99)).toBe(49);  
  });

  // Negative test cases
  it("handles negative amounts as 0 points", () => {
    expect(calculateRewardPoints(-10)).toBe(0);
    expect(calculateRewardPoints(-100)).toBe(0);
  });

  it("handles non-numeric input gracefully", () => {
    expect(calculateRewardPoints(null)).toBe(0);
    expect(calculateRewardPoints(undefined)).toBe(0);
    expect(calculateRewardPoints("abc")).toBe(0);
  });
});