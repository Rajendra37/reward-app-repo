import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the app title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Customer Reward Points/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders the CustomerList component", () => {
  render(<App />);
  const dropdown = screen.getByRole("combobox");
  expect(dropdown).toBeInTheDocument();
});
