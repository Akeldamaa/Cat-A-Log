import { useEffect } from "react";
import axios from "axios";

const TestApi = () => {
  useEffect(() => {
    // Using fetch API
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/");
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Using axios
    axios
      .get("http://127.0.0.1:8000/")
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
