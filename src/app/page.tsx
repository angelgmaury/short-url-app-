"use client";
import axios from "axios";
import React, { FormEvent, useRef, useState } from "react";

function Home() {
  const [shortURL, setShortURL] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/shortUrl", {
        url: inputRef.current?.value,
      });
      console.log(response);
      setShortURL(response.data.shortUrl);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-gray-900">SHORT URL</h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="URL"
            className="border p-2 rounded-md text-gray-900"
            ref={inputRef}
          />
          <button className="bg-gray-900 text-white py-2 rounded-md hover:bg-zinc-900 transition-all duration-300">
            Shorten
          </button>
        </form>

        <div className="mt-6 text-sm">
          <span className="font-bold text-gray-900">URL SHORT:</span>
          <a
            href={shortURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline ml-2"
          >
            {shortURL}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
