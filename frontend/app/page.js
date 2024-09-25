import React from "react";
import Link from "next/link";
import View from "./View/page";
import Write from "./Write/page";
import Nav from "@/components/navbar";
import './globals.css';

const page = () =>{
  return (
    <>
    <div className="">
      <Nav />
    </div>
    <div>
      <h2>Welcome to the website!</h2>
      <Link href="/View">View your posts</Link>
      <br />
      <Link href="/Write">write new post</Link>
    </div>
    </>
  )
}

export default page;