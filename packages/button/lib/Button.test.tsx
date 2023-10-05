import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Test suite for Button component", () => {
  it("renders the Button compoenent", () => {
    render(<Button label="submit"></Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeTruthy();
  });
});
