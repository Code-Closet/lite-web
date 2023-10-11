import { render, screen } from "@testing-library/react";
import Login from "../Login";
import { BrowserRouter } from "react-router-dom";

const MockLoginComponent = () => {
  return (
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe("Test suite for Login component", () => {
  it("renders the Login compoenent", () => {
    render(<MockLoginComponent />);
    const loginElement = screen.getByText(/Login/i);
    expect(loginElement).toBeTruthy();
  });

  it("should render the username input", () => {
    render(<MockLoginComponent />);
    const usernameInput = screen.getByText(/Username/i);
    expect(usernameInput).toBeInTheDocument();
  });

  it("should render the password input", () => {
    render(<MockLoginComponent />);
    const passwordInput = screen.getByText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it("should render the login button", () => {
    render(<MockLoginComponent />);
    const loginButton = screen.getByRole("button");
    expect(loginButton).toBeInTheDocument();
  });
});
