/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Test = () => {
  const [change, setChange] = useState(0);

  // useEffect(() => {
  //   alert('New Refresh ');
  // }, [change]);

  const handleChange = () => {
    setChange(change + 1);
    console.log(change);
  }

  return <>
    <button onClick={handleChange} className="bg-blue-600 px-4 py-2 text-white m-2">Click</button>
  </>;
};

export default Test;
