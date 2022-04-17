import React, { useState } from "react";
import NavBar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";


const Chats = () => {
  // var result=[{personName:"aa"}];
  const [result,setResult]=useState([]);
 const setitem = (data) =>{
   setResult([{
     data:data
   }])
 }
    async function getMassage() {
      try {
        const response = await fetch(
          // "https://arcane-brushlands-01906.herokuapp.com/api/read",
          "http://localhost:3020/api/common/read"
        );
        const data = await response.json();
        setitem(data.result);
      console.log(result[0].data);
      const re=(data.result);
     
      // console.log(typeof(re));
      } catch (err) {
        console.log(err);
      }
    }
    // getMassage();
  return (
    <div className="">
      <NavBar />
     {/* <button onClick={() => setitem({name:"pp"})}>set</button> */}
      
      <div className="p-16 text-white  ">
        <h2 className="text-3xl">Chat with your Freinds</h2>
        <div className="flex mt-10 ">
          <input
            placeholder="Message"
            className="w-72 border-2 border-zinc-400  p-3 bg-black rounded-lg"
          ></input>
          <button className="bg-yell pl-4 pr-4 text-black ml-10 rounded-full ">
            <FontAwesomeIcon icon={faCircleArrowUp} className="mr-2 text-xl" />
            SEND
          </button>
        </div>
        <button onClick={getMassage} className="bg-yell pl-4 pr-4 pt-2 pb-2 text-black mt-10 rounded-full ">
          <FontAwesomeIcon icon={faArrowsRotate} className="mr-2 text-xl" />
          Refresh
        </button>
        <h3 className="text-xl mt-7"> Recent Activity</h3>
        <div className="bg-black p-5 mt-10 rounded-md">
          {result.length!=0 &&(<>
          {result[0].data.map((value) => (
          <div className="flex ml-5 mb-5">
            <img
              className="w-10 rounded-full h-10"
              src="https://picsum.photos/200/300"
            />
            <div>
            <div className="flex justify-between ml-4">
                {value.personName}
                <p className="ml-5">{value.date}</p>
            </div>
            <h2 className="ml-4">{value.message}</h2>
            </div>
          </div>
          ))} 
          </>)}
        
        </div>
      </div>
    </div>
  );
};

export default Chats;
