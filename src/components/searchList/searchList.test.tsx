import React, { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";

import SearchList from ".";

jest.mock("../../api");

describe("The <Appbar />", () => {
  const defaultProps: ComponentProps<typeof SearchList> = {
    open: true,
    searchString: "",
  };

  const setup = (props?: Partial<ComponentProps<typeof SearchList>>) =>
    render(<SearchList {...defaultProps} {...props} />);

  describe("When rendering by default", () => {
    it("Should render the title without errors", () => {
      setup();
    });
  });

  describe("When the user start tiping", () => {
    it("Should display a placeholder list", () => {});
  });
});
