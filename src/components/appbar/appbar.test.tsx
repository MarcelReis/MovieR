import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AppBar from ".";

describe("The <Appbar />", () => {
  describe("When rendering by default", () => {
    it("Should render the title and interaction buttons", () => {
      render(<AppBar />);

      expect(
        screen.getByRole("button", { name: /search/i })
      ).toBeInTheDocument();

      expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();

      expect(
        screen.getByRole("heading", { name: /movier/i })
      ).toBeInTheDocument();
    });
  });

  describe("When clicking in the search button", () => {
    it("Should remove the default appbar", () => {
      render(<AppBar />);

      userEvent.click(screen.getByRole("button", { name: /search/i }));
      expect(
        screen.getByRole("button", { name: /close search/i })
      ).toBeInTheDocument();

      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("Should render the input and the button to cancel", () => {});
  });
});
