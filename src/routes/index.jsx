import MainLayout from "../layouts/MainLayout";
import DashBoard from "../pages/DashBoard";
import HotelPage from "../pages/HotelPage";
import LoginPage from "../pages/LoginPage";
import RoomPage from "../pages/RoomPage";
import UserPage from "../pages/UserPage";
import PrivateRoute from "./PrivateRoute";
export default [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashBoard /> },
      { path: "hotel", element: <HotelPage /> },
      { path: "hotel/:id", element: <RoomPage /> },
      { path: "user", element: <UserPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];
