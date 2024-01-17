"use client";
import { useEffect } from "react";
import axios from "axios";

const RedirectPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const shortid = window.location.pathname.substring(1);

        const response = await axios.get(`/api/shortUrl/${shortid}`);
        const data = response.data;
        console.log(data);

        if (response.status === 200) {
          window.location.href = data.url;
        } else {
          console.error("URL corta no encontrada");
        }
      } catch (error) {
        console.error("Error al buscar la URL corta:", error);
      }
    };

    fetchData();
  }, []);

  return null;
};

export default RedirectPage;
