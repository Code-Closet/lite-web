import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../Login";

describe("Test suite for Login component", () => {
  it("renders the Login compoenent", () => {
    render(<Login />);
    const loginElement = screen.getByText(/Login/i);
    expect(loginElement).toBeTruthy();
  });

  it("should render the username input", () => {
    render(<Login />);
    const usernameInput = screen.getByText(/Username/i);
    expect(usernameInput).toBeInTheDocument();
  });

  it("should render the password input", () => {
    render(<Login />);
    const passwordInput = screen.getByText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it("should render the login button", () => {
    render(<Login />);
    const loginButton = screen.getByRole("button");
    expect(loginButton).toBeInTheDocument();
  });
});
