import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../Login";

describe("Test suite for Login component", () => {
  it("renders the Login compoenent", () => {
    render(<Login />);
    const loginElement = screen.getByText(/Login/i);
    expect(loginElement).toBeTruthy();
  });
});
