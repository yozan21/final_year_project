import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function ClientLayout({ isLoading }) {
  return (
    <>
      <Navbar showBrand={!isLoading} />
      <Outlet />
    </>
  );
}

export default ClientLayout;
