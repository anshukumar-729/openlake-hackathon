import React from "react";
import NavBar from "./NavBar";

const LostFound = () => {
  if (localStorage.getItem("active") == 1) {
    console.log("active");
    console.log(localStorage.getItem("name"));
    console.log(localStorage.getItem("email"));
    console.log(localStorage.getItem("photo"));
  } else {
    window.location.replace("/signIn");
  }
  return (
    <div className="">
      <NavBar />
    </div>
  );
};

export default LostFound;
