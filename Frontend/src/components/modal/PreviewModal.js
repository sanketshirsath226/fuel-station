import { useState } from "react";
import SimpleMap from "../map/Simple";

function PreviewModal({content,setOnCancel,setOnSubmit}){
  const { location, name, quantity,distance } = content;
  const [pointer,setPointer] = useState(location)

    return(
        <>
          <div
            className=" h-screen justify-center flex lg:my-10 md:my-10 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 h-[100%] lg:h-[90%] md:h-[90%] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="relative p-6 flex h-[100%] flex-col">
                  <div className="h-2/3 flex justify-center items-center">
                    <SimpleMap pointer={pointer} setPointer={setPointer} disable={true}  />
                  </div>
                  <div className="w-full lg: md:2/3 flex flex-col gap-3 ">
                    <h3 className="text-orange text-xl font-semibold text-black">{name}</h3>

                    <p className="text-grey-dark font-thin text-sm leading-normal text-black">
                      Fuel Rate : Rs : {quantity.petrol.price}
                      <br />
                      Volume : {quantity.petrol.quantity} ltr
                    </p>
                    <p className="text-grey-dark font-thin text-sm leading-normal text-black">
                      Fuel Rate : Rs : {quantity.diesel.price}
                      <br />
                      Volume : {quantity.diesel.quantity}ltr
                    </p>
                    <p className="text-grey-dark font-thin text-sm leading-normal text-black">
                    Distance : {distance} KM
                    </p>
                  </div>
                  <div className="flex items-center flex-col  w-full justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 w-full background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOnCancel(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=>{
                      setOnSubmit(content._id)
                    }}
                  >
                    Order
                  </button>
                </div>
                </div>
              </div>
              </div>
            </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}
export default PreviewModal;