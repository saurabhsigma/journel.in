import React from "react";
import '../app/globals.css';
import Link from "next/link";



const Nav = () =>{

    return(
        <div className="flex flex-row bg-blue-400 font-bold justify-between p-3" >
        
            <div id="logo" className="">Logo</div>
            <div id="links" className="">
                <Link href="/View" className="m-2">View!</Link>
                <Link href="/Write" className="m-2">Write!</Link>
                {/* <Link href="/Write" className="m-2">
                    <button className="border-1 bg-white text-black p-1 rounded-md">Signup/Login!</button>
                </Link> */}
            </div>
        
        
        </div>
    )

}

export default Nav;