import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {

  const logout = () =>{
    localStorage.setItem("active",0);
    console.log("logOut")
    console.log(localStorage.getItem("active"))
    window.location.replace("/");   
  }
  return (
    <div style={{ backgroundColor: "#0E0F0F" }} className="p-4  flex ">
      <Link to="/">
        <div className="yell text-3xl ml-3 font-bold">IIT BHILAI</div>
      </Link>
      <div className="flex justify-between absolute right-0">
        <Link to="/chats">
          <h2 className="text-white text-xl mr-10 hover:border-b-2 border-yell cursor-pointer ">
            Chats
          </h2>
        </Link>
        <Link to="/courses">
          <h2 className="text-white text-xl mr-10 hover:border-b-2 border-yell cursor-pointer">
            Courses
          </h2>
        </Link>
        <Link to="/alumni">
          <h2 className="text-white text-xl mr-10 hover:border-b-2 border-yell cursor-pointer">
            Alumnis
          </h2>
        </Link>

        <Link to="/lostfound">
          <h2 className="text-white text-xl mr-10 hover:border-b-2 border-yell cursor-pointer">
            Lost & Found
          </h2>
        </Link>
        {localStorage.getItem("active") == 1 && (
          <>
            <button
              onClick={logout}
              className="bg-yell rounded-2xl pl-5 pr-5 pt-2 pb-2 font-normal mr-10"
            >
              Log Out
            </button>
            <img className="w-10 mr-5" src={localStorage.getItem("photo")}></img>
          </>
        )}
        {localStorage.getItem("active") == 0 && (
          <>
            <Link
              to="signIn"
              className="bg-yell rounded-2xl pl-5 pr-5 pt-2 pb-2 font-normal mr-10"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
