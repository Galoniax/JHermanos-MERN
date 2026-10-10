import {
  Checkout,
  Contact,
  Home,
  Login,
  ProductDetail,
  Products,
  Register,
} from "../pages";
import { ROUTES } from "./paths";

import PublicRoutes from "./guards/PublicRoutes";

export const appRoutes = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.PRODUCTS,
    element: <Products />,
  },
  {
    path: "/product/:id/:slug?",
    element: <ProductDetail />,
  },
  {
    path: ROUTES.CONTACT,
    element: <Contact />,
  },
  {
    path: ROUTES.CHECKOUT,
    element: <Checkout />,
  },
  {
    element: <PublicRoutes />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.REGISTER,
        element: <Register />,
      },
    ],
  },
];
