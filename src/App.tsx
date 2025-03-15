import { Toaster } from "@/components/ui/toaster";
  import { Toaster as Sonner } from "@/components/ui/sonner";
  import { TooltipProvider } from "@/components/ui/tooltip";
  import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
  import { AuthProvider } from "@/hooks/useAuth";
  import AppLayout from "@/components/layout/AppLayout";
  import Index from "./pages/Index";
  import Login from "./pages/Login";
  import MembershipPlans from "./pages/MembershipPlans";
  import NotFound from "./pages/NotFound";
  import AdminDashboard from "./pages/admin/Dashboard";
  import UserDashboard from "./pages/user/Dashboard";
  import UserPayments from "./pages/user/Payments";
  import UserProfile from "./pages/user/Profile";
  import AdminUsers from "./pages/admin/Users";
  import AdminPayments from "./pages/admin/Payments";
  import AdminAttendance from "./pages/admin/Attendance";
  import AdminProfile from "./pages/admin/Profile";


  const App = () => (
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login/:role?" element={<Login />} />
            <Route path="/membership-plans" element={<MembershipPlans />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AppLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="attendance" element={<AdminAttendance />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>

            {/* User Routes */}
            <Route path="/user" element={<AppLayout />}>
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="payments" element={<UserPayments />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  );

  export default App;
