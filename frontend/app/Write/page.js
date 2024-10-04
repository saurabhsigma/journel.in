// /write/page.js
"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import Nav from "@/components/navbar";

const WritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      await axios.post("http://localhost:4002/api/v1/post/write", {
        title,
        content,
      });
      
      setLoading(false);
      router.push("/View"); // Redirect to the view page after successful post creation
    } catch (error) {
      console.error("Error creating post:", error);
      setLoading(false);
    }
  };

  return (
    <>

    < Nav />
    <div className="container mx-auto py-10">

      
      <h1 className="text-3xl font-bold mb-8 text-center">Write a New Post</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="6"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>

    </>
  );
};

export default WritePage;
