import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authService from "../../../services/auth.service";
import LoginLight from "../../../assets/images/loginLight.jpg";
import Modal from "../../modal/Modal";
import { getDistance } from "geolib";
import {BsFuelPump} from "react-icons/bs"
import BookPreview from "../../modal/BookPreview";
import { toast } from "react-toastify";
function BookOrder() {
  const { id } = useParams();
  const [station, setStation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal,setShowOrderModal] = useState(false);
  const [userInfo,setUserInfo] = useState(null);
  const [address, setAddress] = useState(null);
  const [petrolQuantity,setPetrolQuantity] = useState(0)
  const [petrolPrice,setPetrolPrice] = useState(0)

  const [dieselQuantity,setDieselQuantity] = useState(0)
  const [dieselPrice,setDieselPrice] = useState(0)

  const [totalPrice,setTotalPrice] = useState(0);
  const [transactionData,setTransactionData] = useState(null);

  const [method, setMethod] = useState();
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const getResposne = async () => {
    try {
      await authService.getFuelStationByID(id).then(
        (response) => {
          console.log(response);
          setStation(response.data);
        },
        (error) => {
          console.log(error.response.data.message);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getUserResponse = async () => {
    try {
      await authService.getUserInfo(user.userId).then(
        (response) => {
          console.log(response);
          setUserInfo(response.data);
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
    if (!user) {
      navigate("/user/login");
    }
    console.log(user);
  }, [user]);

  useEffect(()=>{
    console.log(transactionData)
    if(transactionData){
      if(transactionData.msg === "Success"){
        const updatedMethod = {"online" : {
          ...method.online,
          transactionID : transactionData.paymentId,
          status : 'success'
        }}
        postOrder(updatedMethod); 
        setMethod(updatedMethod);
      }else{
        toast.error(transactionData.msg)
      }
      setTransactionData(null);
    }
  },[transactionData])
  
  useEffect(() => {
    getResposne();
    setMethod({
      cash : totalPrice
    })
  }, []);

  useEffect(()=>{
    if(petrolQuantity !== "" && station){
      return setPetrolPrice(petrolQuantity * station.quantity.petrol.price)
    }
    setPetrolQuantity(0);
  },[petrolQuantity])

  useEffect(()=>{
    if(dieselQuantity !== "" && station){
      return setDieselPrice(dieselQuantity * station.quantity.diesel.price)
    }
    setDieselQuantity(0);
  },[dieselQuantity])

  const proceedOrder =  (e) =>{
      e.preventDefault();
      setShowOrderModal(false)
      if(method.online){
       authService.displayRazorpay(totalPrice,setTransactionData)
      }else{
        postOrder(method);
      }
  } 
  const postOrder = async (method) => {
    const fuel  = {
    }
    
    if(petrolQuantity ){
      const petrol = {
        "price" : petrolPrice,
        "quantity" : petrolQuantity
      }
      fuel.petrol = petrol;
    }
    if(dieselPrice ){
      const diesel =  {
        "price" : dieselPrice,
        "quantity" : dieselPrice
      }
      fuel.diesel = diesel;
    }
    try {
      await authService.postOrder(user.userId, id, address,fuel, method).then(
        (response) => {
          if(response.data.order){
           toast.success("Order Placed Successfully")
           navigate('/user/')
           return;
          }
          toast.warning("Some Issue Detected")
        },
        (error) => {
          toast.error(error.response.data.message);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
  };

  const renderedInfo = station ? (
    <div className="flex flex-col">
    <div className="flex flex-row gap-3 items-center">
      <BsFuelPump className="text-[#fe6f2b] text-[54px]"/>
      <h1 className="text-center text-[54px] font-bold">
        {station.name}
      </h1>
    </div>
      <div className="flex flex-row items-center">
          <label className="text-[24px] font-semibold">Petrol: </label>
          <p className="text-[24px] font-thin">
          {station.quantity.petrol.price} ₹/L (Total Quantity : {station.quantity.petrol.quantity} L)
          </p>
      </div>
      <div className="flex flex-row items-center">
          <label className="text-[24px] font-semibold">Diesel: </label>
          <p className="text-[24px] font-thin">
          {station.quantity.diesel.price} ₹/L (Total Quantity : {station.quantity.diesel.quantity} L)
          </p>
      </div>
    </div>
  ) : null;
  return (
    <div
      className="w-[screen] min-h-screen flex flex-col justify-around items-center lg:md:flex-row"
      style={{
        backgroundImage: `linear-gradient(45deg,rgba(0,0,0, 0.75),rgba(0,0,0, 0.75)),url(${LoginLight})`,
        backgroundPosition: `50% 50%`,
        backgroundSize: `cover`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-white p-3 text-center text-[54px] flex flex-row justify-around items-center gap-3  whitespace-break-spaces font-sans  lg:text-[96px] md:text-[74px] ">
        {renderedInfo}
      </div>
      <div className="flex flex-row text-white  justify-evenly items-center  gap-5 lg:flex-row flex-wrap lg:gap-10 lg:w-[30%] ">
        <div className="header">
          <h1 className="text-center text-[54px]">Book Order</h1>
          <p></p>
        </div>
        <form class="w-full max-w-sm" onSubmit={onHandleSubmit}>
          <div class="gap-3 md:flex md:items-center mb-6 ">
            <div class="">
              <label
                class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-currentPassword"
              >
                Address
              </label>
            </div>
            <div class="">
              <button
                className=" bg-transparent hover:bg-[#F59337] font-semibold hover:text-white py-2 px-4 border border-[#fe6f2b] hover:border-transparent text-white  py-2 px-4 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(!showModal);
                }}
              >
                Show Map
              </button>
              {showModal ? (
                <Modal
                  setOnCancel={() => {
                    setShowModal(false);
                  }}
                  setOnSubmit={(pointer) => {
                    setAddress(pointer);
                    setShowModal(false);
                  }}
                />
              ) : null}
            </div>
          </div>
          <div class="gap-3 md:flex md:items-center mb-6 ">
            <div class="">
              <label
                class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-newPassword"
              >
                Petrol
              </label>
            </div>
            <div class="mb-3 lg:mb-0">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-newPassword"
                type="number"
                onChange={(e) => {
                  if(e.target.value > station.quantity.petrol.quantity){
                    toast.warning("Quantity Not Available")
                  }
                  else{
                  setPetrolQuantity(e.target.value)
                  }
                }}
                value={petrolQuantity}
                placeholder="Quantity"
              />
            </div>
            <div class="mb-3 lg:mb-0">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-newPassword"
                type="number"
                readOnly
                onChange={(e) => {
                  setPetrolPrice(e.target.value)
                }}
                value={petrolPrice}
                placeholder="Price"
              />
            </div>
          </div>
          <div class="gap-3 md:flex md:items-center mb-6 ">
            <div class="">
              <label
                class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-diesel"
              >
                Diesel
              </label>
            </div>
            <div class="mb-3 lg:mb-0">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-diesel"
                type="number"
                onChange={(e) => {
                  if(e.target.value > station.quantity.diesel.quantity){
                    toast.warning("Quantity Not Available")
                  }else{
                  setDieselQuantity(e.target.value)
                  }
                }}
                value={dieselQuantity}
                placeholder="Quantity"
              />
            </div>
            <div class="mb-3 lg:mb-0">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-diesel"
                type="number"
                readOnly
                value={dieselPrice}
                placeholder="Price"
              />
            </div>
          </div>
           
          <div className="actions w-full flex flex-col gap-4">
            <button className="bg-[#fe6f2b] hover:bg-[#F59337] w-full text-white font-bold py-2 px-4 rounded-full"
            onClick={(e)=>{
              e.preventDefault();
              if(!address){
                return toast.warning("Please Fill In address");
              }
              if(petrolQuantity || dieselQuantity){
              setShowOrderModal(!showOrderModal)
              }else{
                toast.warning("Please Fill In some Quantity");
              }
            }}
            >
              Order
            </button>
            <button
              className="bg-transparent border border-[#fe6f2b] w-full hover:bg-[#F59337] text-white font-bold py-2 px-4 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                navigate("../");
              }}
            >
              Cancel
            </button>
          </div>
          {
            showOrderModal?
            <BookPreview address={address} method={method} totalPrice={totalPrice} setTotalPrice={setTotalPrice} setMethod={setMethod} order={station} user={userInfo} petrolPrice={petrolPrice} petrolQuantity={petrolQuantity} dieselQuantity={dieselQuantity} dieselPrice={dieselPrice}  setOnCancel={setShowOrderModal} 
            setOnProceed={
              proceedOrder
            }/>
            :null
        }
        </form>
      </div>
    </div>
  );
}
export default BookOrder;
