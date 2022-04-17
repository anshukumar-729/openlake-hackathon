import React,{useState} from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const Courses = () => {
    const [time, setTime] = useState(0);
    const [result, setResult] = useState([]);
    const setitem = (data) => {
      setResult([
        {
          data: data,
        },
      ]);
    };
     async function getCourses() {
       try {
         const response = await fetch(
           // "https://arcane-brushlands-01906.herokuapp.com/api/read",
           "http://localhost:3020/api/courses/read"
         );
         const data = await response.json();
         console.log(data);
         setitem(data.result);
         console.log(result[0].data);
         const re = data.result;

         // console.log(typeof(re));
       } catch (err) {
         console.log(err);
       }
     }
     if(time==0){
       getCourses();
       setTime(1);
     }
  return (
    <div className="">
      <NavBar />
      <div className="p-20 text-white  ">
        <h1 className="text-4xl font-semibold">Computer Science</h1>
        <div className="flex flex-wrap">
          {result.length != 0 && (
            <>
              {result[0].data.map((value) => (
          <div
            style={{ backgroundColor: "#292D2B" }}
            className="p-4 pl-6 pb-10 mt-10 mr-10 w-1/4 rounded-md"
          >
            <h4 className="text-3xl  mt-8 mb-3 w-1/2">{value.courseName}</h4>
            <div className="flex">
              <h3>{value.courseCode} | Credits : {value.credits}</h3>
              <Link to={`/course/${value.courseCode}`}>
                <button className="bg-black rounded-lg pl-2 pr-2 ml-4 border-2 ">
                  Explore
                </button>
              </Link>
            </div>
          </div>
              ))}
              </>
          )}
         
        </div>
        <button className="bg-yell mt-10 text-black text-xl pl-7 pr-7 pt-4 pb-4 rounded-full">
          Load More
        </button>
      </div>
    </div>
  );
};

export default Courses;
