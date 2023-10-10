import { createBrowserRouter } from "react-router-dom";
import PageOutlet from "./PageOutlet";
import React from "react";
import Login from "../pages/Login";

interface V6Route {
  path: string;
  element: React.ReactElement;
  title?: string;
  children?: V6Route[];
}

export const routes: V6Route[] = [
  {
    path: "",
    element: <PageOutlet />,
    children: [{ path: "", element: <Login /> }],
  },
];

const router = createBrowserRouter(routes);
export default router;
