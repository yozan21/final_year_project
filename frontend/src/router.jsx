import { createBrowserRouter, Navigate } from "react-router-dom";

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
import ClientLayout from "./ui/ClientLayout";
import { ModalProvider } from "./context/ModelContext";
import { Modal } from "./ui";
import ScrollToTop from "./utils/ScrollToTop";
import RouteError from "./ui/RouteError";

export const router = createBrowserRouter([
  // Public routes
  {
    element: (
      <ModalProvider>
        <Modal />
        <ScrollToTop />
        <ClientLayout />
      </ModalProvider>
    ),
    errorElement: <RouteError />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <Login /> },
      {
        path: "/signup",
        element: <Signup />,
        children: [
          { index: true, element: <SignupOptions /> },
          { path: "user", element: <SignupUser /> },
          { path: "landlord", element: <SignupLandlord /> },
        ],
      },
    ],
  },

  // Protected client routes
  {
    element: (
      <ModalProvider>
        <Modal />

        <ScrollToTop />
        <ProtectedRoute>
          <ClientLayout />
        </ProtectedRoute>
      </ModalProvider>
    ),
    errorElement: <RouteError />,
    children: [
      { path: "/explore", element: <Explore /> },
      { path: "/explore-map", element: <ExploreMap /> },
      { path: "/room/:id", element: <RoomDetails /> },
      { path: "/booking/:id", element: <BookingRoom /> },
    ],
  },

  // Landlord dashboard
  {
    path: "/landlord-dashboard",
    element: (
      <ModalProvider>
        <Modal />

        <ScrollToTop />
        <ProtectedRoute>
          <LandlordDashboard />
        </ProtectedRoute>
      </ModalProvider>
    ),
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Navigate to="overview" replace /> },
      { path: "overview", element: <DashboardOverview /> },
      { path: "create", element: <CreateRoom /> },
      { path: "listings", element: <MyListings /> },
      { path: "notifications", element: <Notifications /> },
      { path: "edit/:id", element: <EditRoom /> },
    ],
  },

  // Admin dashboard
  {
    path: "/admin",
    element: (
      <ModalProvider>
        <Modal />

        <ScrollToTop />
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      </ModalProvider>
    ),
    errorElement: <RouteError />,
    children: [
      { index: true, element: <AdminOverview /> },
      { path: "overview", element: <AdminOverview /> },
      { path: "users", element: <UserManagement /> },
      { path: "rooms", element: <RoomManagement /> },
      { path: "reports", element: <ReportsAnalytics /> },
      { path: "settings", element: <SystemSettings /> },
      { path: "security", element: <Security /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);
