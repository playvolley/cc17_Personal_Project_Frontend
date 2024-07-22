import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginForm from "../layouts/LoginForm";
import RegisterForm from "../layouts/RegisterForm";
import Header from "../layouts/Header";
import UserHome from "../layouts/UserHome";
import useAuth from "../hooks/useAuth";
import GuestHome from "../layouts/GuestHome";
import Menu from "../layouts/Menu";
import Cart from "../layouts/Cart";
import Order from "../layouts/ConfirmOrder";
import OrderHistory from "../layouts/OrderHistory";
import AdminPage from "../layouts/AdminPage";
import AdminOrder from "../layouts/AdminOrder";
import AdminProduct from "../layouts/AdminProduct";
import AdminPayment from "../layouts/AdminPayment";
import AdminGenerateQR from "../layouts/AdminGenerateQR";

const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    errorElement: (
      <>
        <Header />
        <h1> Oops!! Invalid path</h1>
      </>
    ),
    children: [
      { index: true, element: <GuestHome /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/login", element: <LoginForm /> },
    ],
  },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    errorElement: (
      <>
        <Header />
        <h1> Oops!! Invalid path</h1>
      </>
    ),
    children: [
      { index: true, element: <UserHome /> },
      { path: "/menu", element: <Menu /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order", element: <Order /> },
      { path: "/orderhistory", element: <OrderHistory /> },
    ],
  },
]);

const AdminRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    errorElement: (
      <>
        <Header />
        <h1> Oops!! Invalid path</h1>
      </>
    ),
    children: [
      { index: true, element: <AdminPage /> },
      { path: "/admin/order", element: <AdminOrder /> },
      { path: "/admin/product", element: <AdminProduct /> },
      { path: "/admin/payment", element: <AdminPayment /> },
      { path: "/admin/generate", element: <AdminGenerateQR /> },
    ],
  },
]);

export default function AppRouter() {
  const { user } = useAuth();
  let finalRouter;
  if (user?.id) {
    finalRouter = user.isAdmin ? AdminRouter : userRouter;
  } else {
    finalRouter = guestRouter;
  }
  return <RouterProvider router={finalRouter} />;
}
