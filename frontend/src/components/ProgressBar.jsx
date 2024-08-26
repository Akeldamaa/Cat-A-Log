import { useState, useEffect } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Define the interval duration in milliseconds
    const intervalDuration = 400; // Update every 400ms

    // Create an interval to update the progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval); // Stop the interval when reaching 100%
          return 100;
        }
        return prevProgress + 1; // Increment progress
      });
    }, intervalDuration);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#e0e0e0",
        borderRadius: "4px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "30px",
          backgroundColor: "#6a1b9a",
          textAlign: "center",
          color: "white",
          lineHeight: "30px",
          borderRadius: "4px",
          transition: "width 2s ease",
        }}
      ></div>
      <p
        style={{
          position: "absolute",
          width: "100%",
          textAlign: "center",
          color: "white",
          fontSize: "16px",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
        }}
      >
        {progress}%
      </p>
    </div>
  );
};

export default ProgressBar;
