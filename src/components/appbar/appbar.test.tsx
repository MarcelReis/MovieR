import React from "react";

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AppBar from ".";

import { renderWithRouter } from "../../config/test-utils";

describe("The <Appbar />", () => {
  describe("When rendering by default", () => {
    it("Should render the title and interaction buttons", () => {
      renderWithRouter(<AppBar />);

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
      renderWithRouter(<AppBar />);

      userEvent.click(screen.getByRole("button", { name: /search/i }));
      expect(
        screen.getByRole("button", { name: /close search/i })
      ).toBeInTheDocument();

      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("Should render the input and the button to cancel", () => {});
  });
});
