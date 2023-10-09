import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Test suite for Footer component", () => {
    it("renders the Footer compoenent", () => {
        render(<Footer/>);
        const footerElement = screen.getByText(/Pixellpay Innovations Private Limited, All rights reserved./i);
        expect(footerElement).toBeTruthy();
    });
});