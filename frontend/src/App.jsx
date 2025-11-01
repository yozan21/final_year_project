import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Explore from "./pages/Explore";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      // staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <ScrollToTop />
        <ModalProvider>
          <Modal />

          <Routes>
            {/* Dashboard routes (no Navbar) */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<AdminOverview />} />
              <Route path="overview" element={<AdminOverview />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="rooms" element={<RoomManagement />} />
              <Route path="reports" element={<ReportsAnalytics />} />
              <Route path="settings" element={<SystemSettings />} />
              <Route path="security" element={<Security />} />
            </Route>
            {/* Main app routes (with Navbar) */}
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />}>
                      <Route index element={<SignupOptions />} />
                      <Route path="user" element={<SignupUser />} />
                      <Route path="landlord" element={<SignupLandlord />} />
                    </Route>
                    <Route
                      element={
                        <ProtectedRoute>
                          <Outlet />
                        </ProtectedRoute>
                      }
                    >
                      <Route path="/explore" element={<Explore />} />
                      <Route path="/room/:id" element={<RoomDetails />} />
                      <Route path="/booking/:id" element={<BookingRoom />} />
                      <Route
                        path="/landlord-dashboard"
                        element={<LandlordDashboard />}
                      >
                        <Route index element={<DashboardOverview />} />
                        <Route
                          path="overview"
                          element={<DashboardOverview />}
                        />
                        <Route path="create" element={<CreateRoom />} />
                        <Route path="listings" element={<MyListings />} />
                        <Route
                          path="notifications"
                          element={<Notifications />}
                        />
                        <Route path="edit/:id" element={<EditRoom />} />
                      </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </ModalProvider>
      </Router>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "4px" }}
        toastOptions={{
          success: {
            duration: 2000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "580px",
            padding: "16px 24px",
            backgroundColor: "#eeef",
            color: "#1F2937",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
