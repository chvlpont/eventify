import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("should render the footer containing a div with 'Contact Us'", () => {
    render(<Footer />); // ARRANGE
    const divElement = screen.getByText("Contact Us"); // ACT
    expect(divElement).toBeInTheDocument(); // ASSERT
  });

  it("should render the footer containing a div with 'About'", () => {
    render(<Footer />); // ARRANGE
    const divElement = screen.getByText("About"); // ACT
    expect(divElement).toBeInTheDocument(); // ASSERT
  });

  it("should render the footer containing a div with 'FAQ'", () => {
    render(<Footer />); // ARRANGE
    const divElement = screen.getByText("FAQ"); // ACT
    expect(divElement).toBeInTheDocument(); // ASSERT
  });
});
