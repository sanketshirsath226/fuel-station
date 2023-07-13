import { Outlet, useNavigate } from "react-router-dom";
import authImage from "../../../assets/images/AuthFuelStation.gif";
import { useEffect, useState } from "react";
import {
    AiOutlineMail,
    AiOutlineEyeInvisible,
    AiOutlineEye,
    AiOutlineLock,
    AiOutlineMobile
  } from "react-icons/ai";
import authService from "../../../services/auth.service";
import { toast } from "react-toastify";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError] = useState("");
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

//   useEffect(()=>{
//     if(user){
//         navigate('/user/home')
//     }
//   },[user])

  return (
    <div className="min-h-screen  bg-[#252422] flex flex-col lg:flex-row justify-evenly items-center">
      <div className="h-[45%]">
        <img src={authImage} alt={"Auth Image"} />
      </div>
      <div className="text-white flex flex-col gap-10">
        <Outlet/>
      </div>
    </div>
  );
}
export default Auth;
