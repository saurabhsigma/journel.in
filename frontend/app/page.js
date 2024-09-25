"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "@/components/navbar";
import './globals.css';

const Page = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4002/api/v1/post/view');
        setPosts(response.data);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Nav />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Featured Posts
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-2xl font-semibold mb-3 text-gray-700">
                  {post.title}
                </h2>
                <p className="text-gray-600">{post.content}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No posts available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
