import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence, LayoutGroup } from "framer-motion";

import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import HomePage from "./pages/HomePage";
import Explore from "./pages/Explore";
import ExploreMap from "./pages/ExploreMap";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandlordDashboard from "./pages/LandlordDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import SignupOptions from "./components/signuppage/SignupOptions";
import SignupUser from "./components/signuppage/SignupUser";
import SignupLandlord from "./components/signuppage/SignupLandlord";
import RoomDetails from "./pages/RoomDetails";
import BookingRoom from "./pages/BookingRoom";
import { ModalProvider } from "./context/ModelContext";
import { Modal } from "./ui";

import ScrollToTop from "./utils/ScrollToTop";
import DashboardOverview from "./components/landlord-dashboard/DashboardOverview";
import CreateRoom from "./components/landlord-dashboard/CreateRoom";
import MyListings from "./components/landlord-dashboard/MyListings";
import Notifications from "./components/landlord-dashboard/Notifications";
import EditRoom from "./components/landlord-dashboard/EditRoom";

import AdminOverview from "./components/admin-dashboard/AdminOverview";
import UserManagement from "./components/admin-dashboard/UserManagement";
import RoomManagement from "./components/admin-dashboard/RoomManagement";
import SystemSettings from "./components/admin-dashboard/SystemSettings";
import ReportsAnalytics from "./components/admin-dashboard/ReportsAnalytics";
import Security from "./components/admin-dashboard/Security";
import ProtectedRoute from "./ui/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import ClientLayout from "./ui/ClientLayout";
import { router } from "./router";
import { useInitAuth } from "./hooks/useAuthInit";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      // staleTime: 0,
    },
  },
});

function App() {
  const isReady = useInitAuth();
  console.log(isReady);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <LayoutGroup>
        <AnimatePresence mode="popLayout">
          {!isReady && <LoadingScreen key="app-loader" />}
        </AnimatePresence>
        <RouterProvider router={router} />
      </LayoutGroup>
      <Toaster
        position="top-right"
        gutter={10}
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "0.9rem",
            fontWeight: 600,
            borderRadius: "10px",
            padding: "0.75rem 1.1rem",
            boxShadow: "0 8px 24px rgba(112, 54, 22, 0.12)",
            border: "1px solid #F1D7C8",
            background: "#FFFFFF",
            color: "#211713",
          },
          success: {
            duration: 2500,
            iconTheme: {
              primary: "#FE6218",
              secondary: "#FFF9F5",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "#B42318",
              secondary: "#FFF9F5",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
