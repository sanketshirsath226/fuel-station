import LoginLight from "../../../assets/images/loginLight.jpg";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { BsFuelPump } from "react-icons/bs";
import { useEffect, useState } from "react";
import SimpleMap from "../../map/Simple";
import authService from "../../../services/auth.service";
function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const fuelStation = AuthService.getCurrentFuelStation();
  const [pointer, setPointer] = useState(null);
  const [name, setName] = useState(null);
  const getResposne = async () => {
    try {
      await authService.getFuelStationByID(fuelStation.stationId).then(
        (response) => {
          console.log(response);
          setName(response.data.name);
          setPointer(response.data.location);
        },
        (error) => {
          console.log(error.response.data.message);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getResposne();
  }, []);
  
  useEffect(() => {
    if (!fuelStation) {
      navigate("/seller/auth/login");
    }
  }, [fuelStation]);

  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(45deg,rgba(0,0,0, 0.75),rgba(0,0,0, 0.75)),url(${LoginLight})`,
        backgroundPosition: `50% 50%`,
        backgroundSize: `cover`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex w-full h-full flex-col gap-10 justify-evenly items-center align lg:flex-row lg:gap-0 md:gap-5">
        <div className="flex w-1/2 h-1/2 lg:w-1/2 lg:h-[75%] flex-coL">
          {pointer ? (
            <SimpleMap
              pointer={pointer}
              setPointer={setPointer}
              disable={true}
            />
          ) : null}
        </div>
        <div className="flex flex-row justify-evenly items-center  gap-5 lg:flex-row flex-wrap lg:gap-10 lg:w-[30%] ">
          <div className="text-white text-center text-[54px] flex flex-row justify-center items-center gap-3  whitespace-break-spaces font-sans  lg:text-[96px] md:text-[74px] ">
            <BsFuelPump className="text-[#fe6f2b]"/>
            <h1>{name}</h1>
          </div>
          <div className="flex flex-row justify-evenly items-center  gap-3 lg:flex-row flex-wrap lg:gap-5 lg:w-[100%] ">
            <div>
              <Link
                to="/seller/update-inventory"
                className="flex items-center justify-center  w-[200px] h-[100px] bg-gray-800 rounded-lg shadow hover:bg-[#fe6f2b]"
              >
                <h5 className="mb-2 lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Update Fuel
                </h5>
              </Link>
            </div>
            <div>
              <Link
                to="/seller/order"
                className="flex items-center justify-center  w-[200px] h-[100px] bg-gray-800 rounded-lg shadow hover:bg-[#fe6f2b]"
              >
                <h5 className="mb-2 lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Order Fuel
                </h5>
              </Link>
            </div>
            <div>
              <Link
                to="/seller/orderHistory"
                className="flex items-center justify-center  w-[200px] h-[100px] bg-gray-800 rounded-lg shadow hover:bg-[#fe6f2b]"
              >
                <h5 class="mb-2 lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Order History
                </h5>
              </Link>
            </div>
            <div>
              <Link
                to="/seller/Profile"
                className="flex items-center justify-center  w-[200px] h-[100px] bg-gray-800 rounded-lg shadow hover:bg-[#fe6f2b]"
              >
                <h5 className="mb-2  lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Profile
                </h5>
              </Link>
            </div>
            <div>
              <Link
                to="/seller/logout"
                className="flex items-center justify-center  w-[200px] h-[100px] bg-gray-800 rounded-lg shadow hover:bg-[#fe6f2b]"
              >
                <h5 class="mb-2 lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Log out
                </h5>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
