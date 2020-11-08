import React from "react";
import { Queries, render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MemoryRouterProps } from "react-router";
import { ThemeProvider } from "@material-ui/core/styles";

import { theme } from "../theme";

export function renderWithAllProviders<Q extends Queries>(
  children: React.ReactElement,
  options?: RenderOptions<Q> & {
    routerProps?: MemoryRouterProps;
  }
) {
  function AllProviders({ children }: any) {
    return (
      <ThemeProvider theme={theme}>
        <MemoryRouter {...options?.routerProps}>{children}</MemoryRouter>;
      </ThemeProvider>
    );
  }

  return render(children, { ...options, wrapper: AllProviders });
}

export function renderWithRouter<Q extends Queries>(
  children: React.ReactElement,
  options?: RenderOptions<Q> & {
    routerProps?: MemoryRouterProps;
  }
) {
  function AllProviders({ children }: any) {
    return <MemoryRouter {...options?.routerProps}>{children}</MemoryRouter>;
  }

  return render(children, { ...options, wrapper: AllProviders });
}

export * from "@testing-library/react";
