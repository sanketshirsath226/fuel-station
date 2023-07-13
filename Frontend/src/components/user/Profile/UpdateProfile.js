import Card from "./Card";
import LoginLight from "../../../assets/images/loginLight.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../../../services/auth.service";
import { toast } from "react-toastify";


function UpdateProfile(){
  const [oldPassword,setOldPassword] = useState("");
  const [newPassword,setNewPassword] = useState("");
  const [confirmPassowrd,setConfirmPassword] = useState("");
  const navigate = useNavigate();
  
  const user = authService.getCurrentUser();
  
  useEffect(()=>{
    if(!user){
      navigate('/user/auth/login')
    }
  },[])


  const onHandleSubmit =  async (e) =>{
    e.preventDefault();
    if(newPassword !== confirmPassowrd){
        toast.error("Password and Confirm Password not matching")
        return
    }
    try {
      await authService.updateProfilePassword(user.userId,oldPassword,newPassword).then(
        (response) => {
           toast.success(response.data.message)
           navigate("../logout");
        },
        (error) => {
          console.log(error)
          toast.error(error.response.data.message);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div
      className="w-[screen] h-screen flex flex-col justify-around items-center lg:md:flex-row"
      style={{
        backgroundImage: `linear-gradient(45deg,rgba(0,0,0, 0.75),rgba(0,0,0, 0.75)),url(${LoginLight})`,
        backgroundPosition: `50% 50%`,
        backgroundSize: `cover`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-white p-3 text-center text-[54px] flex flex-row justify-around items-center gap-3  whitespace-break-spaces font-sans  lg:text-[96px] md:text-[74px] ">
        <h1>Profile</h1>
      </div>
      <div className="w-[100%] text-white  h-[100%] justify-center gap-5 lg:w-1/3 items-center flex flex-col flex-wrap overflow-scroll">
        <div className="header">
          <h1 className="text-center text-[54px]">Change Passsword</h1>
          <p>Please Fill in the old and new Passsword</p>
        </div>
        <form class="w-full max-w-sm" onSubmit={onHandleSubmit}>
          <div class="gap-3 md:flex md:items-center mb-6 ">
          <div class="md:w-2/3">
              <label
                class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-currentPassword"
              >
                Current Password 
              </label>
            </div>
            <div class="mb-3 lg:mb-0">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-currentPassword"
                type="password"
                value={oldPassword}
                required
                minLength={8}
                onChange={(e)=>{
                    setOldPassword(e.target.value)
                }}
                placeholder="Password"
              />
            </div>
          </div>
     <div class="gap-3 md:flex md:items-center mb-6 ">
     <div class="md:w-2/3">
              <label
                class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-newPassword"
              >
                New Passsword 
              </label>
            </div>
            <div class="">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-newPassword"
                type="password"
                value={newPassword}
                required
                minLength={8}

                onChange={(e)=>{
                    setNewPassword(e.target.value)
                }}
                placeholder="New Password"
              />
            </div>
          </div>
          <div class="gap-3 md:flex md:items-center mb-6 ">
          <div class="md:w-2/3">
              <label
                class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-confirm"
              >
                Confirm  Passsword
              </label>
            </div>
            <div class="">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-confirm"
                type="password"
                value={confirmPassowrd}
                required
                minLength={8}
                onChange={(e)=>{
                    setConfirmPassword(e.target.value)
                }}
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="actions w-full flex flex-col gap-4">
            <button
              className="bg-[#fe6f2b] hover:bg-[#F59337] w-full text-white font-bold py-2 px-4 rounded-full"
            >
              Update
            </button>
            <button
              className="bg-transparent border border-[#fe6f2b] w-full hover:bg-[#F59337] text-white font-bold py-2 px-4 rounded-full"
              onClick={((e)=>{
                e.preventDefault();
                navigate('../')
              })}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default UpdateProfile;