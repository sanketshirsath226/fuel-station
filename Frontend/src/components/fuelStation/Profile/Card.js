function Card(){
    const onHandleSubmit = (e)=>{
        e.preventDefault();
    }
    return (
        <div className="shadow-lg gap-3  rounded m-8 p-8 flex bg-gray-800">
          <div className="lg: md:flex flex-col gap-3 ">
            <h3 className="text-orange text-xl font-semibold text-white">{"Profile Update"}</h3>
           <form onSubmit={onHandleSubmit}>
           <div>
            
            <label htmlFor="current-password">
                Current Password : 
            </label><br/>
            <input id="current-password"/>

           </div>
           <div>
            
            <label htmlFor="new-password">
                New Password : 
            </label><br/>
            <input id="new-password"/>

           </div>
           <div>
            
            <label htmlFor="confirm-password">
                Confirm Password : 
            </label><br/>
            <input id="confirm-password"/>

           </div>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-bold hover:text-white py-1  border border-blue-500 hover:border-transparent rounded">
              Update Password
            </button>
            </form>
          </div>
        </div>
      );
}
export default Card;