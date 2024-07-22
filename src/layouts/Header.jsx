import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log("object=>>>", user);
  const hdlLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-red-800 p-3">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/">
            <svg
              className="fill-current h-8 w-8 mr-2"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg>
          </Link>
          <Link to="/">
            <span className="font-semibold text-xl tracking-tight">
              Yakiniku
            </span>
          </Link>
        </div>

        {user?.isAdmin === true && (
          <div className="flex flex-row gap-8 text-white font-bold">
            <Link to="/">Home</Link>
            <Link to="/admin/order">Order</Link>
            <Link to="/admin/product">Product</Link>
            <Link to="/admin/payment">Payment</Link>
            <Link to="/admin/generate">Generate</Link>
          </div>
        )}

        <div className="text-white mr-6">
          {user ? (
            <div>
              <button onClick={hdlLogout}>Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
