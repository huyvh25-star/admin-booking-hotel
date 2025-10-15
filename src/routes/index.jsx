import MainLayout from "../layouts/MainLayout";
import DashBoard from "../pages/DashBoard";
import HotelPage from "../pages/HotelPage";
import RoomPage from "../pages/RoomPage";

export default [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <DashBoard /> },
      { path: "hotel", element: <HotelPage /> },
      { path: "hotel/:id", element: <RoomPage /> },
    ],
  },
];
