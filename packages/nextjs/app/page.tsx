'use client'
import Login from "./components/Login"
import { NextPage } from "next";
const Home:NextPage=()=> {
  return (
    <div className='Home'>
 <Login/>
    </div>
  );
}

export default Home;
