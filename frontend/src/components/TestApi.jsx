import { useEffect } from "react";
import axios from "../api/axios";

const TestApi = () => {
  useEffect(() => {
    // Using fetch API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/");
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Using axios
    axios
      .get("/")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return <div>Testing API</div>;
};

export default TestApi;
