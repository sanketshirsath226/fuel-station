import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/";

const signup = (email, password,name,phone) => {
  return axios
    .post(API_URL + "user/signup", {
      email,
      password,
      name,
      phone
    })
    .then((response) => {
      if (response.data.authtoken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "user/login", {
      email,
      password,
    })
    .then((response) => {
      console.log(response)
      if (response.data.authtoken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getUserInfo = (id) => {
  return axios
    .get(API_URL + `user/getUserInfo/${id}`)
    .then((response) => {
      console.log(response)
      return response;
    });
};

const getCurrentFuelStation = () => {
  return JSON.parse(localStorage.getItem("fuelStation"));
};

const fuelStationLogin = (email, password) => {
  return axios
    .post(API_URL + "fuel/login", {
      email,
      password
    })
    .then((response) => {
      console.log(response)
      if (response.data.token) {
        localStorage.setItem("fuelStation", JSON.stringify(response.data));
      }
      return response;
    });
};

const fuelStationRegister = (name,owner,email,password,phone,location) => {
  return axios
    .post(API_URL + "fuel/register", {
      name,
      owner,
      email,
      password,
      phone,
      location
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("fuelStation", JSON.stringify(response.data));
      }
      return response;
    });
};

const fuelInventoryUpdate = (quantity,stationId) => {
  return axios
    .put(API_URL + "fuel/updateFuel", {
      quantity,stationId
    })
    .then((response) => {
      console.log(response)
      return response;
    });
};


const getFuelStation = () => {
  return axios
    .get(API_URL + "fuel/getStations")
    .then((response) => {
      return response;
    });
};

const getFuelStationByID = (id) => {
  return axios
    .get(API_URL + `fuel/${id}`)
    .then((response) => {
      return response;
    });
};

const postOrder = (userId,stationId,address,fuel,method) =>{
  return axios
  .post(API_URL + `order/`,{
    userId,
    stationId,
    address,
    fuel,
    method
  })
  .then((response) => {
    console.log(response)
    return response;
  });
}

const cancelOrder = (id) =>{
  return axios
  .put(API_URL + `order/cancel`,{
    id
  })
  .then((response) => {
    return response;
  });
}

const acceptOrder = (id) =>{
  return axios
  .put(API_URL + `order/accept`,{
    id
  })
  .then((response) => {
    return response;
  });
}

const deliveryOrder = (id) =>{
  return axios
  .put(API_URL + `order/deliever`,{
    id
  })
  .then((response) => {
    return response;
  });
}

const getOrders = (id) =>{
  return axios
  .get(API_URL + `order/getOrderByFuelStationId/${id}`)
  .then((response) => {
    return response;
  });
}
const getUserOrders = (id) =>{
  return axios
  .get(API_URL + `order/getOrderByUserId/${id}`)
  .then((response) => {
    return response;
  });
}
const updateProfilePassword = (userId,password,newPassword) =>{
  return axios
  .put(API_URL + `user/changePassword`,{
    userId,
    password,
    newPassword
  })
  .then((response) => {
    return response;
  });
}

const updateSellerProfilePassword = (stationId,password,newPassword) =>{
  return axios
  .put(API_URL + `fuel/changePassword`,{
    stationId,
    password,
    newPassword
  })
  .then((response) => {
    return response;
  });
}

const loadScript = async(src="https://checkout.razorpay.com/v1/checkout.js")=>{
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
const displayRazorpay = async(totalDeliveryCharge,setTransactionData)=>{
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        return;
    }

    // creating a new order
    const result = await axios.post(API_URL + `payment/order`,{
      amount : totalDeliveryCharge
    });

    if (!result) {
        toast.error("Server error. Are you online?");
        return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;
     console.log(amount)
    const options = {
        key: "rzp_test_X4JNqOVItvYRBX", // Enter the Key ID generated from the Dashboard
        currency: currency,
        name: "Fuel Station",
        description: "",
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };
            console.log(data)

            const result = await axios.post(API_URL + "payment/verify", {data});

            setTransactionData(result.data);
        },
   
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}


const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  fuelStationLogin,
  getCurrentFuelStation,
  fuelStationRegister,
  getFuelStation,
  getFuelStationByID,
  postOrder,
  getOrders,
  getUserInfo,
  cancelOrder,
  acceptOrder,
  deliveryOrder,
  fuelInventoryUpdate,
  updateProfilePassword,
  updateSellerProfilePassword,
  displayRazorpay,
  loadScript,
  getUserOrders
};

export default authService;
