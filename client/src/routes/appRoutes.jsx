import Home from "../pages/Home";
import Products from "../pages/Products";
import { ROUTES } from "./paths";

export const appRoutes = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.PRODUCTS,
    element: <Products />,
  }
];
