import React, { useState } from "react";
import NavBar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

const LostFound = () => {
  if (localStorage.getItem("active") == 1) {
    console.log("active");
    console.log(localStorage.getItem("name"));
    console.log(localStorage.getItem("email"));
    console.log(localStorage.getItem("photo"));
  } else {
    window.location.replace("/signIn");
  }
  const [time,setTime] = useState(0);
  const [result,setResult] = useState([]);
  const setitem = (data) => {
    console.log(data)
    setResult([
      {
        data: data,
      },
    ]);
    console.log(result);
  };
  async function getImages() {
    try {
      const response = await fetch(
        // "https://arcane-brushlands-01906.herokuapp.com/api/read",
        `http://localhost:3020/`
      );
      const data = await response.json();
      setitem(data.files);
      console.log(data.files[0].filename);
      //  const re = data.result;

      console.log(result[0].data);
    } catch (err) {
      console.log(err);
    }
  }
  if (time == 0) {
    getImages();
    setTime(1);
  }
  return (
    <div className="">
      <NavBar />
      {/* {result[0] && (
        <>
          {result[0].data[0].filename}
          {result[0].data.map((file) => (
            <>
              <img
                className="h-20"
                src={"http://localhost:3020/image/" + file.filename}
              ></img>
            </>
          ))}
        </>
      )} */}
      <div className="p-10">
        <h1 class="text-white text-2xl ml-15">FIND MY ITEM</h1>
        <form
          action="http://localhost:3020/upload"
          method="POST"
          enctype="multipart/form-data"
        >
          <div class=" flex">
            <input name="url" value={window.location.href} hidden></input>
            <input
              className="p-3 bg-black text-white rounded-md border-2 border-gray-600 h-12 mt-10 w-1/3"
              name="item"
              value=""
              placeholder="Item name & description"
            ></input>

            <div className="flex mt-10 ml-20 ">
              <label for="file" className="text-white text-xl mr-3">
                Add a Image
              </label>
              <input
                className="text-white ml-3"
                type="file"
                name="file"
                id="file"
                required
              />
            </div>
          </div>
          <button
            className="bg-yell mt-6 text-lg flex  text-black pl-3 pr-3 p-1 rounded-xl"
            type="submit"
          >
            <FontAwesomeIcon icon={faCircleArrowUp} className="mr-2 mt-1 " /> FIND
          </button>
        </form>
      </div>
    </div>
  );
};

export default LostFound;
