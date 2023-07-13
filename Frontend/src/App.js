import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/user/login/Login";
import Register from "./components/user/register/Register";
import SimpleMap from "./components/map/Simple";
import Home from "./components/user/home/Home";
import Order from "./components/user/order/Order";
import BookOrder from "./components/user/order/BookOrder";
import Profile from "./components/user/Profile/UpdateProfile";
import FuelHome from "./components/fuelStation/home/Home";
import FuelOrder from "./components/fuelStation/order/Order";
import FuelOrderHistory from "./components/fuelStation/order/OrderHistory";
import UpdateProfile from "./components/fuelStation/Profile/UpdateProfile";
import GetStarted from "./components/getStarted/Index";
import Auth from "./components/user/credentials/Auth";
import FuelAuth from "./components/fuelStation/credentials/Auth"
import FuelLogin from "./components/fuelStation/login/Login"
import FuelRegister from "./components/fuelStation/register/Register"
import { Toaster } from "react-hot-toast";
import UpdateFuel from "./components/fuelStation/inventory/UpdateFuel";
import OrderHistory from "./components/user/order/OrderHistory";
import { toast } from "react-toastify";
import { useEffect } from "react";
function App() {
  return (
    <Routes>
      <Route path="/" element={<GetStarted/>}>
      </Route>
      <Route path="user">
        <Route path="auth" element={<Auth/>}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="logout" element={<LogoutUser/>} />
        <Route path="" element={<Home />} />
        <Route path="order" element={<Order />} />
        <Route path="bookOrder/:id" element={<BookOrder />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="orderHistory" element={<OrderHistory />} />
      </Route>
      <Route path="seller">
      <Route path="auth" element={<FuelAuth/>}>
          <Route path="register" element={<FuelRegister/>}/>
          <Route path="login" element={<FuelLogin/>} />
        </Route>
        <Route path="" element={<FuelHome />} />
        <Route path="order" element={<FuelOrder />} />
        <Route
          path="orderHistory"
          element={<FuelOrderHistory />}
        />
        <Route path="logout" element={<LogoutSeller/>}/>
        <Route path="profile" element={<UpdateProfile />} />
        <Route path="update-inventory" element={<UpdateFuel/>}/>
      </Route>
      <Route path="map" element={<SimpleMap lat={12.2} lng={23.4} />}></Route>
    </Routes>
  );
}
const LogoutSeller = () =>{
  const navigate = useNavigate();
  localStorage.removeItem("fuelStation");
  toast.success("Log Out");
  useEffect(()=>{
    navigate("/seller/")
  },[])
}
const LogoutUser = () =>{
  const navigate = useNavigate();
  localStorage.removeItem("user");
  toast.success("Log Out");
  useEffect(()=>{
    navigate("/user/")
  },[])
}
export default App;
export {LogoutSeller};
export {LogoutUser};

