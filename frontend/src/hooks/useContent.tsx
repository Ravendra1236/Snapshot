import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

function useContent() {
  const [content, setContent] = useState([]);

  const fetchContent = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found in localStorage");
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setContent(response.data.content);
      })
      .catch((error) => {
        console.error("Failed to fetch content:", error);
        if (error.response?.status === 403) {
          console.error("Authentication failed - check your token");
        }
      });
  };

  useEffect(() => {
    // Fetch content immediately
    fetchContent();

    // Set up interval to fetch content every 10 seconds
    const interval = setInterval(fetchContent, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return content;
}

export default useContent;
