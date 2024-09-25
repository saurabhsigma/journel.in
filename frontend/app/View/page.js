// /view/page.js

"use client"; // This ensures it's treated as a client component

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Note the use of "next/navigation" in app directory
import Nav from "@/components/navbar";

const ViewPage = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4002/api/v1/post/view");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handlePostClick = (id) => {
    router.push(`/View/${id}`); // Dynamic route for each post
  };

  return (

    <>

    < Nav />
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              onClick={() => handlePostClick(post._id)}
              className="p-5 bg-white rounded-lg shadow hover:shadow-md cursor-pointer transition"
            >
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No posts available</p>
        )}
      </div>
    </div>

    </>
  );
};

export default ViewPage;
