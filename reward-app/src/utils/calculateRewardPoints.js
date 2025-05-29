export const calculateRewardPoints = (amount) => {
  let points = 0;

  if (amount > 100) {
    // For every dollar spent over $100, earn 2 points
    // Plus, earn 1 point for each dollar between $51 and $100 (i.e., 50 points)
    points = points + 2 * (amount - 100) + 50;
  } else if (amount > 50) {
    // For every dollar spent over $50 (up to $100), earn 1 point
    points = points + amount - 50;
  }
  // Return the total points as an integer
  return Math.floor(points);
};
