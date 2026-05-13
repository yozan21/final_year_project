import { Outlet } from "react-router-dom";
import DashboardLayout from "../components/landlord-dashboard/DashboardLayout";
const LandlordDashboard = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default LandlordDashboard;
