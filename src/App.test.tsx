import App from "./App";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("App", () => {
  test("Should add two numbers", () => {
    render(<App />);
    expect(screen.getAllByText("Hello"));
  });
});
